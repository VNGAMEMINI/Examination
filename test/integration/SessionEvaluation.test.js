import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Session from "../../src/examination/Session.js";

import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import Result from "../../src/examination/Result.js";

function createQuestion(id, correctIndex) {
  return new Question({
    id,
    text: `Question ${id}`,
    answers: new AnswerCollection([
      new Answer({
        value: "A",
        index: 0,
        correct: correctIndex === 0,
      }),
      new Answer({
        value: "B",
        index: 1,
        correct: correctIndex === 1,
      }),
    ]),
  });
}

function createExamination() {
  const subject = new Subject({
    id: "subject-1",
    name: "Mathematics",
    questions: new QuestionCollection([
      createQuestion("q1", 0),
      createQuestion("q2", 1),
      createQuestion("q3", 0),
    ]),
  });

  return new Examination({
    id: "exam-1",
    title: "Integration Test",
    subjects: new SubjectCollection([subject]),
  });
}

test("Session → Evaluation → Score → Result should work", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  session.answer(0, 0, 0);
  session.answer(0, 1, 1);
  session.answer(0, 2, 0);

  const result = session.evaluate();

  assert.ok(result instanceof Result);

  assert.equal(result.total, 3);
  assert.equal(result.correct, 3);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);
  assert.equal(result.score, 3);
  assert.equal(result.percentage, 100);
});

test("Session should evaluate correct, incorrect and unanswered answers", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  session.answer(0, 0, 0);
  session.answer(0, 1, 0);

  const result = session.evaluate();

  assert.equal(result.total, 3);
  assert.equal(result.correct, 1);
  assert.equal(result.incorrect, 1);
  assert.equal(result.unanswered, 1);
});

test("Session navigation should work with answerCurrent", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  session.navigation.first();
  session.answerCurrent(0);

  session.navigation.next();
  session.answerCurrent(1);

  session.navigation.next();
  session.answerCurrent(0);

  const result = session.evaluate();

  assert.equal(result.total, 3);
  assert.equal(result.correct, 3);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);
});

test("Session should preserve question navigation order", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.equal(session.questionCount, 3);

  assert.equal(session.navigation.current.id, "q1");

  session.navigation.next();

  assert.equal(session.navigation.current.id, "q2");

  session.navigation.next();

  assert.equal(session.navigation.current.id, "q3");
});

test("Session should reject evaluation before start", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.throws(() => {
    session.evaluate();
  }, Error);
});

test("Session should reject answering after completion", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();
  session.complete();

  assert.throws(() => {
    session.answer(0, 0, 0);
  }, Error);
});

test("Empty Session → Evaluation → Score → Result should work", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  session.start();

  const result = session.evaluate();

  assert.ok(result instanceof Result);

  assert.equal(result.total, 0);
  assert.equal(result.correct, 0);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);
  assert.equal(result.score, 0);
  assert.equal(result.percentage, 0);
});
