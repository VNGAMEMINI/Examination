import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";
import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import Settings from "../../src/settings/Settings.js";

import Session from "../../src/examination/Session.js";
import SESSION_STATES from "../../src/examination/sessionStates.js";

function createQuestion(id, correctIndex = 0) {
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

function createSubject(id = "subject-1", count = 2) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    questions.push(
      createQuestion(`${id}-q${i}`, i % 2),
    );
  }

  return new Subject({
    id,
    name: id,
    questions: new QuestionCollection(questions),
  });
}

function createExamination({
  subjects = [
    createSubject("subject-1", 2),
    createSubject("subject-2", 2),
  ],
  settings = new Settings(),
} = {}) {
  return new Examination({
    id: "exam-1",
    title: "Test Examination",
    subjects: new SubjectCollection(subjects),
    settings,
  });
}

function createSession(options = {}) {
  return new Session({
    examination: createExamination(),
    ...options,
  });
}


test("Session should create correctly", () => {
  const examination = createExamination();

  const session = new Session({
    id: "session-1",
    examination,
  });

  assert.equal(session.id, "session-1");
  assert.equal(session.examination, examination);
  assert.equal(session.started, false);
  assert.equal(session.completed, false);
  assert.equal(session.state, SESSION_STATES.CREATED);
});


test("Session should reject invalid Examination", () => {
  assert.throws(() => {
    new Session();
  }, TypeError);

  assert.throws(() => {
    new Session({
      examination: {},
    });
  }, TypeError);
});


test("Session should select all questions by default", () => {
  const session = createSession();

  assert.equal(session.questionCount, 4);
  assert.equal(session.questions.length, 4);
});


test("Session should preserve original question indexes", () => {
  const session = createSession();

  assert.equal(session.questions[0].subjectIndex, 0);
  assert.equal(session.questions[0].questionIndex, 0);

  assert.equal(session.questions[1].subjectIndex, 0);
  assert.equal(session.questions[1].questionIndex, 1);

  assert.equal(session.questions[2].subjectIndex, 1);
  assert.equal(session.questions[2].questionIndex, 0);

  assert.equal(session.questions[3].subjectIndex, 1);
  assert.equal(session.questions[3].questionIndex, 1);
});


test("Session should respect question limit", () => {
  const settings = new Settings({
    limit: 2,
  });

  const session = createSession({
    examination: createExamination({
      settings,
    }),
  });

  assert.equal(session.questionCount, 2);
});


test("Session should start", () => {
  const session = createSession();

  const result = session.start();

  assert.equal(result, session);
  assert.equal(session.started, true);
  assert.equal(session.completed, false);
  assert.equal(session.state, SESSION_STATES.STARTED);
});


test("Session should not start after completion", () => {
  const session = createSession();

  session.start();
  session.complete();

  assert.throws(() => {
    session.start();
  }, Error);
});


test("Session should not complete before start", () => {
  const session = createSession();

  assert.throws(() => {
    session.complete();
  }, Error);
});


test("Session should complete after start", () => {
  const session = createSession();

  session.start();

  const result = session.complete();

  assert.equal(result, session);
  assert.equal(session.completed, true);
  assert.equal(session.state, SESSION_STATES.COMPLETED);
});


test("Session should answer question", () => {
  const session = createSession();

  session.start();

  const result = session.answer(0, 0, 1);

  assert.equal(result, session);
  assert.equal(session.answers[0][0], 1);
});


test("Session should answer multiple choice question", () => {
  const session = createSession();

  session.start();

  session.answer(0, 0, [0, 1]);

  assert.deepEqual(
    session.answers[0][0],
    [0, 1],
  );
});


test("Session should copy array selections", () => {
  const session = createSession();

  session.start();

  const selection = [0, 1];

  session.answer(0, 0, selection);

  selection.push(2);

  assert.deepEqual(
    session.answers[0][0],
    [0, 1],
  );
});


test("Session should not answer before start", () => {
  const session = createSession();

  assert.throws(() => {
    session.answer(0, 0, 0);
  }, Error);
});


test("Session should not answer completed Session", () => {
  const session = createSession();

  session.start();
  session.complete();

  assert.throws(() => {
    session.answer(0, 0, 0);
  }, Error);
});


test("Session should reject invalid subject index", () => {
  const session = createSession();

  session.start();

  assert.throws(() => {
    session.answer(-1, 0, 0);
  }, TypeError);

  assert.throws(() => {
    session.answer(1.5, 0, 0);
  }, TypeError);
});


test("Session should reject invalid question index", () => {
  const session = createSession();

  session.start();

  assert.throws(() => {
    session.answer(0, -1, 0);
  }, TypeError);

  assert.throws(() => {
    session.answer(0, 1.5, 0);
  }, TypeError);
});


