import test from "node:test";
import assert from "node:assert/strict";

import Examination, {
  Answer,
  Question,
  Result,
  Score,
  Summary,
  ValidationError,
  normalize,
  validate,
  compare,
  evaluate,
  summarize,
  score,
} from "../../src/index.js";

test("public API exposes the expected exports", () => {
  assert.equal(Examination.name, "Examination");

  assert.equal(Answer.name, "Answer");
  assert.equal(Question.name, "Question");
  assert.equal(Result.name, "Result");
  assert.equal(Score.name, "Score");
  assert.equal(Summary.name, "Summary");
  assert.equal(ValidationError.name, "ValidationError");

  assert.equal(typeof normalize, "function");
  assert.equal(typeof validate, "function");
  assert.equal(typeof compare, "function");
  assert.equal(typeof evaluate, "function");
  assert.equal(typeof summarize, "function");
  assert.equal(typeof score, "function");
});

test("default export is Examination", () => {
  assert.equal(Examination.name, "Examination");
});

test("Examination exposes the processing facade", () => {
  const exam = new Examination();

  assert.equal(typeof exam.normalize, "function");
  assert.equal(typeof exam.validate, "function");
  assert.equal(typeof exam.evaluate, "function");
  assert.equal(typeof exam.evaluateCollection, "function");
  assert.equal(typeof exam.summary, "function");
  assert.equal(typeof exam.score, "function");
  assert.equal(typeof exam.run, "function");
});
