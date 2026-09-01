import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";

test("Answer creates canonical data", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris"
  });

  assert.equal(answer.id, "a1");
  assert.equal(answer.text, "Paris");
  assert.deepEqual(answer.metadata, {});
});

test("Answer serializes canonical data", () => {
  const answer = new Answer({
    id: "a1",
    text: "Paris"
  });

  assert.deepEqual(answer.toJSON(), {
    id: "a1",
    text: "Paris",
    metadata: {}
  });
});

test("Answer metadata is protected from mutation", () => {
  const metadata = {
    type: "choice"
  };

  const answer = new Answer({
    id: "a1",
    text: "Paris",
    metadata
  });

  metadata.type = "changed";

  assert.equal(answer.metadata.type, "choice");
});
