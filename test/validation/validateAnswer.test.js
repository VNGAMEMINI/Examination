import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import ValidationError from "../../src/validation/ValidationError.js";

import validateAnswer
  from "../../src/validation/validateAnswer.js";


test("valid Answer should pass", () => {
  const answer = new Answer({
    value: "Paris",
    correct: true,
    index: 0
  });

  assert.equal(
    validateAnswer(answer),
    true
  );
});


test("should reject non-Answer value", () => {
  assert.throws(
    () => {
      validateAnswer({
        value: "Paris",
        correct: true,
        index: 0
      });
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "INVALID_TYPE"
      );

      return true;
    }
  );
});


test("should reject empty value", () => {
  const answer = new Answer({
    value: "",
    correct: true,
    index: 0
  });

  assert.throws(
    () => {
      validateAnswer(answer);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "Answer.value"
      );

      assert.equal(
        error.code,
        "INVALID_VALUE"
      );

      return true;
    }
  );
});


test("should reject non-boolean correct", () => {
  const answer = new Answer({
    value: "Paris",
    correct: "true",
    index: 0
  });

  assert.throws(
    () => {
      validateAnswer(answer);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "Answer.correct"
      );

      assert.equal(
        error.code,
        "INVALID_TYPE"
      );

      return true;
    }
  );
});


test("should reject negative index", () => {
  const answer = new Answer({
    value: "Paris",
    correct: true,
    index: -1
  });

  assert.throws(
    () => {
      validateAnswer(answer);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "Answer.index"
      );

      assert.equal(
        error.code,
        "INVALID_INDEX"
      );

      return true;
    }
  );
});


test("should reject non-integer index", () => {
  const answer = new Answer({
    value: "Paris",
    correct: true,
    index: 1.5
  });

  assert.throws(
    () => {
      validateAnswer(answer);
    },
    ValidationError
  );
});
