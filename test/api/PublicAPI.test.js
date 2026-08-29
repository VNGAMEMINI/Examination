import test from "node:test";
import assert from "node:assert/strict";

import {
  Examination,
  Subject,
  SubjectCollection,
  Question,
  QuestionCollection,
  Answer,
  AnswerCollection,

  Evaluation,
  SubjectEvaluation,
  Score,
  Result,

  Session,
  SessionQuestion,
  SessionQuestionCollection,
  SessionNavigation,
} from "../../src/index.js";


test("Public API should export all core classes", () => {
  assert.equal(typeof Examination, "function");
  assert.equal(typeof Subject, "function");
  assert.equal(typeof SubjectCollection, "function");

  assert.equal(typeof Question, "function");
  assert.equal(typeof QuestionCollection, "function");

  assert.equal(typeof Answer, "function");
  assert.equal(typeof AnswerCollection, "function");
});


test("Public API should export evaluation classes", () => {
  assert.equal(typeof Evaluation, "function");
  assert.equal(typeof SubjectEvaluation, "function");
  assert.equal(typeof Score, "function");
  assert.equal(typeof Result, "function");
});


test("Public API should export Session classes", () => {
  assert.equal(typeof Session, "function");
  assert.equal(typeof SessionQuestion, "function");
  assert.equal(typeof SessionQuestionCollection, "function");
  assert.equal(typeof SessionNavigation, "function");
});


test("Public API should support complete examination flow", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "2",
      index: 0,
      correct: true,
    }),

    new Answer({
      value: "3",
      index: 1,
      correct: false,
    }),
  ]);

  const question = new Question({
    id: "q1",
    text: "1 + 1 = ?",
    answers,
  });

  const subject = new Subject({
    id: "math",
    name: "Mathematics",
    questions: new QuestionCollection([
      question,
    ]),
  });

  const examination = new Examination({
    id: "exam-1",
    title: "Basic Mathematics",
    subjects: new SubjectCollection([
      subject,
    ]),
  });

  const session = new Session({
    id: "session-1",
    examination,
  });

  session.start();
  session.answer(0, 0, 0);

  const result = session.evaluate();

  assert.equal(result.total, 1);
  assert.equal(result.correct, 1);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);
  assert.equal(result.score, 1);
  assert.equal(result.percentage, 100);
});


test("Public API should preserve class identity", () => {
  const answer = new Answer({
    value: "A",
    index: 0,
    correct: true,
  });

  const answers = new AnswerCollection([
    answer,
  ]);

  const question = new Question({
    id: "q1",
    text: "Question",
    answers,
  });

  const subject = new Subject({
    id: "subject-1",
    name: "Subject",
    questions: new QuestionCollection([
      question,
    ]),
  });

  const examination = new Examination({
    id: "exam-1",
    title: "Exam",
    subjects: new SubjectCollection([
      subject,
    ]),
  });

  const session = new Session({
    examination,
  });

  const sessionQuestion = session.questions[0];

  assert.ok(examination instanceof Examination);
  assert.ok(subject instanceof Subject);
  assert.ok(question instanceof Question);
  assert.ok(answer instanceof Answer);

  assert.ok(sessionQuestion instanceof SessionQuestion);
  assert.ok(session.navigation instanceof SessionNavigation);
});
