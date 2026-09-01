import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import normalizeQuestion from "../../src/normalize/normalizeQuestion.js";

test("normalizeQuestion creates canonical Question", () => {
  const question = normalizeQuestion({
    id: "q1",
    text: "Capital of France?",
    answers: [
      "Paris",
      "London",
      "Berlin"
    ],
    correct: 0
  });

  assert.ok(question instanceof Question);

  assert.equal(question.id, "q1");
  assert.equal(question.text, "Capital of France?");

  assert.deepEqual(
    question.answers.map(answer => answer.id),
    ["a0", "a1", "a2"]
  );

  assert.deepEqual(question.correct, ["a0"]);
});

test("normalizeQuestion supports multiple correct indexes", () => {
  const question = normalizeQuestion({
    text: "Select correct answers",
    answers: [
      "A",
      "B",
      "C"
    ],
    correct: [0, 2]
  });

  assert.deepEqual(question.correct, ["a0", "a2"]);
});

test("normalizeQuestion preserves Question instance", () => {
  const original = new Question({
    id: "q1",
    text: "Question"
  });

  assert.strictEqual(
    normalizeQuestion(original),
    original
  );
});
