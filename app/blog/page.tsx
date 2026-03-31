import Section from "@/components/Section";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, type PostMeta } from "@/utils/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

  const rows = [
    ["ai-native-treasury-control-tower"],
    ["enterprise-rag-architectures", "the-rise-of-agentic-ai"],
    ["ai-in-financial-risk-management"],
    ["nhs-waiting-lists-to-smart-pathways", "nhs-ai-triage-without-harm"]
  ]
    .map((slugs) =>
      slugs
        .map((slug) => postsBySlug.get(slug))
        .filter((post): post is PostMeta => Boolean(post))
    )
    .filter((row) => row.length > 0);

  return (
    <Section
      eyebrow="Blog"
      title="Technical insights and AI strategy"
      description="Practical guidance on agentic AI, LLM engineering, and enterprise governance."
    >
      <div className="space-y-6">
        {rows.map((row, index) => (
          <div
            key={index}
            className={
              row.length === 1
                ? "mx-auto grid max-w-2xl gap-6"
                : "mx-auto grid max-w-5xl gap-6 md:grid-cols-2"
            }
          >
            {row.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
