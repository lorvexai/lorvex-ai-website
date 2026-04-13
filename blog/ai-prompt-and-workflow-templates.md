---
title: AI Prompt and Workflow Templates for Finance and Healthcare
date: 2026-04-13
excerpt: Production-tested prompt patterns and reusable workflow templates for regulated AI deployments — covering compliance analysis, clinical summarisation, risk reporting, and agentic task orchestration.
tags:
  - Templates
  - LLM Engineering
  - Enterprise
  - Workflows
---

# AI Prompt and Workflow Templates for Finance and Healthcare

Production-tested prompt patterns and reusable workflow templates for regulated AI deployments — covering compliance analysis, clinical summarisation, risk reporting, and agentic task orchestration.

---

## Why Templates Matter in Enterprise AI

Enterprise AI fails not because the models are incapable but because teams reinvent the same patterns repeatedly — each team writing their own version of a compliance analysis prompt, each slightly different, none consistently reliable.

Templates solve this by encoding **proven patterns** into reusable building blocks. A well-designed prompt template for regulatory obligation extraction, tested on 500 examples and refined over three months, will consistently outperform a prompt written from scratch in an afternoon.

This article covers the core templates LorvexAI uses in production across the Regulatory Intelligence Platform, NHS Flow Optimizer, and Treasury Sentinel — structured as patterns you can adapt for your own deployments.

---

## The Anatomy of a Production Prompt Template

Every production prompt template has four components:

```mermaid
flowchart TD
    subgraph Prompt Template Structure
        SP[System Prompt\nRole + Constraints + Format]
        CP[Context Injection\nRetrieved docs / data]
        UP[User Prompt\nThe actual query or task]
        OP[Output Format Spec\nJSON schema / structure]
    end

    SP --> LLM[LLM]
    CP --> LLM
    UP --> LLM
    OP --> LLM
    LLM --> O[Structured Output]

    style SP fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style CP fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style OP fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

**System Prompt** — sets the role, constraints, and non-negotiable rules. This is where compliance guardrails live.

**Context Injection** — the retrieved documents, data, or previous conversation injected at runtime. This is where RAG plugs in.

**User Prompt** — the task or query, dynamically populated from user input or a workflow trigger.

**Output Format Spec** — explicit instructions for response structure, including JSON schemas for machine-parseable outputs.

---

## Finance and Banking Templates

### Template 1: Regulatory Obligation Extraction

**Use case:** Extract structured obligations from a regulatory document section.

```
SYSTEM:
You are a regulatory obligations analyst specialising in PRA, FCA, and Basel frameworks.
Your task is to extract obligations from the provided regulatory text.

Rules:
- Extract ONLY obligations explicitly stated in the text
- Do NOT infer obligations not stated
- Classify each as: SHALL (mandatory), SHOULD (recommended), MAY (permitted)
- Every obligation must reference the exact section it came from
- Output as JSON array only — no narrative

OUTPUT FORMAT:
{
  "obligations": [
    {
      "id": "OBL-001",
      "reference": "PRA SS1/23 §4.2",
      "text": "Exact obligation text from source",
      "type": "SHALL | SHOULD | MAY",
      "applies_to": ["model risk", "validation", ...],
      "deadline": "date if specified or null"
    }
  ]
}

CONTEXT:
{retrieved_regulatory_text}

USER:
Extract all obligations from the above regulatory text.
```

```mermaid
flowchart LR
    RT[Regulatory Text] --> TP[Template 1\nObligation Extractor]
    TP --> LLM[LLM]
    LLM --> OJ[Obligations JSON]
    OJ --> DB[Obligations Database]
    OJ --> CM[Control Mapper]

    style TP fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style OJ fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

---

### Template 2: Control Gap Analysis

**Use case:** Compare a set of regulatory obligations against existing controls and identify gaps.

```
SYSTEM:
You are a compliance gap analyst. You will receive:
1. A list of regulatory obligations (from regulation source)
2. A list of existing controls (from internal control inventory)

Your task is to identify gaps where obligations are not fully met by existing controls.

Rules:
- Match obligations to controls by topic and scope
- A gap exists when: no control exists, or the control is partial
- Rate each gap: HIGH (no control), MEDIUM (partial control), LOW (minor deficiency)
- Do NOT recommend specific remediation — only identify and classify gaps
- Output as structured JSON

CONTEXT:
OBLIGATIONS:
{obligations_json}

EXISTING CONTROLS:
{controls_json}

USER:
Identify all gaps between the provided obligations and controls.
```

