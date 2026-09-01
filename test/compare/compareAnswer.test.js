import test from "node:test";
import assert from "node:assert/strict";

import compareAnswer from "../../src/compare/compareAnswer.js";

test("compareAnswer accepts matching single answer", () => {
  assert.equal(
    compareAnswer("a1", "a1"),
    true
  );
});

test("compareAnswer rejects different single answer", () => {
  assert.equal(
    compareAnswer("a1", "a2"),
    false
  );
});

test("compareAnswer accepts matching multiple answers", () => {
  assert.equal(
    compareAnswer(
      ["a1", "a2"],
      ["a1", "a2"]
    ),
    true
  );
});

test("compareAnswer ignores multiple-answer order", () => {
  assert.equal(
    compareAnswer(
      ["a1", "a2"],
      ["a2", "a1"]
    ),
    true
  );
});

test("compareAnswer rejects incomplete selection", () => {
  assert.equal(
    compareAnswer(
      ["a1", "a2"],
      ["a1"]
    ),
    false
  );
});

test("compareAnswer rejects additional selection", () => {
  assert.equal(
    compareAnswer(
      ["a1"],
      ["a1", "a2"]
    ),
    false
  );
});

test("compareAnswer treats duplicate selections as one value", () => {
  assert.equal(
    compareAnswer(
      ["a1"],
      ["a1", "a1"]
    ),
    true
  );
});

test("compareAnswer treats missing selection as empty", () => {
  assert.equal(
    compareAnswer([], undefined),
    true
  );
});
