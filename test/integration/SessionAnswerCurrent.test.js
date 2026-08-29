import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Session from "../../src/examination/Session.js";
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

function createExamination() {
  return new Examination({
    subjects: new SubjectCollection([
      new Subject({
        id: "subject-1",
        name: "Subject 1",
        questions: new QuestionCollection([
          createQuestion("q1"),
          createQuestion("q2"),
        ]),
      }),
      new Subject({
        id: "subject-2",
        name: "Subject 2",
        questions: new QuestionCollection([createQuestion("q3")]),
      }),
    ]),
  });
}

test("Session answerCurrent should answer current question", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  const result = session.answerCurrent(1);

  assert.equal(result, session);
  assert.equal(session.answers[0][0], 1);
});

test("Session answerCurrent should support multiple answers", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answerCurrent([0, 1]);

  assert.deepEqual(session.answers[0][0], [0, 1]);
});

test("Session answerCurrent should follow navigation", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.answerCurrent(0);

  session.navigation.next();

  session.answerCurrent(1);

  assert.equal(session.answers[0][0], 0);
  assert.equal(session.answers[0][1], 1);
});

test("Session answerCurrent should use current subject and question indexes", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  session.navigation.last();

  assert.equal(session.navigation.current.subjectIndex, 1);
  assert.equal(session.navigation.current.questionIndex, 0);

  session.answerCurrent(1);

  assert.equal(session.answers[1][0], 1);
});

test("Session answerCurrent should reject before start", () => {
  const session = new Session({
    examination: createExamination(),
  });

  assert.throws(() => {
    session.answerCurrent(1);
  }, Error);
});

test("Session answerCurrent should reject after completion", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();
  session.complete();

  assert.throws(() => {
    session.answerCurrent(1);
  }, Error);
});

test("Session answerCurrent should preserve answer selection copy", () => {
  const session = new Session({
    examination: createExamination(),
  });

  session.start();

  const selection = [0, 1];

  session.answerCurrent(selection);

  selection.push(2);

  assert.deepEqual(session.answers[0][0], [0, 1]);
});
