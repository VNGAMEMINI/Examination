import test from "node:test";
import assert from "node:assert/strict";

import SESSION_STATES from "../../src/examination/sessionStates.js";

test("SESSION_STATES should expose states", () => {
  assert.equal(SESSION_STATES.CREATED, "created");

  assert.equal(SESSION_STATES.STARTED, "started");

  assert.equal(SESSION_STATES.COMPLETED, "completed");
});

test("SESSION_STATES should be immutable", () => {
  assert.throws(() => {
    SESSION_STATES.CREATED = "changed";
  }, TypeError);

  assert.equal(SESSION_STATES.CREATED, "created");
});
