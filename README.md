# AI University Educational Workspace
>
> **Process-Oriented Academic Integrity Platform ("Google NotebookLM for Classrooms")**

A structured educational workspace designed to evaluate a student's **line of inquiry**, prompt branching, source interrogation, and synthesis transparently, rather than relying on flawed static AI-detection forensic scans.

---

## 1. Product Overview & Core Philosophy

Traditional AI detection software relies on adversarial forensic scanning that misidentifies authentic human writing and penalizes students arbitrarily.

This platform redefines academic integrity by shifting evaluation from **static output inspection** to **transparent process evaluation**.

Students conduct research, interrogate primary source materials, explore counterfactual prompt branches, challenge model hallucinations, and draft essays within a connected educational workspace. Instructors evaluate the student’s **line of inquiry**:

- How effectively the student interrogates primary and secondary source materials.
- How the student creates and tests counterfactual prompt branches.
- How the student identifies, challenges, and corrects model hallucinations.
- How transparently the student synthesizes AI insights into original human writing.

---

## 2. Core Feature Capabilities (Proof-of-Concept)

TBD

---

## 3. Tech Stack & Infrastructure

- **Framework**: React 18 + Vite 5 (Single Page Application)
- **Styling**: Modern Vanilla CSS with dark mode glassmorphism tokens, HSL palettes, and Inter typography
- **State & Data Persistence**: Client-side `localStorage` engine with default seed scenarios and a floating developer state reset overlay
- **Hosting Pipeline**: Static asset export deployed via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages

---

## 4. Agents Configuration

The project operates under a disciplined, multi-agent governance architecture designed for iterative co-authoring, advisory review, explicit user sign-offs, and automated build/test execution.

```mermaid
graph TD
    subgraph "Specification Lifecycle (Per Feature)"
        S1["Stage 1: User + Main Agent Spec Co-Authoring"]
        S2["Stage 2: Advisory Product Leader Review"]
        S3["Stage 3: Feedback Review & Refinement"]
        S4["Stage 4: User Sign-Off (status: APPROVED)"]
        
        S1 <-->|"Iterate Draft"| S2
        S2 --> S3
        S3 -->|"Refine Draft"| S1
        S3 -->|"User Approves"| S4
    end

    subgraph "Incremental Execution & QA Loops"
        S5["Stage 5: Task Planner Ticket Generation (status -> BUILDING)"]
        S6["Stage 6: Builder Code Implementation (status: IN_PROGRESS)"]
        S7["Stage 7: QA Verifier Testing (status -> DONE)"]
        
        S4 --> S5
        S5 --> S6
        S6 --> S7
        S7 -->|"Passed QA"| S8["Feature Complete (status: DONE)"]
    end

    S7 -.->"User Feedback / Revision Needed"| S1
```

### Subagent Roster

