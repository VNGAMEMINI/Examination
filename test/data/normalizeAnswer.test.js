import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import normalizeAnswer from "../../src/data/normalizeAnswer.js";

test("normalizeAnswer should normalize string", () => {
  const answer = normalizeAnswer("Hà Nội");

  assert.ok(answer instanceof Answer);
  assert.equal(answer.value, "Hà Nội");
  assert.equal(answer.index, 0);
  assert.equal(answer.correct, false);
});

test("normalizeAnswer should normalize object", () => {
  const answer = normalizeAnswer({
    value: "Hà Nội",
    index: 1,
    correct: true
  });

  assert.ok(answer instanceof Answer);
  assert.equal(answer.value, "Hà Nội");
  assert.equal(answer.index, 1);
  assert.equal(answer.correct, true);
});

test("normalizeAnswer should preserve metadata", () => {
  const metadata = {
    source: "test"
  };

  const answer = normalizeAnswer({
    value: "Hà Nội",
    metadata
  });

  assert.equal(answer.metadata, metadata);
});

test("normalizeAnswer should return existing Answer", () => {
  const answer = new Answer({
    value: "Hà Nội"
  });

  const normalized = normalizeAnswer(answer);

  assert.equal(normalized, answer);
});
