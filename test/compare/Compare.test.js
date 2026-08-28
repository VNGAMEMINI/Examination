import test from "node:test";
import assert from "node:assert/strict";

import Compare from "../../src/compare/Compare.js";

test("Compare should compare equal values", () => {
  assert.equal(
    Compare.equal(1, 1),
    true
  );

  assert.equal(
    Compare.equal("a", "a"),
    true
  );
});

test("Compare should reject different values", () => {
  assert.equal(
    Compare.equal(1, 2),
    false
  );

  assert.equal(
    Compare.equal("a", "b"),
    false
  );
});

test("Compare should compare not equal", () => {
  assert.equal(
    Compare.notEqual(1, 2),
    true
  );

  assert.equal(
    Compare.notEqual(1, 1),
    false
  );
});
