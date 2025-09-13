import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#3f51b533,transparent)] -z-10"></div>
      
      <FadeIn className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-6">
          Smarter Websites. Modern Systems. <br />
          <span className="text-primary">AI-Powered Solutions.</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          Helping businesses and companies build and upgrade websites, maintain systems, and adopt AI-driven solutions for growth.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Get a Modern Website</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#projects">See My Work</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
