"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GITHUB_URL, GithubIcon } from "@/lib/data";
import type { Dictionary } from "@/types/dictionary";

export function GitHubShowcase({ dictionary }: { dictionary: Dictionary["github"] }) {
  const githubUrl = GITHUB_URL;
  const repos = dictionary.repos;

  return (
    <section id="github" className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32">
      <motion.header
        className="text-center mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="inline-flex items-center justify-center gap-2 text-primary mb-6">
          <GithubIcon className="h-8 w-8" />
        </div>
        <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">{dictionary.title}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          {dictionary.description}
        </p>
      </motion.header>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-6">
        {repos.map((repo, index: number) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
          >
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-void group rounded-2xl h-full p-6 flex flex-col relative overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="void-inner h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <GithubIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-label-mono text-label-mono text-primary">REPO_{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <ArrowUpRight className="text-on-surface-variant opacity-50 group-hover:text-primary group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div className="mt-auto pt-8 space-y-4">
                  <h3 className="font-headline-md text-2xl font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{repo.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {repo.topics?.map((topic: string) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 bg-surface-container/70 border border-outline-variant/40 rounded-full text-xs font-label-mono text-on-surface-variant"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-mono text-label-mono rounded-full hover:bg-inverse-primary transition-colors duration-300"
        >
          <GithubIcon className="h-5 w-5" />
          {dictionary.viewProfile}
        </a>
      </motion.div>
    </section>
  );
}