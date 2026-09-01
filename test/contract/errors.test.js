import test from "node:test";
import assert from "node:assert/strict";

import {
  Answer,
  Question,
  Score,
  Summary,
  ValidationError,
  validate,
  evaluate,
  compare,
} from "../../src/index.js";

import validateAnswer from "../../src/validate/validateAnswer.js";
import validateQuestion from "../../src/validate/validateQuestion.js";

test("ValidationError extends Error", () => {
  const error = new ValidationError("invalid");

  assert.ok(error instanceof Error);
  assert.ok(error instanceof ValidationError);
  assert.equal(error.name, "ValidationError");
});

test("validate rejects unsupported input", () => {
  assert.throws(() => validate(null), ValidationError);
});

test("validateAnswer rejects non Answer", () => {
  assert.throws(() => validateAnswer({}), ValidationError);
});

test("validateQuestion rejects non Question", () => {
  assert.throws(() => validateQuestion({}), ValidationError);
});

test("evaluate rejects non Question", () => {
  assert.throws(() => evaluate({}, "a1"), TypeError);
});

test("compare rejects non Question", () => {
  assert.throws(() => compare({}, "a1"), TypeError);
});

test("Score rejects non Summary", () => {
  assert.throws(() => new Score({}), TypeError);
});
