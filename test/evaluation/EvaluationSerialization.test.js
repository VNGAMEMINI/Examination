import test from "node:test";
import assert from "node:assert/strict";

import Evaluation
  from "../../src/evaluation/Evaluation.js";


test("Evaluation should serialize basic state", () => {
  const evaluation = new Evaluation({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  const data = evaluation.toJSON();

  assert.deepEqual(data, {
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
    subjects: [],
    metadata: {},
  });
});


test("Evaluation should serialize subjects", () => {
  const subjects = [
    [
      {
        correct: true,
        unanswered: false,
      },
    ],
  ];

  const evaluation = new Evaluation({
    total: 1,
    correct: 1,
    subjects,
  });

  const data = evaluation.toJSON();

  assert.equal(data.subjects, subjects);
});


test("Evaluation should serialize metadata", () => {
  const metadata = {
    mode: "exam",
    duration: 120,
  };

  const evaluation = new Evaluation({
    metadata,
  });

  const data = evaluation.toJSON();

  assert.equal(data.metadata, metadata);
});


test("Evaluation should work with JSON.stringify", () => {
  const evaluation = new Evaluation({
    total: 4,
    correct: 3,
    incorrect: 1,
  });

  const data = JSON.parse(
    JSON.stringify(evaluation)
  );

  assert.equal(data.total, 4);
  assert.equal(data.correct, 3);
  assert.equal(data.incorrect, 1);
  assert.equal(data.unanswered, 0);
});
