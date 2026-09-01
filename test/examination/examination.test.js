import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Question from "../../src/question/Question.js";
import Result from "../../src/result/Result.js";

function createQuestion() {
  return new Question({
    id: "q1",
    text: "Capital of France?",
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
}

test("Examination exposes normalize", () => {
  const examination = new Examination();

  const questions = examination.normalize([
    {
      id: "q1",
      text: "Capital?",
      answers: ["Paris"],
      correct: [0],
    },
  ]);

  assert.equal(questions.length, 1);
  assert.ok(questions[0] instanceof Question);
});

test("Examination exposes validate", () => {
  const examination = new Examination();
  const question = createQuestion();

  assert.equal(examination.validate(question), true);
});

test("Examination evaluates correct answer", () => {
  const examination = new Examination();

  const result = examination.evaluate(createQuestion(), "a1");

  assert.ok(result instanceof Result);
  assert.equal(result.status, "correct");
});

test("Examination evaluates incorrect answer", () => {
  const examination = new Examination();

  const result = examination.evaluate(createQuestion(), "a2");

  assert.ok(result instanceof Result);
  assert.equal(result.status, "incorrect");
});

test("Examination evaluates unanswered question", () => {
  const examination = new Examination();

  const result = examination.evaluate(createQuestion(), undefined);

  assert.ok(result instanceof Result);
  assert.equal(result.status, "unanswered");
});

test("Examination evaluates a question collection", () => {
  const examination = new Examination();

  const questions = [
    createQuestion(),
    new Question({
      id: "q2",
      text: "2 + 2?",
      answers: [
        {
          id: "a1",
          text: "3",
        },
        {
          id: "a2",
          text: "4",
        },
      ],
      correct: ["a2"],
    }),
  ];

  const results = examination.evaluateCollection(questions, ["a1", "a2"]);

  assert.equal(results.length, 2);

  assert.deepEqual(
    results.map((result) => result.status),
    ["correct", "correct"],
  );
});

test("Examination calculates score from summary", () => {
  const examination = new Examination();

  const summary = examination.summary([
    new Result({
      status: "correct",
      expected: ["a1"],
      actual: ["a1"],
    }),
    new Result({
      status: "incorrect",
      expected: ["a2"],
      actual: ["a1"],
    }),
    new Result({
      status: "unanswered",
      expected: ["a1"],
      actual: [],
    }),
  ]);

  const score = examination.score(summary);

  assert.equal(score.points, 1);
  assert.equal(score.percentage, 33.33333333333333);
});

test("Examination runs the complete pipeline", () => {
  const examination = new Examination();

  const result = examination.run(
    [
      {
        id: "q1",
        text: "Capital of France?",
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
        correct: [0],
      },
      {
        id: "q2",
        text: "Capital of England?",
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
        correct: [1],
      },
      {
        id: "q3",
        text: "Capital of Italy?",
        answers: [
          {
            id: "a1",
            text: "Rome",
          },
          {
            id: "a2",
            text: "Paris",
          },
        ],
        correct: [0],
      },
    ],
    ["a1", "a2", "a2"],
  );

  assert.equal(result.results.length, 3);

  assert.deepEqual(
    result.results.map((item) => item.status),
    ["correct", "correct", "incorrect"],
  );

  assert.equal(result.summary.total, 3);
  assert.equal(result.summary.correct, 2);
  assert.equal(result.summary.incorrect, 1);
  assert.equal(result.summary.unanswered, 0);

  assert.equal(result.score.points, 2);
  assert.ok(Math.abs(result.score.percentage - 200 / 3) < 1e-10);
});

test("Examination run handles unanswered questions", () => {
  const examination = new Examination();

  const result = examination.run(
    [
      {
        id: "q1",
        text: "Capital?",
        answers: [
          {
            id: "a1",
            text: "Paris",
          },
        ],
        correct: [0],
      },
      {
        id: "q2",
        text: "Capital?",
        answers: [
          {
            id: "a1",
            text: "London",
          },
        ],
        correct: [0],
      },
    ],
    ["a1"],
  );

  assert.deepEqual(
    result.results.map((item) => item.status),
    ["correct", "unanswered"],
  );

  assert.equal(result.summary.total, 2);
  assert.equal(result.summary.correct, 1);
  assert.equal(result.summary.incorrect, 0);
  assert.equal(result.summary.unanswered, 1);

  assert.equal(result.score.points, 1);
  assert.equal(result.score.percentage, 50);
});

test("Examination run supports unsupported root input", () => {
  const examination = new Examination();

  const result = examination.run(null, []);

  assert.equal(result.results.length, 0);
  assert.equal(result.summary.total, 0);
  assert.equal(result.summary.correct, 0);
  assert.equal(result.summary.incorrect, 0);
  assert.equal(result.summary.unanswered, 0);
  assert.equal(result.score.points, 0);
  assert.equal(result.score.percentage, 0);
});
