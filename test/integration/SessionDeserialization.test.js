import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";
import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import Session from "../../src/examination/Session.js";

function createQuestion(id, correctIndex) {
  return new Question({
    id,
    text: `Question ${id}`,
    answers: new AnswerCollection([
      new Answer({
        value: "A",
        index: 0,
        correct: correctIndex === 0,
      }),
      new Answer({
        value: "B",
        index: 1,
        correct: correctIndex === 1,
      }),
    ]),
  });
}

function createSubject(id) {
  return new Subject({
    id,
    name: `Subject ${id}`,
    questions: new QuestionCollection([
      createQuestion(`${id}-q-1`, 0),
      createQuestion(`${id}-q-2`, 1),
    ]),
  });
}

function createExamination() {
  return new Examination({
    id: "exam-1",
    title: "Mathematics",
    subjects: new SubjectCollection([
      createSubject("math-1"),
      createSubject("math-2"),
    ]),
  });
}

test("Session.fromJSON should restore basic state", () => {
  const examination = createExamination();

  const data = {
    id: "session-1",
    examinationId: "exam-1",
    answers: [],
    started: false,
    completed: false,
    metadata: {},
  };

  const session = Session.fromJSON(data, examination);

  assert.ok(session instanceof Session);
  assert.equal(session.id, "session-1");
  assert.equal(session.examination, examination);
  assert.deepEqual(session.answers, []);
  assert.equal(session.started, false);
  assert.equal(session.completed, false);
  assert.deepEqual(session.metadata, {});
});

test("Session.fromJSON should restore answers", () => {
  const examination = createExamination();

  const data = {
    id: "session-1",
    examinationId: "exam-1",
    answers: [
      [[0], [1]],
      [[1], [0]],
    ],
    started: true,
    completed: false,
    metadata: {},
  };

  const session = Session.fromJSON(data, examination);

  assert.deepEqual(session.answers, [
    [[0], [1]],
    [[1], [0]],
  ]);
});

test("Session.fromJSON should restore state", () => {
  const examination = createExamination();

  const data = {
    id: "session-1",
    examinationId: "exam-1",
    answers: [],
    started: true,
    completed: true,
    metadata: {},
  };

  const session = Session.fromJSON(data, examination);

  assert.equal(session.started, true);
  assert.equal(session.completed, true);
});

test("Session.fromJSON should restore metadata", () => {
  const examination = createExamination();

  const metadata = {
    userId: "user-1",
    source: "test",
  };

  const data = {
    id: "session-1",
    examinationId: "exam-1",
    answers: [],
    started: false,
    completed: false,
    metadata,
  };

  const session = Session.fromJSON(data, examination);

  assert.deepEqual(session.metadata, metadata);
  assert.notEqual(session.metadata, metadata);
});

test("Session.fromJSON should preserve Examination identity", () => {
  const examination = createExamination();

  const data = {
    id: "session-1",
    examinationId: "exam-1",
    answers: [],
    started: false,
    completed: false,
    metadata: {},
  };

  const session = Session.fromJSON(data, examination);

  assert.equal(session.examination, examination);
});

test("Session.fromJSON should restore a serialized Session", () => {
  const examination = createExamination();

  const original = new Session({
    id: "session-1",
    examination,
    answers: [
      [[0], [1]],
      [[1], [0]],
    ],
    started: true,
    completed: false,
    metadata: {
      userId: "user-1",
      source: "test",
    },
  });

  const data = original.toJSON();

  const restored = Session.fromJSON(data, examination);

  assert.equal(restored.id, original.id);
  assert.equal(restored.examination, original.examination);
  assert.deepEqual(restored.answers, original.answers);
  assert.equal(restored.started, original.started);
  assert.equal(restored.completed, original.completed);
  assert.deepEqual(restored.metadata, original.metadata);
});

test("Session.fromJSON should reject invalid data", () => {
  const examination = createExamination();

  assert.throws(() => {
    Session.fromJSON(null, examination);
  }, TypeError);

  assert.throws(() => {
    Session.fromJSON(undefined, examination);
  }, TypeError);

  assert.throws(() => {
    Session.fromJSON("invalid", examination);
  }, TypeError);
});

test("Session.fromJSON should reject invalid Examination", () => {
  const data = {
    id: "session-1",
    examinationId: "exam-1",
    answers: [],
    started: false,
    completed: false,
    metadata: {},
  };

  assert.throws(() => {
    Session.fromJSON(data, {});
  }, TypeError);
});

test("Session.fromJSON should reject mismatched examination id", () => {
  const examination = createExamination();

  const data = {
    id: "session-1",
    examinationId: "different-exam",
    answers: [],
    started: false,
    completed: false,
    metadata: {},
  };

  assert.throws(() => {
    Session.fromJSON(data, examination);
  }, Error);
});
