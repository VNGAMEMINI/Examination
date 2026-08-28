import test from "node:test";
import assert from "node:assert/strict";

import normalizeSessionAnswers
  from "../../src/data/normalizeSessionAnswers.js";

test("should normalize undefined answers", () => {
  assert.deepEqual(
    normalizeSessionAnswers(),
    []
  );
});

test("should normalize null answers", () => {
  assert.deepEqual(
    normalizeSessionAnswers(null),
    []
  );
});

test("should preserve session answer structure", () => {
  const answers = [
    [[0], [1]],
    [[0], [1]],
  ];

  const result =
    normalizeSessionAnswers(answers);

  assert.deepEqual(result, answers);
});

test("should return a copy", () => {
  const answers = [
    [[0], [1]],
  ];

  const result =
    normalizeSessionAnswers(answers);

  assert.notEqual(result, answers);
  assert.notEqual(result[0], answers[0]);
  assert.notEqual(result[0][0], answers[0][0]);
});

test("should preserve unanswered question", () => {
  const answers = [
    [[0], undefined],
  ];

  const result =
    normalizeSessionAnswers(answers);

  assert.deepEqual(result, answers);
});

test("should reject non-array input", () => {
  assert.throws(() => {
    normalizeSessionAnswers({});
  }, TypeError);
});

test("should reject invalid subject answers", () => {
  assert.throws(() => {
    normalizeSessionAnswers([
      {}
    ]);
  }, TypeError);
});
