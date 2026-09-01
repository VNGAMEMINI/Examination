import test from "node:test";
import assert from "node:assert/strict";

import Summary from "../../src/summary/Summary.js";
import Score from "../../src/score/Score.js";
import score from "../../src/score/score.js";

function createResult(status) {
  return {
    status
  };
}

test("Score calculates points", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("correct"),
    createResult("incorrect"),
    createResult("unanswered")
  ]);

  const result = new Score(summary);

  assert.equal(result.points, 2);
});

test("Score calculates percentage", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("correct"),
    createResult("incorrect"),
    createResult("unanswered")
  ]);

  const result = new Score(summary);

  assert.equal(result.percentage, 50);
});

test("Score handles perfect result", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("correct")
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
    createResult("correct"),
    createResult("incorrect"),
    createResult("unanswered")
  ]);

  const result = new Score(summary);

  assert.deepEqual(result.toJSON(), {
    points: 1,
    percentage: 33.33333333333333
  });
});

test("score returns Score", () => {
  const summary = new Summary([
    createResult("correct")
  ]);

  const result = score(summary);

  assert.ok(result instanceof Score);
  assert.equal(result.points, 1);
});

test("Score rejects non-Summary input", () => {
  assert.throws(
    () => new Score({ correct: 1, total: 1 }),
    TypeError
  );
});
