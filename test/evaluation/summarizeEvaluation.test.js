import test from "node:test";
import assert from "node:assert/strict";

import summarizeEvaluation
  from "../../src/evaluation/summarizeEvaluation.js";

test("summarizeEvaluation should calculate statistics", () => {
  const result = summarizeEvaluation([
    {
      correct: true,
      unanswered: false,
    },
    {
      correct: false,
      unanswered: false,
    },
    {
      correct: false,
      unanswered: true,
    },
  ]);

  assert.equal(result.total, 3);
  assert.equal(result.correct, 1);
  assert.equal(result.incorrect, 1);
  assert.equal(result.unanswered, 1);
});

test("summarizeEvaluation should support empty results", () => {
  const result = summarizeEvaluation([]);

  assert.equal(result.total, 0);
  assert.equal(result.correct, 0);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);
});

test("summarizeEvaluation should reject invalid input", () => {
  assert.throws(() => {
    summarizeEvaluation(null);
  }, TypeError);

  assert.throws(() => {
    summarizeEvaluation({});
  }, TypeError);
});
