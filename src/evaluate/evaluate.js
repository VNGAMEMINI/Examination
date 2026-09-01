import Question from "../question/Question.js";
import validateQuestion from "../validate/validateQuestion.js";
import compare from "../compare/compare.js";
import Result from "../result/Result.js";

function normalizeActual(actual) {
  if (actual === undefined || actual === null) {
    return [];
  }

  if (Array.isArray(actual)) {
    return [...new Set(actual.map(String))];
  }

  return [String(actual)];
}

function resolveActual(question, actual) {
  const values = normalizeActual(actual);

  return values.map((value) => {
    const answer = question.answers.find(
      (answer) => answer.id === value || answer.text === value,
    );

    return answer?.id ?? value;
  });
}

export function evaluate(question, actual) {
  if (!(question instanceof Question)) {
    throw new TypeError("evaluate() requires a Question instance.");
  }

  validateQuestion(question);

  const normalizedActual = resolveActual(question, actual);

  if (normalizedActual.length === 0) {
    return new Result({
      status: Result.STATUS.UNANSWERED,
      expected: question.correct,
      actual: [],
    });
  }

  const correct = compare(question, normalizedActual);

  return new Result({
    status: correct ? Result.STATUS.CORRECT : Result.STATUS.INCORRECT,
    expected: question.correct,
    actual: normalizedActual,
  });
}

export function evaluateCollection(questions, answers = []) {
  if (!Array.isArray(questions)) {
    throw new TypeError(
      "evaluateCollection() requires an array of Question instances.",
    );
  }

  if (!Array.isArray(answers)) {
    throw new TypeError("evaluateCollection() requires an array of answers.");
  }

  return questions.map((question, index) => evaluate(question, answers[index]));
}

export default evaluate;
