# Context Tabs v0.1 — Development Plan

## CT-00 — Product/API freeze

Freeze the product boundary, Chrome-as-truth model, permissions, failure behavior, round protocol, and acceptance gates. No extension implementation.

## CT-01 — Functional core

Implement MV3 foundation and Side Panel with current-window tab list, active switching, close, native `+`, `AI+`, event reconciliation, and minimal tests.

Gate: the extension is already useful without customization.

## CT-02 — Find and order

Add search, pinned-tab section, drag reorder, and robust handling of tab creation/removal/move/activation events.

## CT-03 — Groups and display aliases

Mirror Chrome Tab Groups; add explicit user aliases and compact/comfortable density. Do not add an independent workspace ontology.

## CT-04 — UX hardening and packaging

Keyboard navigation, accessibility, empty/error states, regression suite, permission audit, install/package documentation, and daily-use dogfood evidence.

## CT-05 — ChatGPT thread/tab adapter

Separately design and implement `ChatGPT New chat → new browser tab`, with fail-open fallback. This round may introduce the first ChatGPT host permission/content script.

No round may begin before the preceding round is canonically complete unless the plan is explicitly amended on remote main.