Full subagent definitions, models, tool access, and boundary rules are registered in [.agents/subagents.md](file:///Users/luca/Documents/DemoAIUniversity/.agents/subagents.md):

1. **`product_leader`** (Advisory Product Reviewer - `pro` model):
   - Reviews `DRAFT` specs in `specs/all/`. Provides structured advisory feedback on UX, pedagogical alignment, and edge cases.
   - *Boundary*: Purely advisory. Cannot approve specs, write code, or create tasks.
2. **`task_planner`** (Technical Product Lead - `flash`/`pro` model):
   - Parses specs in `specs/` that have reached `status: APPROVED` (set exclusively by the User).
   - Generates atomic task tickets in `tasks/`.
   - Flips spec header status from `APPROVED` to `BUILDING` once all task tickets are written.
3. **`builder`** (Frontend Developer - write-enabled subagent):
   - Implements React components, styles, and state logic for tasks in `tasks/` in `PENDING` status.
   - Updates task status to `IN_PROGRESS` while coding, and `COMPLETED` when clean local builds pass.
4. **`qa_verifier`** (QA & Automation Engineer - DevTools/testing subagent):
   - Inspects `COMPLETED` task tickets. Runs build checks, browser testing, console error audits, and user journey verifications.
   - Marks task status as `VERIFIED`. Flips spec header status from `BUILDING` to `DONE` once all tasks for that spec pass QA.

---

### Modular Specification Architecture (`specs/`)

Specifications are modularized per feature/capability and versioned under [specs/all/](file:///Users/luca/Documents/DemoAIUniversity/specs/all/):

```
specs/
├── README.md
├── 01-line-of-inquiry.md -> all/01-line-of-inquiry-v1.md  (Git-tracked symlink to active version)
└── all/
    ├── README.md
    ├── 01-line-of-inquiry-v1.md                            (Version 1 - DRAFT / APPROVED / BUILDING / DONE)
    ├── 01-line-of-inquiry-v2.md                            (Version 2 - DRAFT)
    └── 02-branching-chat-v1.md
```

#### Standard Spec Header Metadata

```yaml
---
feature_id: SPEC-01
title: Feature Title
version: 1.0
status: DRAFT # DRAFT -> APPROVED -> BUILDING -> DONE -> DEPRECATED
last_updated: YYYY-MM-DD
---
```

#### Automated Symlink & Deprecation Lifecycle

- As soon as a new version (e.g. `v2`) transitions from `DRAFT` to `APPROVED` (by the User), the previous version (`v1`) status is updated to `DEPRECATED`.
- The symlink in `specs/` (e.g. `specs/01-line-of-inquiry.md`) is automatically updated to point to the new approved version (`all/01-line-of-inquiry-v2.md`).
- "Current" specs are those with status `APPROVED`, `BUILDING`, or `DONE`.

---

### Task Ticket Lifecycle (`tasks/`)

Task tickets follow an explicit state machine documented in [tasks/README.md](file:///Users/luca/Documents/DemoAIUniversity/tasks/README.md):

`PENDING` -> `IN_PROGRESS` -> `COMPLETED` -> `VERIFIED`

- `PENDING`: Task ticket created by `task_planner` from an `APPROVED` spec.
- `IN_PROGRESS`: `builder` subagent actively implementing code.
- `NEEDS_CLARIFICATION`: Subagent encountered ambiguity. Execution paused, escalated to Main Agent -> User.
- `COMPLETED`: Code implementation completed by `builder` with clean local compile (`npm run build`).
- `FAILED_QA`: Failed QA inspection by `qa_verifier`. Returned to `builder` with error logs.
- `VERIFIED`: Tested and confirmed cleanly by `qa_verifier`.
- `REVISION_REQUESTED`: User requested specific UI/UX adjustments on built code.

---

### Clarification & Feedback Loops

#### 1. Subagent Clarification Escort Flow

If `task_planner`, `builder`, or `qa_verifier` encounters ambiguity:

1. Subagent pauses execution and updates task status to `NEEDS_CLARIFICATION`.
2. Appends a `## Question for User` section in the task file and notifies the Main Agent.
3. Main Agent presents the question directly to the User.
4. Upon User response, Main Agent updates the task file with the decision and resumes execution (`PENDING` or `IN_PROGRESS`).

#### 2. User Prototype Feedback & Revision Flow

When the User inspects a built prototype and requests changes:

- **Minor Tweaks / Polish (No Spec Change Required)**:
  - User provides feedback to Main Agent.
  - Main Agent updates task status to `REVISION_REQUESTED` with User notes.
  - `builder` updates code, and `qa_verifier` re-verifies.
- **Major Feature / Architectural Changes**:
  - User & Main Agent co-author a new spec version (e.g. `specs/all/01-line-of-inquiry-v2.md`).
  - Flipping `v2` to `APPROVED` auto-deprecates `v1`, re-points the symlink in `specs/`, and triggers `task_planner` for `v2`.
