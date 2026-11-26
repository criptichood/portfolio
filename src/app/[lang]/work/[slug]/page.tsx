import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getDictionary } from "@/lib/dictionaries";
import { OG_IMAGE, localeUrl } from "@/lib/site";
import type { Dictionary } from "@/types/dictionary";

type CaseStudyKey = keyof Dictionary["caseStudies"];

export function generateStaticParams() {
  return [
    { lang: "en", slug: "ai-construction-takeoff" },
    { lang: "ha", slug: "ai-construction-takeoff" },
    { lang: "fr", slug: "ai-construction-takeoff" },
    { lang: "es", slug: "ai-construction-takeoff" },
    { lang: "zh", slug: "ai-construction-takeoff" },
    { lang: "ar", slug: "ai-construction-takeoff" },
  ];
}

export async function generateMetadata(props: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const dictionary = await getDictionary(lang);
  const caseStudy = dictionary.caseStudies?.[slug as CaseStudyKey];
  const title = caseStudy?.title ?? "Work";
  const description = caseStudy?.summary ?? dictionary.metadata.description;
  const canonical = localeUrl(lang, `/work/${slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function CaseStudyPage(props: { params: Promise<{ lang: string, slug: string }> }) {
  const params = await props.params;
  const { lang, slug } = params;
  const dictionary = await getDictionary(lang);

  const project = dictionary.work.projectsData.find((p) => p.id === slug);
  const caseStudy = dictionary.caseStudies?.[slug as CaseStudyKey];

  if (!project || !caseStudy) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-32 text-center">
        <h1 className="text-3xl font-bold font-headline mb-4">Case study not found</h1>
        <Button asChild variant="outline">
          <Link href={`/${lang}#work`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {dictionary.caseStudies?.[Object.keys(dictionary.caseStudies)[0] as CaseStudyKey]?.backToWork ?? "Back to Work"}
          </Link>
        </Button>
      </main>
    );
  }

  const sections = Object.values(caseStudy.sections);

  return (
    <main className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-6">
            <Link href={`/${lang}#work`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {caseStudy.backToWork}
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{caseStudy.title}</h1>
          {project.role && (
            <p className="text-xl font-medium text-primary font-headline mb-4">{project.role}</p>
          )}
          <p className="text-lg text-muted-foreground mb-6">{caseStudy.summary}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.capabilities?.map((cap: string) => (
              <Badge key={cap} variant="secondary">{cap}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-8">
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-4 w-4 mr-2" /> GitHub
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <Card key={section.title} className="p-6">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-base text-muted-foreground">
                {section.body}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}