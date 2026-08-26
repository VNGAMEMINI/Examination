import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import normalizeQuestionCollection
  from "../../src/data/normalizeQuestionCollection.js";

test("should normalize question array", () => {
  const questions = normalizeQuestionCollection([
    {
      q: "2 + 2 = ?",
      a: ["3", "4", "5"],
      correct: 1
    },
    {
      q: "3 + 3 = ?",
      a: ["5", "6", "7"],
      correct: 1
    }
  ]);

  assert.ok(
    questions instanceof QuestionCollection
  );

  assert.equal(questions.length, 2);

  assert.ok(
    questions.get(0) instanceof Question
  );

  assert.ok(
    questions.get(1) instanceof Question
  );
});

test("should normalize each question", () => {
  const questions = normalizeQuestionCollection([
    {
      q: "2 + 2 = ?",
      a: ["3", "4"],
      correct: 1
    },
    {
      q: "3 + 3 = ?",
      a: ["5", "6"],
      correct: 1
    }
  ]);

  assert.equal(
    questions.get(0).text,
    "2 + 2 = ?"
  );

  assert.equal(
    questions.get(1).text,
    "3 + 3 = ?"
  );

  assert.equal(
    questions.get(0)
      .answers
      .get(1)
      .correct,
    true
  );
});

test("should preserve existing QuestionCollection", () => {
  const original =
    normalizeQuestionCollection([
      {
        q: "Question",
        a: ["A", "B"],
        correct: 0
      }
    ]);

  const normalized =
    normalizeQuestionCollection(original);

  assert.equal(
    normalized,
    original
  );
});

test("should support mixed Question and raw objects", () => {
  const question = normalizeQuestionCollection([
    {
      q: "Question 1",
      a: ["A", "B"],
      correct: 0
    }
  ]).get(0);

  const questions =
    normalizeQuestionCollection([
      question,
      {
        q: "Question 2",
        a: ["C", "D"],
        correct: 1
      }
    ]);

  assert.equal(
    questions.length,
    2
  );

  assert.equal(
    questions.get(0),
    question
  );

  assert.equal(
    questions.get(1).text,
    "Question 2"
  );
});

test("should reject invalid input", () => {
  assert.throws(() => {
    normalizeQuestionCollection({});
  }, TypeError);

  assert.throws(() => {
    normalizeQuestionCollection("questions");
  }, TypeError);
});
