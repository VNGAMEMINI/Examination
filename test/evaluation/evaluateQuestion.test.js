import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import Answer from "../../src/answer/Answer.js";

import evaluateQuestion from "../../src/evaluation/evaluateQuestion.js";

function createQuestion(correctIndexes = [0]) {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      index: 0,
      correct: correctIndexes.includes(0),
    }),
    new Answer({
      value: "B",
      index: 1,
      correct: correctIndexes.includes(1),
    }),
    new Answer({
      value: "C",
      index: 2,
      correct: correctIndexes.includes(2),
    }),
  ]);

  return new Question({
    id: "q1",
    text: "Question?",
    answers,
  });
}

test("evaluateQuestion should accept correct answer", () => {
  const question = createQuestion([0]);

  const result = evaluateQuestion(question, 0);

  assert.equal(result.correct, true);
  assert.equal(result.unanswered, false);
});

test("evaluateQuestion should reject incorrect answer", () => {
  const question = createQuestion([0]);

  const result = evaluateQuestion(question, 1);

  assert.equal(result.correct, false);
  assert.equal(result.unanswered, false);
});

test("evaluateQuestion should handle unanswered", () => {
  const question = createQuestion([0]);

  const result = evaluateQuestion(question, null);

  assert.equal(result.correct, false);
  assert.equal(result.unanswered, true);
});

test("evaluateQuestion should support multiple correct answers", () => {
  const question = createQuestion([0, 2]);

  const result = evaluateQuestion(question, [0, 2]);

  assert.equal(result.correct, true);
  assert.equal(result.unanswered, false);
});

test("evaluateQuestion should reject partial multiple answers", () => {
  const question = createQuestion([0, 2]);

  const result = evaluateQuestion(question, [0]);

  assert.equal(result.correct, false);
  assert.equal(result.unanswered, false);
});

test("evaluateQuestion should reject invalid Question", () => {
  assert.throws(() => {
    evaluateQuestion({}, 0);
  }, TypeError);
});
