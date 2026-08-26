import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import ValidationError from "../../src/validation/ValidationError.js";

import validateQuestion from "../../src/validation/validateQuestion.js";

function createAnswerCollection() {
  return new AnswerCollection([
    new Answer({
      value: "A",
      correct: false,
      index: 0
    }),

    new Answer({
      value: "B",
      correct: true,
      index: 1
    })
  ]);
}

function createQuestion() {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      correct: false,
      index: 0,
    }),

    new Answer({
      value: "B",
      correct: true,
      index: 1,
    }),
  ]);

  return new Question({
    text: "Which answer is correct?",
    answers,
  });
}

test("valid Question should pass", () => {
  const question = createQuestion();

  assert.equal(validateQuestion(question), true);
});

test("should reject non-Question", () => {
  assert.throws(
    () => {
      validateQuestion({
        text: "Question",
      });
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "INVALID_TYPE");

      return true;
    },
  );
});

test("should reject empty question text", () => {
  const question = new Question({
    id: "q1",
    text: "",
    answers: createAnswerCollection(),
  });

  assert.throws(
    () => {
      validateQuestion(question);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.path, "Question.text");

      assert.equal(error.code, "INVALID_VALUE");

      return true;
    },
  );
});

test("should reject non-string question text", () => {
  const question =
  new Question({
    id: "q1",
    text: 1234,
    answers: createAnswerCollection()
  });

  assert.throws(() => {
    validateQuestion(question);
  }, ValidationError);
});

test("should validate answers", () => {
  const question = new Question({
    id: "q1",
    text: "Which answer is correct?",
    answers: new AnswerCollection([
    new Answer({
      value: "A",
      correct: false,
      index: 0,
    }),

    new Answer({
      value: "B",
      correct: false,
      index: 1,
    }),
  ]),
  });

  assert.throws(
    () => {
      validateQuestion(question);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "NO_CORRECT_ANSWER");

      return true;
    },
  );
});
