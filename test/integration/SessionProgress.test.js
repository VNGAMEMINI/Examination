import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";
import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import Session from "../../src/examination/Session.js";

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
  return new Examination({
    subjects: new SubjectCollection([
      new Subject({
        id: "subject-1",
        name: "Subject 1",
        questions: new QuestionCollection([
          createQuestion("q-1", 0),
          createQuestion("q-2", 1),
        ]),
      }),
      new Subject({
        id: "subject-2",
        name: "Subject 2",
        questions: new QuestionCollection([
          createQuestion("q-3", 0),
          createQuestion("q-4", 1),
        ]),
      }),
    ]),
  });
}

test("Session should have zero progress initially", () => {
  const session = new Session({
    examination: createExamination(),
  });

  assert.equal(session.answeredCount, 0);
  assert.equal(session.unansweredCount, 4);
  assert.equal(session.progress, 0);
});

test("Session should count answered questions", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answer(0, 0, 0);
  session.answer(0, 1, 1);

  assert.equal(session.answeredCount, 2);
  assert.equal(session.unansweredCount, 2);
  assert.equal(session.progress, 50);
});

test("Session should reach 100 percent when all questions are answered", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answer(0, 0, 0);
  session.answer(0, 1, 1);
  session.answer(1, 0, 0);
  session.answer(1, 1, 1);

  assert.equal(session.answeredCount, 4);
  assert.equal(session.unansweredCount, 0);
  assert.equal(session.progress, 100);
});

test("Session should not count unanswered questions as answered", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answer(0, 0, 0);

  assert.equal(session.answeredCount, 1);
  assert.equal(session.unansweredCount, 3);
});

test("Session progress should be zero for empty examination", () => {
  const session = new Session({
    examination: new Examination(),
  });

  assert.equal(session.questionCount, 0);
  assert.equal(session.answeredCount, 0);
  assert.equal(session.unansweredCount, 0);
  assert.equal(session.progress, 0);
});
