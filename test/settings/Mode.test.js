import test from "node:test";
import assert from "node:assert/strict";

import Mode from "../../src/settings/Mode.js";

test("Mode should create correctly", () => {
  const mode = new Mode("free");

  assert.equal(mode.value, "free");
});

test("Mode should preserve exam mode", () => {
  const mode = new Mode("exam");

  assert.equal(mode.value, "exam");
});

test("Mode should reject invalid value", () => {
  assert.throws(() => {
    new Mode("invalid");
  }, TypeError);
});

test("Mode should not expose setter", () => {
  const mode = new Mode("free");

  assert.throws(() => {
    mode.value = "exam";
  }, TypeError);

  assert.equal(mode.value, "free");
});

test("Mode values should be immutable", () => {
  assert.deepEqual(
    Mode.values(),
    ["free", "exam"]
  );
});

test("Mode should expose static modes", () => {
  assert.equal(Mode.FREE, "free");
  assert.equal(Mode.EXAM, "exam");
});
