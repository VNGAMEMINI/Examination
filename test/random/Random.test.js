import test from "node:test";
import assert from "node:assert/strict";

import Random from "../../src/random/Random.js";

test("Random should generate number in range", () => {
  for (let i = 0; i < 100; i++) {
    const value = Random.number(10, 20);

    assert.equal(value >= 10 && value <= 20, true);
  }
});

test("Random number should use default range", () => {
  for (let i = 0; i < 100; i++) {
    const value = Random.number();

    assert.equal(value >= 0 && value <= 1, true);
  }
});

test("Random should generate integer in range", () => {
  for (let i = 0; i < 100; i++) {
    const value = Random.integer(1, 5);

    assert.equal(Number.isInteger(value), true);
    assert.equal(value >= 1 && value <= 5, true);
  }
});

test("Random integer should support same bounds", () => {
  assert.equal(Random.integer(5, 5), 5);
});

test("Random should pick array value", () => {
  const values = ["a", "b", "c"];

  for (let i = 0; i < 100; i++) {
    assert.equal(values.includes(Random.pick(values)), true);
  }
});

test("Random pick should return undefined for empty array", () => {
  assert.equal(Random.pick([]), undefined);
});

test("Random pick should not modify array", () => {
  const values = ["a", "b", "c"];
  const original = [...values];

  Random.pick(values);

  assert.deepEqual(values, original);
});

test("Random number should reject invalid bounds", () => {
  assert.throws(() => Random.number("1", 5), TypeError);

  assert.throws(() => Random.number(5, 1), RangeError);
});

test("Random integer should reject invalid bounds", () => {
  assert.throws(() => Random.integer(1.5, 5), TypeError);

  assert.throws(() => Random.integer(5, 1), RangeError);
});

test("Random pick should reject non-array", () => {
  assert.throws(() => Random.pick({}), TypeError);
});
