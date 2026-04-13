"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import type { PostMeta } from "@/utils/posts";
import { Search } from "lucide-react";

const TOPICS = ["All", "Technology", "Finance", "Healthcare", "NHS", "Enterprise"] as const;
type Topic = (typeof TOPICS)[number];

const topicBySlug: Record<string, Exclude<Topic, "All">> = {
  "ai-agents-in-banking-operations":          "Finance",
  "ai-native-treasury-control-tower":         "Finance",
  "ai-in-financial-risk-management":          "Finance",
  "nhs-ai-triage-without-harm":               "NHS",
  "nhs-waiting-lists-to-smart-pathways":      "NHS",
  "enterprise-rag-architectures":             "Technology",
  "end-to-end-ai-risk-platform-architecture": "Technology",
  "the-rise-of-agentic-ai":                   "Technology",
  "agentic-ai-design-patterns":               "Technology",
  "ai-workflows-for-regulated-enterprises":   "Enterprise",
  "production-rag-beyond-the-basics":         "Technology",
  "llm-evaluation-in-production":             "Enterprise",
  "guardrails-for-enterprise-ai":             "Enterprise",
  "fine-tuning-vs-rag-vs-prompting":          "Technology",
  "enterprise-llm-chat-interfaces":           "Enterprise",
  "ai-prompt-and-workflow-templates":         "Enterprise"
};

const topicAccent: Record<Exclude<Topic, "All">, string> = {
  Technology:   "border-blue-400/30 text-blue-300",
  Finance:      "border-orange-400/30 text-orange-300",
  Healthcare:   "border-emerald-400/30 text-emerald-300",
  NHS:          "border-emerald-400/30 text-emerald-300",
  Enterprise:   "border-violet-400/30 text-violet-300"
};

function getTopic(post: PostMeta): Exclude<Topic, "All"> {
  return topicBySlug[post.slug] ?? "Technology";
}

function toTime(dateLabel: string) {
  const ts = Date.parse(dateLabel);
  return Number.isNaN(ts) ? 0 : ts;
}

export default function BlogTopicView({ posts }: { posts: PostMeta[] }) {
  const [activeTopic, setActiveTopic] = useState<Topic>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const grouped = useMemo(() => {
    const groups: Record<Exclude<Topic, "All">, PostMeta[]> = {
      Technology: [],
      Finance: [],
      Healthcare: [],
      NHS: [],
      Enterprise: []
    };
    posts.forEach((post) => {
      groups[getTopic(post)].push(post);
    });
    (Object.keys(groups) as Array<Exclude<Topic, "All">>).forEach((topic) => {
      groups[topic].sort((a, b) => toTime(b.date) - toTime(a.date));
    });
    return groups;
  }, [posts]);

  const counts = useMemo(
    () => ({
      All:        posts.length,
      Technology: grouped.Technology.length,
      Finance:    grouped.Finance.length,
      Healthcare: grouped.Healthcare.length,
      NHS:        grouped.NHS.length,
      Enterprise: grouped.Enterprise.length
    }),
    [grouped, posts.length]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title, topic, or keyword…"
          className="w-full rounded-xl border border-secondary/20 bg-background/60 pl-10 pr-4 py-3 text-sm text-white placeholder-secondary/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Search results */}
      {searchResults !== null ? (
        <div>
          <p className="mb-5 text-sm text-secondary/55">
            {searchResults.length === 0
              ? `No results for "${searchQuery}"`
              : `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${searchQuery}"`}
          </p>
          {searchResults.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {searchResults.map((post) => (
                <BlogCard key={post.slug} slug={post.slug} title={post.title} excerpt={post.excerpt} tags={post.tags} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const active = activeTopic === topic;
          const count = counts[topic];
          if (count === 0 && topic !== "All") return null;
          return (
            <button
              key={topic}
              type="button"
              onClick={() => setActiveTopic(topic)}
              className={
                active
                  ? "min-h-10 rounded-full border border-primary/60 bg-primary/25 px-4 py-2 text-sm font-semibold text-white shadow-glow"
                  : "min-h-10 rounded-full border border-secondary/25 bg-background/30 px-4 py-2 text-sm text-secondary/65 transition hover:border-primary/35 hover:text-secondary/90"
              }
            >
              {topic}
              <span className={`ml-1.5 font-mono text-xs ${active ? "text-white/70" : "text-secondary/40"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* All view — grouped by topic */}
      {activeTopic === "All" ? (
        <div className="space-y-10">
          {(Object.keys(grouped) as Array<Exclude<Topic, "All">>).map((topic) => {
            const topicPosts = grouped[topic];
            if (topicPosts.length === 0) return null;
            const accent = topicAccent[topic];
            return (
              <section key={topic}>
                <div className="mb-5 flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${accent} bg-background/40`}>
                    {topic}
                  </span>
                  <span className="text-xs text-secondary/45">
                    {topicPosts.length} article{topicPosts.length > 1 ? "s" : ""}
                  </span>
                  <div className="h-px flex-1 bg-secondary/10" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {topicPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      tags={post.tags}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {grouped[activeTopic as Exclude<Topic, "All">].map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          ))}
        </div>
      )}
        </>
      )}
    </div>
  );
}
