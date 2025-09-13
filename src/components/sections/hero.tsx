import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-20 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-transparent to-background">
        <div className="absolute inset-0 animate-aurora-1 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 animate-aurora-2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent"></div>
      </div>

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
