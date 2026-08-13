import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Timeline({ dictionary }: { dictionary: any }) {
  const items = dictionary.items;
  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {items.map((item: any, index: number) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                <Badge variant="secondary">{item.period}</Badge>
              </div>
              <CardDescription className="text-base">
                {item.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}