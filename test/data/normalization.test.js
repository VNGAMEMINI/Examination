import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";

import normalizeExamination
  from "../../src/data/normalizeExamination.js";


test("full normalization pipeline", () => {
  const result = normalizeExamination({
    subjects: [
      {
        id: "math",
        name: "Toán",

        questions: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4", "5"],
            correct: 1
          }
        ]
      }
    ]
  });

  assert.ok(
    result instanceof SubjectCollection
  );

  const subject = result.get(0);

  assert.ok(
    subject instanceof Subject
  );

  const questions = subject.questions;

  assert.ok(
    questions instanceof QuestionCollection
  );

  const question = questions.get(0);

  assert.ok(
    question instanceof Question
  );

  const answers = question.answers;

  assert.ok(
    answers instanceof AnswerCollection
  );

  assert.ok(
    answers.get(0) instanceof Answer
  );

  assert.ok(
    answers.get(1) instanceof Answer
  );

  assert.ok(
    answers.get(2) instanceof Answer
  );
});


test("should normalize short format", () => {
  const result = normalizeExamination({
    s: [
      {
        id: "math",
        name: "Toán",

        q: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4"],
            correct: 1
          }
        ]
      }
    ]
  });

  const question =
    result
      .get(0)
      .questions
      .get(0);

  assert.equal(
    question.text,
    "2 + 2 = ?"
  );

  assert.equal(
    question.answers.get(1).correct,
    true
  );
});


test("should normalize full format", () => {
  const result = normalizeExamination({
    subjects: [
      {
        id: "math",
        name: "Toán",

        questions: [
          {
            text: "2 + 2 = ?",

            answers: [
              {
                value: "3"
              },
              {
                value: "4"
              }
            ],

            correct: 1
          }
        ]
      }
    ]
  });

  const question =
    result
      .get(0)
      .questions
      .get(0);

  assert.equal(
    question.text,
    "2 + 2 = ?"
  );

  assert.equal(
    question.answers.get(1).value,
    "4"
  );

  assert.equal(
    question.answers.get(1).correct,
    true
  );
});


test("should support multiple correct answers", () => {
  const result = normalizeExamination({
    subjects: [
      {
        id: "math",
        name: "Toán",

        questions: [
          {
            q: "Chọn số chẵn",
            a: ["1", "2", "3", "4"],
            correct: [1, 3],
            type: "multiple"
          }
        ]
      }
    ]
  });

  const answers =
    result
      .get(0)
      .questions
      .get(0)
      .answers;

  assert.equal(
    answers.get(0).correct,
    false
  );

  assert.equal(
    answers.get(1).correct,
    true
  );

  assert.equal(
    answers.get(2).correct,
    false
  );

  assert.equal(
    answers.get(3).correct,
    true
  );
});


test("should preserve existing models", () => {
  const first =
    normalizeExamination({
      subjects: [
        {
          id: "math",
          name: "Toán"
        }
      ]
    });

  const second =
    normalizeExamination(first);

  assert.equal(
    second,
    first
  );

  assert.equal(
    second.get(0),
    first.get(0)
  );
});


test("should support multiple subjects", () => {
  const result = normalizeExamination({
    subjects: [
      {
        id: "math",
        name: "Toán"
      },
      {
        id: "physics",
        name: "Vật lý"
      }
    ]
  });

  assert.equal(
    result.length,
    2
  );

  assert.equal(
    result.get(0).id,
    "math"
  );

  assert.equal(
    result.get(1).id,
    "physics"
  );
});


test("should reject invalid root data", () => {
  assert.throws(() => {
    normalizeExamination(null);
  }, TypeError);

  assert.throws(() => {
    normalizeExamination("invalid");
  }, TypeError);
});
