---
title: Agentic AI Design Patterns for Regulated Enterprises
date: 2026-04-13
excerpt: How to architect AI agents that plan, reason, and act across enterprise workflows — with the governance controls that regulated industries demand.
tags:
  - Agents
  - Agentic AI
  - Architecture
  - Enterprise
---

# Agentic AI Design Patterns for Regulated Enterprises

How to architect AI agents that plan, reason, and act across enterprise workflows — with the governance controls that regulated industries demand.

---

## What Makes an Agent Different

Most enterprise AI deployments are pipelines — a prompt goes in, a response comes out. Agents are different. An agent **perceives its environment, decides what to do next, executes actions, and adapts based on results** — in a loop, without a human directing each step.

This capability is transformative for regulated enterprises. A compliance agent doesn't just answer questions about PRA rules — it reads the regulation, identifies the relevant obligation, retrieves the firm's control documentation, identifies the gap, drafts the remediation plan, and flags it for human review. That is an entire workflow that previously required a team.

The challenge is that this power comes with risk. In banking, healthcare, and public sector environments, an agent that takes the wrong action — sends the wrong data, creates the wrong document, escalates the wrong case — causes real harm. Governance must be built in from the start.

---

## The Core Agent Loop

Every agent operates on the same fundamental cycle:

```mermaid
flowchart LR
    P([Perceive]) --> T([Think])
    T --> A([Act])
    A --> O([Observe])
    O --> P
    T --> H([Human Review])
    H --> A

    style P fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style T fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style A fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style O fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style H fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

**Perceive** — the agent receives input: a user query, a trigger event, a document, a data feed.

**Think** — the LLM reasons about what to do. In advanced agents, this uses chain-of-thought, scratchpad reasoning, or a formal planning step (ReAct, LATS, or tree-of-thought).

**Act** — the agent calls a tool: a search function, an API, a database query, a document generator.

**Observe** — the agent reads the result of its action and decides whether to continue, retry, or escalate.

The **Human Review** node is critical in regulated environments. Not every decision should proceed automatically. The agent should know when to pause and request human approval.

---

## Five Production Agent Patterns

### Pattern 1: ReAct (Reasoning + Acting)

The most widely deployed agent pattern. The LLM interleaves reasoning steps ("I need to find the PRA obligation for model risk...") with action calls ("search_regulation('PRA SS1/23 model risk')"). The trace of reasoning steps is logged for audit.

```mermaid
sequenceDiagram
    participant U as User
    participant A as Agent
    participant T as Tool Layer
    participant L as Audit Log

    U->>A: "What is our model risk exposure under PRA SS1/23?"
    A->>L: Log: reasoning step 1
    A->>T: search_regulation("PRA SS1/23 §4")
    T-->>A: Regulation text returned
    A->>L: Log: reasoning step 2
    A->>T: query_controls_db("model risk governance")
    T-->>A: Control list returned
    A->>L: Log: reasoning step 3
    A->>T: gap_analysis(obligations, controls)
    T-->>A: 3 gaps identified
    A->>L: Log: final answer + evidence
    A-->>U: Summary with gap list + audit trail
```

**Why it works in regulated environments:** every step is logged, the reasoning is traceable, and tools are discrete functions with defined inputs/outputs that can be audited.

### Pattern 2: Plan-and-Execute

The agent first produces a complete plan (a sequence of steps), then executes each step. This separates planning from execution — useful when the plan needs human approval before any actions are taken.

```mermaid
flowchart TD
    A[Receive Task] --> B[Generate Plan]
    B --> C{Human Approval}
    C -->|Approved| D[Execute Step 1]
    C -->|Rejected| B
    D --> E[Execute Step 2]
    E --> F[Execute Step N]
    F --> G[Compile Result]
    G --> H{Quality Check}
    H -->|Pass| I[Deliver Output]
    H -->|Fail| D

    style C fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
    style H fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
```

This is the recommended pattern for **high-stakes actions** — regulatory submissions, patient pathway changes, treasury position adjustments.

### Pattern 3: Multi-Agent Orchestration

Complex enterprise tasks require multiple specialised agents working together. A Planner agent breaks down the task; Specialist agents (Compliance, Data, Reporting) each handle their domain; a Critic agent reviews the output.

```mermaid
flowchart TD
    O[Orchestrator Agent] --> C[Compliance Agent]
    O --> D[Data Agent]
    O --> R[Reporting Agent]
    C --> CR[Critic Agent]
    D --> CR
    R --> CR
    CR --> O
    O --> H[Human Sign-off]

    style O fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style CR fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style H fill:#2D6A4F,stroke:#4ade80,color:#E6ECF7
