function normalizeSessionAnswers(answers) {
  if (answers == null) {
    return [];
  }

  if (!Array.isArray(answers)) {
    throw new TypeError("normalizeSessionAnswers expects an array");
  }

  return answers.map((subjectAnswers) => {
    if (!Array.isArray(subjectAnswers)) {
      throw new TypeError("Session subject answers must be an array");
    }

    return subjectAnswers.map((questionAnswer) => {
      if (questionAnswer == null) {
        return undefined;
      }

      if (Array.isArray(questionAnswer)) {
        return [...questionAnswer];
      }

      return questionAnswer;
    });
  });
}

export default normalizeSessionAnswers;
