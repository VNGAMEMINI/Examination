import Question from "../question/Question.js";
import normalizeAnswer from "./normalizeAnswer.js";

export default function normalizeQuestion(input, index = 0) {
  if (input instanceof Question) {
    return input;
  }

  if (input === null || typeof input !== "object") {
    return new Question({
      id: `q${index}`,
      text: String(input ?? ""),
      answers: [],
      correct: [],
    });
  }

  const answers = Array.isArray(input.answers)
    ? input.answers.map((answer, answerIndex) =>
        normalizeAnswer(answer, answerIndex),
      )
    : [];

  const correct = normalizeCorrect(input.correct, answers);

  return new Question({
    id: input.id ?? `q${index}`,
    text: input.text ?? "",
    answers,
    correct,
    metadata: input.metadata ?? {},
  });
}

function normalizeCorrect(correct, answers) {
  if (correct === undefined || correct === null) {
    return [];
  }

  const values = Array.isArray(correct) ? correct : [correct];

  return values.map((value) => {
    if (typeof value === "number") {
      return answers[value]?.id ?? `a${value}`;
    }

    return String(value);
  });
}
