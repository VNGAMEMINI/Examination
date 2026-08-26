import test from "node:test";
import assert from "node:assert/strict";

import ValidationError
  from "../../src/validation/ValidationError.js";

test("ValidationError should create correctly", () => {
  const error = new ValidationError(
    "Question.text is required",
    {
      path: "Question.text",
      code: "REQUIRED"
    }
  );

  assert.ok(
    error instanceof Error
  );

  assert.ok(
    error instanceof ValidationError
  );

  assert.equal(
    error.name,
    "ValidationError"
  );

  assert.equal(
    error.message,
    "Question.text is required"
  );

  assert.equal(
    error.path,
    "Question.text"
  );

  assert.equal(
    error.code,
    "REQUIRED"
  );
});


test("ValidationError should support default options", () => {
  const error =
    new ValidationError("Invalid data");

  assert.equal(
    error.name,
    "ValidationError"
  );

  assert.equal(
    error.message,
    "Invalid data"
  );

  assert.equal(
    error.path,
    null
  );

  assert.equal(
    error.code,
    null
  );
});
