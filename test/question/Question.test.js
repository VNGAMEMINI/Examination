import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import Question from "../../src/question/Question.js";

test("Question should create correctly", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "Hà Nội",
      index: 0,
      correct: true
    })
  ]);

  const question = new Question({
    id: "q1",
    text: "Thủ đô Việt Nam là gì?",
    answers,
    type: "single"
  });

  assert.equal(question.id, "q1");
  assert.equal(question.text, "Thủ đô Việt Nam là gì?");
  assert.equal(question.type, "single");
  assert.equal(question.answers, answers);
});

test("Question should create empty AnswerCollection by default", () => {
  const question = new Question({
    text: "2 + 2 = ?"
  });

  assert.ok(question.answers instanceof AnswerCollection);
  assert.equal(question.answers.length, 0);
});

test("Question should reject invalid answers", () => {
  assert.throws(() => {
    new Question({
      text: "2 + 2 = ?",
      answers: []
    });
  }, TypeError);
});
