import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const rootManifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url)));
assert.deepEqual(rootManifest, {
  name: "greenfield-pnpm-v0110",
  private: true,
  packageManager: "pnpm@10.17.1",
  scripts: {
    check: "node scripts/check.mjs",
    test: "node --test test/workspace.test.mjs",
  },
});

const workspaceManifest = await readFile(
  new URL("../pnpm-workspace.yaml", import.meta.url),
  "utf8",
);
assert.equal(workspaceManifest, "packages:\n  - packages/*\n");

const coreManifest = JSON.parse(
  await readFile(new URL("../packages/core/package.json", import.meta.url)),
);
assert.deepEqual(coreManifest, {
  name: "@greenfield-pnpm-v0110/core",
  private: true,
  type: "module",
  exports: "./index.mjs",
});

const { default: core } = await import("../packages/core/index.mjs");
assert.equal(core, "greenfield-pnpm-v0110");
