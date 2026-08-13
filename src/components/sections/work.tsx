import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Work({ dictionary, lang }: { dictionary: any, lang: string }) {
  const projects = dictionary.projectsData;
  return (
    <section id="work" className="py-20 md:py-32 bg-secondary">
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
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                {projectImage && (
                   <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      data-ai-hint={projectImage.imageHint}
                    />
                   </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                  {project.role && (
                    <CardDescription className="text-sm font-medium text-primary">{project.role}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <CardDescription className="text-base">{project.description}</CardDescription>
                  {project.outcome && (
                    <CardDescription className="text-sm text-muted-foreground">{project.outcome}</CardDescription>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.capabilities?.map((cap: string) => (
                      <Badge key={cap} variant="secondary">{cap}</Badge>
                    ))}
                  </div>
                  {project.stack && (
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech: string) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.caseStudy && (
                      <Link href={`/${lang}/work/${project.id}`} className="flex items-center gap-1 text-primary font-medium hover:underline">
                        {dictionary.viewCaseStudy} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <GithubIcon className="h-5 w-5" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <ExternalLink className="h-5 w-5" />
                        {project.id === 'crypto-dahausa' ? 'YouTube' : dictionary.liveDemo}
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}