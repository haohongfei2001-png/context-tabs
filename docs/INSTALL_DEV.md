# Development Install

Context Tabs v0.1 is an unpacked Manifest V3 extension.

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Choose **Load unpacked**.
4. Select the repository root containing `manifest.json`.
5. Pin **Context Tabs** from Chrome's Extensions menu.
6. Click the Context Tabs toolbar icon to open the Side Panel.

Smoke checks:

- existing Chrome tabs appear in the panel
- clicking a row activates that tab
- `×` closes the selected row's tab
- `+` creates a normal Chrome New Tab
- `AI+` creates and focuses a new `https://chatgpt.com/` tab
- disabling Context Tabs leaves normal Chrome behavior intact

If **New Tab for ChatGPT** is still installed and enabled, disable it when you want Chrome's native New Tab behavior restored. Context Tabs itself does not override New Tab.
