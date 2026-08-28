function summarizeEvaluation(results) {
  if (!Array.isArray(results)) {
    throw new TypeError(
      "summarizeEvaluation expects an array"
    );
  }

  const total = results.length;

  const correct = results.filter(
    result => result.correct === true
  ).length;

  const unanswered = results.filter(
    result => result.unanswered === true
  ).length;

  const incorrect = total - correct - unanswered;

  return {
    total,
    correct,
    incorrect,
    unanswered,
  };
}

export default summarizeEvaluation;
