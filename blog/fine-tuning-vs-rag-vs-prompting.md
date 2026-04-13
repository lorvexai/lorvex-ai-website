---
title: Fine-Tuning vs RAG vs Prompting — Choosing the Right Approach
date: 2026-04-13
excerpt: A practical decision framework for choosing between prompt engineering, retrieval-augmented generation, and fine-tuning for enterprise AI deployments in regulated industries.
tags:
  - Tuning
  - RAG
  - LLM Engineering
  - Enterprise
---

# Fine-Tuning vs RAG vs Prompting — Choosing the Right Approach

A practical decision framework for choosing between prompt engineering, retrieval-augmented generation, and fine-tuning for enterprise AI deployments in regulated industries.

---

## The Decision That Shapes Everything

The most consequential technical decision in an enterprise AI project is often made too quickly: how do you get the model to produce the output you need?

Three approaches dominate:

- **Prompt engineering** — craft instructions that guide the model's existing knowledge
- **RAG (Retrieval-Augmented Generation)** — inject relevant external documents at query time
- **Fine-tuning** — update the model's weights with domain-specific training data

Each has a different cost profile, capability profile, and risk profile. Getting this wrong wastes months of engineering effort and produces a system that either fails silently or fails expensively.

---

## Visual Overview: The Three Approaches

```mermaid
flowchart TD
    subgraph Prompting
        P1[Model weights unchanged]
        P2[Instructions in context]
        P3[Works immediately]
        P4[Limited by context window]
    end

    subgraph RAG
        R1[Model weights unchanged]
        R2[Relevant docs injected at runtime]
        R3[Knowledge always current]
        R4[Retrieval quality is the bottleneck]
    end

    subgraph FineTuning
        F1[Model weights updated]
        F2[Domain knowledge baked in]
        F3[Fast inference, no retrieval]
        F4[Expensive, needs labelled data]
    end

    style P1 fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style R1 fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
    style F1 fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
```

---

## When to Use Each Approach

### Prompt Engineering — Start Here, Always

Prompt engineering is the baseline. Before considering RAG or fine-tuning, exhaust what prompting can achieve. It requires no infrastructure, no training data, and can be iterated in hours.

**Best for:**
- Formatting and structure control (output as JSON, tables, bullet lists)
- Tone and persona (formal regulatory language, clinical brevity)
- Chain-of-thought reasoning (step-by-step compliance analysis)
- Task decomposition (breaking a complex question into sub-queries)
- Role assignment (acting as a PRA compliance specialist)

**Limitations:**
- Cannot add factual knowledge the model doesn't have
- Cannot handle documents larger than the context window
- Inconsistent across model updates (prompt that works on GPT-4o may break on GPT-4o-mini)
- No audit trail of what knowledge was used

```mermaid
flowchart LR
    Q[Query] --> SP[System Prompt]
    SP --> LLM[LLM - existing weights]
    LLM --> O[Output]

    SP --> |Role| R["You are a PRA compliance expert..."]
    SP --> |Format| F["Return as structured JSON..."]
    SP --> |Reasoning| RE["Think step by step..."]

    style SP fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
```

**Prompt engineering decision**: if your task requires the model to be smarter, better reasoned, or better formatted — prompting. If it requires the model to know things it doesn't know — you need RAG or fine-tuning.

---

### RAG — The Right Default for Enterprise Knowledge

RAG is the right approach for **most enterprise AI use cases** involving proprietary or frequently-updated knowledge: regulatory libraries, clinical guidelines, internal policies, customer records, market data.

```mermaid
flowchart TD
    subgraph RAG Pipeline
        Q[User Query] --> QE[Query Embedding]
        QE --> VS[Vector Search]
        VS --> RR[Rerank Top-K]
        RR --> CTX[Build Context]
        CTX --> LLM[LLM + Retrieved Context]
        LLM --> O[Grounded Output + Citations]
    end

    subgraph Knowledge Base
        D1[PRA Rulebook] --> VS
        D2[FCA Handbook] --> VS
        D3[Internal Controls] --> VS
        D4[Basel Framework] --> VS
    end

    style VS fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style RR fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style O fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

**Best for:**
- Large, frequently updated document corpora (regulations, guidelines, policies)
- Situations where every answer must cite its source
- Reducing hallucination on factual queries
- Knowledge that changes faster than you can retrain (new regulatory circulars)
- Audit trail requirements (retrieve + log = provenance)

**Limitations:**
- Only as good as what's in the knowledge base
- Retrieval failures lead to answer failures
- Adds latency (retrieval + reranking + generation)
- Requires ongoing knowledge base maintenance

**RAG decision**: if the knowledge exists in documents you own and trust, and queries are primarily about retrieving and reasoning over that knowledge — RAG.

---

### Fine-Tuning — Targeted, Expensive, Powerful

Fine-tuning updates the model's weights using domain-specific training data, teaching it to produce specific types of outputs consistently. It is not primarily about adding factual knowledge (RAG does that better) — it is about changing **behaviour, style, and output format**.

```mermaid
flowchart TD
    subgraph Fine-Tuning Process
        BD[Base Model] --> TR[Training on Domain Data]
        TR --> FT[Fine-Tuned Model]
    end

    subgraph Use in Production
        Q[Query] --> FT
        FT --> O[Output: consistent style + format]
    end

    subgraph Training Data
        EX1[Example 1: Query + Ideal Output]
        EX2[Example 2: Query + Ideal Output]
        EXN[Example N: Query + Ideal Output]
        EX1 --> TR
        EX2 --> TR
        EXN --> TR
    end

    style FT fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style TR fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
