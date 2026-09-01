import Question from "../question/Question.js";
import validateQuestion from "./validateQuestion.js";
import ValidationError from "../errors/ValidationError.js";

export default function validate(input) {
  if (input instanceof Question) {
    return validateQuestion(input);
  }

  if (Array.isArray(input)) {
    for (const question of input) {
      validateQuestion(question);
    }

    return true;
  }

  throw new ValidationError(
    "Validation input must be a Question or an array of Questions.",
  );
}
