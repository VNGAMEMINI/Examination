import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";

test("Answer creates canonical data", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  assert.equal(answer.id, "a1");
  assert.equal(answer.text, "Paris");
  assert.deepEqual(answer.metadata, {});
});

test("Answer accepts metadata", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata: {
      type: "choice",
    },
  });

  assert.deepEqual(answer.metadata, {
    type: "choice",
  });
});

test("Answer protects metadata from external mutation", () => {
  const metadata = {
    type: "choice",
  };

  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata,
  });

  metadata.type = "changed";

  assert.equal(answer.metadata.type, "choice");
});

test("Answer protects returned metadata from mutation", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata: {
      type: "choice",
    },
  });

  const metadata = answer.metadata;

  metadata.type = "changed";

  assert.equal(answer.metadata.type, "choice");
});

test("Answer serializes canonical data", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
  });

  assert.deepEqual(answer.toJSON(), {
    id: "a1",
    text: "Paris",
    metadata: {},
  });
});

test("Answer serialization returns independent metadata", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata: {
      type: "choice",
    },
  });

  const data = answer.toJSON();

  data.metadata.type = "changed";

  assert.equal(answer.metadata.type, "choice");
});
