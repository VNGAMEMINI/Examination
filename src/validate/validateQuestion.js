import Question from "../question/Question.js";
import validateAnswer from "./validateAnswer.js";
import ValidationError from "../errors/ValidationError.js";

export default function validateQuestion(question) {
  if (!(question instanceof Question)) {
    throw new ValidationError("Question must be an instance of Question.");
  }

  if (typeof question.id !== "string" || question.id.trim() === "") {
    throw new ValidationError("Question id must be a non-empty string.");
  }

  if (typeof question.text !== "string") {
    throw new ValidationError("Question text must be a string.");
  }

  if (!Array.isArray(question.answers)) {
    throw new ValidationError("Question answers must be an array.");
  }

  const answerIds = new Set();

  for (const answer of question.answers) {
    validateAnswer(answer);

    if (answerIds.has(answer.id)) {
      throw new ValidationError(`Duplicate answer id: ${answer.id}`);
    }

    answerIds.add(answer.id);
  }

  if (!Array.isArray(question.correct)) {
    throw new ValidationError("Question correct must be an array.");
  }

  for (const correctId of question.correct) {
    if (!answerIds.has(correctId)) {
      throw new ValidationError(`Correct answer does not exist: ${correctId}`);
    }
  }

  if (
    question.metadata === null ||
    typeof question.metadata !== "object" ||
    Array.isArray(question.metadata)
  ) {
    throw new ValidationError("Question metadata must be an object.");
  }

  return true;
}
