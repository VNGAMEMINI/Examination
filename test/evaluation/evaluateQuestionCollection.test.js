import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import evaluateQuestionCollection from "../../src/evaluation/evaluateQuestionCollection.js";

function createQuestion(id, correctIndex) {
  const answers = new AnswerCollection([
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
    new Answer({
      value: "C",
      index: 2,
      correct: correctIndex === 2,
    }),
  ]);

  return new Question({
    id,
    text: `Question ${id}`,
    answers,
  });
}

function createCollection() {
  return new QuestionCollection([
    createQuestion("q1", 0),
    createQuestion("q2", 1),
    createQuestion("q3", 2),
  ]);
}

test("evaluateQuestionCollection should evaluate every Question", () => {
  const questions = createCollection();

  const results = evaluateQuestionCollection(questions, [0, 1, 2]);

  assert.equal(results.length, 3);

  assert.equal(results[0].correct, true);
  assert.equal(results[1].correct, true);
  assert.equal(results[2].correct, true);
});

test("evaluateQuestionCollection should detect incorrect answers", () => {
  const questions = createCollection();

  const results = evaluateQuestionCollection(questions, [1, 0, 1]);

  assert.equal(results.length, 3);

  assert.equal(results[0].correct, false);
  assert.equal(results[1].correct, false);
  assert.equal(results[2].correct, false);
});

test("evaluateQuestionCollection should detect unanswered questions", () => {
  const questions = createCollection();

  const results = evaluateQuestionCollection(questions, [0, null, undefined]);

  assert.equal(results[0].unanswered, false);
  assert.equal(results[1].unanswered, true);
  assert.equal(results[2].unanswered, true);
});

test("evaluateQuestionCollection should preserve result order", () => {
  const questions = createCollection();

  const results = evaluateQuestionCollection(questions, [1, 1, 2]);

  assert.equal(results[0].expected[0], 0);
  assert.equal(results[1].expected[0], 1);
  assert.equal(results[2].expected[0], 2);
});

test("evaluateQuestionCollection should support empty collection", () => {
  const questions = new QuestionCollection();

  const results = evaluateQuestionCollection(questions, []);

  assert.deepEqual(results, []);
});

test("evaluateQuestionCollection should reject invalid collection", () => {
  assert.throws(() => {
    evaluateQuestionCollection({}, []);
  }, TypeError);
});
