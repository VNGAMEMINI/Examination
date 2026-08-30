import test from "node:test";
import assert from "node:assert/strict";

import SessionTimer from "../../src/time/SessionTimer.js";

test("SessionTimer should create with default duration", () => {
  const timer = new SessionTimer();

  assert.equal(timer.duration, 0);
  assert.equal(timer.started, false);
  assert.equal(timer.stopped, false);
  assert.equal(timer.elapsed, 0);
  assert.equal(timer.remaining, 0);
  assert.equal(timer.expired, false);
});

test("SessionTimer should reject invalid duration", () => {
  assert.throws(
    () => new SessionTimer(-1),
    TypeError,
  );

  assert.throws(
    () => new SessionTimer(1.5),
    TypeError,
  );
});

test("SessionTimer should start", () => {
  const timer = new SessionTimer(60);

  timer.start();

  assert.equal(timer.started, true);
  assert.equal(timer.stopped, false);
});

test("SessionTimer should not restart when already started", () => {
  const timer = new SessionTimer(60);

  timer.start();

  const serializedBefore = timer.toJSON();

  timer.start();

  const serializedAfter = timer.toJSON();

  assert.equal(
    serializedAfter.startedAt,
    serializedBefore.startedAt,
  );
});

test("SessionTimer should stop", () => {
  const timer = new SessionTimer(60);

  timer.start();
  timer.stop();

  assert.equal(timer.started, true);
  assert.equal(timer.stopped, true);
});

test("SessionTimer should ignore stop before start", () => {
  const timer = new SessionTimer(60);

  timer.stop();

  assert.equal(timer.started, false);
  assert.equal(timer.stopped, false);
});

test("SessionTimer should reset", () => {
  const timer = new SessionTimer(60);

  timer.start();
  timer.stop();
  timer.reset();

  assert.equal(timer.started, false);
  assert.equal(timer.stopped, false);
  assert.equal(timer.elapsed, 0);
  assert.equal(timer.remaining, 60);
  assert.equal(timer.expired, false);
});

test("SessionTimer should serialize initial state", () => {
  const timer = new SessionTimer(60);

  assert.deepEqual(timer.toJSON(), {
    duration: 60,
    startedAt: null,
    stoppedAt: null,
  });
});

test("SessionTimer should serialize started state", () => {
  const timer = new SessionTimer(60);

  timer.start();

  const data = timer.toJSON();

  assert.equal(data.duration, 60);
  assert.equal(typeof data.startedAt, "number");
  assert.equal(data.stoppedAt, null);
});

test("SessionTimer should serialize stopped state", () => {
  const timer = new SessionTimer(60);

  timer.start();
  timer.stop();

  const data = timer.toJSON();

  assert.equal(data.duration, 60);
  assert.equal(typeof data.startedAt, "number");
  assert.equal(typeof data.stoppedAt, "number");
});

test("SessionTimer should restore initial state", () => {
  const timer = SessionTimer.fromJSON({
    duration: 60,
    startedAt: null,
    stoppedAt: null,
  });

  assert.equal(timer.duration, 60);
  assert.equal(timer.started, false);
  assert.equal(timer.stopped, false);
  assert.equal(timer.elapsed, 0);
});

test("SessionTimer should restore started state", () => {
  const startedAt = Date.now() - 5000;

  const timer = SessionTimer.fromJSON({
    duration: 60,
    startedAt,
    stoppedAt: null,
  });

  assert.equal(timer.duration, 60);
  assert.equal(timer.started, true);
  assert.equal(timer.stopped, false);
  assert.ok(timer.elapsed >= 5);
});

test("SessionTimer should restore stopped state", () => {
  const startedAt = Date.now() - 10000;
  const stoppedAt = startedAt + 5000;

  const timer = SessionTimer.fromJSON({
    duration: 60,
    startedAt,
    stoppedAt,
  });

  assert.equal(timer.started, true);
  assert.equal(timer.stopped, true);
  assert.equal(timer.elapsed, 5);
  assert.equal(timer.remaining, 55);
});

test("SessionTimer should preserve round-trip state", () => {
  const timer = new SessionTimer(60);

  timer.start();
  timer.stop();

  const restored = SessionTimer.fromJSON(timer.toJSON());

  assert.deepEqual(
    restored.toJSON(),
    timer.toJSON(),
  );

  assert.equal(
    restored.elapsed,
    timer.elapsed,
  );

  assert.equal(
    restored.remaining,
    timer.remaining,
  );
});

test("SessionTimer.fromJSON should reject invalid data", () => {
  assert.throws(
    () => SessionTimer.fromJSON(null),
    TypeError,
  );

  assert.throws(
    () => SessionTimer.fromJSON([]),
    TypeError,
  );

  assert.throws(
    () => SessionTimer.fromJSON("timer"),
    TypeError,
  );
});

test("SessionTimer.fromJSON should reject invalid timestamps", () => {
  assert.throws(
    () =>
      SessionTimer.fromJSON({
        duration: 60,
        startedAt: "invalid",
      }),
    TypeError,
  );

  assert.throws(
    () =>
      SessionTimer.fromJSON({
        duration: 60,
        stoppedAt: 100,
      }),
    TypeError,
  );

  assert.throws(
    () =>
      SessionTimer.fromJSON({
        duration: 60,
        startedAt: 200,
        stoppedAt: 100,
      }),
    RangeError,
  );
});
