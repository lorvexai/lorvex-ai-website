import { notFound } from "next/navigation";
import { getAllPosts, getPostContent } from "@/utils/posts";
import MermaidRenderer from "@/components/MermaidRenderer";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params
}: {
  params: { slug: string };
}) {
  const post = getAllPosts().find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const html = await getPostContent(params.slug);

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
      </div>
    </section>
  );
}
