export const CHATGPT_URL = "https://chatgpt.com/";

export function orderedTabs(tabs) {
  return [...tabs].sort((a, b) => a.index - b.index);
}

export function getInsertionIndex(tabs) {
  const active = tabs.find((tab) => tab.active);
  return active ? active.index + 1 : undefined;
}

export function getTabLabel(tab) {
  const title = typeof tab.title === "string" ? tab.title.trim() : "";
  if (title) return title;

  const url = typeof tab.url === "string" ? tab.url.trim() : "";
  if (url) return url;

  return "Untitled tab";
}

export function isRelevantUpdate(changeInfo) {
  return ["title", "favIconUrl", "status", "url", "pinned"].some(
    (key) => Object.prototype.hasOwnProperty.call(changeInfo, key),
  );
}
