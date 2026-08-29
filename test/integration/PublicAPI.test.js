import test from "node:test";
import assert from "node:assert/strict";

import * as ExaminationAPI from "../../src/index.js";

test("public API should export SubjectEvaluation", () => {
  assert.equal(typeof ExaminationAPI.SubjectEvaluation, "function");
});

test("public API should export SessionQuestion", () => {
  assert.equal(typeof ExaminationAPI.SessionQuestion, "function");
});

test("public API should export SessionQuestionCollection", () => {
  assert.equal(typeof ExaminationAPI.SessionQuestionCollection, "function");
});

test("public API should export SessionNavigation", () => {
  assert.equal(typeof ExaminationAPI.SessionNavigation, "function");
});
