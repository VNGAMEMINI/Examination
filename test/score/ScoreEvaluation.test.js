import test from "node:test";
import assert from "node:assert/strict";

import Evaluation from "../../src/evaluation/Evaluation.js";
import Score from "../../src/score/Score.js";

test("Score.fromEvaluation should preserve evaluation statistics", () => {
  const evaluation = new Evaluation({
    total: 20,
    correct: 15,
    incorrect: 3,
    unanswered: 2,
  });

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.total, 20);
  assert.equal(score.correct, 15);
  assert.equal(score.incorrect, 3);
  assert.equal(score.unanswered, 2);
});

test("Score points should equal correct answers", () => {
  const evaluation = new Evaluation({
    total: 20,
    correct: 15,
    incorrect: 3,
    unanswered: 2,
  });

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.points, 15);
});

test("Score percentage should be calculated from total", () => {
  const evaluation = new Evaluation({
    total: 20,
    correct: 15,
    incorrect: 3,
    unanswered: 2,
  });

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.percentage, 75);
});

test("Score should convert to Result", () => {
  const evaluation = new Evaluation({
    total: 20,
    correct: 15,
    incorrect: 3,
    unanswered: 2,
  });

  const score = Score.fromEvaluation(evaluation);
  const result = score.toResult();

  assert.equal(result.total, 20);
  assert.equal(result.correct, 15);
  assert.equal(result.incorrect, 3);
  assert.equal(result.unanswered, 2);
  assert.equal(result.score, 15);
  assert.equal(result.percentage, 75);
});

test("Score should handle zero total", () => {
  const evaluation = new Evaluation();

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.total, 0);
  assert.equal(score.points, 0);
  assert.equal(score.percentage, 0);
});
