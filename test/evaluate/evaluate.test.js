import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import Result from "../../src/result/Result.js";
import evaluate from "../../src/evaluate/evaluate.js";

function createQuestion(correct = ["a1"]) {
  return new Question({
    id: "q1",
    text: "Capital of France?",
    answers: [
      {
        id: "a1",
        text: "Paris"
      },
      {
        id: "a2",
        text: "London"
      },
      {
        id: "a3",
        text: "Berlin"
      }
    ],
    correct
  });
}

test("evaluate returns correct Result", () => {
  const result = evaluate(
    createQuestion(),
    "a1"
  );

  assert.ok(result instanceof Result);
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

test("evaluate returns incorrect Result", () => {
  const result = evaluate(
    createQuestion(),
    "a2"
  );

  assert.ok(result instanceof Result);
  assert.equal(result.status, "incorrect");
  assert.equal(result.correct, false);

  assert.deepEqual(
    result.expected,
    ["a1"]
  );

  assert.deepEqual(
    result.actual,
    ["a2"]
  );
});

test("evaluate returns unanswered Result", () => {
  const result = evaluate(
    createQuestion(),
    undefined
  );

  assert.ok(result instanceof Result);
  assert.equal(result.status, "unanswered");
  assert.equal(result.correct, false);

  assert.deepEqual(
    result.expected,
    ["a1"]
  );

  assert.deepEqual(
    result.actual,
    []
  );
});

test("evaluate treats null as unanswered", () => {
  const result = evaluate(
    createQuestion(),
    null
  );

  assert.equal(
    result.status,
    "unanswered"
  );
});

test("evaluate treats empty array as unanswered", () => {
  const result = evaluate(
    createQuestion(),
    []
  );

  assert.equal(
    result.status,
    "unanswered"
  );
});

test("evaluate supports multiple correct answers", () => {
  const result = evaluate(
    createQuestion(["a1", "a3"]),
    ["a1", "a3"]
  );

  assert.equal(
    result.status,
    "correct"
  );
});

test("evaluate supports multiple answers regardless of order", () => {
  const result = evaluate(
    createQuestion(["a1", "a3"]),
    ["a3", "a1"]
  );

  assert.equal(
    result.status,
    "correct"
  );
});

test("evaluate rejects invalid Question", () => {
  assert.throws(
    () => evaluate({}, "a1"),
    TypeError
  );
});