test("Session should reject out of range subject", () => {
  const session = createSession();

  session.start();

  assert.throws(() => {
    session.answer(99, 0, 0);
  }, RangeError);
});


test("Session should reject out of range question", () => {
  const session = createSession();

  session.start();

  assert.throws(() => {
    session.answer(0, 99, 0);
  }, RangeError);
});


test("Session should answer current question", () => {
  const session = createSession();

  session.start();

  session.answerCurrent(1);

  assert.equal(session.answers[0][0], 1);
});


test("Session should expose navigation", () => {
  const session = createSession();

  assert.ok(session.navigation);
  assert.equal(
    session.navigation.current,
    session.questions[0],
  );
});


test("Session should expose timer", () => {
  const session = createSession();

  assert.ok(session.timer);
});


test("Session should count answered questions", () => {
  const session = createSession();

  session.start();

  assert.equal(session.answeredCount, 0);

  session.answer(0, 0, 0);

  assert.equal(session.answeredCount, 1);

  session.answer(0, 1, 1);

  assert.equal(session.answeredCount, 2);
});


test("Session should calculate unanswered questions", () => {
  const session = createSession();

  session.start();

  assert.equal(session.unansweredCount, 4);

  session.answer(0, 0, 0);

  assert.equal(session.unansweredCount, 3);
});


test("Session should calculate progress", () => {
  const session = createSession();

  session.start();

  assert.equal(session.progress, 0);

  session.answer(0, 0, 0);

  assert.equal(session.progress, 25);

  session.answer(0, 1, 1);

  assert.equal(session.progress, 50);
});


test("Session should evaluate answers", () => {
  const session = createSession();

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


test("Session should evaluate unanswered questions", () => {
  const session = createSession();

  session.start();

  session.answer(0, 0, 0);

  const result = session.evaluate();

  assert.equal(result.total, 4);
  assert.equal(result.correct, 1);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 3);
});


test("Session should evaluate incorrect answers", () => {
  const session = createSession();

  session.start();

  session.answer(0, 0, 1);
  session.answer(0, 1, 0);
  session.answer(1, 0, 1);
  session.answer(1, 1, 0);

  const result = session.evaluate();

  assert.equal(result.total, 4);
  assert.equal(result.correct, 0);
  assert.equal(result.incorrect, 4);
  assert.equal(result.unanswered, 0);
});


test("Session should not evaluate before start", () => {
  const session = createSession();

  assert.throws(() => {
    session.evaluate();
  }, Error);
});


test("Session should serialize correctly", () => {
  const examination = createExamination();

  const session = new Session({
    id: "session-1",
    examination,
    metadata: {
      mode: "exam",
    },
  });

  session.start();
  session.answer(0, 0, 1);
  session.answer(1, 1, [0, 1]);

  const data = session.toJSON();

  assert.equal(data.id, "session-1");
  assert.equal(data.examinationId, "exam-1");
  assert.equal(data.started, true);
  assert.equal(data.completed, false);

  assert.equal(data.answers[0][0], 1);
  assert.deepEqual(data.answers[1][1], [0, 1]);

  assert.deepEqual(data.metadata, {
    mode: "exam",
  });
});


test("Session.fromJSON should restore Session", () => {
  const examination = createExamination();

  const session = Session.fromJSON(
    {
      id: "session-1",
      examinationId: "exam-1",
      answers: [
        [0, 1],
        [1, 0],
      ],
      started: true,
      completed: false,
      metadata: {
        mode: "exam",
      },
    },
    examination,
  );

  assert.equal(session.id, "session-1");
  assert.equal(session.examination, examination);
  assert.equal(session.started, true);
  assert.equal(session.completed, false);

  assert.deepEqual(session.answers, [
    [0, 1],
    [1, 0],
  ]);

  assert.deepEqual(session.metadata, {
    mode: "exam",
  });
});


test("Session.fromJSON should reject invalid data", () => {
  const examination = createExamination();

  assert.throws(() => {
    Session.fromJSON(null, examination);
  }, TypeError);

  assert.throws(() => {
    Session.fromJSON([], examination);
  }, TypeError);

  assert.throws(() => {
    Session.fromJSON({}, {});
  }, TypeError);
});


test("Session.fromJSON should reject mismatched examination", () => {
  const examination = createExamination();

  assert.throws(() => {
    Session.fromJSON({
      examinationId: "another-exam",
    }, examination);
  }, Error);
});


test("Session should preserve metadata", () => {
  const metadata = {
    mode: "exam",
    attempt: 2,
  };

  const session = createSession({
    metadata,
  });

  assert.equal(session.metadata, metadata);
});
