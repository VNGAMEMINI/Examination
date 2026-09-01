import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import ValidationError from "../../src/errors/ValidationError.js";
import validateQuestion from "../../src/validate/validateQuestion.js";

test("validateQuestion accepts valid Question", () => {
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

  assert.equal(validateQuestion(question), true);
});

test("validateQuestion rejects non Question", () => {
  assert.throws(
    () => validateQuestion({
      id: "q1",
      text: "Capital?"
    }),
    ValidationError
  );
});

test("validateQuestion rejects duplicate answer ids", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris"
      },
      {
        id: "a1",
        text: "London"
      }
    ],
    correct: ["a1"]
  });

  assert.throws(
    () => validateQuestion(question),
    ValidationError
  );
});

test("validateQuestion rejects unknown correct answer", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris"
      }
    ],
    correct: ["a99"]
  });

  assert.throws(
    () => validateQuestion(question),
    ValidationError
  );
});
