# Workspace Agent Governance & Versioned Specification Rules

Every subagent (`product_leader`, `task_planner`, `builder`, `qa_verifier`) operating in this codebase MUST follow these strict governance rules:

---

## 1. Subagent Definitions Registry
All subagent definitions, roles, models, system prompts, and tool permissions are persistently registered in:
- [.agents/subagents.md](file:///Users/luca/Documents/DemoAIUniversity/.agents/subagents.md)

---

## 2. Specification Directory & Symlinking Architecture (`specs/`)

Specifications are modular, versioned, and stored in a structured directory hierarchy:

```
specs/
├── README.md
├── 01-line-of-inquiry.md -> all/01-line-of-inquiry-v1.md  (Symlink to active version)
└── all/
    ├── 01-line-of-inquiry-v1.md                            (Version 1 - DRAFT / APPROVED / BUILDING / DONE)
    ├── 01-line-of-inquiry-v2.md                            (Version 2 - DRAFT)
    └── 02-branching-chat-v1.md
```

### Spec Header Lifecycle & Transition Rules:
- `DRAFT`: Co-authored by User + Main Agent, reviewed advisory-style by `product_leader`.
- `APPROVED`: **Flipped exclusively by the User** when satisfied with the specification.
  - **Deprecation & Symlink Rule**: When a new spec version (e.g. `v2`) transitions to `APPROVED`, the previous version (e.g. `v1`) status is updated to `DEPRECATED`, and the symlink in `specs/` is updated to point to the new approved version in `specs/all/`.
- `BUILDING`: **Flipped by `task_planner`** after it finishes writing all implementation task tickets for the approved spec.
- `DONE`: **Flipped by `qa_verifier`** after all tasks for the feature are verified and QAed cleanly.
- `DEPRECATED`: Superceded by a newer approved version.

---

## 3. Implementation Task Ticket Lifecycle (`tasks/`)

Task tickets in `tasks/` follow an explicit state machine:

`PENDING` -> `IN_PROGRESS` -> `COMPLETED` -> `VERIFIED`

- `PENDING`: Created by `task_planner`.
- `IN_PROGRESS`: Picked up by `builder`.
- `NEEDS_CLARIFICATION`: Subagent paused due to ambiguity; escalated to Main Agent -> User.
- `COMPLETED`: Built by `builder` with clean compile (`npm run build`).
- `FAILED_QA`: Failed QA inspection by `qa_verifier`. Returned to `builder` with diagnostic logs.
- `VERIFIED`: Tested and confirmed by `qa_verifier`.
- `REVISION_REQUESTED`: User requested specific UI/UX tweaks on built code.

---

## 4. Subagent Clarification Escort Flow

If `task_planner`, `builder`, or `qa_verifier` lacks clarity or hits an ambiguity:
1. The subagent pauses execution and updates task status to `NEEDS_CLARIFICATION`.
2. The subagent appends a `## Question for User` block in the task ticket.
3. The subagent notifies the Main Agent.
4. The Main Agent presents the question to the User.
5. Upon User response, Main Agent updates task status back to `PENDING` or `IN_PROGRESS` with resolved answers.

---

## 5. User Prototype Feedback & Revision Flow

When the User inspects a built prototype and wants adjustments:
- **Minor Tweaks / Polish (No spec change required)**: User provides feedback -> Main Agent sets task status to `REVISION_REQUESTED` with User notes -> `builder` updates code -> `qa_verifier` re-verifies.
- **Major Feature / Scope Changes**: User & Main Agent co-author a new spec version (e.g. `specs/all/01-line-of-inquiry-v2.md`). Once `v2` is `APPROVED` by User, `v1` becomes `DEPRECATED` and `task_planner` generates tickets for `v2`.
