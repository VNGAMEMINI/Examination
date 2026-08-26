import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";

test("Answer should create correctly", () => {
  const answer = new Answer({
    value: "Hà Nội",
    index: 0,
    correct: true
  });

  assert.equal(answer.value, "Hà Nội");
  assert.equal(answer.index, 0);
  assert.equal(answer.correct, true);
  assert.deepEqual(answer.metadata, {});
});
