"use client";

import { motion } from "framer-motion";

const stages = [
  { name: "Discover", note: "Use-case and value mapping" },
  { name: "Design", note: "Architecture and control model" },
  { name: "Build", note: "Pipelines, agents, integrations" },
  { name: "Deploy", note: "Canary release + monitoring" },
  { name: "Scale", note: "Optimization and expansion" }
];

export default function DeliveryFrameworkDiagram() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white">AI Delivery Framework</h3>
      <p className="mt-2 text-sm text-secondary/80">
        A delivery model built for production reliability, governance, and measurable business outcomes.
      </p>

      <div className="mt-6 space-y-3">
        {stages.map((stage, index) => (
          <div key={stage.name} className="relative">
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/20 via-glow/10 to-primary/5 px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">{index + 1}. {stage.name}</p>
                <p className="text-xs text-secondary/75">{stage.note}</p>
              </div>
            </div>
            {index < stages.length - 1 && (
              <motion.div
                aria-hidden="true"
                className="mx-auto h-4 w-[2px] rounded-full bg-primary/60"
                initial={{ scaleY: 0, opacity: 0.2 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{ transformOrigin: "top" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-primary/25 bg-primary/5 p-3 text-xs text-secondary/75">
        Gate criteria: architecture sign-off, security controls, quality thresholds, and operating KPI readiness.
      </div>
    </div>
  );
}
