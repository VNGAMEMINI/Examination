import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";

import Subject from "../../src/subject/Subject.js";

import SubjectCollection from "../../src/subject/SubjectCollection.js";

import Session from "../../src/examination/Session.js";

function createExamination() {
  return new Examination({
    id: "exam-1",
    title: "Mathematics",
    subjects: new SubjectCollection([
      new Subject({
        id: "math",
        name: "Mathematics",
      }),
    ]),
  });
}

test("Session should create correctly", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.equal(session.examination, examination);
});

test("Session should use default values", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.deepEqual(session.answers, {});

  assert.equal(session.started, false);

  assert.equal(session.completed, false);
});

test("Session should preserve id", () => {
  const session = new Session({
    id: "session-1",
    examination: createExamination(),
  });

  assert.equal(session.id, "session-1");
});

test("Session should preserve metadata", () => {
  const metadata = {
    userId: "user-1",
    source: "test",
  };

  const session = new Session({
    examination: createExamination(),
    metadata,
  });

  assert.equal(session.metadata, metadata);
});

test("Session should reject invalid examination", () => {
  assert.throws(() => {
    new Session({
      examination: {},
    });
  }, TypeError);
});

test("Session should not expose setters", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.throws(() => {
    session.examination = null;
  }, TypeError);

  assert.equal(session.examination, examination);
});
