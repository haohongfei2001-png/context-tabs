async function configureSidePanelAction() {
  try {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch (error) {
    console.error("Context Tabs: failed to configure side-panel action", error);
  }
}

chrome.runtime.onInstalled.addListener(configureSidePanelAction);
chrome.runtime.onStartup.addListener(configureSidePanelAction);
configureSidePanelAction();
