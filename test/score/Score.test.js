import test from "node:test";
import assert from "node:assert/strict";

import Result from "../../src/examination/Result.js";

import Score from "../../src/score/Score.js";

test("Score should create Result", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  const result = score.toResult();

  assert.ok(result instanceof Result);

  assert.equal(result.total, 10);

  assert.equal(result.correct, 7);

  assert.equal(result.incorrect, 2);

  assert.equal(result.unanswered, 1);

  assert.equal(result.score, 7);

  assert.equal(result.percentage, 70);
});

test("Score should create correctly", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(score.total, 10);

  assert.equal(score.correct, 7);

  assert.equal(score.incorrect, 2);

  assert.equal(score.unanswered, 1);
});

test("Score should calculate points", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(score.points, 7);
});

test("Score should calculate percentage", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(score.percentage, 70);
});

test("Score should return zero percentage for empty score", () => {
  const score = new Score();

  assert.equal(score.percentage, 0);
});

test("Score should use default values", () => {
  const score = new Score();

  assert.equal(score.total, 0);

  assert.equal(score.correct, 0);

  assert.equal(score.incorrect, 0);

  assert.equal(score.unanswered, 0);

  assert.equal(score.points, 0);

  assert.equal(score.percentage, 0);
});

test("Score should not expose setters", () => {
  const score = new Score({
    total: 10,
  });

  assert.throws(() => {
    score.total = 20;
  }, TypeError);

  assert.equal(score.total, 10);
});
