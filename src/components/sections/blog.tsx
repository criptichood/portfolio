import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BLOG_POSTS_DATA } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32 bg-secondary">
      <FadeIn className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Blog & Resources</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Insights on AI, digital transformation, blockchain, and business technology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS_DATA.map((post) => {
                const postImage = PlaceHolderImages.find(img => img.id === post.image);
                return (
                    <Card key={post.title} className="overflow-hidden flex flex-col">
                        {postImage && (
                            <div className="aspect-video relative overflow-hidden">
                                <Image
                                src={postImage.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                data-ai-hint={postImage.imageHint}
                                />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="font-headline">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{post.excerpt}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant="link" asChild className="p-0">
                                <Link href="#">Read More</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
      </FadeIn>
    </section>
  );
}
