import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { WhyChooseMe } from "@/components/sections/why-choose-me";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyChooseMe />
      <Blog />
      <Contact />
    </>
  );
}
