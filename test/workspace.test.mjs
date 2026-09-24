import assert from "node:assert/strict";
import test from "node:test";

import core from "../packages/core/index.mjs";

test("core exports the workspace identifier", () => {
  assert.equal(core, "greenfield-pnpm-v0110");
});
