import test from "node:test";
import assert from "node:assert/strict";

import SESSION_STATES from "../../src/examination/sessionStates.js";

test("SESSION_STATES should define CREATED", () => {
  assert.equal(SESSION_STATES.CREATED, "created");
});

test("SESSION_STATES should define STARTED", () => {
  assert.equal(SESSION_STATES.STARTED, "started");
});

test("SESSION_STATES should define COMPLETED", () => {
  assert.equal(SESSION_STATES.COMPLETED, "completed");
});

test("SESSION_STATES should contain only known states", () => {
  assert.deepEqual(Object.keys(SESSION_STATES).sort(), [
    "COMPLETED",
    "CREATED",
    "STARTED",
  ]);
});
