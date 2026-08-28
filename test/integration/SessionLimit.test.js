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

test("Session should use unlimited questions when limit is 0", () => {
  const examination = createExamination(
    new Settings({
      limit: 0,
    })
  );

  const session = new Session({
    examination,
  });

  assert.equal(session.questionCount, 6);
});

test("Session should limit total questions", () => {
  const examination = createExamination(
    new Settings({
      limit: 3,
    })
  );

  const session = new Session({
    examination,
  });

  assert.equal(session.questionCount, 3);
});

test("Session should preserve Examination questions", () => {
  const examination = createExamination(
    new Settings({
      limit: 3,
    })
  );

  new Session({
    examination,
  });

  assert.equal(examination.subjects.get(0).questions.length, 3);
  assert.equal(examination.subjects.get(1).questions.length, 3);
});

test("Session should expose question count", () => {
  const examination = createExamination(
    new Settings({
      limit: 4,
    })
  );

  const session = new Session({
    examination,
  });

  assert.equal(session.questionCount, 4);
});

test("Session should not exceed available questions", () => {
  const examination = createExamination(
    new Settings({
      limit: 100,
    })
  );

  const session = new Session({
    examination,
  });

  assert.equal(session.questionCount, 6);
});
