import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Session from "../../src/examination/Session.js";
import Settings from "../../src/settings/Settings.js";
import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";
import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

function createQuestion(id) {
  return new Question({
    id,
    text: `Question ${id}`,
    answers: new AnswerCollection([
      new Answer({
        value: "A",
        index: 0,
        correct: true,
      }),
      new Answer({
        value: "B",
        index: 1,
        correct: false,
      }),
    ]),
  });
}

function createExamination(settings) {
  return new Examination({
    settings,
    subjects: new SubjectCollection([
      new Subject({
        id: "subject-1",
        name: "Subject 1",
        questions: new QuestionCollection([
          createQuestion("q1"),
          createQuestion("q2"),
          createQuestion("q3"),
        ]),
      }),
      new Subject({
        id: "subject-2",
        name: "Subject 2",
        questions: new QuestionCollection([
          createQuestion("q4"),
          createQuestion("q5"),
          createQuestion("q6"),
        ]),
      }),
    ]),
  });
}

test("Session should expose selected questions", () => {
  const examination = createExamination(
    new Settings({
      limit: 3,
    }),
  );

  const session = new Session({
    examination,
  });

  assert.ok(session.questions);
  assert.equal(session.questions.length, 3);
});

test("Session should preserve question order when randomSen is false", () => {
  const examination = createExamination(
    new Settings({
      limit: 3,
      randomSen: false,
    }),
  );

  const session = new Session({
    examination,
  });

  assert.deepEqual(
    session.questions.map((question) => question.id),
    ["q1", "q2", "q3"],
  );
});

test("Session should not mutate Examination questions", () => {
  const examination = createExamination(
    new Settings({
      limit: 3,
      randomSen: true,
    }),
  );

  const original = examination.subjects
    .toArray()
    .flatMap((subject) => subject.questions.toArray())
    .map((question) => question.id);

  new Session({
    examination,
  });

  const current = examination.subjects
    .toArray()
    .flatMap((subject) => subject.questions.toArray())
    .map((question) => question.id);

  assert.deepEqual(current, original);
});

test("Session should select all questions when limit is 0", () => {
  const examination = createExamination(
    new Settings({
      limit: 0,
    }),
  );

  const session = new Session({
    examination,
  });

  assert.equal(session.questions.length, 6);
});

test("Session should not select more questions than available", () => {
  const examination = createExamination(
    new Settings({
      limit: 100,
    }),
  );

  const session = new Session({
    examination,
  });

  assert.equal(session.questions.length, 6);
});