---

### Template 3: ALCO Report Section Generator

**Use case:** Generate a structured ALCO board report section from treasury data.

```
SYSTEM:
You are a senior treasury analyst writing for an ALCO board report.
Write in formal UK financial English. Be precise with numbers. Use tables where data is comparative.

Rules:
- Do not speculate about future rates or market movements
- Every numeric claim must reference the provided data
- Flag any metric that has moved more than 5% week-on-week
- Keep executive summary to 3 sentences maximum
- Use PRA/Basel terminology throughout

CONTEXT:
TREASURY DATA:
{treasury_metrics_json}

PRIOR WEEK DATA:
{prior_week_metrics_json}

USER:
Generate the Liquidity Risk section of this week's ALCO report.
Include: Executive Summary, LCR/NSFR metrics table, week-on-week commentary, and alerts.
```

```mermaid
flowchart LR
    TD[Treasury Data] --> T3[Template 3\nALCO Generator]
    PW[Prior Week Data] --> T3
    T3 --> LLM[LLM]
    LLM --> RS[Report Section]
    RS --> RV[Human Review]
    RV --> AP[Approved ALCO Pack]

    style T3 fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style RV fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

---

## NHS and Healthcare Templates

### Template 4: Referral Triage Summary

**Use case:** Generate a structured triage summary from an inbound GP referral letter.

```
SYSTEM:
You are a clinical triage assistant supporting NHS specialist teams.
You summarise GP referral letters to assist clinicians in prioritisation decisions.

Rules:
- You do NOT make clinical decisions — you summarise and flag key information
- Always flag: RED FLAGS (potential cancer/emergency indicators), COMORBIDITIES, MEDICATIONS
- Use standard NHS clinical terminology
- Output must be scannable in under 30 seconds
- Include a suggested urgency classification (ROUTINE / SOON / URGENT / TWO-WEEK-WAIT)
  with your reasoning — the clinician makes the final decision

CONTEXT:
REFERRAL LETTER:
{referral_text}

PATIENT HISTORY (anonymised):
{patient_history_summary}

USER:
Generate a structured triage summary for this referral.
```

```mermaid
flowchart TD
    RL[Referral Letter] --> AN[Anonymise PII]
    AN --> T4[Template 4\nTriage Summary]
    PH[Patient History] --> AN
    T4 --> LLM[LLM]
    LLM --> TS[Triage Summary]
    TS --> CL{Red Flags?}
    CL -->|Yes| EU[URGENT - Clinician Review]
    CL -->|No| QU[Standard Queue]

    style AN fill:#C0392B,stroke:#e74c3c,color:#E6ECF7
    style T4 fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style EU fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

---

### Template 5: Discharge Summary Generator

**Use case:** Draft a patient discharge summary from structured clinical notes.

```
SYSTEM:
You are a clinical documentation assistant supporting NHS ward teams.
You draft discharge summaries from structured clinical notes for clinician review and sign-off.

Rules:
- This is a DRAFT for clinician review — make this explicit in output
- Use standard ICD-10 terminology for diagnoses
- Include ALL medications with doses and durations
- Flag any outstanding investigations or follow-up actions
- Do NOT include information not present in the source notes
- Output in structured discharge summary format per NHS guidance

CONTEXT:
CLINICAL NOTES:
{clinical_notes}

INVESTIGATION RESULTS:
{investigation_results}

USER:
Draft a discharge summary for this patient episode.
```

---

### Template 6: Waiting List Intelligence Brief

**Use case:** Generate a weekly waiting list intelligence brief for a specialty team.

```
SYSTEM:
You are a healthcare operations analyst supporting NHS specialty teams.
Generate a concise weekly intelligence brief from waiting list data.

Rules:
- Highlight: patients approaching 18-week RTT threshold, unexpected volume changes, capacity constraints
- Flag any patient waiting > 40 weeks by name (ID only, no clinical details)
- Compare to same week last month and same week last year
- Keep narrative to 200 words maximum — use tables for data
- Recommend 1-3 specific operational actions

CONTEXT:
CURRENT WAITING LIST DATA:
{waiting_list_data}

HISTORICAL BENCHMARKS:
{benchmark_data}

USER:
Generate this week's waiting list intelligence brief for {specialty_name}.
```

---

## Workflow Templates

