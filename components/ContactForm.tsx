"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle,
  ChevronLeft, ChevronRight, Calendar, Clock, User, Building2
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  useCase: string;
  budget: string;
  description: string;
  preferredDate: Date | null;
  preferredTime: string;
  privacy: boolean;
  captchaAnswer: string;
}

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "", company: "", jobTitle: "",
  useCase: "", budget: "", description: "",
  preferredDate: null, preferredTime: "",
  privacy: false, captchaAnswer: ""
};

const USE_CASES = [
  "Regulatory Compliance Automation (Finance)",
  "Treasury & Liquidity Intelligence (Finance)",
  "NHS Referral Triage (Healthcare)",
  "Clinical Workflow Automation (Healthcare)",
  "Enterprise AI Governance",
  "Multi-Model AI Platform",
  "Model Risk Governance (PRA SS1/23)",
  "Custom AI Development",
  "General Enquiry"
];

const BUDGETS = [
  "Exploring options — no budget set yet",
  "Under £25K",
  "£25K – £50K",
  "£50K – £100K",
  "£100K – £250K",
  "£250K+",
  "Prefer not to say"
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "2:00 PM", "3:00 PM",  "4:00 PM"
];

/* ─── Helpers ─────────────────────────────────────────────────────── */
function getMinDate(): Date {
  const d = new Date();
  let biz = 0;
  while (biz < 2) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) biz++;
  }
  d.setHours(0, 0, 0, 0);
  return d;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/* ─── Calendar component ─────────────────────────────────────────── */
function CalendarPicker({
  selected, onSelect
}: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = useMemo(getMinDate, []);

  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const last  = new Date(view.year, view.month + 1, 0);
    // Monday-based week offset
    let offset = first.getDay() - 1;
    if (offset < 0) offset = 6;
    const arr: (Date | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= last.getDate(); d++) {
      arr.push(new Date(view.year, view.month, d));
    }
    return arr;
  }, [view]);

  const monthLabel = new Date(view.year, view.month).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const canPrev = view.year > today.getFullYear() || view.month > today.getMonth();
  const canNext = (view.year - today.getFullYear()) * 12 + (view.month - today.getMonth()) < 3;

  function prevMonth() {
    if (!canPrev) return;
    setView(v => v.month === 0
      ? { year: v.year - 1, month: 11 }
      : { year: v.year, month: v.month - 1 });
  }
  function nextMonth() {
    if (!canNext) return;
    setView(v => v.month === 11
      ? { year: v.year + 1, month: 0 }
      : { year: v.year, month: v.month + 1 });
  }

  return (
    <div className="rounded-2xl border border-secondary/20 bg-background/40 p-4">
      {/* Month nav */}
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={prevMonth} disabled={!canPrev}
          className="rounded-full p-1.5 text-secondary/60 transition hover:text-white disabled:opacity-25">
          <ChevronLeft size={15} />
        </button>
        <p className="text-sm font-semibold text-white">{monthLabel}</p>
        <button type="button" onClick={nextMonth} disabled={!canNext}
          className="rounded-full p-1.5 text-secondary/60 transition hover:text-white disabled:opacity-25">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className={`text-center text-[10px] font-semibold uppercase tracking-wide ${
            d === "Sa" || d === "Su" ? "text-secondary/25" : "text-secondary/45"
          }`}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;
          const dow = date.getDay(); // 0=Sun 6=Sat
          const isWeekend = dow === 0 || dow === 6;
          const isPast = date < minDate;
          const isDisabled = isWeekend || isPast;
          const isSelected = selected && sameDay(date, selected);
          const isToday = sameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(date)}
              className={`relative rounded-lg py-1.5 text-xs transition ${
                isSelected
                  ? "bg-primary text-white font-semibold"
                  : isDisabled
                  ? "text-secondary/20 cursor-not-allowed"
                  : "text-secondary/75 hover:bg-primary/20 hover:text-white"
              }`}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step progress bar ──────────────────────────────────────────── */
