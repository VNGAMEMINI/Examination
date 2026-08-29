import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import SessionQuestion from "../../src/session/SessionQuestion.js";
import SessionQuestionCollection from "../../src/session/SessionQuestionCollection.js";

function createSessionQuestion(id = "q1", subjectIndex = 0, questionIndex = 0) {
  const question = new Question({
    id,
    text: `Question ${id}`,
  });

  return new SessionQuestion({
    question,
    subjectIndex,
    questionIndex,
  });
}

test("SessionQuestionCollection should create empty collection", () => {
  const collection = new SessionQuestionCollection();

  assert.equal(collection.length, 0);
  assert.deepEqual(collection.toArray(), []);
});

test("SessionQuestionCollection should create with items", () => {
  const q1 = createSessionQuestion("q1", 0, 0);
  const q2 = createSessionQuestion("q2", 0, 1);

  const collection = new SessionQuestionCollection([q1, q2]);

  assert.equal(collection.length, 2);
  assert.equal(collection.get(0), q1);
  assert.equal(collection.get(1), q2);
});

test("SessionQuestionCollection should add SessionQuestion", () => {
  const collection = new SessionQuestionCollection();
  const question = createSessionQuestion();

  const result = collection.add(question);

  assert.equal(result, question);
  assert.equal(collection.length, 1);
  assert.equal(collection.get(0), question);
});

test("SessionQuestionCollection should reject invalid item", () => {
  const collection = new SessionQuestionCollection();

  assert.throws(() => {
    collection.add({});
  }, TypeError);

  assert.throws(() => {
    new SessionQuestionCollection([{}]);
  }, TypeError);
});

test("SessionQuestionCollection should get item by index", () => {
  const q1 = createSessionQuestion("q1");
  const q2 = createSessionQuestion("q2");

  const collection = new SessionQuestionCollection([q1, q2]);

  assert.equal(collection.get(0), q1);
  assert.equal(collection.get(1), q2);
  assert.equal(collection.get(2), undefined);
});

test("SessionQuestionCollection should remove item", () => {
  const q1 = createSessionQuestion("q1");
  const q2 = createSessionQuestion("q2");

  const collection = new SessionQuestionCollection([q1, q2]);

  const removed = collection.remove(0);

  assert.equal(removed, q1);
  assert.equal(collection.length, 1);
  assert.equal(collection.get(0), q2);
});

test("SessionQuestionCollection should clear all items", () => {
  const collection = new SessionQuestionCollection([
    createSessionQuestion("q1"),
    createSessionQuestion("q2"),
  ]);

  collection.clear();

  assert.equal(collection.length, 0);
  assert.deepEqual(collection.toArray(), []);
});

test("SessionQuestionCollection should be iterable", () => {
  const q1 = createSessionQuestion("q1");
  const q2 = createSessionQuestion("q2");

  const collection = new SessionQuestionCollection([q1, q2]);

  const result = [...collection];

  assert.deepEqual(result, [q1, q2]);
});

test("SessionQuestionCollection should preserve order", () => {
  const q1 = createSessionQuestion("q1");
  const q2 = createSessionQuestion("q2");
  const q3 = createSessionQuestion("q3");

  const collection = new SessionQuestionCollection([q1, q2, q3]);

  assert.deepEqual(collection.toArray(), [q1, q2, q3]);
});

test("SessionQuestionCollection toArray should return a new array", () => {
  const q1 = createSessionQuestion("q1");

  const collection = new SessionQuestionCollection([q1]);

  const array = collection.toArray();

  array.push(createSessionQuestion("q2"));

  assert.equal(collection.length, 1);
});
