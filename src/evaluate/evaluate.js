import Question from "../question/Question.js";
import validateQuestion from "../validate/validateQuestion.js";
import compare from "../compare/compare.js";
import Result from "../result/Result.js";

function normalizeActual(actual) {
  if (actual === undefined || actual === null) {
    return [];
  }

  if (Array.isArray(actual)) {
    return actual.map(String);
  }

  return [String(actual)];
}

export default function evaluate(question, actual) {
  if (!(question instanceof Question)) {
    throw new TypeError(
      "evaluate() requires a Question instance."
    );
  }

  validateQuestion(question);

  const normalizedActual = normalizeActual(actual);

  if (normalizedActual.length === 0) {
    return new Result({
      status: Result.STATUS.UNANSWERED,
      expected: question.correct,
      actual: []
    });
  }

  const correct = compare(
    question,
    normalizedActual
  );

  return new Result({
    status: correct
      ? Result.STATUS.CORRECT
      : Result.STATUS.INCORRECT,
    expected: question.correct,
    actual: normalizedActual
  });
}