```

In LorvexAI's Regulatory Intelligence Platform, the Orchestrator receives the audit task, dispatches to the Compliance Agent (obligations), Data Agent (evidence retrieval), and Reporting Agent (pack generation). The Critic validates consistency before the package goes for human sign-off.

### Pattern 4: Tool-Augmented Agent

Tools are the hands of an agent. In enterprise environments, tools must be **bounded, logged, and reversible where possible**. Each tool is a typed function with a defined schema, error handling, and an audit record.

```mermaid
flowchart LR
    A[Agent] --> T1[search_documents]
    A --> T2[query_database]
    A --> T3[generate_report]
    A --> T4[send_notification]
    A --> T5[flag_for_review]

    T1 --> AL[Audit Log]
    T2 --> AL
    T3 --> AL
    T4 --> AL
    T5 --> AL

    style AL fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
```

**Principle:** agents in regulated environments should prefer **read tools over write tools**, always log every action, and require elevated permission for irreversible actions (send, submit, delete).

### Pattern 5: Human-in-the-Loop (HITL) Agent

For the highest-risk decisions — a referral triage changing a patient's priority, a compliance gap triggering a regulatory notification — the agent pauses, presents its reasoning, and requests explicit human confirmation.

```mermaid
sequenceDiagram
    participant A as Agent
    participant Q as Review Queue
    participant H as Human Reviewer
    participant S as Downstream System

    A->>Q: Flag decision for review (confidence < 85%)
    Q-->>H: Notification with context + reasoning
    H->>Q: Approve / Reject / Edit
    Q-->>A: Decision returned
    A->>S: Execute approved action
    A->>A: Log outcome for model improvement
```

The threshold for HITL intervention is configurable — in NHS triage, any HIGH urgency referral always passes through a clinician. In PRA compliance, any gap rated HIGH risk requires a compliance officer to approve the remediation plan.

---

## Governance Architecture for Agentic Systems

Governance is not an afterthought — it is a first-class architectural component.

```mermaid
flowchart TD
    subgraph Input Layer
        U[User / Trigger]
        G1[Input Guardrails]
    end

    subgraph Agent Core
        P[Planner]
        E[Executor]
        M[Memory]
    end

    subgraph Control Layer
        PL[Policy Engine]
        AL[Audit Logger]
        RL[Rate Limiter]
        EB[Escalation Bus]
    end

    subgraph Output Layer
        G2[Output Guardrails]
        O[Delivered Output]
    end

    U --> G1 --> P
    P --> PL
    PL -->|Permitted| E
    PL -->|Blocked| EB
    E --> AL
    E --> M
    E --> G2 --> O
    G2 -->|Violation| EB
    EB --> AL

    style PL fill:#7B2FBE,stroke:#a855f7,color:#E6ECF7
    style AL fill:#1D4C8F,stroke:#2F80ED,color:#E6ECF7
    style EB fill:#C0392B,stroke:#e74c3c,color:#E6ECF7
```

**Policy Engine** — every agent action is checked against a policy ruleset before execution. In a banking agent, this includes: "never write to production systems without human approval", "never access data outside this user's permissions", "always attach evidence citations".

**Audit Logger** — every perception, reasoning step, tool call, and output is immutably logged with timestamps and user context. This is non-negotiable in FCA and PRA-regulated environments.

**Escalation Bus** — violations, blocked actions, and low-confidence decisions route to a human review queue rather than failing silently.

---

## Common Failure Modes to Design Against

| Failure Mode | Description | Mitigation |
|---|---|---|
| **Hallucinated tool calls** | Agent invents function names or parameters | Strict tool schema validation, constrained output format |
| **Infinite loops** | Agent cannot complete task and retries endlessly | Max iteration limits, loop detection, forced escalation |
| **Context overflow** | Long chains exhaust the context window | Summarisation at checkpoints, memory management |
| **Permission creep** | Agent requests unnecessary tool access | Least-privilege tool design, per-task scoped access |
| **Silent failure** | Tool call fails but agent continues as if it succeeded | Mandatory error handling in every tool wrapper |
| **Goal drift** | Agent optimises for an intermediate goal not the original intent | Goal anchoring in system prompt, Critic agent review |

---

## LorvexAI's Agentic AI Implementation

All three LorvexAI products are built on an agentic core. The Regulatory Intelligence Platform uses a Plan-and-Execute pattern with a Critic agent validating obligation mappings before any evidence package is generated. The NHS Flow Optimizer uses a ReAct pattern for referral triage, with a mandatory HITL checkpoint for HIGH urgency cases. Treasury Sentinel uses a multi-agent pattern with specialist agents for position monitoring, stress testing, and ALCO pack generation.

Every agent deployment includes our four governance primitives: scoped tool access, immutable audit logging, policy engine enforcement, and configurable HITL thresholds.

---

*Ready to deploy agentic AI in your organisation? [Book a discovery call](/contact) to explore how LorvexAI can build a governed agentic system for your use case.*
