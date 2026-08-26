import test from "node:test";
import assert from "node:assert/strict";

import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";

import normalizeSubjectCollection
  from "../../src/data/normalizeSubjectCollection.js";

test("should normalize subject array", () => {
  const subjects =
    normalizeSubjectCollection([
      {
        id: "math",
        name: "Toán",
        questions: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4"],
            correct: 1
          }
        ]
      },

      {
        id: "physics",
        name: "Vật lý",
        questions: [
          {
            q: "Đơn vị của lực?",
            a: ["N", "J", "W"],
            correct: 0
          }
        ]
      }
    ]);

  assert.ok(
    subjects instanceof SubjectCollection
  );

  assert.equal(
    subjects.length,
    2
  );

  assert.ok(
    subjects.get(0) instanceof Subject
  );

  assert.ok(
    subjects.get(1) instanceof Subject
  );
});

test("should normalize subjects and questions", () => {
  const subjects =
    normalizeSubjectCollection([
      {
        id: "math",
        name: "Toán",
        questions: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4"],
            correct: 1
          }
        ]
      }
    ]);

  const subject = subjects.get(0);
  const question = subject.questions.get(0);

  assert.equal(
    subject.name,
    "Toán"
  );

  assert.equal(
    question.text,
    "2 + 2 = ?"
  );

  assert.equal(
    question.answers.get(1).correct,
    true
  );
});

test("should preserve existing SubjectCollection", () => {
  const original =
    normalizeSubjectCollection([
      {
        id: "math",
        name: "Toán"
      }
    ]);

  const result =
    normalizeSubjectCollection(original);

  assert.equal(
    result,
    original
  );
});

test("should support mixed Subject and raw objects", () => {
  const original =
    normalizeSubjectCollection([
      {
        id: "math",
        name: "Toán"
      }
    ]).get(0);

  const subjects =
    normalizeSubjectCollection([
      original,
      {
        id: "physics",
        name: "Vật lý"
      }
    ]);

  assert.equal(
    subjects.length,
    2
  );

  assert.equal(
    subjects.get(0),
    original
  );

  assert.equal(
    subjects.get(1).name,
    "Vật lý"
  );
});

test("should reject invalid input", () => {
  assert.throws(() => {
    normalizeSubjectCollection({});
  }, TypeError);

  assert.throws(() => {
    normalizeSubjectCollection("subjects");
  }, TypeError);
});
