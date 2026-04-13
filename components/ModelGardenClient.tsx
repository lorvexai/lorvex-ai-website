"use client";

import { useState } from "react";
import { X, Check, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────── */
type Score = "Excellent" | "Good" | "Fair" | "Limited";
type Tab   = "overview" | "features" | "info";

interface Model {
  id: string;
  provider: string;
  family: string;
  tagline: string;
  badge: string;
  cardStyle: string;
  iconBg: string;
  iconText: string;
  accentText: string;
  initial: string;

  /* comparison row */
  contextWindow: string;
  onPremise: boolean | "Partial";
  euResidency: string;
  ragScore: Score;
  reasoningScore: Score;
  speed: Score;
  costTier: string;
  bestFor: string;

  /* modal — overview */
  overview: string;
  strengths: string[];
  limitations: string[];
  regulatedFit: string;

  /* modal — features */
  capabilities: string[];
  specialFeatures: string[];
  toolUse: boolean;
  multimodal: boolean;
  streaming: boolean;
  functionCalling: boolean;

  /* modal — model info */
  latestVersion: string;
  releaseDate: string;
  parameters: string;
  contextWindowFull: string;
  trainingCutoff: string;
  deprecationDate: string;
  pricingInput: string;
  pricingOutput: string;
  deploymentOptions: string[];
  certifications: string[];
}

/* ─── Data ───────────────────────────────────────────────────────── */
const models: Model[] = [
  {
    id: "openai",
    provider: "OpenAI",
    family: "GPT-4o",
    tagline: "The industry benchmark for enterprise AI",
    badge: "Industry Standard",
    cardStyle: "border-emerald-400/25 bg-emerald-400/5",
    iconBg: "bg-emerald-400/15 border-emerald-400/30",
    iconText: "text-emerald-300",
    accentText: "text-emerald-300",
    initial: "O",

    contextWindow: "128K",
    onPremise: false,
    euResidency: "Via Azure OpenAI",
    ragScore: "Excellent",
    reasoningScore: "Excellent",
    speed: "Good",
    costTier: "Medium",
    bestFor: "Complex compliance analysis, multi-step reasoning, code generation",

    overview: "GPT-4o is OpenAI's flagship multimodal model, combining text, image, and audio understanding in a single architecture. It is the most widely adopted LLM in enterprise AI deployments and sets the benchmark most other models are compared against. For regulated industries, it is best accessed through Azure OpenAI Service, which provides EU data residency, private networking, and Microsoft compliance certifications.",
    strengths: [
      "Strongest general reasoning and instruction-following",
      "Widest third-party integration ecosystem",
      "Azure OpenAI provides enterprise-grade SLAs and data residency",
      "Extensive tool-use and function-calling capabilities",
      "Best-in-class for structured output generation (JSON mode)"
    ],
    limitations: [
      "No on-premise deployment option — data must leave your infrastructure",
      "Higher cost for long-context workloads",
      "Training cutoff means it lacks knowledge of recent regulatory changes",
      "Vendor lock-in risk for organisations relying solely on OpenAI"
    ],
    regulatedFit: "Strong fit for finance and banking via Azure OpenAI with FCA/PRA-aligned data governance. Not suitable for NHS patient-identifiable data workloads without on-prem or NHS-approved cloud infrastructure.",

    capabilities: [
      "Text generation, summarisation, classification",
      "Structured data extraction (JSON, tables)",
      "Multi-step reasoning and chain-of-thought",
      "Code generation and analysis",
      "Image understanding (documents, charts, screenshots)",
      "Long document processing (up to 128K tokens)"
    ],
    specialFeatures: [
      "Structured Outputs — guaranteed JSON schema compliance",
      "Parallel tool calling — multiple function calls in one turn",
      "Reproducible outputs with seed parameter",
      "Assistants API for stateful multi-turn conversations",
      "Batch API for 50% cost reduction on async workloads"
    ],
    toolUse: true,
    multimodal: true,
    streaming: true,
    functionCalling: true,

    latestVersion: "gpt-4o-2024-11-20",
    releaseDate: "May 2024",
    parameters: "Not publicly disclosed (est. ~200B)",
    contextWindowFull: "128,000 tokens (~300 pages of text)",
    trainingCutoff: "October 2023",
    deprecationDate: "No announced date",
    pricingInput: "$2.50 per 1M tokens",
    pricingOutput: "$10.00 per 1M tokens",
    deploymentOptions: ["OpenAI API", "Azure OpenAI Service", "AWS Marketplace"],
    certifications: ["SOC 2 Type II", "ISO 27001", "GDPR (via Azure)", "HIPAA (via Azure)", "UK Cyber Essentials"]
  },
  {
    id: "claude",
    provider: "Anthropic",
    family: "Claude 4",
    tagline: "Safety-first reasoning for high-stakes decisions",
    badge: "Best for Regulated",
    cardStyle: "border-primary/25 bg-primary/5",
    iconBg: "bg-primary/15 border-primary/30",
    iconText: "text-primary",
    accentText: "text-primary",
    initial: "A",

    contextWindow: "200K",
    onPremise: false,
    euResidency: "Via AWS / GCP",
    ragScore: "Excellent",
    reasoningScore: "Excellent",
    speed: "Good",
    costTier: "Medium–High",
    bestFor: "Long regulatory document analysis, safety-critical outputs, NHS clinical summarisation",

    overview: "Claude is Anthropic's model family, designed with Constitutional AI — a training approach that prioritises safety, honesty, and harm avoidance. The Claude 4 series (Opus 4, Sonnet 4, Haiku 4) offers the largest context window of any major model at 200K tokens, making it especially well-suited for long regulatory documents. Its safety-first design philosophy makes it the preferred choice for healthcare and clinical AI applications.",
    strengths: [
      "Largest context window (200K) — fits entire regulatory rulebooks",
      "Constitutional AI training reduces harmful or non-compliant outputs",
      "Exceptional long-document comprehension and summarisation",
      "Strong citation and attribution behaviour — names sources",
      "Haiku tier offers ultra-low latency for high-volume routing"
    ],
    limitations: [
      "No on-premise deployment — requires cloud API",
      "Slightly more conservative output style can require prompt tuning",
      "Smaller ecosystem of third-party integrations vs GPT-4o",
      "EU data residency dependent on AWS/GCP region selection"
    ],
    regulatedFit: "Highest fit for NHS and healthcare due to safety-first design and DCB0129 alignment. Strong fit for FCA/PRA compliance workloads requiring long-document reasoning. Available on AWS Bedrock with UK/EU data residency options.",

    capabilities: [
      "Long-document reading and analysis (200K context)",
      "Regulatory text extraction and obligation mapping",
      "Clinical document summarisation and triage support",
      "Complex multi-step reasoning with explicit chain-of-thought",
      "Code generation with security-aware output",
      "Multi-turn conversation with persistent context"
    ],
    specialFeatures: [
      "Constitutional AI — built-in safety guardrails at training level",
      "Extended thinking mode — deeper reasoning for complex problems",
      "Vision support — analyse regulatory PDFs, charts, forms",
      "Tool use with parallel execution",
      "Model family tiers: Opus (best quality), Sonnet (balanced), Haiku (fastest)"
    ],
    toolUse: true,
    multimodal: true,
    streaming: true,
    functionCalling: true,

    latestVersion: "claude-sonnet-4-6 / claude-opus-4-6",
    releaseDate: "2025",
    parameters: "Not publicly disclosed",
    contextWindowFull: "200,000 tokens (~500 pages of text)",
    trainingCutoff: "Early 2025",
    deprecationDate: "Claude 3 models scheduled for deprecation in 2025",
    pricingInput: "~$3.00 per 1M tokens (Sonnet)",
    pricingOutput: "~$15.00 per 1M tokens (Sonnet)",
    deploymentOptions: ["Anthropic API", "Amazon Bedrock", "Google Cloud Vertex AI"],
    certifications: ["SOC 2 Type II", "GDPR (via AWS/GCP)", "HIPAA (via AWS Bedrock)"]
  },
  {
    id: "gemini",
    provider: "Google",
    family: "Gemini 1.5/2.0",
    tagline: "Unmatched context for document-heavy workflows",
    badge: "Largest Context",
    cardStyle: "border-blue-400/25 bg-blue-400/5",
    iconBg: "bg-blue-400/15 border-blue-400/30",
    iconText: "text-blue-300",
    accentText: "text-blue-300",
    initial: "G",

    contextWindow: "1M",
    onPremise: false,
    euResidency: "Via Google Cloud",
    ragScore: "Excellent",
    reasoningScore: "Good",
    speed: "Excellent",
    costTier: "Low–Medium",
    bestFor: "Entire regulatory library ingestion, massive document corpus analysis, cost-optimised RAG",

    overview: "Gemini 1.5 Pro and the Gemini 2.0 series from Google DeepMind offer the industry's largest publicly available context window at 1 million tokens — equivalent to approximately 10 thick regulatory rulebooks in a single call. This makes Gemini uniquely suited for workloads where the entire knowledge corpus needs to be in context simultaneously, rather than retrieved via RAG. Available on Google Cloud Vertex AI with enterprise compliance and EU data residency.",
    strengths: [
      "1M token context window — entire regulatory library in one call",
      "Gemini Flash is one of the fastest and cheapest frontier models",
      "Native multimodal — text, images, audio, video, code",
      "Strong grounding via Google Search integration",
      "Vertex AI provides enterprise compliance and EU regions"
    ],
    limitations: [
      "Reasoning quality slightly behind GPT-4o and Claude on complex multi-step tasks",
      "1M context at full capacity is expensive — cost management required",
      "No on-premise deployment",
      "Google ecosystem dependency for enterprise features"
    ],
    regulatedFit: "Good fit for finance workloads requiring large document corpus analysis. Vertex AI provides FCA/GDPR-aligned data governance. For NHS, requires careful assessment of data residency — Google Cloud EU regions available but NHS IG Toolkit compliance needs verification.",

    capabilities: [
      "1M token context — entire corpora in one call",
      "Multimodal reasoning (text, image, audio, video, code)",
      "Document understanding including PDFs, slides, spreadsheets",
      "Code generation and analysis",
      "Long-context summarisation and extraction",
      "Grounding with Google Search for real-time information"
    ],
    specialFeatures: [
      "1M token context window — industry leading",
      "Gemini Flash — ultra-fast, cost-optimised for high-volume routing",
      "Native video understanding for training and compliance footage",
      "Code Execution tool — runs Python in-context",
      "Grounding API — verifiable answers linked to Google Search sources"
    ],
    toolUse: true,
    multimodal: true,
    streaming: true,
    functionCalling: true,

    latestVersion: "gemini-2.0-flash / gemini-1.5-pro-002",
    releaseDate: "Gemini 1.5 — February 2024; 2.0 — late 2024",
    parameters: "Not publicly disclosed",
    contextWindowFull: "1,000,000 tokens (~2,500 pages of text)",
    trainingCutoff: "Early 2024 (varies by model)",
    deprecationDate: "Gemini 1.0 deprecated; 1.5 active; 2.0 series current",
    pricingInput: "$1.25–$2.50 per 1M tokens (context dependent)",
    pricingOutput: "$5.00–$10.00 per 1M tokens",
    deploymentOptions: ["Google AI Studio", "Google Cloud Vertex AI"],
    certifications: ["SOC 2 Type II", "ISO 27001", "ISO 27017", "GDPR", "HIPAA (Vertex AI)"]
  },
  {
    id: "mistral",
    provider: "Mistral AI",
    family: "Mistral Large 2",
    tagline: "European sovereignty — GDPR by design",
    badge: "EU Native",
    cardStyle: "border-orange-400/25 bg-orange-400/5",
    iconBg: "bg-orange-400/15 border-orange-400/30",
    iconText: "text-orange-300",
    accentText: "text-orange-300",
    initial: "M",

    contextWindow: "128K",
    onPremise: "Partial",
    euResidency: "Native (France)",
    ragScore: "Good",
    reasoningScore: "Good",
    speed: "Good",
    costTier: "Low–Medium",
    bestFor: "GDPR-strict workloads, EU data sovereignty requirements, multilingual European regulatory text",

    overview: "Mistral AI is a French AI company offering a unique combination of strong model performance, EU-native data residency, and partial open-source availability. Mistral Large 2 is its flagship API model, while smaller models (Mistral 7B, Mixtral 8x7B) are fully open source and self-hostable. For European regulated industries — including UK firms with EU data transfer restrictions — Mistral offers the clearest GDPR compliance story of any frontier model provider.",
    strengths: [
      "EU-native: French company, data processed in EU by default",
      "Open-source smaller models (7B, Mixtral) fully self-hostable",
      "Strongest multilingual performance for European regulatory text",
      "Cost-effective — competitive pricing with strong quality",
      "Codestral model optimised for code generation workflows"
    ],
    limitations: [
      "Mistral Large is API-only (not open source)",
      "Smaller ecosystem and fewer enterprise integrations",
      "Reasoning ceiling slightly below GPT-4o and Claude Opus",
      "Context window (128K) smaller than Claude or Gemini"
    ],
    regulatedFit: "Best fit for EU-headquartered regulated firms and UK firms needing to demonstrate EU data residency for GDPR compliance. Partial on-prem via open-source variants. Strong for European multilingual compliance documentation.",

    capabilities: [
      "Text generation, summarisation, classification",
      "Multilingual — strongest European language performance",
      "Code generation (Codestral specialised model)",
      "Function calling and tool use",
      "RAG-optimised with strong retrieval performance",
      "Self-hostable via open-source variants"
    ],
    specialFeatures: [
      "Mistral 7B / Mixtral 8x7B — fully open source, self-hostable",
      "Codestral — dedicated model for code generation",
      "EU data residency by default — no data leaves EU",
      "Mistral Embeddings — European-language optimised",
      "La Plateforme — Mistral's own enterprise API with EU SLAs"
    ],
    toolUse: true,
    multimodal: false,
    streaming: true,
    functionCalling: true,

    latestVersion: "mistral-large-2407",
    releaseDate: "Mistral Large — February 2024; v2 — July 2024",
    parameters: "~70B+ (Large, not officially disclosed); 7B (open-source)",
    contextWindowFull: "128,000 tokens (~300 pages of text)",
    trainingCutoff: "Early 2024",
    deprecationDate: "No announced date",
    pricingInput: "~€2.00 per 1M tokens (Mistral Large)",
    pricingOutput: "~€6.00 per 1M tokens (Mistral Large)",
    deploymentOptions: ["Mistral La Plateforme (EU)", "Azure AI", "AWS Bedrock", "Self-hosted (open-source)"],
    certifications: ["ISO 27001 (in progress)", "GDPR compliant by design", "French ANSSI cloud provider"]
  },
  {
    id: "llama",
    provider: "Meta",
    family: "Llama 3.3",
    tagline: "Full data sovereignty — runs entirely on your infrastructure",
    badge: "On-Premise Ready",
    cardStyle: "border-violet-400/25 bg-violet-400/5",
    iconBg: "bg-violet-400/15 border-violet-400/30",
    iconText: "text-violet-300",
    accentText: "text-violet-300",
    initial: "L",

    contextWindow: "128K",
    onPremise: true,
    euResidency: "Yes (self-hosted)",
    ragScore: "Good",
    reasoningScore: "Good",
    speed: "Excellent",
    costTier: "Free / Self-hosted",
    bestFor: "NHS on-premise patient data, banks requiring zero third-party data exposure, cost optimisation at scale",

    overview: "Meta's Llama 3 family is the most capable open-source LLM series available, released under a permissive community licence that allows commercial deployment. Llama 3.3 70B matches or exceeds GPT-4o on many benchmarks while running entirely on your own infrastructure. For NHS deployments — where patient identifiable data must never leave NHS-controlled systems — Llama on NHS hardware is the only viable frontier-model option. For banks and insurers with strict third-party data policies, Llama eliminates API data exposure entirely.",
    strengths: [
      "Fully open source — runs on your own infrastructure, zero data leaves",
      "No per-token API cost — only infrastructure cost at scale",
      "NHS patient data never leaves NHS hardware",
      "Llama 3.3 70B performance matches frontier API models",
      "Available in multiple sizes: 8B (fast/cheap), 70B (balanced), 405B (frontier)"
    ],
    limitations: [
      "Requires GPU infrastructure to run (significant hardware investment)",
      "No managed service SLAs — your team owns the infrastructure",
      "405B variant requires significant GPU cluster",
      "Lacks some specialised features of commercial models (batch API, etc.)"
    ],
    regulatedFit: "Essential for NHS patient-identifiable data workloads — the only frontier model option that keeps data on NHS infrastructure. Ideal for banks and insurers with strict third-party processor policies under GDPR Art. 28. LorvexAI's NHS Flow Optimizer supports Llama 3.3 70B in hybrid and full on-prem configurations.",

    capabilities: [
      "Text generation, summarisation, classification",
      "Instruction following and dialogue",
      "Code generation and analysis",
      "RAG with any vector store",
      "Function calling (Llama 3.1+)",
      "Fine-tuning on domain-specific data"
    ],
    specialFeatures: [
      "Fully open weights — inspect, audit, modify the model",
      "Three deployment sizes: 8B / 70B / 405B",
      "Fine-tunable on clinical or regulatory domain data",
      "Runs on NVIDIA A100/H100 or consumer GPUs (8B variant)",
      "No data sharing with any third party — ever"
    ],
    toolUse: true,
    multimodal: false,
    streaming: true,
    functionCalling: true,

    latestVersion: "Llama 3.3 70B (December 2024)",
    releaseDate: "Llama 3 — April 2024; 3.1 — July 2024; 3.3 — December 2024",
    parameters: "8B / 70B / 405B (all public)",
    contextWindowFull: "128,000 tokens (~300 pages of text)",
    trainingCutoff: "December 2023",
    deprecationDate: "N/A — open source, no deprecation",
    pricingInput: "Free (self-hosted) / ~$0.27 per 1M tokens (via cloud providers)",
    pricingOutput: "Free (self-hosted) / ~$0.85 per 1M tokens (via cloud providers)",
    deploymentOptions: ["Self-hosted (on-prem)", "AWS (SageMaker / Bedrock)", "Azure AI", "Google Cloud Vertex AI", "Ollama / vLLM / llama.cpp"],
    certifications: ["N/A — open source", "Certifications depend on deployment infrastructure", "NHS IG Toolkit compliance possible on NHS hardware"]
  }
];

/* ─── Helpers ─────────────────────────────────────────────────────── */
const SCORE_COLORS: Record<Score, string> = {
  Excellent: "bg-emerald-400",
  Good:      "bg-blue-400",
  Fair:      "bg-yellow-400",
  Limited:   "bg-secondary/25"
};
const SCORE_FILLED: Record<Score, number> = {
  Excellent: 4, Good: 3, Fair: 2, Limited: 1
};

function ScoreDots({ level }: { level: Score }) {
  const fill = SCORE_FILLED[level];
  const color = SCORE_COLORS[level];
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i <= fill ? color : "bg-secondary/15"}`} />
      ))}
    </div>
  );
}

function BoolBadge({ value }: { value: boolean | "Partial" | string }) {
  if (value === true)
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300"><Check size={12} /> Yes</span>;
  if (value === "Partial")
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-300"><Check size={12} /> Partial</span>;
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary/40"><Minus size={12} /> No</span>;
}

/* ─── Modal ───────────────────────────────────────────────────────── */
function ModelModal({ model, onClose }: { model: Model; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview",  label: "Overview" },
    { key: "features",  label: "Features & Capabilities" },
    { key: "info",      label: "Model Information" }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border bg-[#0a1628] shadow-2xl ${model.cardStyle}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 rounded-t-3xl border-b border-secondary/10 bg-[#0a1628]/95 px-6 pt-6 pb-4 backdrop-blur`}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-secondary/20 bg-background/60 p-1.5 text-secondary/60 transition hover:text-white"
          >
            <X size={15} />
          </button>

          <div className="flex items-center gap-3 pr-10">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg font-bold ${model.iconBg} ${model.iconText}`}>
              {model.initial}
            </div>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${model.accentText}`}>{model.provider}</p>
              <h2 className="text-lg font-semibold text-white">{model.family}</h2>
            </div>
            <span className={`ml-auto rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${model.cardStyle} ${model.accentText}`}>
              {model.badge}
            </span>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  tab === t.key
                    ? "bg-primary/25 text-white"
                    : "text-secondary/60 hover:text-secondary/90"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="px-6 py-5">

          {/* ── Overview ── */}
          {tab === "overview" && (
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-secondary/75">{model.overview}</p>

              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Strengths</p>
                <ul className="space-y-2">
                  {model.strengths.map((s) => (
                    <li key={s} className="flex gap-2 text-sm text-secondary/75">
                      <Check size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Limitations</p>
                <ul className="space-y-2">
                  {model.limitations.map((l) => (
                    <li key={l} className="flex gap-2 text-sm text-secondary/65">
                      <Minus size={13} className="mt-0.5 shrink-0 text-yellow-400" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-2xl border p-4 ${model.cardStyle}`}>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Regulated Industry Fit</p>
                <p className="text-sm leading-relaxed text-secondary/80">{model.regulatedFit}</p>
              </div>
            </div>
          )}

          {/* ── Features ── */}
          {tab === "features" && (
            <div className="space-y-5">
              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Core Capabilities</p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {model.capabilities.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-secondary/75">
                      <Check size={13} className={`mt-0.5 shrink-0 ${model.iconText}`} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Special Features</p>
                <ul className="space-y-2">
                  {model.specialFeatures.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-secondary/75">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${SCORE_COLORS.Excellent}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Tool Use",      value: model.toolUse },
                  { label: "Multimodal",    value: model.multimodal },
                  { label: "Streaming",     value: model.streaming },
                  { label: "Fn Calling",    value: model.functionCalling }
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-secondary/15 bg-background/30 px-3 py-2.5 text-center">
                    <p className="text-[10px] text-secondary/45">{label}</p>
                    <p className={`mt-1 text-xs font-semibold ${value ? "text-emerald-300" : "text-secondary/40"}`}>
                      {value ? "Yes" : "No"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Model Info ── */}
          {tab === "info" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Latest Version",      value: model.latestVersion },
                  { label: "Release Date",         value: model.releaseDate },
                  { label: "Parameters",           value: model.parameters },
                  { label: "Context Window",       value: model.contextWindowFull },
                  { label: "Training Cutoff",      value: model.trainingCutoff },
                  { label: "Deprecation / Expiry", value: model.deprecationDate },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-secondary/15 bg-background/30 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary/40">{label}</p>
                    <p className="mt-1 text-sm text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className={`rounded-2xl border p-4 ${model.cardStyle}`}>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Pricing (per 1M tokens)</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] text-secondary/45">Input</p>
                    <p className={`text-sm font-semibold ${model.accentText}`}>{model.pricingInput}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary/45">Output</p>
                    <p className={`text-sm font-semibold ${model.accentText}`}>{model.pricingOutput}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Deployment Options</p>
                <div className="flex flex-wrap gap-2">
                  {model.deploymentOptions.map((d) => (
                    <span key={d} className="rounded-full border border-secondary/20 bg-background/30 px-2.5 py-1 text-xs text-secondary/65">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Compliance Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {model.certifications.map((c) => (
                    <span key={c} className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${model.cardStyle} ${model.accentText}`}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */
export default function ModelGardenClient() {
  const [selected, setSelected] = useState<Model | null>(null);

  return (
    <>
      {/* ── Hero ── */}
      <section className="section pb-10 pt-14 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass rounded-3xl border border-primary/30 p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">Model Garden</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              <span className="text-white">Choose the right model. </span>
              <span className="text-gradient">For the right task.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-secondary/80">
              Not every AI task needs the same model. LorvexAI routes queries intelligently across OpenAI, Claude, Gemini, Mistral, and Llama — matching complexity, cost, and compliance requirements automatically. Compare the five models that power our regulated AI stack.
            </p>
            <p className="mt-3 text-sm text-secondary/50">
              Click any model card for detailed specs, pricing, and regulatory fit.
            </p>
          </div>
        </div>
      </section>

      {/* ── Model Cards ── */}
      <section className="section pt-2">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-secondary/50">Five Models</p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">The models in our stack</h2>
          <p className="mt-3 max-w-2xl text-sm text-secondary/65">
            Click a model to see full overview, capabilities, and technical specifications.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {models.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelected(m)}
                className={`card-hover glass group text-left rounded-2xl border p-5 transition ${m.cardStyle}`}
              >
                {/* Icon + provider */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold ${m.iconBg} ${m.iconText}`}>
                    {m.initial}
                  </div>
                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${m.accentText}`}>{m.provider}</p>
                    <p className="text-sm font-semibold text-white">{m.family}</p>
                  </div>
                </div>

                {/* Badge */}
                <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] ${m.cardStyle} ${m.accentText} mb-3`}>
                  {m.badge}
                </span>

                <p className="text-xs leading-relaxed text-secondary/65 mb-4">{m.tagline}</p>

                {/* Quick stats */}
                <div className="space-y-2 border-t border-secondary/10 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-secondary/45">Context</span>
                    <span className={`font-semibold ${m.accentText}`}>{m.contextWindow}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-secondary/45">On-Prem</span>
                    <BoolBadge value={m.onPremise} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-secondary/45">Reasoning</span>
                    <ScoreDots level={m.reasoningScore} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-secondary/45">RAG fit</span>
                    <ScoreDots level={m.ragScore} />
                  </div>
                </div>

                <p className={`mt-4 flex items-center gap-1 text-xs font-medium ${m.accentText} transition group-hover:gap-2`}>
                  View details <ArrowRight size={11} />
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="section border-y border-secondary/10 bg-background/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-secondary/50">Side-by-Side</p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Regulated enterprise comparison</h2>
          <p className="mt-3 max-w-2xl text-sm text-secondary/65">
            Dimensions that matter for FCA, PRA, NHS, and GDPR compliance — not just raw benchmark scores.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-secondary/15">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-secondary/15 bg-background/60">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40 w-36">Dimension</th>
                  {models.map((m) => (
                    <th key={m.id} className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelected(m)}
                        className={`inline-flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition hover:bg-primary/10`}
                      >
                        <span className={`text-xs font-semibold ${m.accentText}`}>{m.family}</span>
                        <span className="text-[9px] text-secondary/45">{m.provider}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Context Window",
                    render: (m: Model) => <span className="font-semibold text-white">{m.contextWindow}</span>
                  },
                  {
                    label: "On-Premise",
                    render: (m: Model) => <BoolBadge value={m.onPremise} />
                  },
                  {
                    label: "EU / UK Data Residency",
                    render: (m: Model) => <span className="text-xs text-secondary/70">{m.euResidency}</span>
                  },
                  {
                    label: "Reasoning Quality",
                    render: (m: Model) => (
                      <div className="flex flex-col items-center gap-1">
                        <ScoreDots level={m.reasoningScore} />
                        <span className="text-[10px] text-secondary/50">{m.reasoningScore}</span>
                      </div>
                    )
                  },
                  {
                    label: "RAG Suitability",
                    render: (m: Model) => (
                      <div className="flex flex-col items-center gap-1">
                        <ScoreDots level={m.ragScore} />
                        <span className="text-[10px] text-secondary/50">{m.ragScore}</span>
                      </div>
                    )
                  },
                  {
                    label: "Speed",
                    render: (m: Model) => (
                      <div className="flex flex-col items-center gap-1">
                        <ScoreDots level={m.speed} />
                        <span className="text-[10px] text-secondary/50">{m.speed}</span>
                      </div>
                    )
                  },
                  {
                    label: "Cost Tier",
                    render: (m: Model) => <span className="text-xs text-secondary/70">{m.costTier}</span>
                  },
                  {
                    label: "Multimodal",
                    render: (m: Model) => <BoolBadge value={m.multimodal} />
                  },
                  {
                    label: "Best Regulated Use Case",
                    render: (m: Model) => <span className="text-[10px] leading-relaxed text-secondary/60">{m.bestFor}</span>
                  }
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-secondary/10 ${i % 2 === 0 ? "" : "bg-background/20"}`}
                  >
                    <td className="px-4 py-3 text-xs font-medium text-secondary/55 align-top">{row.label}</td>
                    {models.map((m) => (
                      <td key={m.id} className="px-3 py-3 text-center align-middle">{row.render(m)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── How LorvexAI Routes ── */}
      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">Intelligent Routing</p>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                You don't have to choose. We route automatically.
              </h2>
              <p className="mt-4 text-secondary/70">
                LorvexAI's multi-model router classifies every query and sends it to the right model — matching complexity, data residency requirements, and cost targets without manual configuration.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Simple factual queries → Llama 3.3 or Gemini Flash (fast, cheap)",
                  "Complex compliance analysis → Claude Opus or GPT-4o",
                  "NHS patient data workloads → Llama 3.3 on-prem only",
                  "EU data residency required → Mistral or EU-region cloud",
                  "Long regulatory documents (>128K) → Gemini 1.5 Pro"
                ].map((rule) => (
                  <li key={rule} className="flex gap-2 text-sm text-secondary/70">
                    <ArrowRight size={13} className="mt-0.5 shrink-0 text-primary" />
                    {rule}
                  </li>
                ))}
              </ul>
              <Link
                href="/platform"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:gap-2.5"
              >
                See the full platform architecture <ArrowRight size={14} />
              </Link>
            </div>

            <div className="glass rounded-2xl border border-primary/20 p-6">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/40">Routing decision logic</p>
              <div className="space-y-2.5">
                {[
                  { query: "Summarise this regulatory circular", model: "Gemini Flash", reason: "Long doc, cost-optimised", color: "text-blue-300" },
                  { query: "Map Basel IV obligations to controls", model: "Claude Opus", reason: "Complex reasoning", color: "text-primary" },
                  { query: "Triage this patient referral", model: "Llama 3.3 (on-prem)", reason: "PII — data stays on NHS", color: "text-violet-300" },
                  { query: "Generate ALCO report section", model: "GPT-4o", reason: "Structured output quality", color: "text-emerald-300" },
                  { query: "EU GDPR compliance gap analysis", model: "Mistral Large", reason: "EU data residency", color: "text-orange-300" },
                ].map((row) => (
                  <div key={row.query} className="rounded-xl border border-secondary/10 bg-background/40 px-3 py-2.5">
                    <p className="text-[10px] text-secondary/50 truncate">{row.query}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className={`text-xs font-semibold ${row.color}`}>{row.model}</span>
                      <span className="text-[9px] text-secondary/40">{row.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <ModelModal model={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
