import test from "node:test";
import assert from "node:assert/strict";

import Type from "../../src/types/Type.js";


test("Type should create correctly", () => {
  const type = new Type("single");

  assert.equal(type.value, "single");
});


test("Type should support all types", () => {
  assert.equal(
    new Type("single").value,
    "single"
  );

  assert.equal(
    new Type("multiple").value,
    "multiple"
  );

  assert.equal(
    new Type("boolean").value,
    "boolean"
  );

  assert.equal(
    new Type("text").value,
    "text"
  );
});


test("Type should reject invalid value", () => {
  assert.throws(() => {
    new Type("invalid");
  }, TypeError);
});


test("Type should reject undefined", () => {
  assert.throws(() => {
    new Type();
  }, TypeError);
});


test("Type should not expose setter", () => {
  const type = new Type("single");

  assert.throws(() => {
    type.value = "multiple";
  }, TypeError);

  assert.equal(type.value, "single");
});


test("Type values should expose all types", () => {
  assert.deepEqual(
    Type.values(),
    [
      "single",
      "multiple",
      "boolean",
      "text",
    ]
  );
});


test("Type values should return a copy", () => {
  const values = Type.values();

  values.push("invalid");

  assert.deepEqual(
    Type.values(),
    [
      "single",
      "multiple",
      "boolean",
      "text",
    ]
  );
});


test("Type should expose static constants", () => {
  assert.equal(Type.SINGLE, "single");
  assert.equal(Type.MULTIPLE, "multiple");
  assert.equal(Type.BOOLEAN, "boolean");
  assert.equal(Type.TEXT, "text");
});
