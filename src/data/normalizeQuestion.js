import Answer from "../answer/Answer.js";
import Question from "../question/Question.js";
import AnswerCollection from "../answer/AnswerCollection.js";

import normalizeAnswerCollection
  from "./normalizeAnswerCollection.js";

function normalizeQuestion(input = {}) {
  if (input instanceof Question) {
    return input;
  }

  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    throw new TypeError(
      "Question input must be an object"
    );
  }

  const text =
    input.text ??
    input.question ??
    input.q ??
    "";

  const rawAnswers =
    input.answers ??
    input.a ??
    [];

  const sourceAnswers =
    normalizeAnswerCollection(rawAnswers);

  const correct = input.correct;

  const answers = new AnswerCollection();

  sourceAnswers.toArray().forEach(
    (answer, index) => {
      const isCorrect =
        Array.isArray(correct)
          ? correct.includes(index)
          : correct === index;

      answers.add(
        new Answer({
          value: answer.value,
          index: answer.index,
          correct: isCorrect,
          metadata: answer.metadata
        })
      );
    }
  );

  return new Question({
    id: input.id ?? null,
    text,
    answers,
    type: input.type ?? "single",
    metadata: input.metadata ?? {}
  });
}

export default normalizeQuestion;
