import QuestionCollection
  from "../question/QuestionCollection.js";

import ValidationError
  from "./ValidationError.js";

import validateQuestion
  from "./validateQuestion.js";


function validateQuestionCollection(collection) {
  if (!(collection instanceof QuestionCollection)) {
    throw new ValidationError(
      "Expected QuestionCollection instance",
      {
        path: "QuestionCollection",
        code: "INVALID_TYPE",
        value: collection
      }
    );
  }

  if (collection.length < 1) {
    throw new ValidationError(
      "QuestionCollection must contain at least one question",
      {
        path: "QuestionCollection",
        code: "MIN_ITEMS",
        value: collection
      }
    );
  }

  const questions = collection.toArray();

  const ids = new Set();

  for (const question of questions) {
    validateQuestion(question);

    if (question.id !== null) {
      if (ids.has(question.id)) {
        throw new ValidationError(
          "Duplicate question id",
          {
            path: "QuestionCollection.id",
            code: "DUPLICATE_ID",
            value: question.id
          }
        );
      }

      ids.add(question.id);
    }
  }

  return true;
}

export default validateQuestionCollection;
