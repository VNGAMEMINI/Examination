import test from "node:test";
import assert from "node:assert/strict";

import SessionNavigation from "../../src/navigation/SessionNavigation.js";
import SessionQuestion from "../../src/session/SessionQuestion.js";
import SessionQuestionCollection from "../../src/session/SessionQuestionCollection.js";
import Question from "../../src/question/Question.js";

function createQuestion(id) {
  return new Question({
    id,
    text: `Question ${id}`,
  });
}

function createNavigation() {
  const questions = new SessionQuestionCollection([
    new SessionQuestion({
      question: createQuestion("q1"),
      subjectIndex: 0,
      questionIndex: 0,
    }),
    new SessionQuestion({
      question: createQuestion("q2"),
      subjectIndex: 0,
      questionIndex: 1,
    }),
    new SessionQuestion({
      question: createQuestion("q3"),
      subjectIndex: 0,
      questionIndex: 2,
    }),
  ]);

  return new SessionNavigation(questions);
}

test("SessionNavigation should create correctly", () => {
  const navigation = createNavigation();

  assert.equal(navigation.currentIndex, 0);
  assert.ok(navigation.current);
});

test("SessionNavigation should start at first question", () => {
  const navigation = createNavigation();

  assert.equal(navigation.current.question.id, "q1");
});

test("SessionNavigation should expose current question", () => {
  const navigation = createNavigation();

  assert.equal(navigation.current.question.id, "q1");
});

test("SessionNavigation should expose hasNext", () => {
  const navigation = createNavigation();

  assert.equal(navigation.hasNext, true);

  navigation.last();

  assert.equal(navigation.hasNext, false);
});

test("SessionNavigation should expose hasPrevious", () => {
  const navigation = createNavigation();

  assert.equal(navigation.hasPrevious, false);

  navigation.next();

  assert.equal(navigation.hasPrevious, true);
});

test("SessionNavigation next should move forward", () => {
  const navigation = createNavigation();

  const result = navigation.next();

  assert.equal(result, navigation);
  assert.equal(navigation.currentIndex, 1);
  assert.equal(navigation.current.question.id, "q2");
});

test("SessionNavigation previous should move backward", () => {
  const navigation = createNavigation();

  navigation.next();
  navigation.next();

  const result = navigation.previous();

  assert.equal(result, navigation);
  assert.equal(navigation.currentIndex, 1);
  assert.equal(navigation.current.question.id, "q2");
});

test("SessionNavigation first should move to first question", () => {
  const navigation = createNavigation();

  navigation.last();

  const result = navigation.first();

  assert.equal(result, navigation);
  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current.question.id, "q1");
});

test("SessionNavigation last should move to last question", () => {
  const navigation = createNavigation();

  const result = navigation.last();

  assert.equal(result, navigation);
  assert.equal(navigation.currentIndex, 2);
  assert.equal(navigation.current.question.id, "q3");
});

test("SessionNavigation should not move beyond last question", () => {
  const navigation = createNavigation();

  navigation.last();

  navigation.next();

  assert.equal(navigation.currentIndex, 2);
  assert.equal(navigation.current.question.id, "q3");
});

test("SessionNavigation should not move before first question", () => {
  const navigation = createNavigation();

  navigation.previous();

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current.question.id, "q1");
});

test("SessionNavigation should preserve SessionQuestion identity", () => {
  const navigation = createNavigation();

  const first = navigation.current;

  navigation.next();

  navigation.previous();

  assert.strictEqual(navigation.current, first);
});

test("SessionNavigation should not mutate collection", () => {
  const navigation = createNavigation();

  const before = navigation.questions.toArray();

  navigation.next();
  navigation.next();
  navigation.previous();

  const after = navigation.questions.toArray();

  assert.deepEqual(after, before);
});