```

**Best for:**
- Consistent output format (structured regulatory reports, clinical summaries)
- Domain tone and vocabulary (regulatory English, clinical language)
- Latency-critical paths where retrieval overhead is too slow
- Teaching the model specialised reasoning patterns (e.g., always map obligation → control → evidence)
- Reducing prompt length for cost optimisation at scale

**When NOT to fine-tune:**
- When the knowledge changes frequently (fine-tuned weights go stale)
- When you need citeable sources (fine-tuning doesn't give you provenance)
- When you have fewer than ~1,000 high-quality training examples
- When prompting or RAG hasn't been exhausted first

**Cost reality**: fine-tuning a frontier model costs thousands of pounds, takes days, and requires a curated labelled dataset. It should be a considered decision, not a first resort.

---

## The Decision Framework

```mermaid
flowchart TD
    A{Does the model need\nnew factual knowledge?} -->|Yes| B{Does the knowledge\nchange frequently?}
    A -->|No| C{Is output format/style\ninconsistent?}

    B -->|Yes| RAG[Use RAG]
    B -->|No| D{Do you have 1000+\nlabelled examples?}

    D -->|Yes| E{Is latency critical\nor cost at scale?}
    D -->|No| RAG

    E -->|Yes| FT[Consider Fine-Tuning\n+ RAG for knowledge]
    E -->|No| RAG

    C -->|Yes| F{Can prompting fix it?}
    C -->|No| PE[Prompt Engineering Only]

    F -->|Yes| PE
    F -->|No| FT2[Fine-Tuning for Style]

    style RAG fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
    style FT fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style FT2 fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style PE fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
```

---

## Combining Approaches: The Hybrid Stack

In practice, production systems use all three together:

```mermaid
flowchart LR
    Q[Query] --> SP[System Prompt\nEngineering]
    SP --> RAG[RAG\nKnowledge Retrieval]
    RAG --> FT[Fine-Tuned Model\nDomain Style]
    FT --> O[High-quality\nGrounded Output]

    style SP fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style RAG fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
    style FT fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
```

**LorvexAI's approach for the Regulatory Intelligence Platform:**
1. **Prompt engineering** — role assignment (PRA compliance specialist), reasoning format (obligation → control → gap → recommendation), output structure (JSON + narrative)
2. **RAG** — retrieves the precise regulatory text, internal controls inventory, and evidence documents for each query
3. **Fine-tuning** — a domain-adapted model trained on 2,400 examples of regulatory mapping outputs, ensuring consistent PRA-grade language and report structure

The result: a system where factual accuracy comes from RAG (with citations), consistent quality comes from fine-tuning, and reasoning depth comes from prompt engineering.

---

## Cost and Effort Comparison

| Dimension | Prompting | RAG | Fine-Tuning |
|---|---|---|---|
| **Setup time** | Hours | Days–Weeks | Weeks–Months |
| **Engineering effort** | Low | Medium–High | High |
| **Labelled data required** | None | None | 500–10,000+ examples |
| **Knowledge freshness** | Stale (training cutoff) | Live | Stale (training date) |
| **Source citation** | No | Yes | No |
| **Inference cost** | Baseline | Baseline + retrieval | Lower per-token |
| **Regulatory auditability** | Low | High | Medium |

---

## Recommendation for Regulated Enterprises

Start with **RAG + prompt engineering**. This gets you to production with:
- Grounded, citable answers
- Live knowledge (updated as regulations change)
- Full audit trail
- No training data required

Add **fine-tuning** only when you have:
- A stable, well-defined output format that prompting doesn't reliably produce
- High query volume making inference cost a concern
- A curated, high-quality labelled dataset from domain experts
- A model risk process for the fine-tuned model (it is a model, and therefore in scope for PRA SS1/23)

---

*Unsure which approach fits your use case? [Book a technical consultation](/contact) — we'll map the right architecture for your data, your compliance requirements, and your timeline.*
