import test from "node:test";
import assert from "node:assert/strict";

import Examination
  from "../../src/examination/Examination.js";

import Subject
  from "../../src/subject/Subject.js";

import SubjectCollection
  from "../../src/subject/SubjectCollection.js";

import Question
  from "../../src/question/Question.js";

import QuestionCollection
  from "../../src/question/QuestionCollection.js";

import Answer
  from "../../src/answer/Answer.js";

import AnswerCollection
  from "../../src/answer/AnswerCollection.js";

import ValidationError
  from "../../src/validation/ValidationError.js";

import validateExamination
  from "../../src/validation/validateExamination.js";


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
  return new Question({
    id,
    text: "Which answer is correct?",
    answers: createAnswerCollection()
  });
}


function createSubject(id = null) {
  return new Subject({
    id,
    name: "Mathematics",
    questions: new QuestionCollection([
      createQuestion("q1")
    ])
  });
}


function createExamination() {
  return new Examination({
    subjects: new SubjectCollection([
      createSubject("s1")
    ])
  });
}


test("valid Examination should pass", () => {
  const examination =
    createExamination();

  assert.equal(
    validateExamination(examination),
    true
  );
});


test("should reject non-Examination", () => {
  assert.throws(
    () => {
      validateExamination({});
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


test("should validate SubjectCollection", () => {
  const examination =
    new Examination({
      subjects: new SubjectCollection()
    });

  assert.throws(
    () => {
      validateExamination(examination);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "SubjectCollection"
      );

      assert.equal(
        error.code,
        "MIN_ITEMS"
      );

      return true;
    }
  );
});


test("should validate Subject", () => {
  const subject =
    new Subject({
      id: "s1",
      name: "",
      questions: new QuestionCollection([
        createQuestion("q1")
      ])
    });

  const examination =
    new Examination({
      subjects: new SubjectCollection([
        subject
      ])
    });

  assert.throws(
    () => {
      validateExamination(examination);
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


test("should validate Question", () => {
  const question =
    new Question({
      id: "q1",
      text: "",
      answers: createAnswerCollection()
    });

  const subject =
    new Subject({
      id: "s1",
      name: "Mathematics",
      questions: new QuestionCollection([
        question
      ])
    });

  const examination =
    new Examination({
      subjects: new SubjectCollection([
        subject
      ])
    });

  assert.throws(
    () => {
      validateExamination(examination);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "Question.text"
      );

      return true;
    }
  );
});


test("should validate AnswerCollection", () => {
  const question =
    new Question({
      id: "q1",
      text: "Which answer is correct?",
      answers: new AnswerCollection([
        new Answer({
          value: "A",
          correct: false,
          index: 0
        }),

        new Answer({
          value: "B",
          correct: false,
          index: 1
        })
      ])
    });

  const subject =
    new Subject({
      id: "s1",
      name: "Mathematics",
      questions: new QuestionCollection([
        question
      ])
    });

  const examination =
    new Examination({
      subjects: new SubjectCollection([
        subject
      ])
    });

  assert.throws(
    () => {
      validateExamination(examination);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "NO_CORRECT_ANSWER"
      );

      return true;
    }
  );
});
