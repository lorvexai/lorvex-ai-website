import Link from "next/link";
import { getAllPosts } from "@/utils/posts";
import RegulatoryMockup from "@/components/mockups/RegulatoryMockup";
import NHSFlowMockup from "@/components/mockups/NHSFlowMockup";
import TreasurySentinelMockup from "@/components/mockups/TreasurySentinelMockup";
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
  Lock,
  Clock,
  Zap,
  TrendingUp,
  ChevronRight,
  BarChart3,
  CheckCircle2
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
    { icon: Landmark,   label: "Finance"             },
    { icon: HeartPulse, label: "Healthcare"           },
    { icon: Building2,  label: "NHS"                  },
    { icon: Factory,    label: "Enterprise Platforms" }
  ];

  const differentiators = [
    {
      icon: ShieldCheck,
      title: "Governance-First by Design",
      body: "Every system we build includes audit trails, explainability hooks, and control boundaries aligned to FCA, NHS Digital, and ISO 42001 standards.",
      accent: "Finance & NHS compliance built in"
    },
    {
      icon: Zap,
      title: "Agentic, Not Just Automated",
      body: "Our systems reason, plan, and self-correct across multi-step workflows — moving beyond rule-based RPA into genuinely autonomous AI operations.",
      accent: "Multi-step agent orchestration"
    },
    {
      icon: TrendingUp,
      title: "Speed to Production",
      body: "We run structured discovery sprints and deliver working production pilots in under 12 weeks, with clear SLAs and measurable business outcomes.",
      accent: "< 12 weeks to working pilot"
    }
  ];

  const stats = [
    { value: "3",    label: "AI Products in Market",         icon: BarChart3    },
    { value: "4",    label: "Regulated Sectors Served",      icon: ShieldCheck  },
    { value: "100%", label: "Governance-First Architecture", icon: Lock         },
    { value: "4wk",  label: "Blueprint Sprint to Pilot",     icon: Clock        }
  ];

  const caseStudies = [
    {
      sector: "Tier 1 UK Bank",
      icon: Landmark,
      color: "border-blue-400/25",
      iconColor: "text-blue-300",
      outcome: "60% reduction in model validation cycle time",
      detail: "Deployed an agentic AI layer over existing risk models, automating evidence collection, challenger model testing, and PRA-aligned documentation — cutting quarterly validation from 6 weeks to under 2.",
      tags: ["Model Risk", "PRA Compliance", "Agentic AI"]
    },
    {
      sector: "NHS Trust",
      icon: HeartPulse,
      color: "border-emerald-400/25",
      iconColor: "text-emerald-300",
      outcome: "34% improvement in referral triage accuracy",
      detail: "Implemented our NHS Flow Optimizer to intelligently route incoming referrals against capacity and clinical urgency signals — reducing waiting-list growth and improving pathway efficiency.",
      tags: ["NHS Flow", "Clinical Safety", "RAG Pipeline"]
    },
    {
      sector: "Global Asset Manager",
      icon: Building2,
      color: "border-violet-400/25",
      iconColor: "text-violet-300",
      outcome: "8-week delivery from brief to production pilot",
      detail: "Built a Treasury Sentinel liquidity early-warning system integrated with existing data warehouse — live cashflow anomaly detection and ALCO-ready reporting from sprint to production.",
      tags: ["Treasury AI", "Liquidity Risk", "4-week Sprint"]
    }
  ];

  const trustCards = [
    {
      sector: "Financial Services",
      icon: Landmark,
      color: "border-blue-400/25 bg-blue-400/5",
      iconColor: "text-blue-300",
      quote: "We bring banking-grade control to AI deployment — PRA compliance, model risk governance, and full auditability built in from day one.",
      highlights: ["Basel 3.1 / PRA alignment", "Model risk framework", "ALCO-ready reporting"]
    },
    {
      sector: "NHS & Healthcare",
      icon: HeartPulse,
      color: "border-emerald-400/25 bg-emerald-400/5",
      iconColor: "text-emerald-300",
      quote: "Our NHS systems are designed around clinical safety, IG Toolkit compliance, and real throughput gains — not demo-ware.",
      highlights: ["IG Toolkit & NHS Digital aligned", "Clinical safety by design", "Referral-to-discharge intelligence"]
    },
    {
      sector: "Enterprise Operations",
      icon: Building2,
      color: "border-violet-400/25 bg-violet-400/5",
      iconColor: "text-violet-300",
      quote: "We architect enterprise AI platforms that scale from a single team to organisation-wide deployment without rebuilding the foundation.",
      highlights: ["Multi-system integration", "Role-based governance", "Scalable agentic architecture"]
    }
  ];

  return (
    <>
      {/* Sector strip */}
      <section className="border-b border-secondary/10 bg-background/75 py-2.5">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary/55">
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

      {/* Hero */}
      <section className="section pb-4 pt-14 md:pb-6 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass grid gap-8 rounded-3xl border border-primary/30 p-7 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                LorvexAI Control Plane
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
                Operationalizing{" "}
                <span className="text-gradient">Agentic AI</span>
                {" "}for Enterprise Scale.
              </h1>
              <p className="mt-5 max-w-2xl text-secondary/80">
                We engineer agentic AI systems, enterprise RAG governance layers, and
                LLM engineering platforms for banking, healthcare, and NHS operations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/products" className="btn-primary min-h-11 text-sm">
                  See Our Products
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn-outline min-h-11 text-sm">
                  Book a Pilot
                </Link>
              </div>
              <p className="mt-3 text-xs text-secondary/40">4-week pilot · Enterprise pricing · No lock-in</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Workflow,     label: "Agentic AI Systems"         },
                  { icon: Database,    label: "Enterprise RAG Governance"   },
                  { icon: Cpu,         label: "LLM Engineering for Banking" },
                  { icon: ShieldCheck, label: "NHS AI Triage Blueprint"     }
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

      {/* Compliance badge strip */}
      <section className="border-b border-secondary/10 bg-background/60 py-4">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary/45">Built to comply with</p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              {[
                { label: "SOC 2 Type II",     color: "text-blue-300   border-blue-400/30   bg-blue-400/8"    },
                { label: "GDPR Aligned",       color: "text-violet-300 border-violet-400/30 bg-violet-400/8"  },
                { label: "ISO 42001 AI",       color: "text-primary    border-primary/30    bg-primary/8"     },
                { label: "NHS IG Toolkit",     color: "text-emerald-300 border-emerald-400/30 bg-emerald-400/8" },
                { label: "PRA / Basel 3.1",    color: "text-orange-300 border-orange-400/30 bg-orange-400/8"  },
                { label: "FCA Aligned",        color: "text-blue-300   border-blue-400/30   bg-blue-400/8"    },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${badge.color}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-secondary/10 bg-background/50 py-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <stat.icon size={20} className="mb-2 text-primary" aria-hidden="true" />
                <p className="stat-glow text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                <p className="mt-1.5 max-w-[120px] text-xs leading-snug text-secondary/65">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo / trust strip */}
      <section className="border-b border-secondary/10 py-8">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[0.28em] text-secondary/40">
            Expertise built across leading institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              "HSBC",
              "JPMorgan Chase",
              "Deutsche Bank",
              "Lehman Brothers",
              "Bank of England",
              "NHS England",
            ].map((name) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-wide text-secondary/30 transition hover:text-secondary/55"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why LorvexAI */}
      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-primary">
              Why LorvexAI
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              <span className="text-white">Built for </span>
              <span className="text-gradient">Regulated Enterprise</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-secondary/70">
              We don&apos;t just prototype — we architect, govern, and deliver
              production-grade AI in environments where failure has real consequences.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="glass card-hover rounded-2xl border border-primary/20 p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 bg-primary/15">
                  <item.icon size={20} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary/70">{item.body}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <ChevronRight size={12} aria-hidden="true" />
                  {item.accent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product feature rows */}
      <section className="section border-y border-secondary/10 bg-background/40 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">Our Products</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              <span className="text-white">Three products. </span>
              <span className="text-gradient">Production-ready.</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-secondary/70">
              Each product ships with a governance layer, audit trail, and enterprise integration — not a prototype.
            </p>
          </div>

          <div className="space-y-16">
            {/* Product 1 */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-300">Finance &amp; Banking</span>
                <h3 className="mt-4 text-2xl font-semibold text-white">Regulatory Intelligence Platform</h3>
                <p className="mt-3 text-secondary/75">Transforms PRA, Basel, and FCA regulatory text into structured obligations, mapped controls, and audit-ready evidence — in minutes, not weeks.</p>
                <ul className="mt-5 space-y-2.5">
                  {["Obligation extraction from 100+ regulatory sources", "Automated control mapping and gap analysis", "PRA/FCA audit evidence packages on demand", "Model risk governance workflow built-in"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-secondary/70">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary/70" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <Link href="/contact" className="btn-primary text-sm">Book a Pilot</Link>
                  <Link href="/products" className="btn-outline text-sm">See Details</Link>
                </div>
              </div>
              <RegulatoryMockup />
            </div>

            {/* Product 2 */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="md:order-first"><NHSFlowMockup /></div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300">NHS &amp; Healthcare</span>
                <h3 className="mt-4 text-2xl font-semibold text-white">NHS Flow Optimizer</h3>
                <p className="mt-3 text-secondary/75">Intelligent referral triage, discharge pathway optimisation, and waiting-list intelligence for NHS trusts — designed around clinical safety and IG Toolkit compliance.</p>
                <ul className="mt-5 space-y-2.5">
                  {["AI-powered referral triage in under 5 seconds", "Discharge bottleneck detection and escalation", "Waiting-list demand forecasting", "Full DCB0129 clinical safety documentation"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-secondary/70">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400/70" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <Link href="/contact" className="btn-primary text-sm">Book a Pilot</Link>
                  <Link href="/products" className="btn-outline text-sm">See Details</Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300">Treasury &amp; Finance</span>
                <h3 className="mt-4 text-2xl font-semibold text-white">Treasury Sentinel</h3>
                <p className="mt-3 text-secondary/75">Real-time liquidity and cashflow early-warning intelligence — surfacing anomalies, stress signals, and ALCO-ready reports before they become problems.</p>
                <ul className="mt-5 space-y-2.5">
                  {["Real-time cashflow anomaly detection", "LCR/NSFR stress scenario modelling", "ALCO-ready reporting packs on demand", "Integrates with existing treasury systems in days"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-secondary/70">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-orange-400/70" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-3">
                  <Link href="/contact" className="btn-primary text-sm">Book a Pilot</Link>
                  <Link href="/products" className="btn-outline text-sm">See Details</Link>
                </div>
              </div>
              <TreasurySentinelMockup />
            </div>
          </div>

          {/* Pricing anchor */}
          <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Pilot Pricing</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Start with a focused 4-week pilot</h3>
            <p className="mt-2 text-sm text-secondary/70">Deploy one product in one team. Measure the impact. Scale what works. No long-term commitment required.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary text-sm">Request Pilot Pricing</Link>
              <Link href="/services" className="btn-outline text-sm">View Full Services</Link>
            </div>
            <p className="mt-3 text-xs text-secondary/35">Enterprise licensing available · On-prem deployment supported · SOC 2 aligned</p>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">Client Outcomes</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              <span className="text-white">Real outcomes from </span>
              <span className="text-gradient">production deployments</span>
            </h2>
            <p className="mt-4 max-w-2xl text-secondary/70">
              Anonymised case studies from live enterprise AI engagements across banking, NHS, and asset management.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <div key={cs.sector} className={`glass card-hover rounded-2xl border p-6 ${cs.color}`}>
                <div className="mb-4 flex items-center gap-3">
                  <cs.icon size={18} className={cs.iconColor} aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary/60">{cs.sector}</span>
                </div>
                <p className="stat-glow text-lg font-bold leading-snug text-white">{cs.outcome}</p>
                <p className="mt-3 text-sm leading-relaxed text-secondary/70">{cs.detail}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-secondary/20 bg-background/40 px-2.5 py-1 text-[10px] font-medium text-secondary/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / trust by sector */}
      <section className="section py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-secondary/50">
              Trusted by teams across
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Regulated industries that can&apos;t afford to get AI wrong
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {trustCards.map((card) => (
              <div key={card.sector} className={`card-hover rounded-2xl border p-6 ${card.color}`}>
                <div className="mb-4 flex items-center gap-3">
                  <card.icon size={20} className={card.iconColor} aria-hidden="true" />
                  <h3 className="font-semibold text-white">{card.sector}</h3>
                </div>
                <p className="text-sm italic leading-relaxed text-secondary/70">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <ul className="mt-4 space-y-1.5">
                  {card.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-secondary/60">
                      <CheckCircle2 size={11} className="shrink-0 text-primary/60" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "No generic AI — every system is sector-specific",
              "Governance built in, not bolted on after",
              "Production delivery with measurable SLAs",
              "From sprint to scale without re-architecture"
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-xl border border-secondary/15 bg-background/30 px-4 py-3">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary/70" aria-hidden="true" />
                <p className="text-xs leading-snug text-secondary/65">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedInsights posts={posts} />
    </>
  );
}
