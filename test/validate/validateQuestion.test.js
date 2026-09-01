import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import Question from "../../src/question/Question.js";
import ValidationError from "../../src/errors/ValidationError.js";
import validateQuestion from "../../src/validate/validateQuestion.js";

test("validateQuestion accepts valid Question", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
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

  assert.equal(validateQuestion(question), true);
});

test("validateQuestion accepts Question with Answer instances", () => {
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

  assert.equal(validateQuestion(question), true);
});

test("validateQuestion rejects non Question", () => {
  assert.throws(
    () =>
      validateQuestion({
        id: "q1",
        text: "Capital?",
      }),
    ValidationError,
  );
});

test("validateQuestion rejects empty question id", () => {
  const question = new Question({
    id: "",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: ["a1"],
  });

  assert.throws(() => validateQuestion(question), ValidationError);
});

test("validateQuestion rejects whitespace question id", () => {
  const question = new Question({
    id: "   ",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: ["a1"],
  });

  assert.throws(() => validateQuestion(question), ValidationError);
});

test("validateQuestion rejects non-string question text", () => {
  const question = new Question({
    id: "q1",
    text: 123,
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: ["a1"],
  });

  assert.throws(() => validateQuestion(question), ValidationError);
});

test("validateQuestion accepts empty answers", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [],
    correct: [],
  });

  assert.equal(validateQuestion(question), true);
});

test("validateQuestion accepts unanswered Question", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: [],
  });

  assert.equal(validateQuestion(question), true);
});

test("validateQuestion rejects duplicate answer ids", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
      {
        id: "a1",
        text: "London",
      },
    ],
    correct: ["a1"],
  });

  assert.throws(() => validateQuestion(question), ValidationError);
});

test("validateQuestion rejects unknown correct answer", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
    ],
    correct: ["a99"],
  });

  assert.throws(() => validateQuestion(question), ValidationError);
});

test("validateQuestion accepts multiple correct answers", () => {
  const question = new Question({
    id: "q1",
    text: "Select capitals?",
    answers: [
      {
        id: "a1",
        text: "Paris",
      },
      {
        id: "a2",
        text: "London",
      },
      {
        id: "a3",
        text: "Berlin",
      },
    ],
    correct: ["a1", "a3"],
  });

  assert.equal(validateQuestion(question), true);
});

test("validateQuestion rejects invalid Answer", () => {
  const question = new Question({
    id: "q1",
    text: "Capital?",
    answers: [
      {
        id: "",
        text: "Paris",
      },
    ],
    correct: [],
  });

  assert.throws(() => validateQuestion(question), ValidationError);
});

test("validateQuestion accepts object metadata", () => {
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
    metadata: {
      category: "geography",
    },
  });

  assert.equal(validateQuestion(question), true);
});
