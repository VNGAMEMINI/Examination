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
  validate,
  compare,
  evaluate,
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

test("public API exposes normalization", () => {
  assert.equal(typeof normalize, "function");
});

test("public API exposes validation", () => {
  assert.equal(typeof validate, "function");
});

test("public API exposes comparison", () => {
  assert.equal(typeof compare, "function");
});

test("public API exposes evaluation", () => {
  assert.equal(typeof evaluate, "function");
});

test("public API exposes summary and score", () => {
  assert.equal(typeof summarize, "function");
  assert.equal(typeof score, "function");
});

test("public API exposes ValidationError", () => {
  assert.equal(typeof ValidationError, "function");
});

test("default export is Examination", async () => {
  const API = await import("../../src/index.js");

  assert.equal(API.default, Examination);
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

test("public API exports are locked", async () => {
  const API = await import("../../src/index.js");

  assert.deepEqual(
    Object.keys(API).sort(),
    [
      "Answer",
      "Examination",
      "Question",
      "Result",
      "Score",
      "Summary",
      "ValidationError",
      "compare",
      "evaluate",
      "normalize",
      "score",
      "summarize",
      "validate",
      "default",
    ].sort(),
  );
});
