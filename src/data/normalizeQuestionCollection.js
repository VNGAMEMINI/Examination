import QuestionCollection from "../question/QuestionCollection.js";
import normalizeQuestion from "./normalizeQuestion.js";

function normalizeQuestionCollection(input = []) {
  if (input instanceof QuestionCollection) {
    return input;
  }

  if (!Array.isArray(input)) {
    throw new TypeError(
      "QuestionCollection input must be an array"
    );
  }

  const collection = new QuestionCollection();

  input.forEach((question) => {
    collection.add(
      normalizeQuestion(question)
    );
  });

  return collection;
}

export default normalizeQuestionCollection;
