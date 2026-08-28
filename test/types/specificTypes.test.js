import test from "node:test";
import assert from "node:assert/strict";

import Type from "../../src/types/Type.js";
import Single from "../../src/types/Single.js";
import Multiple from "../../src/types/Multiple.js";
import BooleanType from "../../src/types/Boolean.js";
import Text from "../../src/types/Text.js";

test("Single should create correctly", () => {
  const type = new Single();

  assert.equal(type.value, Type.SINGLE);
  assert.ok(type instanceof Type);
});

test("Multiple should create correctly", () => {
  const type = new Multiple();

  assert.equal(type.value, Type.MULTIPLE);
  assert.ok(type instanceof Type);
});

test("BooleanType should create correctly", () => {
  const type = new BooleanType();

  assert.equal(type.value, Type.BOOLEAN);
  assert.ok(type instanceof Type);
});

test("Text should create correctly", () => {
  const type = new Text();

  assert.equal(type.value, Type.TEXT);
  assert.ok(type instanceof Type);
});

test("specific types should not expose setters", () => {
  const types = [
    new Single(),
    new Multiple(),
    new BooleanType(),
    new Text(),
  ];

  for (const type of types) {
    assert.throws(() => {
      type.value = "invalid";
    }, TypeError);
  }
});
