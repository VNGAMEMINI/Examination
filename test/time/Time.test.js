import test from "node:test";
import assert from "node:assert/strict";

import Time from "../../src/time/Time.js";

test("Time should use zero by default", () => {
  const time = new Time();

  assert.equal(time.seconds, 0);
});

test("Time should preserve seconds", () => {
  const time = new Time(90);

  assert.equal(time.seconds, 90);
});

test("Time should convert seconds to minutes", () => {
  const time = new Time(120);

  assert.equal(time.minutes, 2);
  assert.equal(time.toMinutes(), 2);
});

test("Time should convert seconds to hours", () => {
  const time = new Time(7200);

  assert.equal(time.hours, 2);
  assert.equal(time.toHours(), 2);
});

test("Time should return seconds", () => {
  const time = new Time(90);

  assert.equal(time.toSeconds(), 90);
});

test("Time should create from seconds", () => {
  const time = Time.seconds(30);

  assert.equal(time.seconds, 30);
});

test("Time should create from minutes", () => {
  const time = Time.minutes(2);

  assert.equal(time.seconds, 120);
});

test("Time should create from hours", () => {
  const time = Time.hours(2);

  assert.equal(time.seconds, 7200);
});

test("Time should reject invalid seconds", () => {
  assert.throws(() => new Time("60"), TypeError);

  assert.throws(() => new Time(NaN), TypeError);

  assert.throws(() => new Time(Infinity), TypeError);
});

test("Time should reject negative seconds", () => {
  assert.throws(() => new Time(-1), RangeError);
});

test("Time should reject invalid minutes", () => {
  assert.throws(() => Time.minutes("2"), TypeError);

  assert.throws(() => Time.minutes(NaN), TypeError);
});

test("Time should reject invalid hours", () => {
  assert.throws(() => Time.hours("2"), TypeError);

  assert.throws(() => Time.hours(NaN), TypeError);
});

test("Time should not expose a setter", () => {
  const time = new Time(60);

  assert.throws(() => {
    time.seconds = 120;
  }, TypeError);

  assert.equal(time.seconds, 60);
});

test("public API should export Time", () => {
  assert.equal(typeof Time, "function");

  const time = Time.minutes(2);

  assert.equal(time.seconds, 120);
});
