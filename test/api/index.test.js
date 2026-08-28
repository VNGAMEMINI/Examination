import test from "node:test";
import assert from "node:assert/strict";

import {
  // Models
  Answer,
  AnswerCollection,
  Question,
  QuestionCollection,
  Subject,
  SubjectCollection,

  // Examination
  Examination,
  Session,
  Result,

  // Score
  Score,

  // Data
  normalizeAnswer,
  normalizeAnswerCollection,
  normalizeQuestion,
  normalizeQuestionCollection,
  normalizeSubject,
  normalizeSubjectCollection,
  normalizeExamination,

  // Evaluation
  evaluateAnswer,
  evaluateQuestion,
  evaluateQuestionCollection,
  evaluateSubject,
  evaluateExamination,

  // Validation
  ValidationError,
  validateAnswer,
  validateAnswerCollection,
  validateQuestion,
  validateQuestionCollection,
  validateSubject,
  validateSubjectCollection,
  validateExamination,
} from "../../src/index.js";

test("public API should export models", () => {
  assert.equal(typeof Answer, "function");
  assert.equal(typeof AnswerCollection, "function");

  assert.equal(typeof Question, "function");
  assert.equal(typeof QuestionCollection, "function");

  assert.equal(typeof Subject, "function");
  assert.equal(typeof SubjectCollection, "function");

  assert.equal(typeof Examination, "function");
});

test("public API should export normalization functions", () => {
  assert.equal(typeof normalizeAnswer, "function");
  assert.equal(typeof normalizeAnswerCollection, "function");

  assert.equal(typeof normalizeQuestion, "function");
  assert.equal(typeof normalizeQuestionCollection, "function");

  assert.equal(typeof normalizeSubject, "function");
  assert.equal(typeof normalizeSubjectCollection, "function");

  assert.equal(typeof normalizeExamination, "function");
});

test("public API should export validation API", () => {
  assert.equal(typeof ValidationError, "function");

  assert.equal(typeof validateAnswer, "function");
  assert.equal(typeof validateAnswerCollection, "function");

  assert.equal(typeof validateQuestion, "function");
  assert.equal(typeof validateQuestionCollection, "function");

  assert.equal(typeof validateSubject, "function");
  assert.equal(typeof validateSubjectCollection, "function");

  assert.equal(typeof validateExamination, "function");
});

test("public API should work as a complete pipeline", () => {
  const examination = normalizeExamination({
    subjects: [
      {
        id: "math",
        name: "Mathematics",
        questions: [
          {
            q: "2 + 2 = ?",
            a: ["3", "4", "5"],
            correct: 1,
          },
        ],
      },
    ],
  });

  assert.ok(examination instanceof SubjectCollection);

  assert.equal(examination.length, 1);

  assert.equal(examination.get(0).name, "Mathematics");

  assert.equal(examination.get(0).questions.get(0).text, "2 + 2 = ?");

  assert.equal(
    examination.get(0).questions.get(0).answers.get(1).correct,
    true,
  );
});
