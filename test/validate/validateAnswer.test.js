import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import ValidationError from "../../src/errors/ValidationError.js";
import validateAnswer from "../../src/validate/validateAnswer.js";

test("validateAnswer accepts valid Answer", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris"
  });

  assert.equal(validateAnswer(answer), true);
});

test("validateAnswer rejects non Answer", () => {
  assert.throws(
    () => validateAnswer({
      id: "a1",
      text: "Paris"
    }),
    ValidationError
  );
});

test("validateAnswer rejects empty id", () => {
  const answer = new Answer({
    id: "",
    text: "Paris"
  });

  assert.throws(
    () => validateAnswer(answer),
    ValidationError
  );
});
