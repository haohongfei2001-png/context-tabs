import {
  CHATGPT_URL,
  getInsertionIndex,
  getTabLabel,
  isRelevantUpdate,
  orderedTabs,
} from "./tab-utils.js";

const list = document.querySelector("#tab-list");
const status = document.querySelector("#status");
const template = document.querySelector("#tab-template");
const newTabButton = document.querySelector("#new-tab");
const newAiTabButton = document.querySelector("#new-ai-tab");

let windowId;
let tabs = [];
let refreshPending = false;

function setStatus(message = "") {
  status.textContent = message;
  status.hidden = !message;
}

function scheduleRefresh() {
  if (refreshPending) return;
  refreshPending = true;

  queueMicrotask(async () => {
    refreshPending = false;
    await refreshTabs();
  });
}

async function refreshTabs() {
  if (typeof windowId !== "number") return;

  try {
    tabs = orderedTabs(await chrome.tabs.query({ windowId }));
    renderTabs();
    setStatus();
  } catch (error) {
    console.error("Context Tabs: failed to read tabs", error);
    setStatus("Could not refresh tabs.");
  }
}

function renderTabs() {
  const previousScrollTop = list.scrollTop;
  const fragment = document.createDocumentFragment();

  for (const tab of tabs) {
    const row = template.content.firstElementChild.cloneNode(true);
    const activate = row.querySelector(".tab-activate");
    const close = row.querySelector(".tab-close");
    const title = row.querySelector(".tab-title");
    const favicon = row.querySelector(".favicon");
    const fallback = row.querySelector(".favicon-fallback");

    row.dataset.tabId = String(tab.id);
    row.classList.toggle("is-active", Boolean(tab.active));
    row.classList.toggle("is-pinned", Boolean(tab.pinned));

    title.textContent = getTabLabel(tab);
    activate.title = getTabLabel(tab);
    activate.setAttribute(
      "aria-label",
      tab.active ? `Current tab: ${getTabLabel(tab)}` : `Switch to ${getTabLabel(tab)}`,
    );

    if (tab.favIconUrl) {
      favicon.src = tab.favIconUrl;
      favicon.hidden = false;
      fallback.hidden = true;
      favicon.addEventListener("error", () => {
        favicon.hidden = true;
        fallback.hidden = false;
      }, { once: true });
    } else {
      favicon.hidden = true;
      fallback.hidden = false;
    }

    activate.addEventListener("click", async () => {
      try {
        await chrome.tabs.update(tab.id, { active: true });
      } catch (error) {
        console.error("Context Tabs: failed to activate tab", error);
        setStatus("Could not switch tabs.");
      }
    });

    close.setAttribute("aria-label", `Close ${getTabLabel(tab)}`);
    close.addEventListener("click", async () => {
      try {
        await chrome.tabs.remove(tab.id);
      } catch (error) {
        console.error("Context Tabs: failed to close tab", error);
        setStatus("Could not close tab.");
      }
    });

    fragment.append(row);
  }

  list.replaceChildren(fragment);
  list.scrollTop = previousScrollTop;
}

async function createTab(url) {
  if (typeof windowId !== "number") return;

  const options = {
    windowId,
    active: true,
  };

  const index = getInsertionIndex(tabs);
  if (typeof index === "number") options.index = index;
  if (url) options.url = url;

  try {
    await chrome.tabs.create(options);
  } catch (error) {
    console.error("Context Tabs: failed to create tab", error);
    setStatus("Could not create a tab.");
  }
}

function attachTabListeners() {
  chrome.tabs.onCreated.addListener((tab) => {
    if (tab.windowId === windowId) scheduleRefresh();
  });

  chrome.tabs.onRemoved.addListener((_tabId, removeInfo) => {
    if (removeInfo.windowId === windowId) scheduleRefresh();
  });

  chrome.tabs.onMoved.addListener((_tabId, moveInfo) => {
    if (moveInfo.windowId === windowId) scheduleRefresh();
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    if (activeInfo.windowId === windowId) scheduleRefresh();
  });

  chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
    if (tab.windowId === windowId && isRelevantUpdate(changeInfo)) scheduleRefresh();
  });

  chrome.tabs.onAttached.addListener((_tabId, attachInfo) => {
    if (attachInfo.newWindowId === windowId) scheduleRefresh();
  });

  chrome.tabs.onDetached.addListener((_tabId, detachInfo) => {
    if (detachInfo.oldWindowId === windowId) scheduleRefresh();
  });

  chrome.tabs.onReplaced.addListener(() => scheduleRefresh());
}

async function init() {
  try {
    const currentWindow = await chrome.windows.getCurrent();
    windowId = currentWindow.id;
  } catch (error) {
    console.error("Context Tabs: failed to resolve window", error);
    setStatus("Could not identify this Chrome window.");
    return;
  }

  newTabButton.addEventListener("click", () => createTab());
  newAiTabButton.addEventListener("click", () => createTab(CHATGPT_URL));
  attachTabListeners();
  await refreshTabs();
}

init();
