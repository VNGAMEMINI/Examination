import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

import Subject from "../../src/subject/Subject.js";

import SubjectEvaluation from "../../src/evaluation/SubjectEvaluation.js";

import evaluateSubject from "../../src/evaluation/evaluateSubject.js";

function createQuestion(id, correctIndex) {
  const answers = new AnswerCollection([
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
    new Answer({
      value: "C",
      index: 2,
      correct: correctIndex === 2,
    }),
  ]);

  return new Question({
    id,
    text: `Question ${id}`,
    answers,
  });
}

function createSubject() {
  const questions = new QuestionCollection([
    createQuestion("q1", 0),
    createQuestion("q2", 1),
    createQuestion("q3", 2),
  ]);

  return new Subject({
    id: "subject-1",
    name: "Mathematics",
    questions,
  });
}

test("evaluateSubject should return SubjectEvaluation", () => {
  const subject = createSubject();

  const evaluation = evaluateSubject(subject, [0, 1, 2]);

  assert.ok(evaluation instanceof SubjectEvaluation);
});

test("evaluateSubject should evaluate every Question", () => {
  const subject = createSubject();

  const evaluation = evaluateSubject(subject, [0, 1, 2]);

  assert.equal(evaluation.total, 3);
  assert.equal(evaluation.correct, 3);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 0);

  assert.equal(evaluation.results.length, 3);

  assert.equal(evaluation.results[0].correct, true);

  assert.equal(evaluation.results[1].correct, true);

  assert.equal(evaluation.results[2].correct, true);
});

test("evaluateSubject should detect incorrect answers", () => {
  const subject = createSubject();

  const evaluation = evaluateSubject(subject, [1, 0, 1]);

  assert.equal(evaluation.total, 3);
  assert.equal(evaluation.correct, 0);
  assert.equal(evaluation.incorrect, 3);
  assert.equal(evaluation.unanswered, 0);

  assert.equal(evaluation.results[0].correct, false);

  assert.equal(evaluation.results[1].correct, false);

  assert.equal(evaluation.results[2].correct, false);
});

test("evaluateSubject should detect unanswered questions", () => {
  const subject = createSubject();

  const evaluation = evaluateSubject(subject, [0, null, undefined]);

  assert.equal(evaluation.total, 3);
  assert.equal(evaluation.correct, 1);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 2);

  assert.equal(evaluation.results[0].unanswered, false);

  assert.equal(evaluation.results[1].unanswered, true);

  assert.equal(evaluation.results[2].unanswered, true);
});

test("evaluateSubject should preserve question order", () => {
  const subject = createSubject();

  const evaluation = evaluateSubject(subject, [1, 1, 2]);

  assert.equal(evaluation.results[0].expected[0], 0);

  assert.equal(evaluation.results[1].expected[0], 1);

  assert.equal(evaluation.results[2].expected[0], 2);
});

test("evaluateSubject should preserve Subject", () => {
  const subject = createSubject();

  const evaluation = evaluateSubject(subject, [0, 1, 2]);

  assert.equal(evaluation.subject, subject);
});

test("evaluateSubject should support empty Subject", () => {
  const subject = new Subject({
    id: "subject-1",
    name: "Empty",
    questions: new QuestionCollection(),
  });

  const evaluation = evaluateSubject(subject, []);

  assert.ok(evaluation instanceof SubjectEvaluation);

  assert.equal(evaluation.total, 0);
  assert.equal(evaluation.correct, 0);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 0);

  assert.deepEqual(evaluation.results, []);
});

test("evaluateSubject should reject invalid Subject", () => {
  assert.throws(() => {
    evaluateSubject({}, []);
  }, TypeError);
});
