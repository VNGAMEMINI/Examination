import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";

import normalizeQuestion
  from "../../src/data/normalizeQuestion.js";

test("should normalize q and a format", () => {
  const question = normalizeQuestion({
    q: "2 + 2 = ?",
    a: ["3", "4", "5"],
    correct: 1
  });

  assert.ok(question instanceof Question);

  assert.equal(
    question.text,
    "2 + 2 = ?"
  );

  assert.equal(
    question.answers.length,
    3
  );

  assert.equal(
    question.answers.get(0).correct,
    false
  );

  assert.equal(
    question.answers.get(1).correct,
    true
  );

  assert.equal(
    question.answers.get(2).correct,
    false
  );
});

test("should normalize question and answers format", () => {
  const question = normalizeQuestion({
    question: "Capital of Vietnam?",
    answers: [
      "Hanoi",
      "Hue",
      "Da Nang"
    ],
    correct: 0
  });

  assert.equal(
    question.text,
    "Capital of Vietnam?"
  );

  assert.equal(
    question.answers.get(0).correct,
    true
  );
});

test("should support text format", () => {
  const question = normalizeQuestion({
    text: "2 + 2 = ?",
    answers: ["3", "4"],
    correct: 1
  });

  assert.equal(
    question.text,
    "2 + 2 = ?"
  );
});

test("should support multiple correct answers", () => {
  const question = normalizeQuestion({
    q: "Select even numbers",
    a: ["1", "2", "3", "4"],
    correct: [1, 3],
    type: "multiple"
  });

  assert.equal(
    question.answers.get(0).correct,
    false
  );

  assert.equal(
    question.answers.get(1).correct,
    true
  );

  assert.equal(
    question.answers.get(2).correct,
    false
  );

  assert.equal(
    question.answers.get(3).correct,
    true
  );
});

test("should preserve existing Question", () => {
  const original = normalizeQuestion({
    q: "Question",
    a: ["A", "B"],
    correct: 0
  });

  const result =
    normalizeQuestion(original);

  assert.equal(result, original);
});

test("should reject invalid input", () => {
  assert.throws(() => {
    normalizeQuestion("Question");
  }, TypeError);

  assert.throws(() => {
    normalizeQuestion([]);
  }, TypeError);
});
