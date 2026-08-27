import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";

import Subject from "../../src/subject/Subject.js";

import SubjectCollection from "../../src/subject/SubjectCollection.js";

test("Examination should create correctly", () => {
  const subjects = new SubjectCollection([
    new Subject({
      id: "math",
      name: "Mathematics",
    }),
  ]);

  const examination = new Examination({
    id: "exam-1",
    title: "Mathematics Test",
    subjects,
    metadata: {
      difficulty: "easy",
    },
  });

  assert.equal(examination.id, "exam-1");

  assert.equal(examination.title, "Mathematics Test");

  assert.equal(examination.subjects, subjects);

  assert.deepEqual(examination.metadata, {
    difficulty: "easy",
  });
});

test("Examination should create empty SubjectCollection by default", () => {
  const examination = new Examination();

  assert.ok(examination.subjects instanceof SubjectCollection);

  assert.equal(examination.subjects.length, 0);
});

test("Examination should reject invalid subjects", () => {
  assert.throws(() => {
    new Examination({
      subjects: [],
    });
  }, TypeError);
});

test("Examination should preserve metadata", () => {
  const metadata = {
    author: "VNGAMEMINI",
    version: 1,
  };

  const examination = new Examination({
    metadata,
  });

  assert.equal(examination.metadata, metadata);
});

test("Examination should preserve SubjectCollection identity", () => {
  const subjects = new SubjectCollection();

  const examination = new Examination({
    subjects,
  });

  assert.equal(examination.subjects, subjects);
});
