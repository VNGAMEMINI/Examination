import test from "node:test";
import assert from "node:assert/strict";

import {
  Compare,
  StringCompare,
  ArrayCompare,
  ObjectCompare,
} from "../../src/index.js";

test("public API should export Compare", () => {
  assert.equal(typeof Compare.equal, "function");
  assert.equal(typeof Compare.notEqual, "function");
});

test("public API should export StringCompare", () => {
  assert.equal(typeof StringCompare.equal, "function");
  assert.equal(typeof StringCompare.equalIgnoreCase, "function");
  assert.equal(typeof StringCompare.trimEqual, "function");
});

test("public API should export ArrayCompare", () => {
  assert.equal(typeof ArrayCompare.equal, "function");
  assert.equal(typeof ArrayCompare.equalUnordered, "function");
});

test("public API should export ObjectCompare", () => {
  assert.equal(typeof ObjectCompare.equal, "function");
});
