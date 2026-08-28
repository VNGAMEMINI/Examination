import AnswerCollection from "../answer/AnswerCollection.js";

function normalizeIndexes(value) {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return [...new Set(value)].sort((a, b) => a - b);
  }

  return [value];
}

function evaluateAnswer(answers, selected) {
  if (!(answers instanceof AnswerCollection)) {
    throw new TypeError(
      "evaluateAnswer expects an AnswerCollection"
    );
  }

  const expected = normalizeIndexes(
    answers
      .toArray()
      .filter(answer => answer.correct)
      .map(answer => answer.index)
  );

  const actual = normalizeIndexes(selected);

  const correct =
    expected.length === actual.length &&
    expected.every(
      (index, position) => index === actual[position]
    );

  return {
    correct,
    expected,
    selected: actual
  };
}

export default evaluateAnswer;
