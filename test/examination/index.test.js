import test from "node:test";
import assert from "node:assert/strict";

import Examination, {
  Examination as NamedExamination,
  Answer,
  Question,
  Result,
  normalize,
  validate,
  compare,
  evaluate
} from "../../src/index.js";

test("package exposes Examination as default export", () => {
  assert.equal(
    Examination,
    NamedExamination
  );
});

test("package exposes core models", () => {
  assert.equal(typeof Answer, "function");
  assert.equal(typeof Question, "function");
  assert.equal(typeof Result, "function");
});

test("package exposes core pipeline functions", () => {
  assert.equal(typeof normalize, "function");
  assert.equal(typeof validate, "function");
  assert.equal(typeof compare, "function");
  assert.equal(typeof evaluate, "function");
});

test("package Examination can execute evaluation pipeline", () => {
  const examination = new Examination();

  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris"
      },
      {
        id: "a2",
        text: "London"
      }
    ],
    correct: ["a1"]
  });

  const result = examination.evaluate(
    question,
    "a1"
  );

  assert.ok(result instanceof Result);
  assert.equal(result.status, "correct");
});
