import Question from "../question/Question.js";
import compareAnswer from "./compareAnswer.js";

export default function compare(question, actual) {
  if (!(question instanceof Question)) {
    throw new TypeError(
      "compare() requires a Question instance."
    );
  }

  return compareAnswer(
    question.correct,
    actual
  );
}
