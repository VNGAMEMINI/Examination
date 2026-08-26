import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

test("AnswerCollection should add answers", () => {
  const answers = new AnswerCollection();

  const answer = new Answer({
    value: "Hà Nội",
    index: 0,
    correct: true
  });

  answers.add(answer);

  assert.equal(answers.length, 1);
  assert.equal(answers.get(0), answer);
});

test("AnswerCollection should remove answers", () => {
  const answer = new Answer({
    value: "Hà Nội"
  });

  const answers = new AnswerCollection([answer]);

  const removed = answers.remove(0);

  assert.equal(removed, answer);
  assert.equal(answers.length, 0);
});

test("AnswerCollection should reject invalid values", () => {
  const answers = new AnswerCollection();

  assert.throws(() => {
    answers.add("Hà Nội");
  }, TypeError);
});

test("AnswerCollection should return a copy", () => {
  const answer = new Answer({
    value: "Hà Nội"
  });

  const answers = new AnswerCollection([answer]);

  const array = answers.toArray();

  assert.notEqual(array, answers.toArray());
  assert.equal(array[0], answer);
});
