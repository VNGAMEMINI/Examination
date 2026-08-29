import test from "node:test";
import assert from "node:assert/strict";

import SubjectEvaluation from "../../src/evaluation/SubjectEvaluation.js";

import Subject from "../../src/subject/Subject.js";

function createSubject() {
  return new Subject({
    id: "subject-1",
    name: "Mathematics",
  });
}

test("SubjectEvaluation should create correctly", () => {
  const subject = createSubject();

  const results = [
    { correct: true, unanswered: false },
    { correct: false, unanswered: false },
    { correct: false, unanswered: true },
  ];

  const evaluation = new SubjectEvaluation({
    subject,
    total: 3,
    correct: 1,
    incorrect: 1,
    unanswered: 1,
    results,
  });

  assert.equal(evaluation.subject, subject);
  assert.equal(evaluation.total, 3);
  assert.equal(evaluation.correct, 1);
  assert.equal(evaluation.incorrect, 1);
  assert.equal(evaluation.unanswered, 1);
  assert.equal(evaluation.results, results);
});

test("SubjectEvaluation should use default values", () => {
  const evaluation = new SubjectEvaluation();

  assert.equal(evaluation.subject, undefined);
  assert.equal(evaluation.total, 0);
  assert.equal(evaluation.correct, 0);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 0);

  assert.deepEqual(evaluation.results, []);
  assert.deepEqual(evaluation.metadata, {});
});

test("SubjectEvaluation should preserve metadata", () => {
  const metadata = {
    mode: "exam",
    duration: 120,
  };

  const evaluation = new SubjectEvaluation({
    metadata,
  });

  assert.equal(evaluation.metadata, metadata);
});

test("SubjectEvaluation should not expose setters", () => {
  const evaluation = new SubjectEvaluation({
    total: 3,
  });

  assert.equal(evaluation.total, 3);

  assert.throws(() => {
    evaluation.total = 10;
  }, TypeError);

  assert.equal(evaluation.total, 3);
});

test("SubjectEvaluation should serialize correctly", () => {
  const subject = createSubject();

  const results = [{ correct: true }];

  const evaluation = new SubjectEvaluation({
    subject,
    total: 1,
    correct: 1,
    results,
  });

  assert.deepEqual(evaluation.toJSON(), {
    subject,
    total: 1,
    correct: 1,
    incorrect: 0,
    unanswered: 0,
    results,
    metadata: {},
  });
});
