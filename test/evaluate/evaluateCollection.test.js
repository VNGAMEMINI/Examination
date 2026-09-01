import test from "node:test";
import assert from "node:assert/strict";

import Question from "../../src/question/Question.js";
import Result from "../../src/result/Result.js";
import {
  evaluateCollection
} from "../../src/evaluate/evaluate.js";

function createQuestion(id, correct) {
  return new Question({
    id,
    text: `Question ${id}`,
    answers: [
      {
        id: "a1",
        text: "A"
      },
      {
        id: "a2",
        text: "B"
      }
    ],
    correct
  });
}

test("evaluateCollection evaluates all questions", () => {
  const questions = [
    createQuestion("q1", ["a1"]),
    createQuestion("q2", ["a2"]),
    createQuestion("q3", ["a1"])
  ];

  const results = evaluateCollection(
    questions,
    ["a1", "a2", "a2"]
  );

  assert.equal(results.length, 3);

  assert.ok(
    results.every(
      result => result instanceof Result
    )
  );

  assert.deepEqual(
    results.map(result => result.status),
    [
      "correct",
      "correct",
      "incorrect"
    ]
  );
});

test("evaluateCollection marks missing answers as unanswered", () => {
  const questions = [
    createQuestion("q1", ["a1"]),
    createQuestion("q2", ["a2"]),
    createQuestion("q3", ["a1"])
  ];

  const results = evaluateCollection(
    questions,
    ["a1"]
  );

  assert.deepEqual(
    results.map(result => result.status),
    [
      "correct",
      "unanswered",
      "unanswered"
    ]
  );
});

test("evaluateCollection supports empty answers", () => {
  const questions = [
    createQuestion("q1", ["a1"]),
    createQuestion("q2", ["a2"])
  ];

  const results = evaluateCollection(
    questions,
    []
  );

  assert.deepEqual(
    results.map(result => result.status),
    [
      "unanswered",
      "unanswered"
    ]
  );
});

test("evaluateCollection rejects non-array questions", () => {
  assert.throws(
    () => evaluateCollection({}, []),
    TypeError
  );
});

test("evaluateCollection rejects non-array answers", () => {
  const questions = [
    createQuestion("q1", ["a1"])
  ];

  assert.throws(
    () => evaluateCollection(
      questions,
      {}
    ),
    TypeError
  );
});

test("evaluateCollection rejects invalid Question", () => {
  assert.throws(
    () => evaluateCollection(
      [{}],
      ["a1"]
    ),
    TypeError
  );
});
