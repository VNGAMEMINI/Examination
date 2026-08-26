import Subject from "../subject/Subject.js";
import QuestionCollection from "../question/QuestionCollection.js";

import normalizeQuestionCollection
  from "./normalizeQuestionCollection.js";

function normalizeSubject(input = {}) {
  if (input instanceof Subject) {
    return input;
  }

  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    throw new TypeError(
      "Subject input must be an object"
    );
  }

  const id = input.id ?? null;

  const name =
    input.name ??
    input.title ??
    "";

  const rawQuestions =
    input.questions ??
    input.q ??
    [];

  const questions =
    normalizeQuestionCollection(
      rawQuestions
    );

  return new Subject({
    id,
    name,
    questions,
    metadata: input.metadata ?? {}
  });
}

export default normalizeSubject;
