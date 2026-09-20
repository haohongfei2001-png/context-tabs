# CT-01 Completion Evidence

Round: CT-01 — Functional Core

Implementation commit: `78cd1cce43ace0037098e1a77df33852752b9afb`

Required CI:

- Workflow: CI
- Run: 35518343385
- Event: push to `main`
- Conclusion: **success**
- Tested commit: `78cd1cce43ace0037098e1a77df33852752b9afb`

## Delivered

- Manifest V3 extension foundation
- Chrome Side Panel as the manager surface
- toolbar action configured to open the side panel
- current-window tab listing
- active-tab indication
- activate tab
- close tab
- ordinary `+` that creates a normal Chrome New Tab
- `AI+` that creates a fresh active ChatGPT tab
- insertion immediately after the current tab when Chrome permits
- event-driven reconciliation for create/remove/move/activate/update/attach/detach/replace
- no host permissions
- no content scripts
- no New Tab override
- automated contract/unit tests

## Scope audit

Not implemented in CT-01: search, drag reorder, dedicated pinned section, group UI, aliases, or ChatGPT DOM interception.

## Runtime note

The repository is loadable as an unpacked Chrome extension. Required CI verifies the extension contract and pure tab logic. Interactive browser dogfood remains useful before distribution and is documented in `docs/INSTALL_DEV.md`; it is not used to expand CT-01 scope.
