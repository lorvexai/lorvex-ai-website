import type { Metadata } from "next";
import ModelGardenClient from "@/components/ModelGardenClient";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Model Garden — LLM Comparison for Regulated Enterprise | LorvexAI",
  description: "Compare OpenAI GPT-4o, Claude, Gemini, Mistral, and Llama across context window, on-premise deployment, EU data residency, RAG suitability, and compliance certifications.",
  alternates: { canonical: "/models" },
  openGraph: {
    title: "Model Garden — LLM Comparison for Regulated Enterprise | LorvexAI",
    description: "Which LLM is right for finance, banking, and NHS? Compare the five models that power LorvexAI's regulated AI stack.",
    url: "/models",
    type: "website"
  }
};

export default function ModelsPage() {
  return (
    <>
      <ModelGardenClient />
      <section className="section pt-0">
        <div className="mx-auto w-full max-w-6xl px-6">
          <CTA />
        </div>
      </section>
    </>
  );
}
