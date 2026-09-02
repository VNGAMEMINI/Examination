import Question from "../question/Question.js";
import normalizeQuestion from "./normalizeQuestion.js";

export default function normalize(input) {
  if (input instanceof Question) {
    return [input];
  }

  if (Array.isArray(input)) {
    return input.map((question, index) => normalizeQuestion(question, index));
  }

  if (input === null || typeof input !== "object") {
    return [];
  }

  const questions = Array.isArray(input.questions) ? input.questions : [];

  return questions.map((question, index) => normalizeQuestion(question, index));
}
