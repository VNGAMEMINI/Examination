import test from "node:test";
import assert from "node:assert/strict";

import Result from "../../src/result/Result.js";
import Summary from "../../src/summary/Summary.js";
import summarize from "../../src/summary/summarize.js";

function createResult(status) {
  return new Result({
    status,
    expected: ["a1"],
    actual: status === "unanswered" ? [] : ["a1"],
  });
}

test("Summary counts correct results", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("correct"),
  ]);

  assert.equal(summary.total, 2);
  assert.equal(summary.correct, 2);
  assert.equal(summary.incorrect, 0);
  assert.equal(summary.unanswered, 0);
});

test("Summary counts incorrect results", () => {
  const summary = new Summary([
    createResult("incorrect"),
    createResult("incorrect"),
  ]);

  assert.equal(summary.total, 2);
  assert.equal(summary.correct, 0);
  assert.equal(summary.incorrect, 2);
  assert.equal(summary.unanswered, 0);
});

test("Summary counts unanswered results", () => {
  const summary = new Summary([
    createResult("unanswered"),
    createResult("unanswered"),
  ]);

  assert.equal(summary.total, 2);
  assert.equal(summary.correct, 0);
  assert.equal(summary.incorrect, 0);
  assert.equal(summary.unanswered, 2);
});

test("Summary counts mixed results", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("incorrect"),
    createResult("correct"),
    createResult("unanswered"),
  ]);

  assert.equal(summary.total, 4);
  assert.equal(summary.correct, 2);
  assert.equal(summary.incorrect, 1);
  assert.equal(summary.unanswered, 1);
});

test("Summary serializes canonical data", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("incorrect"),
    createResult("unanswered"),
  ]);

  assert.deepEqual(summary.toJSON(), {
    total: 3,
    correct: 1,
    incorrect: 1,
    unanswered: 1,
  });
});

test("summarize returns Summary", () => {
  const summary = summarize([createResult("correct")]);

  assert.ok(summary instanceof Summary);
  assert.equal(summary.correct, 1);
});

test("Summary rejects non-array input", () => {
  assert.throws(() => new Summary({}), TypeError);
});

test("Summary rejects invalid result", () => {
  assert.throws(() => new Summary([{}]), TypeError);
});

test("Summary rejects object with status but not Result", () => {
  assert.throws(
    () =>
      new Summary([
        {
          status: "correct",
        },
      ]),
    TypeError,
  );
});

test("Summary total equals result status counts", () => {
  const summary = new Summary([
    createResult("correct"),
    createResult("correct"),
    createResult("incorrect"),
    createResult("unanswered"),
  ]);

  assert.equal(
    summary.total,
    summary.correct + summary.incorrect + summary.unanswered,
  );
});

test("Summary supports empty results", () => {
  const summary = new Summary([]);

  assert.equal(summary.total, 0);
  assert.equal(summary.correct, 0);
  assert.equal(summary.incorrect, 0);
  assert.equal(summary.unanswered, 0);
});
