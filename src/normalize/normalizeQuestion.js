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
      metadata: {},
    });
  }

  const answers = Array.isArray(input.answers)
    ? input.answers.map((answer, answerIndex) =>
        normalizeAnswer(answer, answerIndex),
      )
    : [];

  return new Question({
    id: normalizeId(input.id, index),
    text: normalizeText(input.text),
    answers,
    correct: normalizeCorrect(input.correct, answers),
    metadata: normalizeMetadata(input.metadata),
  });
}

function normalizeId(id, index) {
  if (id === undefined || id === null) {
    return `q${index}`;
  }

  return String(id);
}

function normalizeText(text) {
  if (text === undefined || text === null) {
    return "";
  }

  return String(text);
}

function normalizeMetadata(metadata) {
  if (
    metadata === null ||
    typeof metadata !== "object" ||
    Array.isArray(metadata)
  ) {
    return {};
  }

  return { ...metadata };
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
