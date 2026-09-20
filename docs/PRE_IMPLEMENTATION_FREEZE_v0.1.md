# Context Tabs v0.1 — Pre-Implementation Freeze

Status: FROZEN

## 1. Problem

Chrome has one generic tab-creation primitive, while AI-heavy work creates a second semantic primitive: a fresh AI conversation. Replacing Chrome New Tab with ChatGPT removes the normal escape hatch; a toolbar-only AI launcher preserves it but does not solve tab-management overload.

Context Tabs v0.1 therefore treats the problem as a tab-management surface, not as a New Tab replacement.

## 2. Product model

Context Tabs is additive. Chrome remains functional without it.

Primary surface: Chrome Side Panel.

Header actions:

- `+` — create a normal Chrome tab.
- `AI+` — create a fresh ChatGPT tab.
- Search — filter tabs in the current window.

The list below the header represents the current Chrome window and mirrors real Chrome tabs rather than creating a second browser state.

## 3. Core invariant

One source of operational truth for tabs: Chrome itself. Context Tabs may store presentation metadata such as aliases, but tab existence, order, active state, pin state, and Chrome group membership come from Chrome APIs.

## 4. v0.1 interaction contract

Each visible tab row supports:

- favicon
- display title
- active-state indication
- activate on click
- close action
- drag reorder
- Chrome group indication

Pinned tabs are shown separately above ordinary tabs.

User aliases change only Context Tabs presentation; they never mutate page titles. Search matches both the page title and alias.

`AI+` always creates a new active tab at `https://chatgpt.com/`, preferably immediately after the invoking/current tab. It does not reuse an existing ChatGPT tab.

`+` creates a normal blank/new tab and does not route through ChatGPT.

## 5. Scope boundary

v0.1 does not replace `chrome://newtab`, intercept `⌘T`, patch Chrome's native tab strip, hide native UI, inject remote code, or require a server/account.

v0.1 does not yet intercept ChatGPT's internal `New chat`. That is a later isolated adapter round because it requires page-specific DOM/navigation handling.

## 6. Data and permissions

Expected MV3 permissions for the manager core:

- `tabs` — read/manage tab metadata and order.
- `tabGroups` — mirror/manage Chrome groups where required.
- `storage` — local presentation preferences and aliases.
- `sidePanel` — persistent manager surface.

No host permissions are required for the manager core. No browsing content is transmitted externally.

## 7. Display model

Default density is compact enough for many tabs but keeps title text readable. v0.1 supports user-controlled aliases and density; it does not invent AI-generated names.

Chrome groups remain the grouping primitive in v0.1. A separate proprietary workspace ontology is explicitly deferred to avoid dual truth and migration cost.

## 8. Failure behavior

If Context Tabs fails, native Chrome remains usable. Failed mutations must not navigate or overwrite the current page as a fallback. UI state is reconciled from Chrome after tab events rather than assuming a requested mutation succeeded.

## 9. Later reserved capability

A later round may implement: ChatGPT `New chat` → new browser tab while preserving the current conversation. That adapter must fail open to ChatGPT's native behavior if the target action cannot be identified confidently.

## 10. Success criterion

Context Tabs earns continued development only if the custom surface is measurably easier than Chrome's native vertical-tab workflow for frequent switching, creation, search, and identification. Feature count is not a success metric.
