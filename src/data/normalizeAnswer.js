import Answer from "../answer/Answer.js";

function normalizeAnswer(input, options = {}) {
  if (input instanceof Answer) {
    return input;
  }

  const {
    index = 0,
    correct = false,
    metadata = {}
  } = options;

  if (
    input !== null &&
    typeof input === "object" &&
    !Array.isArray(input)
  ) {
    return new Answer({
      value: input.value,
      index: input.index ?? index,
      correct: input.correct ?? correct,
      metadata: input.metadata ?? metadata
    });
  }

  return new Answer({
    value: input,
    index,
    correct,
    metadata
  });
}

export default normalizeAnswer;
