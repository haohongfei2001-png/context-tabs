# Context Tabs

Context Tabs is a Chrome MV3 extension for managing browser tabs as work contexts.

Its first product principle is simple: normal web-tab creation and AI-thread creation must coexist.

## v0.1 goals

- Keep Chrome's native New Tab behavior untouched.
- Provide a persistent tab-management surface in Chrome Side Panel.
- Show explicit `+` and `AI+` actions together.
- List, activate, close, search, reorder, and group current-window tabs.
- Allow user-controlled display aliases without renaming web pages.
- Add no server, account, analytics, or remote-code dependency.

## Canonical development model

GitHub remote `main` and `status/CONTEXT_TABS_STATUS.yaml` are the source of truth.
Local clones are execution workspaces only.

Current package: **Context Tabs v0.1**.

See `docs/PRE_IMPLEMENTATION_FREEZE_v0.1.md` and `docs/DEVELOPMENT_PLAN.md`.
