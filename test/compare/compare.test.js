import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import compare from "../../src/compare/compare.js";

function createQuestion(correct = ["a1"]) {
  return new Question({
    id: "q1",
    text: "Question?",
    answers: [
      {
        id: "a1",
        text: "A"
      },
      {
        id: "a2",
        text: "B"
      },
      {
        id: "a3",
        text: "C"
      }
    ],
    correct
  });
}

test("compare returns true for correct answer", () => {
  const question = createQuestion();

  assert.equal(
    compare(question, "a1"),
    true
  );
});

test("compare returns false for wrong answer", () => {
  const question = createQuestion();

  assert.equal(
    compare(question, "a2"),
    false
  );
});

test("compare supports multiple correct answers", () => {
  const question = createQuestion([
    "a1",
    "a3"
  ]);

  assert.equal(
    compare(question, ["a1", "a3"]),
    true
  );
});

test("compare ignores multiple-answer order", () => {
  const question = createQuestion([
    "a1",
    "a3"
  ]);

  assert.equal(
    compare(question, ["a3", "a1"]),
    true
  );
});

test("compare rejects incomplete multiple selection", () => {
  const question = createQuestion([
    "a1",
    "a3"
  ]);

  assert.equal(
    compare(question, ["a1"]),
    false
  );
});

test("compare rejects invalid question", () => {
  assert.throws(
    () => compare({}, "a1"),
    TypeError
  );
});
