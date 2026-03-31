import Section from "@/components/Section";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import DeliveryFrameworkDiagram from "@/components/DeliveryFrameworkDiagram";
import CTA from "@/components/CTA";

const capabilityTracks = [
  {
    title: "AI Platform Architecture",
    points: [
      "Reference architectures for retrieval, agent orchestration, and governance",
      "Data integration patterns across ERP, CRM, policy, and document systems",
      "Security and identity controls for regulated enterprise environments"
    ]
  },
  {
    title: "LLM and RAG Engineering",
    points: [
      "Production retrieval pipelines with hybrid search, reranking, and context control",
      "Grounded response design with citations and confidence-aware behavior",
      "Evaluation harnesses for quality, latency, and cost optimization"
    ]
  },
  {
    title: "Agentic Workflow Systems",
    points: [
      "Goal-based multi-step automation with explicit human escalation rules",
      "Tool orchestration and policy-aware execution controls",
      "Traceability and audit-ready logs for every decision path"
    ]
  },
  {
    title: "Governance and Model Risk",
    points: [
      "Policy frameworks for safe deployment in finance, healthcare, and NHS settings",
      "Continuous monitoring for drift, failure modes, and operational regressions",
      "Control gates for release, rollback, and evidence collection"
    ]
  }
];

export default function CapabilitiesPage() {
  return (
    <>
      <Section
        eyebrow="Capabilities"
        title="AI capabilities engineered for measurable outcomes"
        description="Our capability model connects strategy, architecture, delivery, and governance so teams can deploy AI with speed and control."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <ArchitectureDiagram />
          <DeliveryFrameworkDiagram />
        </div>
      </Section>

      <Section
        eyebrow="Depth"
        title="What each capability includes"
        description="Each track is designed to move from pilot ideas to production-grade systems with clear accountability."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {capabilityTracks.map((track) => (
            <article key={track.title} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white">{track.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-secondary/80">
                {track.points.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Outcomes"
        title="Business impact we optimize for"
        description="Capabilities are measured by operating outcomes, not slideware."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <article className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Speed</h3>
            <p className="mt-3 text-sm text-secondary/80">
              Faster decision cycles through retrieval and agent automation with bounded risk.
            </p>
          </article>
          <article className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Reliability</h3>
            <p className="mt-3 text-sm text-secondary/80">
              Stable quality under real-world load with continuous evaluation and failure-mode controls.
            </p>
          </article>
          <article className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Governance</h3>
            <p className="mt-3 text-sm text-secondary/80">
              Audit-ready traces, policy checks, and release gates for regulated and enterprise deployments.
            </p>
          </article>
        </div>
      </Section>

      <Section title="Build your capability roadmap with us" description="">
        <CTA />
      </Section>
    </>
  );
}

