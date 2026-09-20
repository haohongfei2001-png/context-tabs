# Execution Protocol

1. GitHub remote `main` is the canonical source.
2. Read `AGENTS.md`, status, freeze, plan, and current round contract first.
3. One execution changes one canonical round only.
4. No implementation may cross a future-round boundary.
5. Run the checks named by the round contract.
6. Store concise completion evidence in the repository when required.
7. Update canonical status in the same closure commit or a directly following closure commit.
8. Push to remote `main` only after local checks pass.
9. Reread remote HEAD/status before declaring the round complete.
10. If a blocker requires product-owner choice or new permission, stop with the exact blocker.

## Safety invariants

- Never hijack Chrome New Tab in v0.1.
- Never make extension failure remove access to native tabs.
- Never use page-content access for manager features that Chrome APIs can provide.
- Never add network telemetry or remote executable code.
