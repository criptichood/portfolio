import Link from "next/link";
import { Star, GitFork } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SOCIAL_LINKS, GithubIcon } from "@/lib/data";

export function GitHubShowcase({ dictionary }: { dictionary: any }) {
  const githubUrl = SOCIAL_LINKS.find((l) => l.name === "GitHub")?.url ?? "https://github.com/criptichood";
  const repos = dictionary.repos;
  return (
    <section id="github" className="py-20 md:py-32">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <GithubIcon className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground mt-4">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {repos.map((repo: any) => (
            <Card key={repo.name} className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GithubIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="font-headline">{repo.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">{repo.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {repo.topics?.map((topic: string) => (
                    <Badge key={topic} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4 mr-2" />
                    Repository
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-5 w-5 mr-2" />
              {dictionary.viewProfile}
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}