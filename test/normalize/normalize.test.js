import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import normalize from "../../src/normalize/normalize.js";

test("normalize converts question array", () => {
  const questions = normalize([
    {
      text: "Question 1",
      answers: ["A", "B"],
      correct: 1,
    },
    {
      text: "Question 2",
      answers: ["C", "D"],
      correct: 0,
    },
  ]);

  assert.equal(questions.length, 2);

  assert.ok(questions.every((question) => question instanceof Question));

  assert.equal(questions[0].id, "q0");
  assert.equal(questions[1].id, "q1");

  assert.deepEqual(questions[0].correct, ["a1"]);

  assert.deepEqual(questions[1].correct, ["a0"]);
});

test("normalize supports object containing questions", () => {
  const questions = normalize({
    questions: [
      {
        text: "Question",
        answers: ["A", "B"],
        correct: 0,
      },
    ],
  });

  assert.equal(questions.length, 1);
  assert.equal(questions[0].text, "Question");
});

test("normalize returns empty array for unsupported root input", () => {
  assert.deepEqual(normalize(null), []);
  assert.deepEqual(normalize("invalid"), []);
});

test("normalize preserves Question instance in array", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: ["Paris"],
    correct: [0],
  });

  const result = normalize([question]);

  assert.equal(result.length, 1);
  assert.strictEqual(result[0], question);
});

test("normalize converts single Question to array", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: ["Paris"],
    correct: [0],
  });

  const result = normalize(question);

  assert.ok(Array.isArray(result));
  assert.equal(result.length, 1);
  assert.strictEqual(result[0], question);
});

test("normalize returns empty array when questions property is not an array", () => {
  assert.deepEqual(
    normalize({
      questions: null,
    }),
    [],
  );

  assert.deepEqual(
    normalize({
      questions: {},
    }),
    [],
  );
});

test("normalize preserves question metadata", () => {
  const questions = normalize([
    {
      id: "q1",
      text: "Capital?",
      answers: ["Paris"],
      correct: 0,
      metadata: {
        category: "geography",
      },
    },
  ]);

  assert.deepEqual(questions[0].metadata, {
    category: "geography",
  });
});

test("normalize does not mutate input", () => {
  const input = {
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: [0],
    metadata: {
      category: "geography",
    },
  };

  const original = structuredClone(input);

  normalize([input]);

  assert.deepEqual(input, original);
});
