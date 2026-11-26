import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Dictionary } from "@/types/dictionary";

export function Work({ dictionary }: { dictionary: Dictionary["work"]; lang: string }) {
  const projects = dictionary.projectsData;
  return (
    <section id="work" className="py-20 md:py-32 bg-surface-container-low">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline-xl text-headline-xl text-on-surface">{dictionary.title}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => {
            return (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="font-headline text-lg leading-snug">{project.title}</CardTitle>
                  {project.role && (
                    <CardDescription className="text-xs font-semibold uppercase tracking-wide text-primary">{project.role}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow space-y-3 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.capabilities?.map((cap: string) => (
                      <span key={cap} className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {cap}
                      </span>
                    ))}
                  </div>
                  {project.stack && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech: string) => (
                        <span key={tech} className="rounded-full border border-outline-variant px-2.5 py-0.5 text-xs text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-end gap-4 py-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      {dictionary.visitSite}
                    </a>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}