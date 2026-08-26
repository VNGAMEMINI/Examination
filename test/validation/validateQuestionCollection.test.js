import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import ValidationError from "../../src/validation/ValidationError.js";

import validateQuestionCollection from "../../src/validation/validateQuestionCollection.js";

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

function createQuestion(id = null) {
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
    id,
    text: "Which answer is correct?",
    answers,
  });
}

test("valid QuestionCollection should pass", () => {
  const questions = new QuestionCollection([
    createQuestion("q1"),
    createQuestion("q2"),
  ]);

  assert.equal(validateQuestionCollection(questions), true);
});

test("should reject non-QuestionCollection", () => {
  assert.throws(
    () => {
      validateQuestionCollection([]);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "INVALID_TYPE");

      return true;
    },
  );
});

test("should reject empty collection", () => {
  const questions = new QuestionCollection();

  assert.throws(
    () => {
      validateQuestionCollection(questions);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "MIN_ITEMS");

      return true;
    },
  );
});

test("should validate every Question", () => {
  const question = new Question({
    id: "q1",
    text: "",
    answers: createAnswerCollection(),
  });

  const collection = new QuestionCollection([question]);

  assert.throws(
    () => {
      validateQuestionCollection(collection);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.path, "Question.text");

      return true;
    },
  );
});

test("should reject duplicate question ids", () => {
  const questions = new QuestionCollection([
    createQuestion("q1"),
    createQuestion("q1"),
  ]);

  assert.throws(
    () => {
      validateQuestionCollection(questions);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "DUPLICATE_ID");

      return true;
    },
  );
});

test("should allow questions without ids", () => {
  const questions = new QuestionCollection([
    createQuestion(),
    createQuestion(),
  ]);

  assert.equal(validateQuestionCollection(questions), true);
});
