import test from "node:test";
import assert from "node:assert/strict";

import Result from "../../src/result/Result.js";

test("Result creates correct result", () => {
  const result = new Result({
    status: Result.STATUS.CORRECT,
    expected: ["a1"],
    actual: ["a1"]
  });

  assert.equal(result.status, "correct");
  assert.equal(result.correct, true);

  assert.deepEqual(
    result.expected,
    ["a1"]
  );

  assert.deepEqual(
    result.actual,
    ["a1"]
  );
});

test("Result creates incorrect result", () => {
  const result = new Result({
    status: Result.STATUS.INCORRECT,
    expected: ["a1"],
    actual: ["a2"]
  });

  assert.equal(result.status, "incorrect");
  assert.equal(result.correct, false);
});

test("Result creates unanswered result", () => {
  const result = new Result({
    status: Result.STATUS.UNANSWERED,
    expected: ["a1"],
    actual: []
  });

  assert.equal(result.status, "unanswered");
  assert.equal(result.correct, false);
});

test("Result serializes canonical data", () => {
  const result = new Result({
    status: Result.STATUS.CORRECT,
    expected: ["a1"],
    actual: ["a1"]
  });

  assert.deepEqual(
    result.toJSON(),
    {
      status: "correct",
      expected: ["a1"],
      actual: ["a1"],
      correct: true
    }
  );
});

test("Result protects expected and actual from mutation", () => {
  const expected = ["a1"];
  const actual = ["a1"];

  const result = new Result({
    status: Result.STATUS.CORRECT,
    expected,
    actual
  });

  expected.push("a2");
  actual.push("a2");

  assert.deepEqual(
    result.expected,
    ["a1"]
  );

  assert.deepEqual(
    result.actual,
    ["a1"]
  );

  const exposedExpected = result.expected;
  const exposedActual = result.actual;

  exposedExpected.push("a3");
  exposedActual.push("a3");

  assert.deepEqual(
    result.expected,
    ["a1"]
  );

  assert.deepEqual(
    result.actual,
    ["a1"]
  );
});

test("Result rejects invalid status", () => {
  assert.throws(
    () => new Result({
      status: "unknown",
      expected: [],
      actual: []
    }),
    TypeError
  );
});
