import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Work } from "@/components/sections/work";
import { TechStack } from "@/components/sections/tech-stack";
import { Timeline } from "@/components/sections/timeline";
import { GitHubShowcase } from "@/components/sections/github-showcase";
import { WhyChooseMe } from "@/components/sections/why-choose-me";
import { getDictionary } from "@/lib/dictionaries";

export default async function LangHomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero dictionary={dictionary.hero} lang={lang} />
      <About dictionary={dictionary.about} />
      <Capabilities dictionary={dictionary.capabilities} />
      <Work dictionary={dictionary.work} lang={lang} />
      <GitHubShowcase dictionary={dictionary.github} />
      <TechStack dictionary={dictionary.techStack} />
      <Timeline dictionary={dictionary.timeline} />
      <WhyChooseMe dictionary={dictionary.whyChooseMe} />
      <FAQ dictionary={dictionary.faq} />
      <Contact dictionary={dictionary.contact} />
    </>
  );
}