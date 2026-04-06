"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";

type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
};

const TOPIC_FILTERS = [
  "All",
  "Technology",
  "Finance",
  "Healthcare",
  "NHS",
  "Enterprise"
] as const;

type TopicFilter = (typeof TOPIC_FILTERS)[number];

function matchesTopic(post: InsightPost, topic: TopicFilter) {
  if (topic === "All") return true;

  const normalizedTitle = post.title.toLowerCase();
  const normalizedTags = post.tags.map((tag) => tag.toLowerCase());

  if (topic === "Technology") {
    return normalizedTags.some((tag) => ["rag", "architecture", "llm engineering", "ai architecture"].includes(tag));
  }
  if (topic === "Finance") {
    return (
      normalizedTitle.includes("risk") ||
      normalizedTitle.includes("treasury") ||
      normalizedTitle.includes("bank") ||
      normalizedTags.some((tag) => tag.includes("finance") || tag.includes("banking") || tag.includes("risk"))
    );
  }
  if (topic === "Healthcare") {
    return normalizedTitle.includes("healthcare") || normalizedTags.some((tag) => tag.includes("healthcare"));
  }
  if (topic === "NHS") {
    return normalizedTitle.includes("nhs") || normalizedTags.some((tag) => tag.includes("nhs"));
  }
  if (topic === "Enterprise") {
    return (
      normalizedTitle.includes("enterprise") ||
      normalizedTags.some((tag) => tag.includes("enterprise") || tag.includes("architecture"))
    );
  }

  return true;
}

export default function FeaturedInsights({ posts }: { posts: InsightPost[] }) {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => matchesTopic(post, activeTopic));
  }, [posts, activeTopic]);

  return (
    <section className="section">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-secondary/70">
          Featured Insights
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {TOPIC_FILTERS.map((topic) => {
            const isActive = topic === activeTopic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={
                  isActive
                    ? "min-h-11 rounded-full border border-primary/45 bg-primary/20 px-4 py-2 text-xs font-semibold text-white"
                    : "min-h-11 rounded-full border border-secondary/30 bg-background/40 px-4 py-2 text-xs text-secondary/85 hover:border-primary/35"
                }
              >
                {topic}
              </button>
            );
          })}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-secondary/20 bg-background/30 p-6 text-sm text-secondary/80">
            No insights in this topic yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredPosts.slice(0, 3).map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
