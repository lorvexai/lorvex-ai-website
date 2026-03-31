"use client";

import Link from "next/link";
import { useState } from "react";
import Section from "@/components/Section";
import MermaidRenderer from "@/components/MermaidRenderer";

const products = [
  {
    key: "ai-compliance-copilot",
    name: "Regulatory Intelligence Platform",
    summary:
      "Regulatory knowledge engine for PRA/Basel obligations, controls, evidence, and audit outputs."
  },
  {
    key: "nhs-flow-optimizer",
    name: "NHS Flow Optimizer",
    summary:
      "Referral triage, discharge intelligence, and operational throughput optimization for NHS teams."
  },
  {
    key: "treasury-sentinel",
    name: "Treasury Sentinel",
    summary:
      "Liquidity and cashflow early-warning intelligence for finance and banking operations."
  }
] as const;

type ProductKey = (typeof products)[number]["key"];
type RipView = "overview" | "architecture" | "data-flow" | "usage";

export default function ProductsPage() {
  const [selected, setSelected] = useState<ProductKey>("ai-compliance-copilot");
  const [ripView, setRipView] = useState<RipView>("overview");

  return (
    <>
      <MermaidRenderer />
      <section className="section pb-10 pt-14 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass rounded-3xl border border-primary/20 p-7 md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-secondary/70">
              Product Portfolio
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
              Products By Lorvex AI
            </h1>
            <p className="mt-5 max-w-3xl text-secondary/80">
              We combine advisory depth with production software so clients can move
              from strategy to measurable outcomes in regulated environments.
            </p>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Products"
        title="Choose a product"
        description="Select a product card to explore architecture, data flow, and real-world usage patterns."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => {
            const isActive = selected === product.key;
            return (
              <button
                key={product.key}
                type="button"
                onClick={() => setSelected(product.key)}
                className={`rounded-2xl border p-6 text-left transition ${
                  isActive
                    ? "border-primary/60 bg-primary/15 shadow-glow"
                    : "border-secondary/20 bg-background/30 hover:border-primary/45"
                }`}
              >
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <p className="mt-3 text-sm text-secondary/80">{product.summary}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.22em] text-primary">
                  {isActive ? "Selected" : "Open Product"}
                </p>
              </button>
            );
          })}
        </div>
      </Section>

      {selected === "ai-compliance-copilot" && (
        <Section
          eyebrow="Regulatory Intelligence Platform"
          title="From regulation text to auditable action"
          description="Detailed product view with architecture, data flow, and partner onboarding path."
        >
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-secondary/25 bg-background/35 p-6">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "overview", label: "Overview" },
                  { key: "architecture", label: "Architecture" },
                  { key: "data-flow", label: "Data Flow" },
                  { key: "usage", label: "Usage" }
                ].map((tab) => {
                  const isActive = ripView === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setRipView(tab.key as RipView)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        isActive
                          ? "border-primary/60 bg-primary/20 text-white"
                          : "border-primary/30 bg-primary/5 text-secondary hover:border-primary/45"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className={`mt-6 space-y-4 text-secondary/85 ${ripView === "overview" ? "block" : "hidden"}`}>
                <p>
                  Regulatory Intelligence Platform converts complex regulatory language into
                  structured obligations, control mappings, and evidence requirements.
                  This removes the manual burden of interpreting long policy documents
                  while preserving legal traceability.
                </p>
                <p>
                  The product uses a core-plus-pack model: a reusable compliance core for
                  controls, evidence, ownership, and testing, and jurisdiction packs for
                  PRA Basel 3.1 and future rulebooks. This design allows organizations to
                  scale across legal entities without rebuilding their operating model.
                </p>
                <p>
                  A retrieval layer grounds answers in approved documents and evidence
                  records, with every response tied to sources. Risk and compliance teams
                  can trust outputs in governance meetings because recommendations remain
                  explainable and auditable.
                </p>
                <p>
                  The workflow layer connects obligations to owners, due dates,
                  exceptions, and remediation tasks. Instead of static checklists, teams
                  get a continuous compliance system that flags drift early and supports
                  faster audit preparation.
                </p>
                <p>
                  Delivery starts small and scales safely: begin with one framework and
                  one business unit, prove impact within weeks, and expand to additional
                  packs such as EBA, Fed, or HKMA.
                </p>
              </div>

              <div className={`prose prose-invert mt-8 max-w-none ${ripView === "architecture" ? "block" : "hidden"}`}>
                <div className="rounded-xl border border-secondary/20 bg-background/40 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-secondary/70">
                    Architecture Diagram
                  </p>
                  <pre>
                    <code className="language-mermaid">{`flowchart LR
  A["PRA Basel 3.1 Rule Pack"] --> B["Clause + Obligation Parser"]
  B --> C["Control & Evidence Graph"]
  C --> D["Hybrid Retrieval Layer"]
  D --> E["Gemini Reasoning"]
  E --> F["Audit Pack + Action Tasks"]
  C --> G["Ownership + Workflow Engine"]
  G --> F`}</code>
                  </pre>
                </div>
              </div>

              <div className={`prose prose-invert mt-8 max-w-none ${ripView === "data-flow" ? "block" : "hidden"}`}>
                <div className="rounded-xl border border-secondary/20 bg-background/40 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-secondary/70">
                    Data Flow Diagram
                  </p>
                  <pre>
                    <code className="language-mermaid">{`flowchart TB
  I["Regulations + Internal Policies + Logs"] --> J["Ingestion + Chunking"]
  J --> K["Obligation Mapping"]
  K --> L["Control Assignment"]
  L --> M["Evidence Validation"]
  M --> N["Risk Scoring"]
  N --> O["Recommendations + Exceptions"]
  O --> P["Board / Audit Reporting"]`}</code>
                  </pre>
                </div>
              </div>

              <div className={`prose prose-invert mt-8 max-w-none ${ripView === "usage" ? "block" : "hidden"}`}>
                <div className="rounded-xl border border-secondary/20 bg-background/40 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-secondary/70">
                    Usage Flow Diagram
                  </p>
                  <pre>
                    <code className="language-mermaid">{`sequenceDiagram
  participant R as Risk Analyst
  participant P as Platform Engine
  participant KG as Control Graph
  participant EV as Evidence Store
  participant WF as Workflow
  R->>P: Ask Basel compliance question
  P->>KG: Retrieve mapped obligations
  P->>EV: Retrieve latest evidence
  P-->>R: Grounded answer + citations
  R->>WF: Open remediation task
  WF-->>R: Track closure + audit log`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-primary/35 bg-gradient-to-br from-[#13294B] to-[#1D4C8F] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-secondary/75">
                Partner With Lorvex AI
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Get Started In 4 Weeks
              </h3>
              <p className="mt-4 text-sm text-secondary/85">
                We run a blueprint sprint focused on your highest-risk compliance
                workflows and deliver a pilot-ready implementation plan.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-secondary/85">
                <li>- Use-case prioritization with measurable outcomes</li>
                <li>- Architecture and data connector blueprint</li>
                <li>- Governance and evidence model design</li>
                <li>- Pilot scope, timeline, and delivery plan</li>
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="btn-primary w-full text-sm">
                  Book Discovery Sprint
                </Link>
              </div>
            </aside>
          </div>
        </Section>
      )}

      {selected !== "ai-compliance-copilot" && (
        <Section
          eyebrow="Product Details"
          title={
            selected === "nhs-flow-optimizer"
              ? "NHS Flow Optimizer"
              : "Treasury Sentinel"
          }
          description="Detailed section for this product is available next."
        >
          <div className="rounded-2xl border border-secondary/25 bg-background/30 p-6 text-secondary/85">
            {selected === "nhs-flow-optimizer"
              ? "NHS Flow Optimizer page will include referral-to-discharge workflows, operational architecture, and hospital command-center visuals."
              : "Treasury Sentinel page will include liquidity intelligence architecture, scenario data flow, and treasury decision workflow visuals."}
          </div>
        </Section>
      )}
    </>
  );
}
