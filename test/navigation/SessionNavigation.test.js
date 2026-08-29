import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import SessionQuestion from "../../src/session/SessionQuestion.js";
import SessionQuestionCollection from "../../src/session/SessionQuestionCollection.js";

import SessionNavigation from "../../src/navigation/SessionNavigation.js";

function createSessionQuestion(id, subjectIndex = 0, questionIndex = 0) {
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

function createNavigation() {
  const q1 = createSessionQuestion("q1", 0, 0);
  const q2 = createSessionQuestion("q2", 0, 1);
  const q3 = createSessionQuestion("q3", 1, 0);

  const questions = new SessionQuestionCollection([q1, q2, q3]);

  return {
    navigation: new SessionNavigation(questions),
    questions: [q1, q2, q3],
  };
}

test("SessionNavigation should create correctly", () => {
  const { navigation, questions } = createNavigation();

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current, questions[0]);
  assert.equal(navigation.questions.length, 3);
});

test("SessionNavigation should start at first question", () => {
  const { navigation, questions } = createNavigation();

  assert.equal(navigation.current, questions[0]);
  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.hasPrevious, false);
  assert.equal(navigation.hasNext, true);
});

test("SessionNavigation next should move forward", () => {
  const { navigation, questions } = createNavigation();

  navigation.next();

  assert.equal(navigation.currentIndex, 1);
  assert.equal(navigation.current, questions[1]);

  navigation.next();

  assert.equal(navigation.currentIndex, 2);
  assert.equal(navigation.current, questions[2]);
});

test("SessionNavigation next should not pass last question", () => {
  const { navigation, questions } = createNavigation();

  navigation.last();

  assert.equal(navigation.current, questions[2]);
  assert.equal(navigation.hasNext, false);

  navigation.next();

  assert.equal(navigation.currentIndex, 2);
  assert.equal(navigation.current, questions[2]);
});

test("SessionNavigation previous should move backward", () => {
  const { navigation, questions } = createNavigation();

  navigation.last();

  navigation.previous();

  assert.equal(navigation.currentIndex, 1);
  assert.equal(navigation.current, questions[1]);

  navigation.previous();

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current, questions[0]);
});

test("SessionNavigation previous should not pass first question", () => {
  const { navigation, questions } = createNavigation();

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.hasPrevious, false);

  navigation.previous();

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current, questions[0]);
});

test("SessionNavigation first should move to first question", () => {
  const { navigation, questions } = createNavigation();

  navigation.last();

  const result = navigation.first();

  assert.equal(result, navigation);
  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current, questions[0]);
});

test("SessionNavigation last should move to last question", () => {
  const { navigation, questions } = createNavigation();

  const result = navigation.last();

  assert.equal(result, navigation);
  assert.equal(navigation.currentIndex, 2);
  assert.equal(navigation.current, questions[2]);
});

test("SessionNavigation should support chaining", () => {
  const { navigation, questions } = createNavigation();

  navigation.next().next().previous();

  assert.equal(navigation.currentIndex, 1);
  assert.equal(navigation.current, questions[1]);
});

test("SessionNavigation should expose questions", () => {
  const { navigation, questions } = createNavigation();

  assert.equal(navigation.questions.get(0), questions[0]);
  assert.equal(navigation.questions.get(1), questions[1]);
  assert.equal(navigation.questions.get(2), questions[2]);
});

test("SessionNavigation should support empty collection", () => {
  const questions = new SessionQuestionCollection();
  const navigation = new SessionNavigation(questions);

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current, undefined);
  assert.equal(navigation.hasNext, false);
  assert.equal(navigation.hasPrevious, false);

  navigation.next();
  navigation.previous();
  navigation.first();
  navigation.last();

  assert.equal(navigation.currentIndex, 0);
  assert.equal(navigation.current, undefined);
});

test("SessionNavigation should reject invalid questions", () => {
  assert.throws(() => {
    new SessionNavigation([]);
  }, TypeError);

  assert.throws(() => {
    new SessionNavigation({});
  }, TypeError);
});
