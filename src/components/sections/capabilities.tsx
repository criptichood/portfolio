import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SERVICES_ICONS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Capabilities({ dictionary }: { dictionary: any }) {
  const items = dictionary.items;
  return (
    <section id="capabilities" className="py-20 md:py-32 bg-secondary">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any) => {
            const Icon = SERVICES_ICONS[item.icon as keyof typeof SERVICES_ICONS];
            return (
              <Card key={item.title} className="text-center p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-6">
                    {Icon && <Icon className="h-8 w-8" />}
                  </div>
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base">
                  {item.description}
                </CardDescription>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  {item.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}