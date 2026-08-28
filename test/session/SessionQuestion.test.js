import test from "node:test";
import assert from "node:assert/strict";

import SessionQuestion from "../../src/session/SessionQuestion.js";
import Question from "../../src/question/Question.js";

function createQuestion(id) {
  return new Question({
    id,
    text: `Question ${id}`,
  });
}

test("SessionQuestion should create correctly", () => {
  const question = createQuestion();

  const sessionQuestion = new SessionQuestion({
    question,
    subjectIndex: 1,
    questionIndex: 2,
  });

  assert.equal(sessionQuestion.question, question);
  assert.equal(sessionQuestion.subjectIndex, 1);
  assert.equal(sessionQuestion.questionIndex, 2);
});

test("SessionQuestion should preserve Question identity", () => {
  const question = createQuestion();

  const sessionQuestion = new SessionQuestion({
    question,
    subjectIndex: 0,
    questionIndex: 0,
  });

  assert.strictEqual(sessionQuestion.question, question);
});

test("SessionQuestion should reject missing question", () => {
  assert.throws(
    () =>
      new SessionQuestion({
        subjectIndex: 0,
        questionIndex: 0,
      }),
    TypeError,
  );
});

test("SessionQuestion should reject invalid subjectIndex", () => {
  const question = createQuestion();

  assert.throws(
    () =>
      new SessionQuestion({
        question,
        subjectIndex: -1,
        questionIndex: 0,
      }),
    TypeError,
  );
});

test("SessionQuestion should reject invalid questionIndex", () => {
  const question = createQuestion();

  assert.throws(
    () =>
      new SessionQuestion({
        question,
        subjectIndex: 0,
        questionIndex: -1,
      }),
    TypeError,
  );
});

test("SessionQuestion should not expose setters", () => {
  const question = createQuestion();

  const sessionQuestion = new SessionQuestion({
    question,
    subjectIndex: 0,
    questionIndex: 0,
  });

  assert.equal(
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(sessionQuestion),
      "question",
    ).set,
    undefined,
  );

  assert.equal(
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(sessionQuestion),
      "subjectIndex",
    ).set,
    undefined,
  );

  assert.equal(
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(sessionQuestion),
      "questionIndex",
    ).set,
    undefined,
  );
});
