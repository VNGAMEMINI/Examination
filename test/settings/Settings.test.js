import test from "node:test";
import assert from "node:assert/strict";

import Settings from "../../src/settings/Settings.js";
import Mode from "../../src/settings/Mode.js";

test("Settings should use default values", () => {
  const settings = new Settings();

  assert.equal(settings.mode.value, Mode.FREE);
  assert.equal(settings.limit, 0);
  assert.equal(settings.randomSen, false);
  assert.equal(settings.randomAns, false);
  assert.equal(settings.autoNext, true);
  assert.equal(settings.timeTotal, 0);
});

test("Settings should create with custom values", () => {
  const settings = new Settings({
    mode: Mode.EXAM,
    limit: 20,
    randomSen: true,
    randomAns: true,
    autoNext: false,
    timeTotal: 45,
  });

  assert.equal(settings.mode.value, Mode.EXAM);
  assert.equal(settings.limit, 20);
  assert.equal(settings.randomSen, true);
  assert.equal(settings.randomAns, true);
  assert.equal(settings.autoNext, false);
  assert.equal(settings.timeTotal, 45);
});

test("Settings should accept Mode instance", () => {
  const mode = new Mode(Mode.EXAM);

  const settings = new Settings({
    mode,
  });

  assert.equal(settings.mode, mode);
});

test("Settings should not expose setters", () => {
  const settings = new Settings();

  assert.throws(() => {
    settings.limit = 10;
  }, TypeError);

  assert.equal(settings.limit, 0);
});

test("Settings should reject invalid mode", () => {
  assert.throws(() => {
    new Settings({
      mode: "invalid",
    });
  }, TypeError);
});

test("Settings should reject invalid limit", () => {
  assert.throws(() => {
    new Settings({
      limit: -1,
    });
  }, TypeError);

  assert.throws(() => {
    new Settings({
      limit: 1.5,
    });
  }, TypeError);
});

test("Settings should reject invalid timeTotal", () => {
  assert.throws(() => {
    new Settings({
      timeTotal: -1,
    });
  }, TypeError);

  assert.throws(() => {
    new Settings({
      timeTotal: 1.5,
    });
  }, TypeError);
});
