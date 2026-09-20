# AGENTS.md

## Source of truth

GitHub remote `main` is authoritative. Local clones are execution workspaces only.

## Execution rules

1. Read canonical status and the current round contract before changing code.
2. Execute only the current READY / IN_PROGRESS round.
3. Do not silently expand scope into future rounds.
4. Preserve additive/fail-safe behavior: Context Tabs must never remove Chrome's escape hatches.
5. Do not replace Chrome New Tab or hide/patch the native tab strip in v0.1.
6. Do not add content scripts until a round explicitly authorizes them.
7. No telemetry, remote code, backend, or account system in v0.1.
8. A round is complete only after required checks, evidence, status update, push, and remote reread.

## Product invariant

Disabling or uninstalling Context Tabs must return the browser to normal Chrome behavior without cleanup.
