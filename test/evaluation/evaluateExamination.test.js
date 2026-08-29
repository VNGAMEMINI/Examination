import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Subject from "../../src/subject/Subject.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";
import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Answer from "../../src/answer/Answer.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";

import evaluateExamination from "../../src/evaluation/evaluateExamination.js";

function createQuestion(correctIndex = 0) {
  return new Question({
    id: `q-${correctIndex}`,
    text: "Question",
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

function createSubject(questionCount = 2) {
  const questions = [];

  for (let i = 0; i < questionCount; i++) {
    questions.push(createQuestion(i % 2));
  }

  return new Subject({
    id: "subject-1",
    name: "Subject",
    questions: new QuestionCollection(questions),
  });
}

function createExamination() {
  return new Examination({
    id: "exam-1",
    title: "Test Examination",
    subjects: new SubjectCollection([createSubject(2), createSubject(2)]),
  });
}

test("evaluateExamination should evaluate every Subject", () => {
  const examination = createExamination();

  const result = evaluateExamination(examination, [
    [[0], [1]],
    [[0], [1]],
  ]);

  assert.equal(result.total, 4);
  assert.equal(result.correct, 4);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);

  assert.equal(result.subjects.length, 2);
});

test("evaluateExamination should detect incorrect answers", () => {
  const examination = createExamination();

  const result = evaluateExamination(examination, [
    [[1], [1]],
    [[0], [0]],
  ]);

  assert.equal(result.total, 4);
  assert.equal(result.correct, 2);
  assert.equal(result.incorrect, 2);
  assert.equal(result.unanswered, 0);
});

test("evaluateExamination should detect unanswered questions", () => {
  const examination = createExamination();

  const result = evaluateExamination(examination, [
    [[0], []],
    [undefined, [1]],
  ]);

  assert.equal(result.total, 4);
  assert.equal(result.correct, 2);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 2);
});

test("evaluateExamination should preserve Subject order", () => {
  const examination = createExamination();

  const result = evaluateExamination(examination, [
    [[0], [1]],
    [[1], [0]],
  ]);

  assert.equal(result.subjects.length, 2);

  assert.equal(result.subjects[0].results.length, 2);

  assert.equal(result.subjects[1].results.length, 2);

  assert.equal(result.subjects[0].subject.id, "subject-1");

  assert.equal(result.subjects[1].subject.id, "subject-1");
});

test("evaluateExamination should support empty Examination", () => {
  const examination = new Examination();

  const result = evaluateExamination(examination);

  assert.equal(result.total, 0);
  assert.equal(result.correct, 0);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);

  assert.deepEqual(result.subjects, []);
});

test("evaluateExamination should reject invalid Examination", () => {
  assert.throws(() => {
    evaluateExamination({});
  }, TypeError);
});
