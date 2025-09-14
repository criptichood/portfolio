
import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { WhyChooseMe } from "@/components/sections/why-choose-me";
import { getDictionary } from "@/lib/dictionaries";

export default async function HomePage({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero dictionary={dictionary.hero} lang={lang} />
      <About dictionary={dictionary.about} />
      <Services dictionary={dictionary.services} />
      <Projects dictionary={dictionary.projects} />
      <WhyChooseMe dictionary={dictionary.whyChooseMe} />
      <Blog dictionary={dictionary.blog} />
      <Contact dictionary={dictionary.contact} />
    </>
  );
}
