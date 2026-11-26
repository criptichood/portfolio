import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED_KEYS = 5000;

type Bucket = { count: number; resetAt: number };

const memoryBuckets = new Map<string, Bucket>();
let warnedAboutDegradation = false;

function pruneMemoryBuckets(now: number) {
  for (const [key, bucket] of memoryBuckets) {
    if (bucket.resetAt <= now) memoryBuckets.delete(key);
  }
  if (memoryBuckets.size <= MAX_TRACKED_KEYS) return;
  const oldest = [...memoryBuckets.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
  for (const [key] of oldest.slice(0, memoryBuckets.size - MAX_TRACKED_KEYS)) {
    memoryBuckets.delete(key);
  }
}

function consumeInMemory(key: string, limit: number) {
  const now = Date.now();
  pruneMemoryBuckets(now);
  const existing = memoryBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

async function clientKeyHash() {
  const headerList = await headers();
  const cfIp = headerList.get("cf-connecting-ip")?.trim();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = cfIp || forwarded || headerList.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

async function consumeRateLimit(bucket: string, limit: number) {
  const keyHash = await clientKeyHash();
  const memoryKey = `${bucket}:${keyHash}`;
  const supabase = createSupabaseServerClient();
  if (!supabase) return consumeInMemory(memoryKey, limit);

  const { data, error } = await supabase.rpc("consume_public_rate_limit", {
    p_bucket: bucket,
    p_key_hash: keyHash,
    p_limit: limit,
    p_window_seconds: 3600,
  });

  if (error || typeof data !== "boolean") {
    if (!warnedAboutDegradation) {
      warnedAboutDegradation = true;
      console.warn(`[security] ${bucket} rate limit fell back to this server instance`);
    }
    return consumeInMemory(memoryKey, limit);
  }

  return data;
}

export async function allowContactSubmission(limit = 5) {
  return consumeRateLimit("contact", limit);
}

export async function allowChatbotRequest(limit = 20) {
  return consumeRateLimit("chatbot", limit);
}
