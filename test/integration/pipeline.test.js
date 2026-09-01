import test from "node:test";
import assert from "node:assert/strict";

import Examination from "../../src/examination/Examination.js";
import Result from "../../src/result/Result.js";
import Summary from "../../src/summary/Summary.js";
import Score from "../../src/score/Score.js";

test("complete examination pipeline", () => {
  const examination = new Examination();

  const result = examination.run(
    [
      {
        text: "2 + 2 = ?",
        answers: ["3", "4", "5"],
        correct: [1],
      },
      {
        text: "Capital of France?",
        answers: ["London", "Paris", "Berlin"],
        correct: [1],
      },
      {
        text: "1 + 1 = ?",
        answers: ["1", "2", "3"],
        correct: [1],
      },
    ],
    ["4", "London", "2"],
  );

  assert.ok(Array.isArray(result.results));
  assert.equal(result.results.length, 3);

  assert.ok(result.results[0] instanceof Result);
  assert.ok(result.results[1] instanceof Result);
  assert.ok(result.results[2] instanceof Result);

  assert.equal(result.results[0].status, Result.STATUS.CORRECT);
  assert.equal(result.results[1].status, Result.STATUS.INCORRECT);
  assert.equal(result.results[2].status, Result.STATUS.CORRECT);

  assert.ok(result.summary instanceof Summary);
  assert.equal(result.summary.total, 3);
  assert.equal(result.summary.correct, 2);
  assert.equal(result.summary.incorrect, 1);
  assert.equal(result.summary.unanswered, 0);

  assert.ok(result.score instanceof Score);
  assert.equal(result.score.points, 2);
  assert.ok(Math.abs(result.score.percentage - 200 / 3) < 1e-12);
});
