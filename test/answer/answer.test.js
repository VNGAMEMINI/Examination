import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";

test("Answer creates a valid instance", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  assert.ok(answer instanceof Answer);
});

test("Answer exposes id", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  assert.equal(answer.id, "a1");
});

test("Answer exposes text", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  assert.equal(answer.text, "Paris");
});

test("Answer exposes metadata", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata: {
      language: "en",
    },
  });

  assert.deepEqual(answer.metadata, {
    language: "en",
  });
});

test("Answer protects metadata from mutation", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata: {
      language: "en",
    },
  });

  const metadata = answer.metadata;
  metadata.language = "fr";

  assert.equal(answer.metadata.language, "en");
});

test("Answer serializes canonical data", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata: {
      language: "en",
    },
  });

  assert.deepEqual(answer.toJSON(), {
    id: "a1",
    text: "Paris",
    metadata: {
      language: "en",
    },
  });
});
