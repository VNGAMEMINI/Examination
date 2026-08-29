import test from "node:test";
import assert from "node:assert/strict";

import Result
  from "../../src/examination/Result.js";


test("Result should create correctly", () => {
  const result =
    new Result({
      total: 10,
      correct: 7,
      incorrect: 2,
      unanswered: 1,
      score: 7,
      percentage: 70
    });

  assert.equal(
    result.total,
    10
  );

  assert.equal(
    result.correct,
    7
  );

  assert.equal(
    result.incorrect,
    2
  );

  assert.equal(
    result.unanswered,
    1
  );

  assert.equal(
    result.score,
    7
  );

  assert.equal(
    result.percentage,
    70
  );
});


test("Result should use default values", () => {
  const result =
    new Result();

  assert.equal(
    result.total,
    0
  );

  assert.equal(
    result.correct,
    0
  );

  assert.equal(
    result.incorrect,
    0
  );

  assert.equal(
    result.unanswered,
    0
  );

  assert.equal(
    result.score,
    0
  );

  assert.equal(
    result.percentage,
    0
  );
});


test("Result should preserve metadata", () => {
  const metadata = {
    mode: "exam",
    duration: 120
  };

  const result =
    new Result({
      metadata
    });

  assert.equal(
    result.metadata,
    metadata
  );
});


test("Result should not expose setters", () => {
  const result =
    new Result({
      total: 10
    });

  assert.equal(
    result.total,
    10
  );

  assert.throws(
    () => {
      result.total = 20;
    },
    TypeError
  );

  assert.equal(
    result.total,
    10
  );
});

test("Result should serialize correctly", () => {
  const metadata = {
    mode: "exam",
    duration: 120,
  };

  const result = new Result({
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
    score: 7,
    percentage: 70,
    metadata,
  });

  assert.deepEqual(result.toJSON(), {
    total: 10,
    correct: 7,
    incorrect: 2,
    unanswered: 1,
    score: 7,
    percentage: 70,
    metadata,
  });
});

test("Result should work with JSON.stringify", () => {
  const result = new Result({
    total: 4,
    correct: 3,
    incorrect: 1,
    score: 3,
    percentage: 75,
  });

  const data = JSON.parse(
    JSON.stringify(result),
  );

  assert.equal(data.total, 4);
  assert.equal(data.correct, 3);
  assert.equal(data.incorrect, 1);
  assert.equal(data.unanswered, 0);
  assert.equal(data.score, 3);
  assert.equal(data.percentage, 75);
});
