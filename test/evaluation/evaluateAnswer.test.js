import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import evaluateAnswer from "../../src/evaluation/evaluateAnswer.js";

function createAnswers() {
  return new AnswerCollection([
    new Answer({
      value: "A",
      index: 0,
      correct: true
    }),
    new Answer({
      value: "B",
      index: 1,
      correct: false
    }),
    new Answer({
      value: "C",
      index: 2,
      correct: false
    })
  ]);
}

test("evaluateAnswer should accept correct answer", () => {
  const result = evaluateAnswer(
    createAnswers(),
    0
  );

  assert.equal(result.correct, true);
  assert.deepEqual(result.expected, [0]);
  assert.deepEqual(result.selected, [0]);
});

test("evaluateAnswer should reject incorrect answer", () => {
  const result = evaluateAnswer(
    createAnswers(),
    1
  );

  assert.equal(result.correct, false);
  assert.deepEqual(result.expected, [0]);
  assert.deepEqual(result.selected, [1]);
});

test("evaluateAnswer should handle unanswered", () => {
  const result = evaluateAnswer(
    createAnswers(),
    null
  );

  assert.equal(result.correct, false);
  assert.deepEqual(result.expected, [0]);
  assert.deepEqual(result.selected, []);
});

test("evaluateAnswer should support multiple correct answers", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      index: 0,
      correct: true
    }),
    new Answer({
      value: "B",
      index: 1,
      correct: true
    }),
    new Answer({
      value: "C",
      index: 2,
      correct: false
    })
  ]);

  const result = evaluateAnswer(
    answers,
    [1, 0]
  );

  assert.equal(result.correct, true);
  assert.deepEqual(result.expected, [0, 1]);
  assert.deepEqual(result.selected, [0, 1]);
});

test("evaluateAnswer should reject partial multiple answers", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      index: 0,
      correct: true
    }),
    new Answer({
      value: "B",
      index: 1,
      correct: true
    })
  ]);

  const result = evaluateAnswer(
    answers,
    [0]
  );

  assert.equal(result.correct, false);
});

test("evaluateAnswer should reject invalid collection", () => {
  assert.throws(
    () => evaluateAnswer([], 0),
    TypeError
  );
});
