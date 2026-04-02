import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <section className="section pb-10 pt-14 md:pt-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="glass rounded-3xl border border-primary/30 p-7 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              LorvexAI Control Plane
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
              Ready to operationalize enterprise AI?
            </h1>
            <p className="mt-5 max-w-2xl text-secondary/85">
              Build your next intelligent system with LorvexAI.
            </p>
            <div className="mt-8">
              <CTA />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
