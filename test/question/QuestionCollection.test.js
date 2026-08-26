import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";

test("QuestionCollection should add questions", () => {
  const questions = new QuestionCollection();

  const question = new Question({
    id: "q1",
    text: "2 + 2 = ?"
  });

  questions.add(question);

  assert.equal(questions.length, 1);
  assert.equal(questions.get(0), question);
});

test("QuestionCollection should initialize with questions", () => {
  const question1 = new Question({
    id: "q1",
    text: "Question 1"
  });

  const question2 = new Question({
    id: "q2",
    text: "Question 2"
  });

  const questions = new QuestionCollection([
    question1,
    question2
  ]);

  assert.equal(questions.length, 2);
  assert.equal(questions.get(0), question1);
  assert.equal(questions.get(1), question2);
});

test("QuestionCollection should remove questions", () => {
  const question = new Question({
    id: "q1",
    text: "Question 1"
  });

  const questions = new QuestionCollection([question]);

  const removed = questions.remove(0);

  assert.equal(removed, question);
  assert.equal(questions.length, 0);
});

test("QuestionCollection should clear questions", () => {
  const questions = new QuestionCollection([
    new Question({
      id: "q1",
      text: "Question 1"
    }),
    new Question({
      id: "q2",
      text: "Question 2"
    })
  ]);

  questions.clear();

  assert.equal(questions.length, 0);
});

test("QuestionCollection should reject invalid values", () => {
  const questions = new QuestionCollection();

  assert.throws(() => {
    questions.add("Question");
  }, TypeError);

  assert.throws(() => {
    questions.add({
      text: "Question"
    });
  }, TypeError);
});

test("QuestionCollection should return a copy", () => {
  const question = new Question({
    id: "q1",
    text: "Question 1"
  });

  const questions = new QuestionCollection([question]);

  const array = questions.toArray();

  assert.notEqual(array, questions.toArray());
  assert.equal(array[0], question);
});
