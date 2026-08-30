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

test("Session should serialize basic state", () => {
  const session = new Session({
    id: "session-1",
    examination: createExamination(),
    metadata: {
      source: "test",
    },
  });

  const data = session.toJSON();

  assert.equal(data.id, "session-1");
  assert.equal(data.examinationId, "exam-1");
  assert.equal(data.started, false);
  assert.equal(data.completed, false);

  assert.deepEqual(data.answers, []);

  assert.deepEqual(data.metadata, {
    source: "test",
  });
});

test("Session should serialize answers", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answer(0, 0, 1);
  session.answer(0, 1, [0, 1]);

  const data = session.toJSON();

  assert.deepEqual(data.answers, [[1, [0, 1]]]);
});

test("Session should serialize started and completed state", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();
  session.complete();

  const data = session.toJSON();

  assert.equal(data.started, true);
  assert.equal(data.completed, true);
});

test("Session serialization should not expose internal answers", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answer(0, 0, [0, 1]);

  const data = session.toJSON();

  data.answers[0][0].push(99);

  assert.deepEqual(session.answers[0][0], [0, 1]);
});

test("Session should restore and continue evaluation", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
    metadata: {
      mode: "exam",
    },
  });

  session.start();

  session.answer(0, 0, 0);

  const data = JSON.parse(JSON.stringify(session));

  const restored = Session.fromJSON(data, examination);

  restored.answer(0, 1, 1);
  restored.answer(1, 0, 0);

  const result = restored.evaluate();

  assert.equal(result.total, 4);
  assert.equal(result.correct, 3);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 1);
  assert.equal(result.percentage, 75);
});

test("Session serialization should include timer", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  session.start();

  const data = session.toJSON();

  assert.ok(data.timer);
  assert.equal(typeof data.timer, "object");
});
