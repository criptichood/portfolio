import { FadeIn } from "@/components/motion/fade-in";
import { WHY_CHOOSE_ME_DATA } from "@/lib/data";

export function WhyChooseMe() {
  return (
    <section id="why-choose-me" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Me?</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Delivering value through experience, innovation, and a commitment to your success.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_ME_DATA.map(({ title, Icon }) => (
            <div key={title} className="text-center p-6 rounded-lg">
              <div className="mx-auto bg-primary/10 text-primary rounded-full h-20 w-20 flex items-center justify-center mb-6 ring-8 ring-primary/5">
                <Icon className="h-10 w-10" />
              </div>
              <h3 className="font-headline text-xl font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
