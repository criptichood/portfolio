import Link from "next/link";
import { Fragment } from "react";
import { Clock, FolderOpen, Code, Brain } from "lucide-react";

const STAT_ICONS: Record<string, typeof Clock> = {
  Clock,
  FolderOpen,
  Code,
  Brain,
};

type TermToken = { text: string; cls?: string };

const TERMINAL_LINES: TermToken[][] = [
  [
    { text: "import", cls: "token-keyword" },
    { text: " asyncio" },
  ],
  [
    { text: "from", cls: "token-keyword" },
    { text: " core " },
    { text: "import", cls: "token-keyword" },
    { text: " NeuralEngine, UXBuilder" },
  ],
  [],
  [
    { text: "async def", cls: "token-keyword" },
    { text: " " },
    { text: "init_project", cls: "token-function" },
    { text: "(spec_data):" },
  ],
  [
    { text: "    " },
    { text: "# 1. Analyze constraints", cls: "token-comment" },
  ],
  [{ text: "    engine = NeuralEngine()" }],
  [
    { text: "    architecture = " },
    { text: "await", cls: "token-keyword" },
    { text: " engine.process(spec_data)" },
  ],
  [],
  [
    { text: "    " },
    { text: "# 2. Synthesize interface", cls: "token-comment" },
  ],
  [
    { text: "    ui = UXBuilder(theme=" },
    { text: "'dark_minimal'", cls: "token-string" },
    { text: ")" },
  ],
  [{ text: "    interface = ui.generate(architecture)" }],
  [],
  [
    { text: "    " },
    { text: "return", cls: "token-keyword" },
    { text: " interface.deploy()" },
  ],
  [],
  [
    { text: "if", cls: "token-keyword" },
    { text: " __name__ == " },
    { text: '"__main__"', cls: "token-string" },
    { text: ":" },
  ],
  [
    { text: "    status = " },
    { text: "await", cls: "token-keyword" },
    { text: " init_project(next_idea)" },
  ],
];

export function Hero({ dictionary, lang }: { dictionary: any, lang: string }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary opacity-5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-32 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content: 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="animate-fade-up">
              <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-4">
                {dictionary.eyebrow}
              </span>
            </div>
            <h1 className="animate-fade-up delay-100 font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-6">
              {dictionary.titleLine1} <br />
              <span className="text-primary">{dictionary.titleLine2}</span>
            </h1>
            <p className="animate-fade-up delay-200 font-body-lg text-body-lg text-on-surface-variant max-w-[52ch] mb-10">
              {dictionary.description}
            </p>
            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link
                href={`/${lang}#work`}
                className="w-full sm:w-auto text-center font-caption text-caption bg-primary-container text-on-primary-container px-8 py-3 rounded hover:bg-[#2E4594] transition-all duration-300 hover:scale-[1.02]"
              >
                {dictionary.cta1}
              </Link>
              <Link
                href={`/${lang}#contact`}
                className="w-full sm:w-auto text-center font-caption text-caption border border-outline-variant text-on-background px-8 py-3 rounded hover:bg-surface-variant transition-all duration-300 hover:scale-[1.02]"
              >
                {dictionary.cta2}
              </Link>
            </div>
            {/* Stat Chips */}
            <div className="animate-fade-up delay-400 flex flex-nowrap overflow-x-auto sm:flex-wrap gap-3 pb-4 sm:pb-0 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x">
              {dictionary.stats.map((stat: any) => {
                const Icon = STAT_ICONS[stat.icon] ?? Clock;
                return (
                  <div key={stat.label} className="snap-start flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full whitespace-nowrap shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-caption text-caption text-on-surface">{stat.value} {stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual: 5 cols, Terminal Window */}
          <div className="lg:col-span-5 relative animate-fade-up delay-300 mt-8 lg:mt-0">
            {/* Glow behind terminal */}
            <div className="absolute inset-0 bg-primary-container opacity-20 blur-2xl rounded-xl transform rotate-3" />
            {/* Terminal Container */}
            <div className="terminal-window relative bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Title Bar */}
              <div className="flex items-center px-4 py-3 bg-[#1A1A1A] border-b border-[#262626]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-grow text-center font-label-mono text-xs text-[#c5c5d4]">agent.py</div>
              </div>
              {/* Code Content */}
              <div className="p-6 font-label-mono text-label-mono leading-relaxed overflow-x-auto">
                <pre className="text-[#e2e2e2] whitespace-pre-wrap"><code className="language-python">
                  {TERMINAL_LINES.map((line, i) => (
                    <Fragment key={i}>
                      {line.map((tok, j) =>
                        tok.cls ? (
                          <span key={j} className={tok.cls}>{tok.text}</span>
                        ) : (
                          <Fragment key={j}>{tok.text}</Fragment>
                        )
                      )}
                      {i < TERMINAL_LINES.length - 1 ? "\n" : null}
                    </Fragment>
                  ))}
                  <span className="animate-blink bg-primary text-background inline-block w-2 h-4 align-middle ml-1" />
                </code></pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}