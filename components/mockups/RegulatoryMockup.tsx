import MockupFrame from "./MockupFrame";

const obligations = [
  { ref: "PRA SS1/23 §4.2",  title: "Model Risk Governance Policy",     status: "Mapped",    evidence: "Ready",    risk: "High"   },
  { ref: "Basel III Art.92",  title: "Capital Adequacy — Tier 1 Buffer", status: "Mapped",    evidence: "Ready",    risk: "High"   },
  { ref: "FCA PS22/9 §3.1",  title: "Consumer Duty Outcome Testing",    status: "In Review", evidence: "Pending",  risk: "Medium" },
  { ref: "PRA SS3/21 §6",    title: "Operational Resilience Testing",   status: "Mapped",    evidence: "Ready",    risk: "Medium" },
  { ref: "Basel IV CRR §430", title: "Disclosure & Reporting Templates", status: "Gap",       evidence: "Missing",  risk: "High"   },
];

const sources = [
  { name: "PRA Rulebook",    count: 847, color: "bg-blue-400"    },
  { name: "FCA Handbook",    count: 612, color: "bg-violet-400"  },
  { name: "Basel Framework", count: 394, color: "bg-primary"     },
  { name: "EBA Guidelines",  count: 231, color: "bg-orange-400"  },
];

const statusStyle: Record<string, string> = {
  Mapped:     "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "In Review":"border-yellow-400/30  bg-yellow-400/10  text-yellow-300",
  Gap:        "border-red-400/30     bg-red-400/10     text-red-300",
};
const evidenceStyle: Record<string, string> = {
  Ready:   "text-emerald-400",
  Pending: "text-yellow-400",
  Missing: "text-red-400",
};
const riskStyle: Record<string, string> = {
  High:   "text-red-300",
  Medium: "text-orange-300",
  Low:    "text-emerald-300",
};

export default function RegulatoryMockup() {
  return (
    <MockupFrame title="app.lorvexai.com/regulatory-intelligence">
      {/* Top nav */}
      <div className="flex items-center justify-between border-b border-secondary/10 px-4 py-2.5" style={{ background: "rgba(12,25,48,0.9)" }}>
        <div className="flex gap-4">
          {["Dashboard", "Obligations", "Controls", "Evidence", "Reports"].map((t, i) => (
            <span key={t} className={`text-xs ${i === 1 ? "border-b border-primary pb-1 text-white" : "text-secondary/45"}`}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live sync
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] divide-x divide-secondary/10">
        {/* Main panel */}
        <div className="p-4">
          {/* Metric row */}
          <div className="mb-4 grid grid-cols-4 gap-2">
            {[
              { label: "Total Obligations", value: "2,847", color: "text-white"         },
              { label: "Mapped",            value: "2,401", color: "text-emerald-300"   },
              { label: "Gaps Identified",   value: "127",   color: "text-red-300"       },
              { label: "Evidence Ready",    value: "94%",   color: "text-primary"       },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border border-secondary/10 bg-background/40 p-2.5 text-center">
                <p className={`text-base font-bold ${m.color}`}>{m.value}</p>
                <p className="mt-0.5 text-[9px] text-secondary/45">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-lg border border-secondary/10 overflow-hidden">
            <div className="grid grid-cols-[1fr_1.4fr_auto_auto_auto] gap-x-3 border-b border-secondary/10 bg-background/60 px-3 py-1.5">
              {["Ref", "Obligation", "Status", "Evidence", "Risk"].map((h) => (
                <span key={h} className="text-[9px] font-semibold uppercase tracking-wider text-secondary/35">{h}</span>
              ))}
            </div>
            {obligations.map((o, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1.4fr_auto_auto_auto] items-center gap-x-3 px-3 py-2 ${i % 2 === 0 ? "bg-background/20" : "bg-transparent"}`}>
                <span className="font-mono text-[9px] text-primary/70">{o.ref}</span>
                <span className="text-[10px] text-secondary/75 truncate">{o.title}</span>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${statusStyle[o.status]}`}>{o.status}</span>
                <span className={`text-[10px] font-medium ${evidenceStyle[o.evidence]}`}>{o.evidence}</span>
                <span className={`text-[10px] font-semibold ${riskStyle[o.risk]}`}>{o.risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-32 p-3" style={{ background: "rgba(12,25,48,0.6)" }}>
          <p className="mb-3 text-[9px] uppercase tracking-wider text-secondary/35">Sources</p>
          <div className="space-y-2.5">
            {sources.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[9px] text-secondary/55">{s.name}</span>
                  <span className="font-mono text-[9px] text-secondary/45">{s.count}</span>
                </div>
                <div className="h-1 w-full rounded-full bg-secondary/10">
                  <div
                    className={`h-1 rounded-full ${s.color} opacity-70`}
                    style={{ width: `${Math.round((s.count / 847) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 p-2">
            <p className="text-[9px] font-semibold text-white">PRA Audit Due</p>
            <p className="mt-0.5 text-[9px] text-secondary/50">14 days</p>
            <div className="mt-1.5 h-1 w-full rounded-full bg-secondary/10">
              <div className="h-1 w-3/4 rounded-full bg-primary/70" />
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
