import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Settings from "../../src/settings/Settings.js";
import Mode from "../../src/settings/Mode.js";

test("Examination should use default Settings", () => {
  const examination = new Examination();

  assert.ok(examination.settings instanceof Settings);
});

test("Examination should preserve Settings identity", () => {
  const settings = new Settings({
    mode: Mode.EXAM,
    limit: 20,
    randomSen: true,
    randomAns: true,
    autoNext: true,
    timeTotal: 45,
  });

  const examination = new Examination({
    settings,
  });

  assert.equal(examination.settings, settings);
});

test("Examination should reject invalid Settings", () => {
  assert.throws(() => {
    new Examination({
      settings: {},
    });
  }, TypeError);
});

test("Examination should not expose Settings setter", () => {
  const examination = new Examination();

  assert.throws(() => {
    examination.settings = new Settings();
  }, TypeError);
});
