import test from "node:test";
import assert from "node:assert/strict";

import Subject from "../../src/subject/Subject.js";
import Question from "../../src/question/Question.js";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import QuestionCollection from "../../src/question/QuestionCollection.js";

import ValidationError from "../../src/validation/ValidationError.js";

import validateSubject from "../../src/validation/validateSubject.js";

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

function createSubject() {
  const questions = new QuestionCollection([
    createQuestion("q1"),
    createQuestion("q2"),
  ]);

  return new Subject({
    name: "Mathematics",
    questions,
  });
}

test("valid Subject should pass", () => {
  const subject = new Subject({
    id: "s1",
    name: "",
    questions: new QuestionCollection([createQuestion("q1")]),
  });

  assert.equal(validateSubject(subject), true);
});

test("should reject non-Subject", () => {
  assert.throws(
    () => {
      validateSubject({
        name: "Mathematics",
      });
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "INVALID_TYPE");

      return true;
    },
  );
});

test("should reject empty subject name", () => {
  const subject = createSubject();

  subject.name = "";

  assert.throws(
    () => {
      validateSubject(subject);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.path, "Subject.name");

      assert.equal(error.code, "INVALID_VALUE");

      return true;
    },
  );
});

test("should reject non-string subject name", () => {
  const subject = new Subject({
    id: "s1",
    name: 123,
    questions: new QuestionCollection([createQuestion("q1")]),
  });

  assert.throws(() => {
    validateSubject(subject);
  }, ValidationError);
});

test("should validate questions", () => {
  const subject = new Subject({
    id: "s1",
    name: "Mathematics",
    questions: new QuestionCollection(),
  });

  const question = subject.questions.get(0);

  question.text = "";

  assert.throws(
    () => {
      validateSubject(subject);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.path, "Question.text");

      return true;
    },
  );
});

test("should reject empty question collection", () => {
  const subject = createSubject();

  subject.questions = new QuestionCollection();

  assert.throws(
    () => {
      validateSubject(subject);
    },
    (error) => {
      assert.ok(error instanceof ValidationError);

      assert.equal(error.code, "MIN_ITEMS");

      return true;
    },
  );
});
