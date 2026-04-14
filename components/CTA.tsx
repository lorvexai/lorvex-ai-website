import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

export default function CTA() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(47,128,237,0.7) 0%, rgba(86,163,255,0.3) 50%, rgba(15,42,74,0.6) 100%)"
      }}
    >
      <div
        className="relative rounded-[calc(1.5rem-1px)] px-8 py-14 text-center md:px-16 md:py-16"
        style={{
          background:
            "linear-gradient(160deg, rgba(11,31,58,0.94) 0%, rgba(15,42,74,0.9) 50%, rgba(11,31,58,0.96) 100%)"
        }}
      >
        {/* Decorative glow orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-56 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "#2F80ED" }}
          aria-hidden="true"
        />

        <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
          Ready to build?
        </p>

        <h3 className="mt-4 text-2xl font-semibold md:text-3xl lg:text-4xl">
          <span className="text-white">Build Your Next </span>
          <span className="text-gradient">Intelligent System</span>
          <span className="text-white"> with LorvexAI</span>
        </h3>

        <p className="mt-4 mx-auto max-w-xl text-secondary/75">
          Work with our team to design, build, and govern enterprise-grade
          AI — from first discovery sprint through to production.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
          >
            <CalendarCheck size={16} aria-hidden="true" />
            Book a Call
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/services" className="btn-outline min-h-11 text-sm">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
