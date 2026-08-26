import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import normalizeAnswerCollection
  from "../../src/data/normalizeAnswerCollection.js";

test("should normalize string array", () => {
  const answers = normalizeAnswerCollection([
    "A",
    "B",
    "C"
  ]);

  assert.ok(
    answers instanceof AnswerCollection
  );

  assert.equal(answers.length, 3);

  assert.equal(
    answers.get(0).value,
    "A"
  );

  assert.equal(
    answers.get(1).value,
    "B"
  );

  assert.equal(
    answers.get(2).value,
    "C"
  );
});

test("should assign indexes automatically", () => {
  const answers = normalizeAnswerCollection([
    "A",
    "B",
    "C"
  ]);

  assert.equal(answers.get(0).index, 0);
  assert.equal(answers.get(1).index, 1);
  assert.equal(answers.get(2).index, 2);
});

test("should normalize object answers", () => {
  const answers = normalizeAnswerCollection([
    {
      value: "A"
    },
    {
      value: "B",
      correct: true
    }
  ]);

  assert.ok(
    answers.get(0) instanceof Answer
  );

  assert.ok(
    answers.get(1) instanceof Answer
  );

  assert.equal(
    answers.get(1).correct,
    true
  );
});

test("should preserve existing AnswerCollection", () => {
  const original = new AnswerCollection([
    new Answer({
      value: "A",
      index: 0
    })
  ]);

  const normalized =
    normalizeAnswerCollection(original);

  assert.equal(normalized, original);
});

test("should reject invalid input", () => {
  assert.throws(() => {
    normalizeAnswerCollection("A");
  }, TypeError);

  assert.throws(() => {
    normalizeAnswerCollection({});
  }, TypeError);
});
