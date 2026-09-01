import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import ValidationError from "../../src/errors/ValidationError.js";
import validate from "../../src/validate/validate.js";

test("validate accepts Question", () => {
  const question = new Question({
    id: "q1",
    text: "Question",
    answers: [
      {
        id: "a1",
        text: "Answer"
      }
    ],
    correct: ["a1"]
  });

  assert.equal(validate(question), true);
});

test("validate accepts Question array", () => {
  const questions = [
    new Question({
      id: "q1",
      text: "Question 1",
      answers: [
        {
          id: "a1",
          text: "Answer"
        }
      ],
      correct: ["a1"]
    }),
    new Question({
      id: "q2",
      text: "Question 2",
      answers: [
        {
          id: "a1",
          text: "Answer"
        }
      ],
      correct: ["a1"]
    })
  ];

  assert.equal(validate(questions), true);
});

test("validate rejects unsupported input", () => {
  assert.throws(
    () => validate(null),
    ValidationError
  );
});
