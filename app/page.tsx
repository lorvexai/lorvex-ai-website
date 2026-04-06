import Link from "next/link";
import { getAllPosts } from "@/utils/posts";
import {
  ArrowRight,
  ShieldCheck,
  Workflow,
  Database,
  Cpu,
  Landmark,
  HeartPulse,
  Building2,
  Factory
} from "lucide-react";
import LiveAgentTrace from "@/components/LiveAgentTrace";
import FeaturedInsights from "@/components/FeaturedInsights";

export default function HomePage() {
  const hiddenHomePostTitles = new Set([
    "From Waiting Lists to Smart Pathways",
    "NHS AI Triage Without Harm",
    "AI-Native Treasury Control Tower",
    "AI in Financial Risk Management",
    "AI Agents in Banking Operations"
  ]);

  const posts = getAllPosts().filter((post) => !hiddenHomePostTitles.has(post.title));

  const sectors = [
    { icon: Landmark, label: "Finance" },
    { icon: HeartPulse, label: "Healthcare" },
    { icon: Building2, label: "NHS" },
    { icon: Factory, label: "Enterprise Platforms" }
  ];

  return (
    <>
      <section className="border-b border-secondary/10 bg-background/75 py-2.5">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary/65">
              Who We Help
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((area) => (
                <span
                  key={area.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-secondary"
                >
                  <area.icon size={12} className="text-primary" aria-hidden="true" />
                  {area.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section pb-10 pt-14 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass grid gap-8 rounded-3xl border border-primary/30 p-7 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                LorvexAI Control Plane
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
                Operationalizing Agentic AI for Enterprise Scale.
              </h1>
              <p className="mt-5 max-w-2xl text-secondary/85">
                We engineer agentic AI systems, enterprise RAG governance layers, and
                LLM engineering platforms for banking, healthcare, and NHS operations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary min-h-11 text-sm">
                  Request an Agentic Audit
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/products" className="btn-outline min-h-11 text-sm">
                  Explore Products
                </Link>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Workflow, label: "Agentic AI Systems" },
                  { icon: Database, label: "Enterprise RAG Governance" },
                  { icon: Cpu, label: "LLM Engineering for Banking" },
                  { icon: ShieldCheck, label: "NHS AI Triage Blueprint" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex min-h-11 items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-secondary"
                  >
                    <item.icon size={16} className="text-primary" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <LiveAgentTrace />
          </div>
        </div>
      </section>

      <FeaturedInsights posts={posts} />
    </>
  );
}
