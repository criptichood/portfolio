import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TechStack({ dictionary }: { dictionary: any }) {
  const groups = dictionary.groups;
  return (
    <section id="tech-stack" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group: any) => (
            <Card key={group.title} className="p-6">
              <CardHeader>
                <CardTitle className="font-headline text-lg">{group.title}</CardTitle>
              </CardHeader>
              <CardDescription className="flex flex-wrap gap-2">
                {group.items.map((item: string) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </CardDescription>
            </Card>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}