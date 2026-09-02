import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import normalizeAnswer from "../../src/normalize/normalizeAnswer.js";

test("normalizeAnswer preserves Answer instances", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  assert.strictEqual(normalizeAnswer(answer), answer);
});

test("normalizeAnswer converts string", () => {
  const answer = normalizeAnswer("Paris", 0);

  assert.equal(answer.id, "a0");
  assert.equal(answer.text, "Paris");
});

test("normalizeAnswer converts object", () => {
  const answer = normalizeAnswer({
    id: "correct",
    text: "Paris",
    metadata: {
      type: "choice",
    },
  });

  assert.equal(answer.id, "correct");
  assert.equal(answer.text, "Paris");
  assert.deepEqual(answer.metadata, {
    type: "choice",
  });
});

test("normalizeAnswer converts numeric id to string", () => {
  const answer = normalizeAnswer({
    id: 123,
    text: "Paris",
  });

  assert.equal(answer.id, "123");
});

test("normalizeAnswer converts numeric text to string", () => {
  const answer = normalizeAnswer({
    id: "a1",
    text: 123,
  });

  assert.equal(answer.text, "123");
});

test("normalizeAnswer normalizes missing metadata", () => {
  const answer = normalizeAnswer({
    id: "a1",
    text: "Paris",
  });

  assert.deepEqual(answer.metadata, {});
});

test("normalizeAnswer normalizes null metadata", () => {
  const answer = normalizeAnswer({
    id: "a1",
    text: "Paris",
    metadata: null,
  });

  assert.deepEqual(answer.metadata, {});
});

test("normalizeAnswer normalizes array metadata", () => {
  const answer = normalizeAnswer({
    id: "a1",
    text: "Paris",
    metadata: ["choice"],
  });

  assert.deepEqual(answer.metadata, {});
});

test("normalizeAnswer does not mutate input metadata", () => {
  const metadata = {
    type: "choice",
  };

  const input = {
    id: "a1",
    text: "Paris",
    metadata,
  };

  normalizeAnswer(input);

  assert.deepEqual(metadata, {
    type: "choice",
  });
});
