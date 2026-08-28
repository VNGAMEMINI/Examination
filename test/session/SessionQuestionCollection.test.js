import test from "node:test";
import assert from "node:assert/strict";

import SessionQuestion from "../../src/session/SessionQuestion.js";
import SessionQuestionCollection from "../../src/session/SessionQuestionCollection.js";
import Question from "../../src/question/Question.js";

function createSessionQuestion(index) {
  const question = new Question({
    text: `Question ${index}`,
  });

  return new SessionQuestion({
    question,
    subjectIndex: 0,
    questionIndex: index,
  });
}

test("SessionQuestionCollection should add questions", () => {
  const collection = new SessionQuestionCollection();
  const question = createSessionQuestion(0);

  const result = collection.add(question);

  assert.strictEqual(result, question);
  assert.equal(collection.length, 1);
  assert.strictEqual(collection.get(0), question);
});

test("SessionQuestionCollection should initialize with questions", () => {
  const questions = [
    createSessionQuestion(0),
    createSessionQuestion(1),
    createSessionQuestion(2),
  ];

  const collection = new SessionQuestionCollection(questions);

  assert.equal(collection.length, 3);
  assert.deepEqual(collection.toArray(), questions);
});

test("SessionQuestionCollection should remove questions", () => {
  const first = createSessionQuestion(0);
  const second = createSessionQuestion(1);

  const collection = new SessionQuestionCollection([
    first,
    second,
  ]);

  const removed = collection.remove(0);

  assert.strictEqual(removed, first);
  assert.equal(collection.length, 1);
  assert.strictEqual(collection.get(0), second);
});

test("SessionQuestionCollection should clear questions", () => {
  const collection = new SessionQuestionCollection([
    createSessionQuestion(0),
    createSessionQuestion(1),
  ]);

  collection.clear();

  assert.equal(collection.length, 0);
});

test("SessionQuestionCollection should reject invalid values", () => {
  const collection = new SessionQuestionCollection();

  assert.throws(
    () => collection.add({}),
    TypeError,
  );
});

test("SessionQuestionCollection should return a copy", () => {
  const question = createSessionQuestion(0);

  const collection = new SessionQuestionCollection([question]);
  const array = collection.toArray();

  array.length = 0;

  assert.equal(collection.length, 1);
});

test("SessionQuestionCollection should be iterable", () => {
  const questions = [
    createSessionQuestion(0),
    createSessionQuestion(1),
  ];

  const collection = new SessionQuestionCollection(questions);

  assert.deepEqual(
    [...collection],
    questions,
  );
});
