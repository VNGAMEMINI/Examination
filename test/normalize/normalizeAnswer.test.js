import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import normalizeAnswer from "../../src/normalize/normalizeAnswer.js";

test("normalizeAnswer preserves Answer instances", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris"
  });

  assert.strictEqual(
    normalizeAnswer(answer),
    answer
  );
});

test("normalizeAnswer converts string", () => {
  const answer = normalizeAnswer("Paris", 0);

  assert.equal(answer.id, "a0");
  assert.equal(answer.text, "Paris");
});

test("normalizeAnswer converts object", () => {
  const answer = normalizeAnswer({
    id: "correct",
    text: "Paris",
    metadata: {
      type: "choice"
    }
  });

  assert.equal(answer.id, "correct");
  assert.equal(answer.text, "Paris");
  assert.deepEqual(answer.metadata, {
    type: "choice"
  });
});
