import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-picture');

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-md mx-auto">
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <CardContent className="p-0">
                {profileImage && (
                  <Image
                    src={profileImage.imageUrl}
                    alt={profileImage.description}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={profileImage.imageHint}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">About Me</h2>
            <p className="text-xl font-medium text-primary font-headline">
              Blockchain Researcher, AI Web Developer, and Technical Consultant.
            </p>
            <p className="text-muted-foreground text-lg">
              My mission is to empower local businesses by helping them embrace the future of technology. I specialize in building AI-integrated websites, modernizing applications, and providing reliable system maintenance to ensure seamless operations and sustainable growth.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
