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

import Score from "../../src/score/Score.js";
import Result from "../../src/examination/Result.js";

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
      createQuestion(`${id}-q1`, 0),
      createQuestion(`${id}-q2`, 1),
    ]),
  });
}

function createExamination() {
  return new Examination({
    id: "exam-1",
    title: "Integration Test",

    subjects: new SubjectCollection([
      createSubject("subject-1"),
      createSubject("subject-2"),
    ]),
  });
}

test("Evaluation → Score → Result should work", () => {
  const examination = createExamination();

  const evaluation = evaluateExamination(examination, [
    [[0], [1]],
    [[0], [1]],
  ]);

  assert.equal(evaluation.total, 4);
  assert.equal(evaluation.correct, 4);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 0);

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.total, 4);
  assert.equal(score.correct, 4);
  assert.equal(score.incorrect, 0);
  assert.equal(score.unanswered, 0);

  assert.equal(score.points, 4);
  assert.equal(score.percentage, 100);

  const result = score.toResult();

  assert.ok(result instanceof Result);

  assert.equal(result.total, 4);
  assert.equal(result.correct, 4);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 0);

  assert.equal(result.score, 4);
  assert.equal(result.percentage, 100);
});

test("Evaluation → Score → Result should preserve incorrect answers", () => {
  const examination = createExamination();

  const evaluation = evaluateExamination(examination, [
    [[1], [1]],
    [[0], [0]],
  ]);

  assert.equal(evaluation.total, 4);
  assert.equal(evaluation.correct, 2);
  assert.equal(evaluation.incorrect, 2);
  assert.equal(evaluation.unanswered, 0);

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.points, 2);
  assert.equal(score.percentage, 50);

  const result = score.toResult();

  assert.equal(result.score, 2);
  assert.equal(result.percentage, 50);
});

test("Evaluation → Score → Result should preserve unanswered questions", () => {
  const examination = createExamination();

  const evaluation = evaluateExamination(examination, [
    [[0], []],
    [undefined, [1]],
  ]);

  assert.equal(evaluation.total, 4);
  assert.equal(evaluation.correct, 2);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 2);

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.points, 2);
  assert.equal(score.percentage, 50);

  const result = score.toResult();

  assert.equal(result.total, 4);
  assert.equal(result.correct, 2);
  assert.equal(result.incorrect, 0);
  assert.equal(result.unanswered, 2);
  assert.equal(result.score, 2);
  assert.equal(result.percentage, 50);
});

test("Empty Examination → Evaluation → Score → Result should work", () => {
  const examination = new Examination();

  const evaluation = evaluateExamination(examination);

  assert.equal(evaluation.total, 0);
  assert.equal(evaluation.correct, 0);
  assert.equal(evaluation.incorrect, 0);
  assert.equal(evaluation.unanswered, 0);

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.total, 0);
  assert.equal(score.points, 0);
  assert.equal(score.percentage, 0);

  const result = score.toResult();

  assert.ok(result instanceof Result);

  assert.equal(result.total, 0);
  assert.equal(result.score, 0);
  assert.equal(result.percentage, 0);
});
