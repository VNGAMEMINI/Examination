import test from "node:test";
import assert from "node:assert/strict";

import Subject from "../../src/subject/Subject.js";
import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import normalizeSubject
  from "../../src/data/normalizeSubject.js";

test("should normalize subject", () => {
  const subject = normalizeSubject({
    id: "math",
    name: "Toán",

    questions: [
      {
        q: "2 + 2 = ?",
        a: ["3", "4"],
        correct: 1
      }
    ]
  });

  assert.ok(subject instanceof Subject);

  assert.equal(
    subject.id,
    "math"
  );

  assert.equal(
    subject.name,
    "Toán"
  );

  assert.ok(
    subject.questions instanceof QuestionCollection
  );

  assert.equal(
    subject.questions.length,
    1
  );

  assert.ok(
    subject.questions.get(0) instanceof Question
  );
});

test("should support title as name", () => {
  const subject = normalizeSubject({
    id: "math",
    title: "Toán",
    questions: []
  });

  assert.equal(
    subject.name,
    "Toán"
  );
});

test("should support q as questions", () => {
  const subject = normalizeSubject({
    id: "math",
    name: "Toán",

    q: [
      {
        q: "2 + 2 = ?",
        a: ["3", "4"],
        correct: 1
      }
    ]
  });

  assert.equal(
    subject.questions.length,
    1
  );

  assert.equal(
    subject.questions.get(0).text,
    "2 + 2 = ?"
  );
});

test("should preserve metadata", () => {
  const metadata = {
    version: 1,
    author: "VNGAMEMINI"
  };

  const subject = normalizeSubject({
    id: "math",
    name: "Toán",
    metadata
  });

  assert.equal(
    subject.metadata,
    metadata
  );
});

test("should preserve existing Subject", () => {
  const original = normalizeSubject({
    id: "math",
    name: "Toán",
    questions: []
  });

  const result =
    normalizeSubject(original);

  assert.equal(
    result,
    original
  );
});

test("should reject invalid input", () => {
  assert.throws(() => {
    normalizeSubject("math");
  }, TypeError);

  assert.throws(() => {
    normalizeSubject([]);
  }, TypeError);
});
