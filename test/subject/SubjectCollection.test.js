import test from "node:test";
import assert from "node:assert/strict";

import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";

test("SubjectCollection should add subjects", () => {
  const subjects = new SubjectCollection();

  const subject = new Subject({
    id: "math",
    name: "Toán"
  });

  subjects.add(subject);

  assert.equal(subjects.length, 1);
  assert.equal(subjects.get(0), subject);
});

test("SubjectCollection should initialize with subjects", () => {
  const math = new Subject({
    id: "math",
    name: "Toán"
  });

  const physics = new Subject({
    id: "physics",
    name: "Vật lý"
  });

  const subjects = new SubjectCollection([
    math,
    physics
  ]);

  assert.equal(subjects.length, 2);
  assert.equal(subjects.get(0), math);
  assert.equal(subjects.get(1), physics);
});

test("SubjectCollection should remove subjects", () => {
  const subject = new Subject({
    id: "math",
    name: "Toán"
  });

  const subjects = new SubjectCollection([subject]);

  const removed = subjects.remove(0);

  assert.equal(removed, subject);
  assert.equal(subjects.length, 0);
});

test("SubjectCollection should clear subjects", () => {
  const subjects = new SubjectCollection([
    new Subject({
      id: "math",
      name: "Toán"
    }),
    new Subject({
      id: "physics",
      name: "Vật lý"
    })
  ]);

  subjects.clear();

  assert.equal(subjects.length, 0);
});

test("SubjectCollection should reject invalid values", () => {
  const subjects = new SubjectCollection();

  assert.throws(() => {
    subjects.add("Toán");
  }, TypeError);

  assert.throws(() => {
    subjects.add({
      id: "math",
      name: "Toán"
    });
  }, TypeError);
});

test("SubjectCollection should return a copy", () => {
  const subject = new Subject({
    id: "math",
    name: "Toán"
  });

  const subjects = new SubjectCollection([subject]);

  const array = subjects.toArray();

  assert.notEqual(array, subjects.toArray());
  assert.equal(array[0], subject);
});
