"use client";

import { motion } from "framer-motion";

export default function ArchitectureDiagram() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white">Enterprise AI Capability Stack</h3>
      <p className="mt-2 text-sm text-secondary/80">
        A layered blueprint connecting data, retrieval, reasoning, orchestration, and governance.
      </p>

      <div className="relative mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <svg className="h-auto w-full" viewBox="0 0 560 360" aria-hidden="true">
          <defs>
            <linearGradient id="capLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#56A3FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#56A3FF" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <rect x="20" y="28" width="160" height="72" rx="12" fill="#123B64" stroke="#5FA8E8" />
          <text x="100" y="58" fill="#EAF4FF" fontSize="13" textAnchor="middle">Data Plane</text>
          <text x="100" y="76" fill="#CFE6FF" fontSize="11" textAnchor="middle">Sources + quality + ACL</text>

          <rect x="200" y="28" width="160" height="72" rx="12" fill="#134A54" stroke="#57D7B4" />
          <text x="280" y="58" fill="#EAF4FF" fontSize="13" textAnchor="middle">Retrieval Plane</text>
          <text x="280" y="76" fill="#CFE6FF" fontSize="11" textAnchor="middle">Hybrid search + rerank</text>

          <rect x="380" y="28" width="160" height="72" rx="12" fill="#4E3F1D" stroke="#EDB472" />
          <text x="460" y="58" fill="#EAF4FF" fontSize="13" textAnchor="middle">Reasoning Plane</text>
          <text x="460" y="76" fill="#CFE6FF" fontSize="11" textAnchor="middle">LLM + response contracts</text>

          <rect x="110" y="146" width="160" height="72" rx="12" fill="#4D2938" stroke="#FF8FB2" />
          <text x="190" y="176" fill="#EAF4FF" fontSize="13" textAnchor="middle">Agent Plane</text>
          <text x="190" y="194" fill="#CFE6FF" fontSize="11" textAnchor="middle">Workflow orchestration</text>

          <rect x="290" y="146" width="160" height="72" rx="12" fill="#153C64" stroke="#5FA8E8" />
          <text x="370" y="176" fill="#EAF4FF" fontSize="13" textAnchor="middle">Application Plane</text>
          <text x="370" y="194" fill="#CFE6FF" fontSize="11" textAnchor="middle">Business integration APIs</text>

          <rect x="200" y="264" width="160" height="72" rx="12" fill="#1A3140" stroke="#69C8FF" />
          <text x="280" y="294" fill="#EAF4FF" fontSize="13" textAnchor="middle">Trust Plane</text>
          <text x="280" y="312" fill="#CFE6FF" fontSize="11" textAnchor="middle">Monitoring + policy + audit</text>

          <motion.path
            d="M180 64 L200 64 M360 64 L380 64 M280 100 L280 146 M270 182 L230 182 M370 218 L330 218 M280 218 L280 264"
            stroke="url(#capLine)"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
        </svg>
      </div>

      <ul className="mt-4 space-y-1 text-xs text-secondary/75">
        <li>- Design principle: decouple retrieval, reasoning, and governance for safer scaling.</li>
        <li>- Operating model: AI handles analysis, humans control high-impact decisions.</li>
      </ul>
    </div>
  );
}