function StepBar({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "Your Details" },
    { n: 2, label: "Requirements" },
    { n: 3, label: "Schedule" }
  ];
  return (
    <div className="mb-7 flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.n} className="flex flex-1 items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition ${
              step > s.n
                ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-300"
                : step === s.n
                ? "border-primary bg-primary/20 text-primary"
                : "border-secondary/20 bg-background/30 text-secondary/35"
            }`}>
              {step > s.n ? <CheckCircle2 size={13} /> : s.n}
            </div>
            <span className={`hidden text-[9px] uppercase tracking-[0.15em] sm:block ${
              step === s.n ? "text-primary" : "text-secondary/35"
            }`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`mx-1 h-px flex-1 transition ${step > s.n + 0 ? "bg-emerald-400/30" : "bg-secondary/15"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Field styles ───────────────────────────────────────────────── */
const INPUT = "w-full rounded-xl border border-secondary/20 bg-background/60 px-4 py-2.5 text-sm text-white outline-none transition placeholder-secondary/35 focus:border-primary/60 focus:ring-1 focus:ring-primary/30";
const LABEL = "block mb-1.5 text-xs font-medium text-secondary/65";
const ERR   = "mt-1 text-[11px] text-red-400";

/* ─── Main component ─────────────────────────────────────────────── */
export default function ContactForm() {
  const [step, setStep]     = useState(1);
  const [data, setData]     = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Math CAPTCHA — stable across renders until reset
  const [captcha] = useState(() => ({
    n1: Math.floor(Math.random() * 9) + 1,
    n2: Math.floor(Math.random() * 9) + 1
  }));

  function set(field: keyof FormData, value: string | boolean | Date | null) {
    setData(d => ({ ...d, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  }

  /* ── Validation ── */
  function validateStep(s: number): boolean {
    const e: typeof errors = {};
    if (s === 1) {
      if (!data.firstName.trim()) e.firstName = "Required";
      if (!data.lastName.trim())  e.lastName  = "Required";
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "Valid work email required";
      if (!data.company.trim()) e.company = "Required";
    }
    if (s === 2) {
      if (!data.useCase)  e.useCase  = "Please select a use case";
      if (!data.budget)   e.budget   = "Please select a budget range";
    }
    if (s === 3) {
      if (!data.preferredDate) e.preferredDate = "Please select a date";
      if (!data.preferredTime) e.preferredTime = "Please select a time";
      if (!data.privacy)       e.privacy       = "You must accept the privacy policy to proceed";
      if (!data.captchaAnswer.trim() || parseInt(data.captchaAnswer) !== captcha.n1 + captcha.n2)
        e.captchaAnswer = `Incorrect — the answer is ${captcha.n1 + captcha.n2}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) setStep(s => s + 1);
  }
  function prevStep() {
    setStep(s => s - 1);
    setErrors({});
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(3)) return;
    setStatus("sending");

    const body = new FormData();
    body.append("First Name",       data.firstName);
    body.append("Last Name",        data.lastName);
    body.append("Email",            data.email);
    body.append("Company",          data.company);
    body.append("Job Title",        data.jobTitle || "—");
    body.append("Use Case",         data.useCase);
    body.append("Budget",           data.budget);
    body.append("Description",      data.description || "—");
    body.append("Preferred Date",   data.preferredDate ? formatDate(data.preferredDate) : "—");
    body.append("Preferred Time",   data.preferredTime);

    try {
      // ⚠️  Replace xpwzebqp with your own Formspree form ID
      const res = await fetch("https://formspree.io/f/xpwzebqp", {
        method: "POST",
        body,
        headers: { Accept: "application/json" }
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  /* ── Success state ── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <CheckCircle2 size={30} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Booking confirmed!</h3>
          <p className="mt-2 max-w-sm text-sm text-secondary/70">
            Thank you, <span className="text-white">{data.firstName}</span>. We&apos;ll send a calendar invite to <span className="text-primary">{data.email}</span> and confirm your slot within 1 business day.
          </p>
          {data.preferredDate && data.preferredTime && (
            <div className="mx-auto mt-4 max-w-xs rounded-2xl border border-primary/25 bg-primary/10 px-5 py-3 text-sm">
              <p className="text-secondary/55 text-[11px] uppercase tracking-wide mb-1">Requested slot</p>
              <p className="text-white font-medium">{formatDate(data.preferredDate)}</p>
              <p className="text-primary">{data.preferredTime}</p>
            </div>
          )}
        </div>
        <button type="button" onClick={() => { setData(INITIAL); setStep(1); setStatus("idle"); }}
          className="text-sm text-secondary/50 hover:text-white transition">
          Submit another enquiry →
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate>
      <StepBar step={step} />

      {/* ── Step 1: Details ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL}>First Name <span className="text-red-400">*</span></label>
              <input className={INPUT} type="text" placeholder="Jane"
                value={data.firstName} onChange={e => set("firstName", e.target.value)} />
              {errors.firstName && <p className={ERR}>{errors.firstName}</p>}
            </div>
            <div>
              <label className={LABEL}>Last Name <span className="text-red-400">*</span></label>
              <input className={INPUT} type="text" placeholder="Smith"
                value={data.lastName} onChange={e => set("lastName", e.target.value)} />
              {errors.lastName && <p className={ERR}>{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label className={LABEL}>Work Email <span className="text-red-400">*</span></label>
            <input className={INPUT} type="email" placeholder="jane.smith@company.com"
              value={data.email} onChange={e => set("email", e.target.value)} />
            {errors.email && <p className={ERR}>{errors.email}</p>}
          </div>
          <div>
            <label className={LABEL}>Company / Organisation <span className="text-red-400">*</span></label>
            <input className={INPUT} type="text" placeholder="Barclays / NHS Trust / ..."
              value={data.company} onChange={e => set("company", e.target.value)} />
            {errors.company && <p className={ERR}>{errors.company}</p>}
          </div>
          <div>
            <label className={LABEL}>Job Title <span className="text-secondary/35">(optional)</span></label>
            <input className={INPUT} type="text" placeholder="Head of Regulatory Change"
              value={data.jobTitle} onChange={e => set("jobTitle", e.target.value)} />
          </div>
        </div>
      )}

      {/* ── Step 2: Requirements ── */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className={LABEL}>Which use case would you like to discuss? <span className="text-red-400">*</span></label>
            <select className={INPUT} value={data.useCase} onChange={e => set("useCase", e.target.value)}>
              <option value="">Select a use case…</option>
              {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            {errors.useCase && <p className={ERR}>{errors.useCase}</p>}
          </div>
          <div>
            <label className={LABEL}>Approximate budget planned <span className="text-red-400">*</span></label>
            <select className={INPUT} value={data.budget} onChange={e => set("budget", e.target.value)}>
              <option value="">Select a range…</option>
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.budget && <p className={ERR}>{errors.budget}</p>}
          </div>
          <div>
            <label className={LABEL}>Brief description <span className="text-secondary/35">(optional)</span></label>
            <textarea className={INPUT} rows={4}
              placeholder="What are you trying to achieve? What does success look like for your organisation?"
              value={data.description} onChange={e => set("description", e.target.value)} />
          </div>
        </div>
      )}

      {/* ── Step 3: Schedule ── */}
      {step === 3 && (
        <div className="space-y-5">
          {/* Calendar */}
          <div>
            <label className={LABEL}>
              <Calendar size={12} className="inline mr-1.5 -mt-0.5" />
              Select a preferred date <span className="text-red-400">*</span>
            </label>
            <CalendarPicker selected={data.preferredDate} onSelect={d => set("preferredDate", d)} />
            {data.preferredDate && (
              <p className="mt-1.5 text-xs text-primary">
                ✓ {formatDate(data.preferredDate)}
              </p>
            )}
            {errors.preferredDate && <p className={ERR}>{errors.preferredDate}</p>}
          </div>

          {/* Time slots */}
          <div>
            <label className={LABEL}>
              <Clock size={12} className="inline mr-1.5 -mt-0.5" />
              Preferred time (UK / GMT) <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {TIME_SLOTS.map(t => (
                <button key={t} type="button" onClick={() => set("preferredTime", t)}
                  className={`rounded-xl border py-2 text-xs font-medium transition ${
                    data.preferredTime === t
                      ? "border-primary bg-primary/25 text-white"
                      : "border-secondary/20 bg-background/30 text-secondary/65 hover:border-primary/40 hover:text-white"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
            {errors.preferredTime && <p className={ERR}>{errors.preferredTime}</p>}
          </div>

          {/* Privacy */}
          <div>
            <label className="flex gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input type="checkbox" className="sr-only peer"
                  checked={data.privacy} onChange={e => set("privacy", e.target.checked)} />
                <div className={`h-4 w-4 rounded border transition ${
                  data.privacy
                    ? "border-primary bg-primary"
                    : "border-secondary/30 bg-background/40 hover:border-primary/50"
                }`}>
                  {data.privacy && (
                    <svg viewBox="0 0 12 12" fill="none" className="absolute inset-0 p-0.5">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs leading-relaxed text-secondary/65">
                I agree to LorvexAI processing my personal data to respond to this enquiry, in accordance with our{" "}
                <a href="#" className="text-primary underline underline-offset-2">Privacy Policy</a>.
                Data is stored securely and never sold or shared with third parties.{" "}
                <span className="text-red-400">*</span>
              </span>
            </label>
            {errors.privacy && <p className={ERR}>{errors.privacy}</p>}
          </div>

          {/* CAPTCHA */}
          <div>
            <label className={LABEL}>
              Security check: what is {captcha.n1} + {captcha.n2}? <span className="text-red-400">*</span>
            </label>
            <input className={`${INPUT} max-w-[120px]`} type="number" placeholder="Answer"
              value={data.captchaAnswer} onChange={e => set("captchaAnswer", e.target.value)} />
            {errors.captchaAnswer && <p className={ERR}>{errors.captchaAnswer}</p>}
          </div>
        </div>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={14} />
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:hello@lorvex.ai" className="underline">hello@lorvex.ai</a>
        </div>
      )}

      {/* Navigation */}
      <div className={`mt-7 flex items-center ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && (
          <button type="button" onClick={prevStep}
            className="inline-flex items-center gap-1.5 text-sm text-secondary/60 transition hover:text-white">
            <ArrowLeft size={14} /> Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={nextStep}
            className="btn-primary gap-2 text-sm">
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"}
            className="btn-primary gap-2 text-sm disabled:cursor-not-allowed disabled:opacity-60">
            {status === "sending" ? "Booking…" : "Book the Call"}
            {status !== "sending" && <ArrowRight size={14} />}
          </button>
        )}
      </div>

      {/* Step hint */}
      <p className="mt-3 text-center text-[10px] text-secondary/35">
        Step {step} of 3 · Your information is encrypted and never shared
      </p>
    </form>
  );
}
