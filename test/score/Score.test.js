import test from "node:test";
import assert from "node:assert/strict";

import Evaluation from "../../src/evaluation/Evaluation.js";
import Examination from "../../src/examination/Examination.js";
import SubjectCollection from "../../src/subject/SubjectCollection.js";
import Subject from "../../src/subject/Subject.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Question from "../../src/question/Question.js";
import AnswerCollection from "../../src/answer/AnswerCollection.js";
import Answer from "../../src/answer/Answer.js";

import Score from "../../src/score/Score.js";
import Result from "../../src/examination/Result.js";

test("Score should create Result", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  const result = score.toResult();

  assert.ok(result instanceof Result);

  assert.equal(result.total, 10);

  assert.equal(result.correct, 7);

  assert.equal(result.incorrect, 2);

  assert.equal(result.unanswered, 1);

  assert.equal(result.score, 7);

  assert.equal(result.percentage, 70);
});

test("Score should create correctly", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(score.total, 10);

  assert.equal(score.correct, 7);

  assert.equal(score.incorrect, 2);

  assert.equal(score.unanswered, 1);
});

test("Score should calculate points", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(score.points, 7);
});

test("Score should calculate percentage", () => {
  const score = new Score({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
  });

  assert.equal(score.percentage, 70);
});

test("Score should return zero percentage for empty score", () => {
  const score = new Score();

  assert.equal(score.percentage, 0);
});

test("Score should use default values", () => {
  const score = new Score();

  assert.equal(score.total, 0);

  assert.equal(score.correct, 0);

  assert.equal(score.incorrect, 0);

  assert.equal(score.unanswered, 0);

  assert.equal(score.points, 0);

  assert.equal(score.percentage, 0);
});

test("Score should not expose setters", () => {
  const score = new Score({
    total: 10,
  });

  assert.throws(() => {
    score.total = 20;
  }, TypeError);

  assert.equal(score.total, 10);
});

test("Score should create from evaluation", () => {
  const evaluation = new Evaluation({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
    subjects: [],
  });

  const score = Score.fromEvaluation(evaluation);

  assert.equal(score.total, 10);
  assert.equal(score.correct, 7);
  assert.equal(score.incorrect, 2);
  assert.equal(score.unanswered, 1);
  assert.equal(score.points, 7);
  assert.equal(score.percentage, 70);
});

test("Score.fromEvaluation should reject invalid evaluation", () => {
  assert.throws(() => {
    Score.fromEvaluation(null);
  }, TypeError);

  assert.throws(() => {
    Score.fromEvaluation(undefined);
  }, TypeError);

  assert.throws(() => {
    Score.fromEvaluation("invalid");
  }, TypeError);
});

test("Score.fromEvaluation should reject plain object", () => {
  assert.throws(() => {
    Score.fromEvaluation({
      total: 10,
      correct: 7,
      incorrect: 2,
      unanswered: 1,
    });
  }, TypeError);
});
