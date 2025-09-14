
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Projects({ dictionary }: { dictionary: any }) {
  const projects = dictionary.projectsData;
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project: any, index: number) => {
            const projectImage = PlaceHolderImages.find(img => img.id === `project-${project.id}`);
            return (
              <Card key={project.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {projectImage && (
                   <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      data-ai-hint={projectImage.imageHint}
                    />
                   </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                        GitHub
                      </a>
                    )}
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                      <ExternalLink className="h-5 w-5" />
                      {project.id === 'cryptodahausa' ? 'YouTube' : dictionary.liveDemo}
                    </a>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <a href="https://github.com/criptichood" target="_blank" rel="noopener noreferrer">
              {dictionary.viewMore}
            </a>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
