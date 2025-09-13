import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SERVICES_DATA } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">My Services</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Providing comprehensive solutions to elevate your digital presence and operational efficiency.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <Card key={service.title} className="text-center p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-6">
                  <service.Icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-base">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
