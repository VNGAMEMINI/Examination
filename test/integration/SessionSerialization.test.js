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

  assert.deepEqual(data.answers, [
    [1, [0, 1]],
  ]);
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

  assert.deepEqual(
    session.answers[0][0],
    [0, 1],
  );
});
