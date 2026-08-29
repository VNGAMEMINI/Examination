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
import SessionNavigation from "../../src/navigation/SessionNavigation.js";

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

function createExamination() {
  return new Examination({
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
    ]),
  });
}

test("Session should expose navigation", () => {
  const session = new Session({
    examination: createExamination(),
  });

  assert.ok(session.navigation instanceof SessionNavigation);
});

test("Session navigation should start at first question", () => {
  const session = new Session({
    examination: createExamination(),
  });

  assert.equal(session.navigation.currentIndex, 0);
  assert.equal(session.navigation.current.id, "q1");
});

test("Session navigation should move to next question", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.navigation.next();

  assert.equal(session.navigation.currentIndex, 1);
  assert.equal(session.navigation.current.id, "q2");
});

test("Session navigation should move to previous question", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.navigation.next();
  session.navigation.next();
  session.navigation.previous();

  assert.equal(session.navigation.currentIndex, 1);
  assert.equal(session.navigation.current.id, "q2");
});

test("Session navigation should move to first question", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.navigation.last();
  session.navigation.first();

  assert.equal(session.navigation.currentIndex, 0);
  assert.equal(session.navigation.current.id, "q1");
});

test("Session navigation should move to last question", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.navigation.last();

  assert.equal(session.navigation.currentIndex, 2);
  assert.equal(session.navigation.current.id, "q3");
});

test("Session navigation should use session questions", () => {
  const session = new Session({
    examination: createExamination(),
  });

  assert.strictEqual(
    session.navigation.questions,
    session.navigation.questions,
  );

  assert.equal(session.navigation.questions.length, 3);
});

test("Session navigation should preserve SessionQuestion identity", () => {
  const session = new Session({
    examination: createExamination(),
  });

  const first = session.navigation.current;

  session.navigation.next();
  session.navigation.previous();

  assert.strictEqual(session.navigation.current, first);
});

test("Session navigation should expose selected session questions", () => {
  const session = new Session({
    examination: createExamination(),
  });

  assert.equal(session.navigation.questions.length, session.questionCount);

  assert.strictEqual(
    session.navigation.questions,
    session.navigation.questions,
  );
});

test("Session navigation should preserve selected question identity", () => {
  const session = new Session({
    examination: createExamination(),
  });

  const sessionQuestion = session.navigation.current;

  assert.strictEqual(
    session.questions[0],
    sessionQuestion,
  );
});

test("Session navigation should not change question count", () => {
  const session = new Session({
    examination: createExamination(),
  });

  const count = session.questionCount;

  session.navigation.next();
  session.navigation.next();
  session.navigation.previous();
  session.navigation.first();
  session.navigation.last();

  assert.equal(session.questionCount, count);
});

test("Session navigation should not mutate examination questions", () => {
  const examination = createExamination();

  const before = examination.subjects
    .get(0)
    .questions
    .toArray();

  const session = new Session({
    examination,
  });

  session.navigation.next();
  session.navigation.next();
  session.navigation.previous();

  const after = examination.subjects
    .get(0)
    .questions
    .toArray();

  assert.deepEqual(after, before);
});
