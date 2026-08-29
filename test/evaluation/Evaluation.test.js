import test from "node:test";
import assert from "node:assert/strict";

import Evaluation from "../../src/evaluation/Evaluation.js";


test("Evaluation should create correctly", () => {
  const subjects = [
    [
      { correct: true, unanswered: false },
      { correct: false, unanswered: false },
    ],
  ];

  const evaluation = new Evaluation({
    total: 2,
    correct: 1,
    incorrect: 1,
    unanswered: 0,
    subjects,
  });

  assert.equal(evaluation.total, 2);
  assert.equal(evaluation.correct, 1);
  assert.equal(evaluation.incorrect, 1);
  assert.equal(evaluation.unanswered, 0);
  assert.equal(evaluation.subjects, subjects);
});


test("Evaluation should use default values", () => {
  const evaluation = new Evaluation();

  assert.equal(evaluation.total, 0);
  assert.equal(evaluation.correct, 0);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 0);

  assert.deepEqual(evaluation.subjects, []);
  assert.deepEqual(evaluation.metadata, {});
});


test("Evaluation should preserve subjects", () => {
  const subjects = [
    [{ correct: true }],
    [{ correct: false }],
  ];

  const evaluation = new Evaluation({
    subjects,
  });

  assert.equal(evaluation.subjects, subjects);
});


test("Evaluation should preserve metadata", () => {
  const metadata = {
    mode: "exam",
    duration: 120,
  };

  const evaluation = new Evaluation({
    metadata,
  });

  assert.equal(evaluation.metadata, metadata);
});


test("Evaluation should preserve evaluation statistics", () => {
  const evaluation = new Evaluation({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(evaluation.total, 10);
  assert.equal(evaluation.correct, 7);
  assert.equal(evaluation.incorrect, 2);
  assert.equal(evaluation.unanswered, 1);
});


test("Evaluation should not expose setters", () => {
  const evaluation = new Evaluation({
    total: 10,
  });

  assert.equal(evaluation.total, 10);

  assert.throws(() => {
    evaluation.total = 20;
  }, TypeError);

  assert.equal(evaluation.total, 10);
});