### Workflow Template A: Document Review and Obligation Extraction Pipeline

```mermaid
flowchart TD
    T[Trigger: New regulatory document uploaded] --> IN[Ingest & chunk document]
    IN --> EM[Embed & store in vector DB]
    IN --> T1[Template 1: Extract obligations]
    T1 --> OB[Obligations extracted]
    OB --> T2[Template 2: Gap analysis vs controls]
    T2 --> GA[Gaps identified]
    GA --> PR{Priority gaps?}
    PR -->|HIGH gaps| AL[Alert compliance team]
    PR -->|MEDIUM/LOW| QU[Add to review queue]
    AL --> T3[Template: Draft remediation brief]
    T3 --> HU[Human review & sign-off]

    style T fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style PR fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style AL fill:#C0392B,stroke:#e74c3c,color:#E6ECF7
    style HU fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

### Workflow Template B: NHS Referral Processing Pipeline

```mermaid
flowchart TD
    T[Trigger: New referral received] --> AN[Anonymise PII]
    AN --> T4[Template 4: Triage summary]
    T4 --> RF{Red flags detected?}
    RF -->|Yes| UR[URGENT - immediate clinician alert]
    RF -->|No| CL[Urgency classification]
    CL --> C2{Classification}
    C2 -->|TWO-WEEK-WAIT| TW[Fast-track pathway]
    C2 -->|URGENT| UQ[Urgent queue - 2 days]
    C2 -->|SOON| SQ[Soon queue - 4 weeks]
    C2 -->|ROUTINE| RQ[Routine queue - 18 weeks]
    UR --> UR2[Clinician confirms / overrides]
    TW --> UR2
    UQ --> SC[Schedule appointment]
    SQ --> SC
    RQ --> SC
    SC --> PT[Patient notification]

    style RF fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style UR fill:#C0392B,stroke:#e74c3c,color:#E6ECF7
    style UR2 fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

### Workflow Template C: Daily Treasury Monitoring Pipeline

```mermaid
flowchart TD
    T[Trigger: 6am data feed] --> AG[Aggregate positions]
    AG --> MT[Compute LCR / NSFR / metrics]
    MT --> TH{Threshold breach?}
    TH -->|Yes| ST[Run stress scenarios]
    TH -->|No| DB[Update ALCO dashboard]
    ST --> AL[Alert treasury team]
    AL --> T3[Template 3: Draft board memo]
    T3 --> CF[CFO review]
    CF --> AP[Approved + distributed]
    DB --> WR[Template: Weekly variance report]
    WR --> QU[Queue for Monday ALCO meeting]

    style TH fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style AL fill:#C0392B,stroke:#e74c3c,color:#E6ECF7
    style CF fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

---

## Template Governance: Version Control and Testing

Templates are code. They must be version-controlled, tested, and deployed with the same rigour as application code.

```mermaid
flowchart LR
    DE[Developer edits template] --> PR[Pull Request]
    PR --> EV[Automated eval run\non golden dataset]
    EV --> SC{Score vs baseline}
    SC -->|Regression| BL[Block merge]
    SC -->|Pass| RE[Peer review]
    RE --> ME[Merge to main]
    ME --> ST[Staging deploy]
    ST --> PR2[Production deploy]
    PR2 --> MO[Monitor in production]

    style SC fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style BL fill:#C0392B,stroke:#e74c3c,color:#E6ECF7
    style MO fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

**Template versioning best practices:**
- Every template has a version number (`obligation-extractor-v2.3`)
- Every LLM call logs the template version used — essential for reproducing outputs in an audit
- Breaking changes (those that alter output structure) increment the major version
- All production templates are stored in version control, not in a database or config file
- Template changes require an evaluation run against the golden dataset before deployment

---

## Building Your Own Template Library

Start with the highest-frequency, highest-value tasks in your team. For a compliance team:

1. **Week 1**: Identify the 3 tasks that consume the most time and have clear, structured outputs (obligation extraction, gap analysis, report drafting)
2. **Week 2**: Write the first version of each template, test manually on 20 examples
3. **Week 3**: Build a 100-example golden dataset, measure baseline performance
4. **Week 4**: Iterate on the worst-performing template, retest, deploy

After one month you will have three production-grade templates that consistently outperform ad-hoc prompting and save hours of manual work per week.

---

*The templates in this article are adapted from LorvexAI's production library. Want access to the full template library for your domain? [Get in touch](/contact).*
