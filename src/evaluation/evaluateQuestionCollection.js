import QuestionCollection from "../question/QuestionCollection.js";
import evaluateQuestion from "./evaluateQuestion.js";

function evaluateQuestionCollection(questions, selections = []) {
  if (!(questions instanceof QuestionCollection)) {
    throw new TypeError(
      "evaluateQuestionCollection expects a QuestionCollection",
    );
  }

  const results = questions.toArray().map((question, index) => {
    const selected = Array.isArray(selections) ? selections[index] : undefined;

    return evaluateQuestion(question, selected);
  });

  return results;
}

export default evaluateQuestionCollection;
