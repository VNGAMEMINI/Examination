import test from "node:test";
import assert from "node:assert/strict";

import SubjectCollection
  from "../../src/subject/SubjectCollection.js";

import normalizeExamination
  from "../../src/data/normalizeExamination.js";

test("should normalize examination object", () => {
  const result = normalizeExamination({
    subjects: [
      {
        id: "math",
        name: "Toán",
        questions: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4", "5"],
            correct: 1
          }
        ]
      }
    ]
  });

  assert.ok(
    result instanceof SubjectCollection
  );

  assert.equal(
    result.length,
    1
  );

  assert.equal(
    result.get(0).name,
    "Toán"
  );

  assert.equal(
    result.get(0)
      .questions
      .get(0)
      .text,
    "2 + 2 = ?"
  );

  assert.equal(
    result.get(0)
      .questions
      .get(0)
      .answers
      .get(1)
      .correct,
    true
  );
});

test("should support short subjects key", () => {
  const result = normalizeExamination({
    s: [
      {
        id: "math",
        name: "Toán",
        q: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4"],
            correct: 1
          }
        ]
      }
    ]
  });

  assert.equal(
    result.length,
    1
  );

  assert.equal(
    result.get(0).name,
    "Toán"
  );
});

test("should support direct array", () => {
  const result = normalizeExamination([
    {
      id: "math",
      name: "Toán"
    }
  ]);

  assert.ok(
    result instanceof SubjectCollection
  );

  assert.equal(
    result.length,
    1
  );
});

test("should preserve existing SubjectCollection", () => {
  const original =
    normalizeExamination({
      subjects: [
        {
          id: "math",
          name: "Toán"
        }
      ]
    });

  const result =
    normalizeExamination(original);

  assert.equal(
    result,
    original
  );
});

test("should reject invalid input", () => {
  assert.throws(() => {
    normalizeExamination(null);
  }, TypeError);

  assert.throws(() => {
    normalizeExamination("exam");
  }, TypeError);
});
