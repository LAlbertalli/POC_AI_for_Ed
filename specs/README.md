# Current Feature Specifications (`specs/`)

This directory contains Git-tracked **symlinks** pointing to the active/current specification version inside [specs/all/](file:///Users/luca/Documents/DemoAIUniversity/specs/all/).

## Symlink Convention
`<feature_number>-<feature_slug>.md` -> `all/<feature_number>-<feature_slug>-v<version>.md`

Example:
`specs/01-line-of-inquiry.md` -> `all/01-line-of-inquiry-v1.md`

## Status Lifecycle & Transition Ownership
- `DRAFT`: Co-authored by User + Main Agent.
- `APPROVED`: Flipped exclusively by the User. Symlink updated to point to new version, previous version set to `DEPRECATED`.
- `BUILDING`: Flipped by `task_planner` after task generation.
- `DONE`: Flipped by `qa_verifier` after QA verification passes cleanly.
- `DEPRECATED`: Superceded by a newer approved version.
