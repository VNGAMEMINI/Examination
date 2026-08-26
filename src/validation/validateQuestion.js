import Question from "../question/Question.js";
import ValidationError from "./ValidationError.js";
import validateAnswerCollection
  from "./validateAnswerCollection.js";

function validateQuestion(question) {
  if (!(question instanceof Question)) {
    throw new ValidationError(
      "Expected Question instance",
      {
        path: "Question",
        code: "INVALID_TYPE",
        value: question
      }
    );
  }

  if (
    typeof question.text !== "string" ||
    question.text.trim() === ""
  ) {
    throw new ValidationError(
      "Question.text must be a non-empty string",
      {
        path: "Question.text",
        code: "INVALID_VALUE",
        value: question.text
      }
    );
  }

  validateAnswerCollection(
    question.answers
  );

  return true;
}

export default validateQuestion;
