import test from "node:test";
import assert from "node:assert/strict";

import {
  ValidationError,
  validateAnswer,
  validateAnswerCollection,
  validateQuestion,
  validateQuestionCollection,
  validateSubject,
  validateSubjectCollection,
  validateExamination
} from "../../src/validation/index.js";


test("validation API should export all validators", () => {
  assert.equal(
    typeof ValidationError,
    "function"
  );

  assert.equal(
    typeof validateAnswer,
    "function"
  );

  assert.equal(
    typeof validateAnswerCollection,
    "function"
  );

  assert.equal(
    typeof validateQuestion,
    "function"
  );

  assert.equal(
    typeof validateQuestionCollection,
    "function"
  );

  assert.equal(
    typeof validateSubject,
    "function"
  );

  assert.equal(
    typeof validateSubjectCollection,
    "function"
  );

  assert.equal(
    typeof validateExamination,
    "function"
  );
});
