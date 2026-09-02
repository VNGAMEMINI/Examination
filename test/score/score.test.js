import test from "node:test";
import assert from "node:assert/strict";

import Summary from "../../src/summary/Summary.js";
import Score from "../../src/score/Score.js";
import score from "../../src/score/score.js";
import Result from "../../src/result/Result.js";

function createResult(status) {
  return new Result({
    status,
  });
}

test("Score calculates points", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
    createResult(Result.STATUS.UNANSWERED),
  ]);

  const result = new Score(summary);

  assert.equal(result.points, 2);
});

test("Score calculates percentage", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
    createResult(Result.STATUS.UNANSWERED),
  ]);

  const result = new Score(summary);

  assert.equal(result.percentage, 50);
});

test("Score handles perfect result", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.CORRECT),
  ]);

  const result = new Score(summary);

  assert.equal(result.points, 2);
  assert.equal(result.percentage, 100);
});

test("Score handles zero total", () => {
  const summary = new Summary([]);

  const result = new Score(summary);

  assert.equal(result.points, 0);
  assert.equal(result.percentage, 0);
});

test("Score serializes canonical data", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
    createResult(Result.STATUS.UNANSWERED),
  ]);

  const result = new Score(summary);

  const data = result.toJSON();

  assert.equal(data.points, 1);
  assert.ok(Math.abs(data.percentage - 100 / 3) < 1e-12);
});

test("score returns Score", () => {
  const summary = new Summary([createResult(Result.STATUS.CORRECT)]);

  const result = score(summary);

  assert.ok(result instanceof Score);
  assert.equal(result.points, 1);
});

test("Score rejects non-Summary input", () => {
  assert.throws(() => new Score({ correct: 1, total: 1 }), TypeError);
});

test("Score stores canonical values", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
  ]);

  const result = new Score(summary);

  assert.equal(result.points, 1);
  assert.equal(result.percentage, 50);
});

test("Score serializes independent primitive data", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
  ]);

  const result = new Score(summary);

  const data = result.toJSON();

  assert.deepEqual(data, {
    points: 1,
    percentage: 50,
  });

  assert.notStrictEqual(data, result);
});

test("score preserves calculated values", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
    createResult(Result.STATUS.UNANSWERED),
  ]);

  const result = score(summary);

  assert.equal(result.points, 1);
  assert.ok(Math.abs(result.percentage - 100 / 3) < 1e-12);
});

test("Score calculates fractional percentage", () => {
  const summary = new Summary([
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.CORRECT),
    createResult(Result.STATUS.INCORRECT),
    createResult(Result.STATUS.UNANSWERED),
    createResult(Result.STATUS.UNANSWERED),
  ]);

  const result = new Score(summary);

  assert.equal(result.points, 3);
  assert.equal(result.percentage, 50);
});
