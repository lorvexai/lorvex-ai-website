import Section from "@/components/Section";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import { Mail, Linkedin, Clock, CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@lorvex.ai",
    sub: "We respond within 2 business days",
    href: "mailto:hello@lorvex.ai"
  },
  {
    icon: Linkedin,
    title: "Connect on LinkedIn",
    detail: "LorvexAI Technologies",
    sub: "Follow for AI engineering insights",
    href: "https://linkedin.com/company/lorvexai"
  },
  {
    icon: CalendarCheck,
    title: "Book a Call",
    detail: "30-minute discovery session",
    sub: "No commitment, just clarity",
    href: "#form"
  }
];

const engagementTypes = [
  { label: "Agentic AI Blueprint Sprint", desc: "4-week structured discovery and architecture design" },
  { label: "LLM Engineering Engagement", desc: "RAG pipelines, prompt systems, evaluation harnesses" },
  { label: "AI Risk & Governance Audit", desc: "Control mapping, explainability, compliance alignment" },
  { label: "Product Pilot — Regulatory Intelligence", desc: "PRA/Basel compliance AI in your environment" },
  { label: "Product Pilot — NHS Flow Optimizer", desc: "Referral triage and discharge intelligence" },
  { label: "Product Pilot — Treasury Sentinel", desc: "Liquidity and cashflow early-warning AI" }
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section pb-6 pt-14 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass rounded-3xl border border-primary/30 p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Get In Touch</p>
                <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
                  <span className="text-white">Start Your </span>
                  <span className="text-gradient">AI Transformation</span>
                </h1>
                <p className="mt-5 max-w-xl text-secondary/80">
                  Whether you&apos;re exploring your first agentic system, evaluating our products, or looking for an AI governance review — we&apos;d love to hear from you.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {contactMethods.map((m) => (
                    <a
                      key={m.title}
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="glass card-hover flex flex-col gap-2 rounded-2xl border border-primary/20 p-4"
                    >
                      <m.icon size={18} className="text-primary" />
                      <p className="text-sm font-semibold text-white">{m.title}</p>
                      <p className="text-xs text-primary">{m.detail}</p>
                      <p className="text-xs text-secondary/60">{m.sub}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-secondary/55">How we can help</p>
                {engagementTypes.map((e) => (
                  <div key={e.label} className="flex items-start gap-3 rounded-xl border border-secondary/15 bg-background/30 px-4 py-3">
                    <ArrowRight size={14} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-white">{e.label}</p>
                      <p className="text-xs text-secondary/60">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="form" className="section pt-4">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.6fr]">
            <div className="glass rounded-2xl border border-secondary/20 p-8">
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.28em] text-primary">Contact Form</p>
              <h2 className="mb-6 text-2xl font-semibold text-white">Book a call</h2>
              <ContactForm />
            </div>

            {/* Side info */}
            <div className="flex flex-col gap-5">
              <div className="glass rounded-2xl border border-primary/20 p-6">
                <Clock size={20} className="mb-3 text-primary" />
                <h3 className="text-lg font-semibold text-white">Response Time</h3>
                <p className="mt-2 text-sm text-secondary/70">We respond to all enquiries within 2 business days. For urgent matters, connect with us directly on LinkedIn.</p>
              </div>
              <div className="glass rounded-2xl border border-primary/20 p-6">
                <h3 className="text-lg font-semibold text-white">What happens next?</h3>
                <ol className="mt-4 space-y-3">
                  {[
                    "We review your message and identify the right team member",
                    "A 30-minute discovery call is scheduled",
                    "We share a tailored approach document",
                    "You decide if and how you'd like to proceed"
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-secondary/70">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-[10px] font-bold text-primary">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-[#13294B] to-[#1D4C8F] p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-secondary/70">Based in</p>
                <p className="mt-2 text-lg font-semibold text-white">United Kingdom</p>
                <p className="mt-1 text-sm text-secondary/70">Serving enterprise clients across UK, Europe, and the Middle East</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
