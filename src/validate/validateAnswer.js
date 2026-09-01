import Answer from "../answer/Answer.js";
import ValidationError from "../errors/ValidationError.js";

export default function validateAnswer(answer) {
  if (!(answer instanceof Answer)) {
    throw new ValidationError("Answer must be an instance of Answer.");
  }

  if (typeof answer.id !== "string" || answer.id.trim() === "") {
    throw new ValidationError("Answer id must be a non-empty string.");
  }

  if (typeof answer.text !== "string") {
    throw new ValidationError("Answer text must be a string.");
  }

  if (
    answer.metadata === null ||
    typeof answer.metadata !== "object" ||
    Array.isArray(answer.metadata)
  ) {
    throw new ValidationError("Answer metadata must be an object.");
  }

  return true;
}
