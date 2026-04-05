import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import CTA from "@/components/CTA";
import BlogCard from "@/components/BlogCard";
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
  Factory,
  CheckCircle2
} from "lucide-react";
import LiveAgentTrace from "@/components/LiveAgentTrace";
import TechnicalInsightsHeader from "@/components/TechnicalInsightsHeader";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const sectors = [
    { icon: Landmark, label: "Finance" },
    { icon: HeartPulse, label: "Healthcare" },
    { icon: Building2, label: "NHS" },
    { icon: Factory, label: "Enterprise Platforms" }
  ];
  const outcomes = [
    {
      stat: "6-10 Weeks",
      label: "Blueprint to first production pilot",
      note: "Scoped for one business unit with clear governance gates."
    },
    {
      stat: "Governance-First",
      label: "Risk and audit controls built in",
      note: "Evidence trails, policy checks, and explainability included."
    },
    {
      stat: "Domain-Tuned",
      label: "Finance, healthcare, and NHS-ready patterns",
      note: "Pre-structured delivery models for regulated environments."
    }
  ];
  const journey = [
    "Discovery and use-case prioritization tied to measurable outcomes",
    "Reference architecture with data, model, and governance layers",
    "Pilot launch with observability, evaluation, and operating controls",
    "Scale plan across business units with risk and compliance alignment"
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

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Services"
            description="AI strategy, LLM engineering, and governance implementation."
            bullets={[
              "Agentic operating model",
              "Enterprise RAG controls",
              "Execution roadmap by business unit"
            ]}
          />
          <ServiceCard
            title="Products"
            description="Regulatory Intelligence Platform, NHS Flow Optimizer, and Treasury Sentinel."
            bullets={[
              "Production-ready architecture",
              "Integrated data connectors",
              "Audit-ready outputs"
            ]}
          />
          <ServiceCard
            title="Capabilities"
            description="Capability map for planning, deployment, and governed AI scaling."
            bullets={[
              "Planner -> Tool -> Verifier patterns",
              "Evaluation harnesses",
              "Risk and monitoring controls"
            ]}
          />
        </div>
        <div className="mt-6">
          <Link href="/services" className="btn-outline min-h-11 text-sm">
            Explore Solutions Architecture
          </Link>
        </div>
        </div>
      </section>

      <section className="section pt-6">
        <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {outcomes.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#0C1D3B] via-[#143462] to-[#1D4C8F] p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/90">
                {item.stat}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.label}</h3>
              <p className="mt-3 text-sm text-secondary/85">{item.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-secondary/20 bg-background/35 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary/70">
            Delivery Journey
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {journey.map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
              >
                <CheckCircle2 size={18} className="mt-0.5 text-primary" aria-hidden="true" />
                <p className="text-sm text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
        <TechnicalInsightsHeader
          eyebrow="Technical Guides"
          title="From architecture patterns to implementation runbooks"
          description="Each insight maps business problems to production system design, with explicit governance controls and conversion-focused next actions."
          takeaways={[
            "Agentic AI Systems: planner-tool-verifier orchestration patterns",
            "LLM Engineering for Banking: grounded retrieval with compliance checks",
            "NHS AI Triage Blueprint: safety-first escalation and evidence loops"
          ]}
          ctaLabel="Browse Technical Insights"
          ctaHref="/blog"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </div>
        </div>
      </section>

      <Section title="Ready to operationalize enterprise AI?" description="">
        <CTA />
      </Section>
    </>
  );
}

