import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostContent } from "@/utils/posts";
import MermaidRenderer from "@/components/MermaidRenderer";
import BlogCard from "@/components/BlogCard";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lorvexai.github.io/lorvexai";
const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
const socialImageUrl = `${normalizedSiteUrl}/og-image.png`;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getAllPosts().find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article Not Found | LorvexAI"
    };
  }

  const canonicalPath = `/blog/${params.slug}`;
  const maybeDate = new Date(post.publishedAt);
  const publishedTime = Number.isNaN(maybeDate.getTime())
    ? undefined
    : maybeDate.toISOString();

  return {
    title: `${post.title} | LorvexAI`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalPath
    },
    authors: [{ name: "LorvexAI Editorial Team" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${normalizedSiteUrl}${canonicalPath}`,
      type: "article",
      publishedTime,
      authors: ["LorvexAI Editorial Team"],
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "LorvexAI"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [socialImageUrl]
    },
    other: publishedTime
      ? {
          "article:published_time": publishedTime
        }
      : undefined
  };
}

export default async function BlogPost({
  params
}: {
  params: { slug: string };
}) {
  const allPosts = getAllPosts();
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const html = await getPostContent(params.slug);

  const relatedWithScores = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTagCount = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      return { ...candidate, sharedTagCount };
    })
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) return b.sharedTagCount - a.sharedTagCount;
      return a.publishedAt < b.publishedAt ? 1 : -1;
    });

  const relatedPosts = relatedWithScores.slice(0, 3);

  return (
    <section className="section">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-secondary/70">
          Blog
        </p>
        <MermaidRenderer />
        <article
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t border-secondary/20 pt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-secondary/70">
              Related Insights
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard
                  key={related.slug}
                  slug={related.slug}
                  title={related.title}
                  excerpt={related.excerpt}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
