import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import SessionQuestion from "../../src/session/SessionQuestion.js";

function createQuestion() {
  return new Question({
    id: "q1",
    text: "What is 1 + 1?",
    answers: new AnswerCollection([
      new Answer({
        value: "1",
        index: 0,
        correct: false,
      }),
      new Answer({
        value: "2",
        index: 1,
        correct: true,
      }),
    ]),
  });
}

test("SessionQuestion should create correctly", () => {
  const question = createQuestion();

  const sessionQuestion = new SessionQuestion({
    question,
    subjectIndex: 2,
    questionIndex: 5,
  });

  assert.equal(sessionQuestion.question, question);
  assert.equal(sessionQuestion.id, "q1");
  assert.equal(sessionQuestion.text, "What is 1 + 1?");
  assert.equal(sessionQuestion.answers, question.answers);
  assert.equal(sessionQuestion.subjectIndex, 2);
  assert.equal(sessionQuestion.questionIndex, 5);
});

test("SessionQuestion should preserve original Question", () => {
  const question = createQuestion();

  const sessionQuestion = new SessionQuestion({
    question,
    subjectIndex: 0,
    questionIndex: 0,
  });

  assert.equal(sessionQuestion.question, question);
});

test("SessionQuestion should reject invalid Question", () => {
  assert.throws(() => {
    new SessionQuestion({
      question: {},
      subjectIndex: 0,
      questionIndex: 0,
    });
  }, TypeError);
});

test("SessionQuestion should reject invalid subjectIndex", () => {
  const question = createQuestion();

  assert.throws(() => {
    new SessionQuestion({
      question,
      subjectIndex: -1,
      questionIndex: 0,
    });
  }, TypeError);

  assert.throws(() => {
    new SessionQuestion({
      question,
      subjectIndex: 1.5,
      questionIndex: 0,
    });
  }, TypeError);
});

test("SessionQuestion should reject invalid questionIndex", () => {
  const question = createQuestion();

  assert.throws(() => {
    new SessionQuestion({
      question,
      subjectIndex: 0,
      questionIndex: -1,
    });
  }, TypeError);

  assert.throws(() => {
    new SessionQuestion({
      question,
      subjectIndex: 0,
      questionIndex: 1.5,
    });
  }, TypeError);
});

test("SessionQuestion should not expose setters", () => {
  const question = createQuestion();

  const sessionQuestion = new SessionQuestion({
    question,
    subjectIndex: 0,
    questionIndex: 0,
  });

  assert.throws(() => {
    sessionQuestion.subjectIndex = 10;
  }, TypeError);

  assert.throws(() => {
    sessionQuestion.questionIndex = 10;
  }, TypeError);

  assert.equal(sessionQuestion.subjectIndex, 0);
  assert.equal(sessionQuestion.questionIndex, 0);
});
