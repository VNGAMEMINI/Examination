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

function createExamination() {
  return new Examination({
    id: "exam-1",
    title: "Mathematics",
    subjects: new SubjectCollection([
      new Subject({
        id: "math-1",
        name: "Math",
        questions: new QuestionCollection([
          createQuestion("q-1", 0),
          createQuestion("q-2", 1),
        ]),
      }),
    ]),
  });
}

test("Session should survive JSON round-trip", () => {
  const examination = createExamination();

  const original = new Session({
    id: "session-1",
    examination,
    answers: [[[0], [1]]],
    started: true,
    completed: false,
    metadata: {
      source: "round-trip",
    },
  });

  const serialized = original.toJSON();
  const restored = Session.fromJSON(
    JSON.parse(JSON.stringify(serialized)),
    examination,
  );

  assert.equal(restored.id, original.id);
  assert.equal(restored.examination, examination);
  assert.deepEqual(restored.answers, original.answers);
  assert.equal(restored.started, original.started);
  assert.equal(restored.completed, original.completed);
  assert.deepEqual(restored.metadata, original.metadata);
});

test("Session round-trip should preserve multiple selections", () => {
  const examination = createExamination();

  const original = new Session({
    id: "session-2",
    examination,
    answers: [
      [
        [0, 1],
        [1, 0],
      ],
    ],
    started: true,
  });

  const restored = Session.fromJSON(
    JSON.parse(JSON.stringify(original.toJSON())),
    examination,
  );

  assert.deepEqual(restored.answers, [
    [
      [0, 1],
      [1, 0],
    ],
  ]);
});

test("Session round-trip should preserve navigation question count", () => {
  const examination = createExamination();

  const original = new Session({
    examination,
  });

  const restored = Session.fromJSON(
    JSON.parse(JSON.stringify(original.toJSON())),
    examination,
  );

  assert.equal(
    restored.navigation.questions.length,
    original.navigation.questions.length,
  );

  assert.equal(restored.questionCount, original.questionCount);
});

test("Session round-trip should create independent answer data", () => {
  const examination = createExamination();

  const original = new Session({
    examination,
    answers: [[[0, 1]]],
    started: true,
  });

  const restored = Session.fromJSON(
    JSON.parse(JSON.stringify(original.toJSON())),
    examination,
  );

  restored.answers[0][0].push(99);

  assert.deepEqual(original.answers, [[[0, 1]]]);
});
