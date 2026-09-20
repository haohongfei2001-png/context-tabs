import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const manifest = JSON.parse(
  await readFile(new URL("../manifest.json", import.meta.url), "utf8"),
);

test("manifest is MV3 and exposes the side panel", () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.side_panel.default_path, "sidepanel.html");
  assert.equal(manifest.action.default_title, "Open Context Tabs");
});

test("CT-01 requests only tabs and sidePanel permissions", () => {
  assert.deepEqual([...manifest.permissions].sort(), ["sidePanel", "tabs"]);
  assert.equal("host_permissions" in manifest, false);
});

test("CT-01 does not hijack New Tab or inject page scripts", () => {
  assert.equal("chrome_url_overrides" in manifest, false);
  assert.equal("content_scripts" in manifest, false);
});

test("background worker is declared as a module", () => {
  assert.deepEqual(manifest.background, {
    service_worker: "src/background.js",
    type: "module",
  });
});
