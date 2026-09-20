import test from "node:test";
import assert from "node:assert/strict";

import {
  CHATGPT_URL,
  getInsertionIndex,
  getTabLabel,
  isRelevantUpdate,
  orderedTabs,
} from "../src/tab-utils.js";

test("AI+ points to a fresh ChatGPT entry URL", () => {
  assert.equal(CHATGPT_URL, "https://chatgpt.com/");
});

test("tabs are ordered by Chrome index without mutating input", () => {
  const source = [{ index: 2 }, { index: 0 }, { index: 1 }];
  assert.deepEqual(orderedTabs(source).map((tab) => tab.index), [0, 1, 2]);
  assert.deepEqual(source.map((tab) => tab.index), [2, 0, 1]);
});

test("new tabs are inserted immediately after the active tab", () => {
  assert.equal(getInsertionIndex([
    { index: 0, active: false },
    { index: 1, active: true },
    { index: 2, active: false },
  ]), 2);
  assert.equal(getInsertionIndex([]), undefined);
});

test("tab label prefers title, then url, then fallback", () => {
  assert.equal(getTabLabel({ title: " Docs ", url: "https://example.com" }), "Docs");
  assert.equal(getTabLabel({ title: " ", url: " https://example.com " }), "https://example.com");
  assert.equal(getTabLabel({}), "Untitled tab");
});

test("only visible tab metadata changes trigger update refreshes", () => {
  assert.equal(isRelevantUpdate({ title: "New title" }), true);
  assert.equal(isRelevantUpdate({ favIconUrl: "x" }), true);
  assert.equal(isRelevantUpdate({ audible: true }), false);
});
