import test from "node:test";
import assert from "node:assert/strict";

import SESSION_STATES from "../../src/examination/sessionStates.js";

import Examination from "../../src/examination/Examination.js";

import Subject from "../../src/subject/Subject.js";

import SubjectCollection from "../../src/subject/SubjectCollection.js";

import Session from "../../src/examination/Session.js";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

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

test("Session should create correctly", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.equal(session.examination, examination);
});

test("Session should use default values", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  assert.equal(session.id, null);
  assert.deepEqual(session.answers, []);
  assert.equal(session.started, false);
  assert.equal(session.completed, false);
  assert.deepEqual(session.metadata, {});
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

test("Session should normalize answers", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
    answers: [
      [[0], [1]],
      [[1], [0]],
    ],
  });

  assert.deepEqual(session.answers, [
    [[0], [1]],
    [[1], [0]],
  ]);
});

test("Session should copy answers", () => {
  const examination = new Examination();

  const answers = [[[0], [1]]];

  const session = new Session({
    examination,
    answers,
  });

  assert.notEqual(session.answers, answers);
  assert.notEqual(session.answers[0], answers[0]);
  assert.notEqual(session.answers[0][0], answers[0][0]);
});

test("Session should use empty answers by default", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  assert.deepEqual(session.answers, []);
});

test("Session should have created state by default", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  assert.equal(session.state, SESSION_STATES.CREATED);
});

test("Session should have started state", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
    started: true,
  });

  assert.equal(session.state, SESSION_STATES.STARTED);
});

test("Session should have completed state", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
    started: true,
    completed: true,
  });

  assert.equal(session.state, SESSION_STATES.COMPLETED);
});

test("Session should start", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  assert.equal(session.state, SESSION_STATES.CREATED);

  const result = session.start();

  assert.equal(result, session);
  assert.equal(session.started, true);
  assert.equal(session.completed, false);
  assert.equal(session.state, SESSION_STATES.STARTED);
});

test("Session should complete after starting", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  session.start();

  const result = session.complete();

  assert.equal(result, session);
  assert.equal(session.started, true);
  assert.equal(session.completed, true);
  assert.equal(session.state, SESSION_STATES.COMPLETED);
});

test("Session should reject completing before starting", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
  });

  assert.throws(() => {
    session.complete();
  }, Error);

  assert.equal(session.state, SESSION_STATES.CREATED);
});

test("Session should reject starting after completion", () => {
  const examination = new Examination();

  const session = new Session({
    examination,
    started: true,
    completed: true,
  });

  assert.equal(session.state, SESSION_STATES.COMPLETED);

  assert.throws(() => {
    session.start();
  }, Error);

  assert.equal(session.state, SESSION_STATES.COMPLETED);
});

test("Session should answer a question", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  const result = session.answer(0, 0, 1);

  assert.equal(result, session);
  assert.equal(session.answers[0][0], 1);
});

test("Session should support multiple answers", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  session.answer(0, 0, [0, 1]);

  assert.deepEqual(session.answers[0][0], [0, 1]);
});

test("Session should copy answer selection", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  const selection = [0, 1];

  session.answer(0, 0, selection);

  selection.push(2);

  assert.deepEqual(session.answers[0][0], [0, 1]);
});

test("Session should reject answering before start", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.throws(() => {
    session.answer(0, 0, 0);
  }, Error);
});

test("Session should reject answering after completion", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();
  session.complete();

  assert.throws(() => {
    session.answer(0, 0, 0);
  }, Error);
});

test("Session should reject invalid subject index", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  assert.throws(() => {
    session.answer(99, 0, 0);
  }, RangeError);
});

test("Session should reject invalid question index", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  assert.throws(() => {
    session.answer(0, 99, 0);
  }, RangeError);
});

test("Session should evaluate answers", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  session.answer(0, 0, 0);
  session.answer(0, 1, 1);
  session.answer(1, 0, 0);
  session.answer(1, 1, 1);

  const result = session.evaluate();

  assert.equal(result.total, 4);
  assert.equal(result.correct, 4);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);
  assert.equal(result.score, 4);
  assert.equal(result.percentage, 100);
});

test("Session should reject evaluation before start", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.throws(() => {
    session.evaluate();
  }, Error);
});

test("Session should evaluate unanswered questions", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  session.answer(0, 0, 0);

  const result = session.evaluate();

  assert.equal(result.total, 4);
  assert.equal(result.correct, 1);
  assert.equal(result.unanswered, 3);
  assert.equal(result.incorrect, 0);
  assert.equal(result.score, 1);
  assert.equal(result.percentage, 25);
});
