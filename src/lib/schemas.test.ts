import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ChatbotInputSchema,
  ContactFormSchema,
  sanitizeVisitorName,
} from "./schemas.ts";

describe("ContactFormSchema", () => {
  it("accepts a valid submission", () => {
    const result = ContactFormSchema.safeParse({
      name: "Emmanuel Galadima",
      email: "hello@criptichood.com",
      message: "Looking to collaborate on a Next.js and AI system.",
    });
    assert.equal(result.success, true);
  });

  it("rejects names containing numbers or symbols", () => {
    const result = ContactFormSchema.safeParse({
      name: "User123!",
      email: "hello@criptichood.com",
      message: "Valid message with sufficient length.",
    });
    assert.equal(result.success, false);
  });

  it("rejects short messages", () => {
    const result = ContactFormSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hi",
    });
    assert.equal(result.success, false);
  });
});

describe("ChatbotInputSchema", () => {
  it("enforces history cap of 20 messages", () => {
    const history = Array.from({ length: 21 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "model") as "user" | "model",
      content: "hello",
    }));

    const result = ChatbotInputSchema.safeParse({
      history,
      message: "Tell me about your work",
      lang: "en",
      visitor: { name: "Ada Lovelace", email: "ada@example.com" },
    });
    assert.equal(result.success, false);
  });
});

describe("sanitizeVisitorName", () => {
  it("strips digits and collapses whitespace", () => {
    assert.equal(sanitizeVisitorName("  Ada123   Lovelace! "), "Ada Lovelace ");
  });
});
