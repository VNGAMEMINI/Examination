import AnswerCollection
  from "../answer/AnswerCollection.js";

import ValidationError
  from "./ValidationError.js";

import validateAnswer
  from "./validateAnswer.js";


function validateAnswerCollection(collection) {
  if (!(collection instanceof AnswerCollection)) {
    throw new ValidationError(
      "Expected AnswerCollection instance",
      {
        path: "AnswerCollection",
        code: "INVALID_TYPE",
        value: collection
      }
    );
  }

  if (collection.length < 2) {
    throw new ValidationError(
      "AnswerCollection must contain at least 2 answers",
      {
        path: "AnswerCollection",
        code: "MIN_ITEMS",
        value: collection
      }
    );
  }

  const answers = collection.toArray();

  const indexes = new Set();

  let hasCorrectAnswer = false;

  for (const answer of answers) {
    validateAnswer(answer);

    if (answer.correct) {
      hasCorrectAnswer = true;
    }

    if (indexes.has(answer.index)) {
      throw new ValidationError(
        "Duplicate answer index",
        {
          path: "AnswerCollection.index",
          code: "DUPLICATE_INDEX",
          value: answer.index
        }
      );
    }

    indexes.add(answer.index);
  }

  if (!hasCorrectAnswer) {
    throw new ValidationError(
      "AnswerCollection must contain at least one correct answer",
      {
        path: "AnswerCollection",
        code: "NO_CORRECT_ANSWER",
        value: collection
      }
    );
  }

  return true;
}

export default validateAnswerCollection;
