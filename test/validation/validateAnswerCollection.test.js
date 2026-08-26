import test from "node:test";
import assert from "node:assert/strict";

import Answer from "../../src/answer/Answer.js";
import AnswerCollection
  from "../../src/answer/AnswerCollection.js";

import ValidationError
  from "../../src/validation/ValidationError.js";

import validateAnswerCollection
  from "../../src/validation/validateAnswerCollection.js";


function createAnswers() {
  return new AnswerCollection([
    new Answer({
      value: "A",
      correct: false,
      index: 0
    }),

    new Answer({
      value: "B",
      correct: true,
      index: 1
    })
  ]);
}


test("valid AnswerCollection should pass", () => {
  const answers = createAnswers();

  assert.equal(
    validateAnswerCollection(answers),
    true
  );
});


test("should reject non-AnswerCollection", () => {
  assert.throws(
    () => {
      validateAnswerCollection([]);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "INVALID_TYPE"
      );

      return true;
    }
  );
});


test("should reject fewer than 2 answers", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      correct: true,
      index: 0
    })
  ]);

  assert.throws(
    () => {
      validateAnswerCollection(answers);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "MIN_ITEMS"
      );

      return true;
    }
  );
});


test("should reject collection without correct answer", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      correct: false,
      index: 0
    }),

    new Answer({
      value: "B",
      correct: false,
      index: 1
    })
  ]);

  assert.throws(
    () => {
      validateAnswerCollection(answers);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "NO_CORRECT_ANSWER"
      );

      return true;
    }
  );
});


test("should reject duplicate indexes", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      correct: false,
      index: 0
    }),

    new Answer({
      value: "B",
      correct: true,
      index: 0
    })
  ]);

  assert.throws(
    () => {
      validateAnswerCollection(answers);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.code,
        "DUPLICATE_INDEX"
      );

      return true;
    }
  );
});


test("should propagate invalid Answer", () => {
  const answers = new AnswerCollection([
    new Answer({
      value: "A",
      correct: true,
      index: 0
    }),

    new Answer({
      value: "",
      correct: false,
      index: 1
    })
  ]);

  assert.throws(
    () => {
      validateAnswerCollection(answers);
    },
    (error) => {
      assert.ok(
        error instanceof ValidationError
      );

      assert.equal(
        error.path,
        "Answer.value"
      );

      return true;
    }
  );
});
