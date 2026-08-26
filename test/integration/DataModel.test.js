import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";

test("Data Model should work as a complete hierarchy", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "3",
      index: 0
    }),

    new Answer({
      value: "4",
      index: 1,
      correct: true
    }),

    new Answer({
      value: "5",
      index: 2
    })
  ]);

  const question = new Question({
    id: "q1",
    text: "2 + 2 = ?",
    answers,
    type: "single"
  });

  const questions = new QuestionCollection([
    question
  ]);

  const subject = new Subject({
    id: "math",
    name: "Toán",
    questions
  });

  const subjects = new SubjectCollection([
    subject
  ]);

  assert.equal(subjects.length, 1);

  assert.equal(
    subjects.get(0).name,
    "Toán"
  );

  assert.equal(
    subjects.get(0).questions.length,
    1
  );

  assert.equal(
    subjects.get(0).questions.get(0).text,
    "2 + 2 = ?"
  );

  assert.equal(
    subjects
      .get(0)
      .questions
      .get(0)
      .answers
      .get(1)
      .value,
    "4"
  );

  assert.equal(
    subjects
      .get(0)
      .questions
      .get(0)
      .answers
      .get(1)
      .correct,
    true
  );
});
