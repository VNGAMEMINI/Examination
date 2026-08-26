import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import QuestionCollection from "../../src/question/QuestionCollection.js";
import Subject from "../../src/subject/Subject.js";

test("Subject should create correctly", () => {
  const questions = new QuestionCollection([
    new Question({
      id: "q1",
      text: "2 + 2 = ?"
    })
  ]);

  const subject = new Subject({
    id: "math",
    name: "Toán",
    questions
  });

  assert.equal(subject.id, "math");
  assert.equal(subject.name, "Toán");
  assert.equal(subject.questions, questions);
});

test("Subject should create empty QuestionCollection by default", () => {
  const subject = new Subject({
    id: "math",
    name: "Toán"
  });

  assert.ok(
    subject.questions instanceof QuestionCollection
  );

  assert.equal(subject.questions.length, 0);
});

test("Subject should reject invalid questions", () => {
  assert.throws(() => {
    new Subject({
      id: "math",
      name: "Toán",
      questions: []
    });
  }, TypeError);
});

test("Subject should preserve metadata", () => {
  const metadata = {
    description: "Các câu hỏi toán học",
    version: 1
  };

  const subject = new Subject({
    id: "math",
    name: "Toán",
    metadata
  });

  assert.equal(subject.metadata, metadata);
});
