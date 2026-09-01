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
        text: "Paris"
      },
      {
        id: "a2",
        text: "London"
      }
    ],
    correct: ["a1"]
  });
}

test("Examination exposes normalize", () => {
  const examination = new Examination();

  const questions = examination.normalize([
    {
      id: "q1",
      text: "Capital?",
      answers: ["Paris"],
      correct: [0]
    }
  ]);

  assert.equal(questions.length, 1);
  assert.ok(questions[0] instanceof Question);
});

test("Examination exposes validate", () => {
  const examination = new Examination();
  const question = createQuestion();

  assert.equal(
    examination.validate(question),
    true
  );
});

test("Examination evaluates correct answer", () => {
  const examination = new Examination();

  const result = examination.evaluate(
    createQuestion(),
    "a1"
  );

  assert.ok(result instanceof Result);
  assert.equal(result.status, "correct");
});

test("Examination evaluates incorrect answer", () => {
  const examination = new Examination();

  const result = examination.evaluate(
    createQuestion(),
    "a2"
  );

  assert.ok(result instanceof Result);
  assert.equal(result.status, "incorrect");
});

test("Examination evaluates unanswered question", () => {
  const examination = new Examination();

  const result = examination.evaluate(
    createQuestion(),
    undefined
  );

  assert.ok(result instanceof Result);
  assert.equal(result.status, "unanswered");
});
