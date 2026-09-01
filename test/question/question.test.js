import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import Question from "../../src/question/Question.js";

test("Question creates canonical answers", () => {
  const question = new Question({
    id: "q1",
    text: "What is the capital of France?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
      {
        id: "a2",
        text: "London",
      },
    ],
    correct: ["a1"],
  });

  assert.equal(question.id, "q1");
  assert.equal(question.text, "What is the capital of France?");

  assert.equal(question.answers.length, 2);
  assert.ok(question.answers[0] instanceof Answer);

  assert.deepEqual(question.correct, ["a1"]);
});

test("Question accepts Answer instances", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [answer],
    correct: ["a1"],
  });

  assert.strictEqual(question.answers[0], answer);
});

test("Question serializes canonical data", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: ["a1"],
  });

  assert.deepEqual(question.toJSON(), {
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
        metadata: {},
      },
    ],
    correct: ["a1"],
    metadata: {},
  });
});
