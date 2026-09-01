import test from "node:test";
import assert from "node:assert/strict";

import Examination, {
  Answer,
  Question,
  Result,
  Summary,
  Score,
  ValidationError,

  normalize,
  normalizeAnswer,
  normalizeQuestion,

  validate,
  validateAnswer,
  validateQuestion,

  compare,
  compareAnswer,

  evaluate,
  evaluateCollection,

  summarize,
  score,
} from "../../src/index.js";

test("public API exposes Examination", () => {
  assert.equal(typeof Examination, "function");
});

test("public API exposes core models", () => {
  assert.equal(typeof Answer, "function");
  assert.equal(typeof Question, "function");
  assert.equal(typeof Result, "function");
  assert.equal(typeof Summary, "function");
  assert.equal(typeof Score, "function");
});

test("public API exposes normalization pipeline", () => {
  assert.equal(typeof normalize, "function");
  assert.equal(typeof normalizeAnswer, "function");
  assert.equal(typeof normalizeQuestion, "function");
});

test("public API exposes validation pipeline", () => {
  assert.equal(typeof validate, "function");
  assert.equal(typeof validateAnswer, "function");
  assert.equal(typeof validateQuestion, "function");
});

test("public API exposes comparison pipeline", () => {
  assert.equal(typeof compare, "function");
  assert.equal(typeof compareAnswer, "function");
});

test("public API exposes evaluation pipeline", () => {
  assert.equal(typeof evaluate, "function");
  assert.equal(typeof evaluateCollection, "function");
});

test("public API exposes summary and score pipeline", () => {
  assert.equal(typeof summarize, "function");
  assert.equal(typeof score, "function");
});

test("public API exposes ValidationError", () => {
  assert.equal(typeof ValidationError, "function");
});

test("default export is Examination", () => {
  const examination = new Examination();

  assert.ok(examination instanceof Examination);
});

test("Examination exposes complete pipeline", () => {
  const examination = new Examination();

  assert.equal(typeof examination.normalize, "function");
  assert.equal(typeof examination.validate, "function");
  assert.equal(typeof examination.evaluate, "function");
  assert.equal(typeof examination.evaluateCollection, "function");
  assert.equal(typeof examination.summary, "function");
  assert.equal(typeof examination.score, "function");
  assert.equal(typeof examination.run, "function");
});

test("Examination run returns complete execution result", () => {
  const examination = new Examination();

  const result = examination.run(
    [
      {
        id: "q1",
        text: "Capital of France?",
        answers: [
          {
            id: "a1",
            text: "Paris",
          },
          {
            id: "a2",
            text: "London",
          },
        ],
        correct: [0],
      },
    ],
    ["a1"],
  );

  assert.ok(Array.isArray(result.results));
  assert.ok(result.summary instanceof Summary);
  assert.ok(result.score instanceof Score);

  assert.equal(result.results.length, 1);
  assert.equal(result.summary.total, 1);
  assert.equal(result.summary.correct, 1);
  assert.equal(result.score.points, 1);
  assert.equal(result.score.percentage, 100);
});
