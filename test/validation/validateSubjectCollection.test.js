import test from "node:test";
import assert from "node:assert/strict";

import Subject from "../../src/subject/Subject.js";
import SubjectCollection
  from "../../src/subject/SubjectCollection.js";

import Question from "../../src/question/Question.js";
import QuestionCollection
  from "../../src/question/QuestionCollection.js";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection
  from "../../src/answer/AnswerCollection.js";

import ValidationError
  from "../../src/validation/ValidationError.js";

import validateSubjectCollection
  from "../../src/validation/validateSubjectCollection.js";


function createQuestion(id = null) {
  const answers = new AnswerCollection([
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

  return new Question({
    id,
    text: "Which answer is correct?",
    answers
  });
}


function createSubject(id = null) {
  const questions = new QuestionCollection([
    createQuestion("q1")
  ]);

  return new Subject({
    id,
    name: "Mathematics",
    questions
  });
}


test("valid SubjectCollection should pass", () => {
  const subjects = new SubjectCollection([
    createSubject("s1"),
    createSubject("s2")
  ]);

  assert.equal(
    validateSubjectCollection(subjects),
    true
  );
});


test("should reject non-SubjectCollection", () => {
  assert.throws(
    () => {
      validateSubjectCollection([]);
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


test("should reject empty collection", () => {
  const subjects = new SubjectCollection();

  assert.throws(
    () => {
      validateSubjectCollection(subjects);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "MIN_ITEMS"
      );

      return true;
    }
  );
});


test("should validate every Subject", () => {
  const valid =
  new Subject({
    id: "s1",
    name: "Mathematics",
    questions: new QuestionCollection([
      createQuestion("q1")
    ])
  });

  const invalid =
  new Subject({
    id: "s2",
    name: "",
    questions: new QuestionCollection([
      createQuestion("q2")
    ])
  });


  const subjects = new SubjectCollection([
    valid,
    invalid
  ]);

  assert.throws(
    () => {
      validateSubjectCollection(subjects);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "Subject.name"
      );

      return true;
    }
  );
});


test("should reject duplicate subject ids", () => {
  const subjects = new SubjectCollection([
    createSubject("s1"),
    createSubject("s1")
  ]);

  assert.throws(
    () => {
      validateSubjectCollection(subjects);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "DUPLICATE_ID"
      );

      return true;
    }
  );
});


test("should allow subjects without ids", () => {
  const subjects = new SubjectCollection([
    createSubject(),
    createSubject()
  ]);

  assert.equal(
    validateSubjectCollection(subjects),
    true
  );
});
