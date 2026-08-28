import test from "node:test";
import assert from "node:assert/strict";

import Type from "../../src/types/Type.js";
import TypeRegistry from "../../src/types/TypeRegistry.js";

import Single from "../../src/types/Single.js";
import Multiple from "../../src/types/Multiple.js";
import BooleanType from "../../src/types/Boolean.js";
import Text from "../../src/types/Text.js";


test("TypeRegistry should register default types", () => {
  const registry = new TypeRegistry();

  assert.equal(registry.has(Type.SINGLE), true);
  assert.equal(registry.has(Type.MULTIPLE), true);
  assert.equal(registry.has(Type.BOOLEAN), true);
  assert.equal(registry.has(Type.TEXT), true);
});


test("TypeRegistry should return type constructors", () => {
  const registry = new TypeRegistry();

  assert.equal(
    registry.get(Type.SINGLE),
    Single
  );

  assert.equal(
    registry.get(Type.MULTIPLE),
    Multiple
  );

  assert.equal(
    registry.get(Type.BOOLEAN),
    BooleanType
  );

  assert.equal(
    registry.get(Type.TEXT),
    Text
  );
});


test("TypeRegistry should create types", () => {
  const registry = new TypeRegistry();

  const single = registry.create(Type.SINGLE);
  const multiple = registry.create(Type.MULTIPLE);
  const booleanType = registry.create(Type.BOOLEAN);
  const text = registry.create(Type.TEXT);

  assert.equal(single.value, Type.SINGLE);
  assert.equal(multiple.value, Type.MULTIPLE);
  assert.equal(booleanType.value, Type.BOOLEAN);
  assert.equal(text.value, Type.TEXT);
});


test("TypeRegistry should create Type instances", () => {
  const registry = new TypeRegistry();

  assert.ok(
    registry.create(Type.SINGLE) instanceof Type
  );

  assert.ok(
    registry.create(Type.MULTIPLE) instanceof Type
  );
});


test("TypeRegistry should return registered names", () => {
  const registry = new TypeRegistry();

  assert.deepEqual(
    registry.values(),
    [
      Type.SINGLE,
      Type.MULTIPLE,
      Type.BOOLEAN,
      Type.TEXT,
    ]
  );
});


test("TypeRegistry values should return a copy", () => {
  const registry = new TypeRegistry();

  const values = registry.values();

  values.push("invalid");

  assert.equal(
    registry.has("invalid"),
    false
  );
});


test("TypeRegistry should support custom types", () => {
  class CustomType extends Type {
    constructor() {
      super(Type.SINGLE);
    }
  }

  const registry = new TypeRegistry();

  registry.register("custom", CustomType);

  assert.equal(
    registry.get("custom"),
    CustomType
  );

  assert.equal(
    registry.has("custom"),
    true
  );

  assert.ok(
    registry.create("custom") instanceof CustomType
  );
});


test("TypeRegistry register should return registry", () => {
  const registry = new TypeRegistry();

  assert.equal(
    registry.register("custom", Single),
    registry
  );
});


test("TypeRegistry should reject invalid name", () => {
  const registry = new TypeRegistry();

  assert.throws(
    () => registry.register("", Single),
    TypeError
  );

  assert.throws(
    () => registry.register(123, Single),
    TypeError
  );
});


test("TypeRegistry should reject invalid type", () => {
  const registry = new TypeRegistry();

  assert.throws(
    () => registry.register("invalid", {}),
    TypeError
  );
});


test("TypeRegistry should reject unknown type creation", () => {
  const registry = new TypeRegistry();

  assert.throws(
    () => registry.create("unknown"),
    TypeError
  );
});


test("TypeRegistry should return undefined for unknown type", () => {
  const registry = new TypeRegistry();

  assert.equal(
    registry.get("unknown"),
    undefined
  );

  assert.equal(
    registry.has("unknown"),
    false
  );
});
