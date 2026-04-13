import MockupFrame from "./MockupFrame";

const referrals = [
  { id: "REF-4821", patient: "M. Johnson, 67",  pathway: "Cardiology",      wait: "2d",  urgency: "High",   status: "Triaged"  },
  { id: "REF-4820", patient: "S. Patel, 44",    pathway: "Orthopaedics",    wait: "5d",  urgency: "Medium", status: "Queued"   },
  { id: "REF-4819", patient: "A. Williams, 81", pathway: "Respiratory",     wait: "1d",  urgency: "High",   status: "In Review"},
  { id: "REF-4818", patient: "D. Clarke, 55",   pathway: "Gastroenterology",wait: "8d",  urgency: "Low",    status: "Queued"   },
  { id: "REF-4817", patient: "L. Brown, 72",    pathway: "Neurology",       wait: "3d",  urgency: "Medium", status: "Triaged"  },
];

const urgencyStyle: Record<string, string> = {
  High:   "border-red-400/40     bg-red-400/15     text-red-300",
  Medium: "border-yellow-400/40  bg-yellow-400/15  text-yellow-300",
  Low:    "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
};
const statusStyle: Record<string, string> = {
  Triaged:    "text-emerald-400",
  "In Review":"text-yellow-400",
  Queued:     "text-secondary/50",
};

const wards = [
  { name: "Cardiology",   occ: 87, cap: 24 },
  { name: "Respiratory",  occ: 72, cap: 18 },
  { name: "Orthopaedics", occ: 91, cap: 32 },
  { name: "Neurology",    occ: 65, cap: 16 },
];

export default function NHSFlowMockup() {
  return (
    <MockupFrame title="app.lorvexai.com/nhs-flow-optimizer">
      {/* Top nav */}
      <div className="flex items-center justify-between border-b border-secondary/10 px-4 py-2.5" style={{ background: "rgba(12,25,48,0.9)" }}>
        <div className="flex gap-4">
          {["Overview", "Referrals", "Pathways", "Beds", "Reports"].map((t, i) => (
            <span key={t} className={`text-xs ${i === 1 ? "border-b border-emerald-400 pb-1 text-white" : "text-secondary/45"}`}>{t}</span>
          ))}
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      <div className="p-4">
        {/* Metric row */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[
            { label: "Pending Referrals", value: "84",   color: "text-yellow-300"  },
            { label: "Triaged Today",     value: "127",  color: "text-emerald-300" },
            { label: "Avg Triage Time",   value: "4.2s", color: "text-primary"     },
            { label: "Pathway Accuracy",  value: "94%",  color: "text-emerald-300" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-secondary/10 bg-background/40 p-2.5 text-center">
              <p className={`text-base font-bold ${m.color}`}>{m.value}</p>
              <p className="mt-0.5 text-[9px] text-secondary/45">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
          {/* Referral queue */}
          <div className="rounded-lg border border-secondary/10 overflow-hidden">
            <div className="flex items-center justify-between border-b border-secondary/10 bg-background/60 px-3 py-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-secondary/35">Referral Queue</span>
              <span className="rounded-full bg-red-400/15 px-2 py-0.5 text-[9px] text-red-300">3 urgent</span>
            </div>
            {referrals.map((r, i) => (
              <div key={r.id} className={`grid grid-cols-[auto_1.2fr_1fr_auto_auto_auto] items-center gap-2 px-3 py-2 ${i % 2 === 0 ? "bg-background/20" : ""}`}>
                <span className="font-mono text-[9px] text-secondary/40">{r.id}</span>
                <span className="text-[10px] text-white truncate">{r.patient}</span>
                <span className="text-[9px] text-secondary/55 truncate">{r.pathway}</span>
                <span className="text-[9px] text-secondary/40">{r.wait}</span>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] ${urgencyStyle[r.urgency]}`}>{r.urgency}</span>
                <span className={`text-[9px] font-medium ${statusStyle[r.status]}`}>{r.status}</span>
              </div>
            ))}
          </div>

          {/* Ward capacity */}
          <div className="w-28 rounded-lg border border-secondary/10 p-3" style={{ background: "rgba(12,25,48,0.6)" }}>
            <p className="mb-3 text-[9px] uppercase tracking-wider text-secondary/35">Ward Capacity</p>
            <div className="space-y-3">
              {wards.map((w) => {
                const pct = w.occ;
                const barColor = pct >= 90 ? "bg-red-400" : pct >= 75 ? "bg-yellow-400" : "bg-emerald-400";
                return (
                  <div key={w.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[9px] text-secondary/55">{w.name}</span>
                      <span className={`text-[9px] font-bold ${pct >= 90 ? "text-red-300" : pct >= 75 ? "text-yellow-300" : "text-emerald-300"}`}>{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-secondary/10">
                      <div className={`h-1.5 rounded-full ${barColor} opacity-75`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-2">
              <p className="text-[9px] font-semibold text-emerald-300">Discharges Today</p>
              <p className="mt-0.5 text-sm font-bold text-white">23</p>
              <p className="text-[9px] text-secondary/45">↑ 4 vs yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
