import test from "node:test";
import assert from "node:assert/strict";

import * as ExaminationAPI from "../../src/index.js";

test("Package should expose the public API", () => {
  const expectedExports = [
    // Models
    "Answer",
    "AnswerCollection",
    "Question",
    "QuestionCollection",
    "Subject",
    "SubjectCollection",
    "Examination",
    "Session",
    "Result",

    // Session
    "SessionQuestion",
    "SessionQuestionCollection",
    "SessionNavigation",
    "SessionTimer",

    // Settings
    "Mode",
    "Settings",

    // Time
    "Time",

    // Evaluation
    "Evaluation",
    "SubjectEvaluation",
    "evaluateAnswer",
    "evaluateQuestion",
    "evaluateQuestionCollection",
    "evaluateSubject",
    "evaluateExamination",
    "summarizeEvaluation",

    // Score
    "Score",

    // Normalization
    "normalizeAnswer",
    "normalizeAnswerCollection",
    "normalizeQuestion",
    "normalizeQuestionCollection",
    "normalizeSubject",
    "normalizeSubjectCollection",
    "normalizeExamination",
    "normalizeSessionAnswers",

    // Compare
    "Compare",
    "StringCompare",
    "ArrayCompare",
    "ObjectCompare",

    // Random
    "Random",

    // Types
    "Type",
    "Single",
    "Multiple",
    "BooleanType",
    "Text",
    "TypeRegistry",

    // Session states
    "SESSION_STATES",

    // Validation
    "ValidationError",
    "validateAnswer",
    "validateAnswerCollection",
    "validateQuestion",
    "validateQuestionCollection",
    "validateSubject",
    "validateSubjectCollection",
    "validateExamination",
  ];

  for (const name of expectedExports) {
    assert.ok(
      name in ExaminationAPI,
      `Public API should export ${name}`,
    );

    assert.notEqual(
      ExaminationAPI[name],
      undefined,
      `Public API export ${name} should not be undefined`,
    );
  }
});
