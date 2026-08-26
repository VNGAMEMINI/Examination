import AnswerCollection from "../answer/AnswerCollection.js";
import normalizeAnswer from "./normalizeAnswer.js";

function normalizeAnswerCollection(input = []) {
  if (input instanceof AnswerCollection) {
    return input;
  }

  if (!Array.isArray(input)) {
    throw new TypeError(
      "AnswerCollection input must be an array"
    );
  }

  const collection = new AnswerCollection();

  input.forEach((answer, index) => {
    collection.add(
      normalizeAnswer(answer, {
        index
      })
    );
  });

  return collection;
}

export default normalizeAnswerCollection;
