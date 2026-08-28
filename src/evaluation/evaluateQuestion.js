import Question from "../question/Question.js";
import evaluateAnswer from "./evaluateAnswer.js";

function isUnanswered(selected) {
  return (
    selected == null ||
    (Array.isArray(selected) && selected.length === 0)
  );
}

function evaluateQuestion(question, selected) {
  if (!(question instanceof Question)) {
    throw new TypeError(
      "evaluateQuestion expects a Question instance"
    );
  }

  const result = evaluateAnswer(
    question.answers,
    selected
  );

  return {
    ...result,
    unanswered: isUnanswered(selected),
  };
}

export default evaluateQuestion;
