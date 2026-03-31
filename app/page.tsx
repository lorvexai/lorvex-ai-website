import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import CTA from "@/components/CTA";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/utils/posts";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import DeliveryFrameworkDiagram from "@/components/DeliveryFrameworkDiagram";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Section
        eyebrow="Services"
        title="Consulting built for complex AI systems"
        description="From strategy to implementation, we architect secure, scalable AI systems that deliver measurable results."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="AI Strategy Consulting"
            description="Roadmaps, ROI modeling, and governance frameworks for enterprise AI adoption."
          />
          <ServiceCard
            title="LLM Engineering"
            description="Custom LLM pipelines, evaluation stacks, and production-grade retrieval systems."
          />
          <ServiceCard
            title="Agentic AI Systems"
            description="Autonomous workflows and multi-agent orchestration for high-impact operations."
          />
        </div>
      </Section>
      <Section
        eyebrow="Research"
        title="Technical publishing with operational depth"
        description="We publish research, whitepapers, and guides to help teams design resilient AI systems."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Books"
            description="In-depth technical references on LLM systems design, evaluation, and scaling."
          />
          <ServiceCard
            title="Whitepapers"
            description="Strategic research on AI risk, governance, and industry transformation."
          />
          <ServiceCard
            title="Technical Guides"
            description="Practical guidance on architecture patterns and implementation playbooks."
          />
        </div>
      </Section>
      <Section
        eyebrow="Architecture"
        title="AI Capabilities"
        description="A scalable architecture that connects enterprise data, LLMs, and governance controls."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <ArchitectureDiagram />
          <DeliveryFrameworkDiagram />
        </div>
      </Section>
      <Section
        eyebrow="Insights"
        title="Latest from our blog"
        description="Stay current with agentic AI, enterprise RAG architectures, and applied AI risk management."
      >
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
      </Section>
      <Section title="Ready to deploy enterprise AI systems?" description="">
        <CTA />
      </Section>
    </>
  );
}
