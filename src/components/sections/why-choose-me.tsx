
import { FadeIn } from "@/components/motion/fade-in";
import { WHY_CHOOSE_ME_ICONS } from "@/lib/data";

export function WhyChooseMe({ dictionary }: { dictionary: any }) {
  const items = dictionary.items;
  return (
    <section id="why-choose-me" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ title, icon }: { title: string; icon: string }) => {
            const Icon = WHY_CHOOSE_ME_ICONS[icon as keyof typeof WHY_CHOOSE_ME_ICONS];
            return (
              <div key={title} className="text-center p-6 rounded-lg">
                <div className="mx-auto bg-primary/10 text-primary rounded-full h-20 w-20 flex items-center justify-center mb-6 ring-8 ring-primary/5">
                  {Icon && <Icon className="h-10 w-10" />}
                </div>
                <h3 className="font-headline text-xl font-semibold">{title}</h3>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
