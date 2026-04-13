import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot, Workflow, Database, BarChart3, ShieldCheck,
  Sliders, MessageSquare, FileCode2, ArrowRight, CheckCircle2
} from "lucide-react";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "AI Platform Capabilities | LorvexAI",
  description: "The eight engineering disciplines behind every LorvexAI product — agents, workflows, RAG, evaluations, guardrails, tuning, chat, and templates.",
  alternates: { canonical: "/platform" },
  openGraph: {
    title: "AI Platform Capabilities | LorvexAI",
    description: "Eight production AI engineering disciplines for regulated enterprise — built for finance, banking, and NHS.",
    url: "/platform",
    type: "website"
  }
};

const capabilities = [
  {
    icon: Bot,
    key: "agents",
    slug: "agentic-ai-design-patterns",
    label: "Agents",
    headline: "Agentic AI that reasons, plans, and acts",
    description: "Multi-step AI agents that orchestrate complex workflows autonomously — with human-in-the-loop checkpoints, policy enforcement, and full audit trails for regulated environments.",
    bullets: [
      "ReAct, Plan-and-Execute, and Multi-Agent patterns",
      "Tool-augmented execution with scoped permissions",
      "Configurable HITL thresholds per risk level",
      "Immutable reasoning trace for audit"
    ],
    color: "border-primary/30 bg-primary/8",
    iconColor: "text-primary",
    accent: "text-primary",
    products: ["Regulatory Intelligence Platform", "NHS Flow Optimizer", "Treasury Sentinel"]
  },
  {
    icon: Workflow,
    key: "workflows",
    slug: "ai-workflows-for-regulated-enterprises",
    label: "Workflows",
    headline: "Multi-step AI workflows with governance built in",
    description: "Structured workflow orchestration that combines LLM reasoning, tool calls, conditional logic, and human checkpoints — designed for auditability, recoverability, and compliance.",
    bullets: [
      "Sequential, parallel, and event-driven patterns",
      "Decision gates with confidence thresholds",
      "Checkpoint-based recovery and retry logic",
      "Per-step audit logging"
    ],
    color: "border-violet-400/30 bg-violet-400/8",
    iconColor: "text-violet-300",
    accent: "text-violet-300",
    products: ["NHS Flow Optimizer", "Regulatory Intelligence Platform"]
  },
  {
    icon: Database,
    key: "rag",
    slug: "production-rag-beyond-the-basics",
    label: "RAG",
    headline: "Enterprise retrieval that cites every claim",
    description: "Production RAG beyond demos — hierarchical chunking, hybrid retrieval, domain-fine-tuned reranking, faithfulness scoring, and full citation chains for every answer.",
    bullets: [
      "Parent-child hierarchical chunking",
      "Hybrid vector + BM25 with RRF merging",
      "Cross-encoder reranker fine-tuned per domain",
      "Section-level citation for every output"
    ],
    color: "border-blue-400/30 bg-blue-400/8",
    iconColor: "text-blue-300",
    accent: "text-blue-300",
    products: ["Regulatory Intelligence Platform", "NHS Flow Optimizer"]
  },
  {
    icon: BarChart3,
    key: "evaluations",
    slug: "llm-evaluation-in-production",
    label: "Evaluations",
    headline: "Know exactly where your AI fails — before users do",
    description: "Comprehensive evaluation frameworks with golden datasets, LLM-as-judge scoring, regression testing in CI/CD, and production monitoring with automated alerting.",
    bullets: [
      "Correctness, faithfulness, relevance, safety metrics",
      "Automated regression blocking in CI/CD pipeline",
      "Production sampling with drift detection",
      "Domain-specific golden dataset curation"
    ],
    color: "border-emerald-400/30 bg-emerald-400/8",
    iconColor: "text-emerald-300",
    accent: "text-emerald-300",
    products: ["All LorvexAI Products"]
  },
  {
    icon: ShieldCheck,
    key: "guardrails",
    slug: "guardrails-for-enterprise-ai",
    label: "Guardrails",
    headline: "Input and output controls for regulated AI",
    description: "Multi-layer guardrails covering scope enforcement, PII detection, prompt injection prevention, hallucination checking, advice boundary enforcement, and confidentiality leakage detection.",
    bullets: [
      "Input: scope, PII masking, injection detection",
      "Output: faithfulness check, advice boundary, toxicity",
      "Four severity levels: block, escalate, redirect, flag",
      "FCA, PRA, NHS IG Toolkit, DCB0129 aligned"
    ],
    color: "border-red-400/30 bg-red-400/8",
    iconColor: "text-red-300",
    accent: "text-red-300",
    products: ["All LorvexAI Products"]
  },
  {
    icon: Sliders,
    key: "tuning",
    slug: "fine-tuning-vs-rag-vs-prompting",
    label: "Tuning",
    headline: "Right approach, right results — prompting, RAG, or fine-tuning",
    description: "A practical decision framework and implementation capability for choosing and combining prompt engineering, RAG, and fine-tuning to maximise quality and minimise cost.",
    bullets: [
      "Decision framework: when to use each approach",
      "Domain fine-tuning on regulatory and clinical corpora",
      "Hybrid stacks combining all three approaches",
      "Cost optimisation through intelligent model routing"
    ],
    color: "border-orange-400/30 bg-orange-400/8",
    iconColor: "text-orange-300",
    accent: "text-orange-300",
    products: ["Regulatory Intelligence Platform"]
  },
  {
    icon: MessageSquare,
    key: "chat",
    slug: "enterprise-llm-chat-interfaces",
    label: "LLM Chat",
    headline: "Enterprise chat with identity, audit, and governance",
    description: "Production-grade AI chat interfaces with SSO authentication, role-based access, multi-model routing, session audit logging, and domain-specific UI patterns for regulated industries.",
    bullets: [
      "SSO / OAuth with role-based knowledge scoping",
      "Multi-model routing by query type and cost",
      "Full session audit trail with 7-year retention",
      "On-premise deployment for NHS data compliance"
    ],
    color: "border-cyan-400/30 bg-cyan-400/8",
    iconColor: "text-cyan-300",
    accent: "text-cyan-300",
    products: ["All LorvexAI Products"]
  },
  {
    icon: FileCode2,
    key: "templates",
    slug: "ai-prompt-and-workflow-templates",
    label: "Templates",
    headline: "Production-tested prompt and workflow templates",
    description: "A library of version-controlled, evaluated prompt templates and workflow blueprints for compliance analysis, clinical summarisation, risk reporting, and agentic task orchestration.",
    bullets: [
      "Regulatory obligation extraction templates",
      "Clinical triage and discharge summary templates",
      "ALCO and treasury reporting templates",
      "Version-controlled with eval-gated deployment"
    ],
    color: "border-yellow-400/30 bg-yellow-400/8",
    iconColor: "text-yellow-300",
    accent: "text-yellow-300",
    products: ["Regulatory Intelligence Platform", "NHS Flow Optimizer", "Treasury Sentinel"]
  }
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pb-10 pt-14 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass rounded-3xl border border-primary/30 p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">Platform</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              <span className="text-white">Eight disciplines. </span>
              <span className="text-gradient">One production platform.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-secondary/80">
              Every LorvexAI product is built on the same engineering stack — eight tightly integrated AI capabilities, each production-grade, each designed for regulated enterprise environments.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <span
                  key={c.key}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${c.color} ${c.iconColor}`}
                >
                  <c.icon size={12} aria-hidden="true" />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capability grid */}
      <section className="section pt-4">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-secondary/50">Capabilities</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">What we build with</h2>
          <p className="mt-4 max-w-2xl text-secondary/70">
            Each capability is a standalone engineering discipline and a component of every LorvexAI product deployment.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {capabilities.map((cap) => (
              <article
                key={cap.key}
                className={`glass card-hover group relative overflow-hidden rounded-2xl border p-6 ${cap.color}`}
              >
                {/* Icon + label */}
                <div className="mb-4 flex items-center gap-3">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${cap.color} ${cap.iconColor}`}>
                    <cap.icon size={18} aria-hidden="true" />
                  </div>
                  <span className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${cap.accent}`}>
                    {cap.label}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{cap.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary/70">{cap.description}</p>

                <ul className="mt-4 space-y-2">
                  {cap.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-secondary/65">
                      <CheckCircle2 size={13} className={`mt-0.5 shrink-0 ${cap.iconColor} opacity-70`} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Products */}
                <div className="mt-5 border-t border-secondary/10 pt-4">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-secondary/35">Used in</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.products.map((p) => (
                      <span key={p} className="rounded-full border border-secondary/15 bg-background/30 px-2 py-0.5 text-[10px] text-secondary/50">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read article link */}
                <Link
                  href={`/blog/${cap.slug}`}
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${cap.accent} transition-all hover:gap-2.5`}
                >
                  Read deep-dive
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How they connect */}
      <section className="section border-y border-secondary/10 bg-background/40 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">Architecture</p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">How the platform fits together</h2>
            <p className="mt-4 mx-auto max-w-2xl text-secondary/70">
              The eight capabilities are not independent tools — they form an integrated stack where each layer depends on and enhances the others.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {[
              { layer: "User Interface", items: ["LLM Chat", "Templates"], color: "border-cyan-400/30 bg-cyan-400/8 text-cyan-300" },
              { layer: "Intelligence Layer", items: ["Agents", "Workflows", "RAG"], color: "border-primary/30 bg-primary/8 text-primary" },
              { layer: "Quality & Safety", items: ["Evaluations", "Guardrails", "Tuning"], color: "border-red-400/30 bg-red-400/8 text-red-300" },
              { layer: "Governance & Audit", items: ["Audit Log", "Policy Engine", "HITL Queue"], color: "border-violet-400/30 bg-violet-400/8 text-violet-300" },
            ].map((row, i) => (
              <div key={row.layer} className="mb-3">
                <div className={`rounded-2xl border p-4 ${row.color}`}>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">{row.layer}</p>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map((item) => (
                      <span key={item} className="rounded-lg border border-current/20 bg-background/40 px-3 py-1.5 text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {i < 3 && (
                  <div className="my-1 flex justify-center">
                    <div className="h-4 w-0.5 bg-secondary/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Link to products + CTA */}
      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">Products</p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">See the platform in action</h2>
            <p className="mt-4 mx-auto max-w-2xl text-secondary/70">
              All eight capabilities are deployed in each of our three products — purpose-built for finance, NHS, and enterprise.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: "Regulatory Intelligence Platform", sector: "Finance & Banking", href: "/products", color: "border-blue-400/25 bg-blue-400/5 text-blue-300", caps: ["RAG", "Agents", "Guardrails", "Evaluations"] },
              { name: "NHS Flow Optimizer",               sector: "NHS & Healthcare", href: "/products", color: "border-emerald-400/25 bg-emerald-400/5 text-emerald-300", caps: ["Workflows", "Agents", "Guardrails", "Templates"] },
              { name: "Treasury Sentinel",                sector: "Treasury & Finance", href: "/products", color: "border-orange-400/25 bg-orange-400/5 text-orange-300", caps: ["Agents", "RAG", "Evaluations", "Tuning"] },
            ].map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className={`card-hover glass group rounded-2xl border p-6 ${p.color}`}
              >
                <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${p.color.split(" ")[2]}`}>{p.sector}</p>
                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-gradient">{p.name}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.caps.map((c) => (
                    <span key={c} className="rounded-full border border-secondary/15 bg-background/30 px-2 py-0.5 text-[10px] text-secondary/55">{c}</span>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-1 text-xs text-secondary/50 transition group-hover:text-white">
                  Explore product <ArrowRight size={11} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto w-full max-w-6xl px-6">
          <CTA />
        </div>
      </section>
    </>
  );
}
