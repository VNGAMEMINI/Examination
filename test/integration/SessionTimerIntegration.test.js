import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Session from "../../src/examination/Session.js";
import SessionTimer from "../../src/time/SessionTimer.js";
import Settings from "../../src/settings/Settings.js";

function createExamination(timeTotal = 45) {
  return new Examination({
    settings: new Settings({
      timeTotal,
    }),
  });
}

test("Session should create timer", () => {
  const examination = createExamination();

  const session = new Session({
    examination,
  });

  assert.ok(session.timer instanceof SessionTimer);
});

test("Session timer should use Examination Settings timeTotal", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  assert.equal(session.timer.duration, 45 * 60);
});

test("Session timer should use zero duration by default", () => {
  const examination = createExamination(0);

  const session = new Session({
    examination,
  });

  assert.equal(session.timer.duration, 0);
});

test("Session timer should not start before Session starts", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  assert.equal(session.timer.started, false);
});

test("Session start should start timer", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  session.start();

  assert.equal(session.started, true);
  assert.equal(session.timer.started, true);
});

test("Session complete should stop timer", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  session.start();
  session.complete();

  assert.equal(session.completed, true);
  assert.equal(session.timer.stopped, true);
});

test("Session should preserve timer identity", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  const timer = session.timer;

  assert.equal(session.timer, timer);

  session.start();

  assert.equal(session.timer, timer);
});

test("Session timer should preserve Examination Settings", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  assert.equal(
    session.timer.duration,
    examination.settings.timeTotal * 60,
  );
});

test("Session should not start timer when complete is rejected", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  assert.throws(() => {
    session.complete();
  }, Error);

  assert.equal(session.timer.started, false);
});

test("Session should not expose timer setter", () => {
  const examination = createExamination(45);

  const session = new Session({
    examination,
  });

  const timer = session.timer;

  assert.throws(() => {
    session.timer = new SessionTimer(100);
  }, TypeError);

  assert.equal(session.timer, timer);
});

