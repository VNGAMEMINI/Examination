import Answer from "../answer/Answer.js";
import ValidationError from "./ValidationError.js";

function validateAnswer(answer) {
  if (!(answer instanceof Answer)) {
    throw new ValidationError(
      "Expected Answer instance",
      {
        path: "Answer",
        code: "INVALID_TYPE",
        value: answer
      }
    );
  }

  if (
    typeof answer.value !== "string" ||
    answer.value.trim() === ""
  ) {
    throw new ValidationError(
      "Answer.value must be a non-empty string",
      {
        path: "Answer.value",
        code: "INVALID_VALUE",
        value: answer.value
      }
    );
  }

  if (typeof answer.correct !== "boolean") {
    throw new ValidationError(
      "Answer.correct must be a boolean",
      {
        path: "Answer.correct",
        code: "INVALID_TYPE",
        value: answer.correct
      }
    );
  }

  if (
    !Number.isInteger(answer.index) ||
    answer.index < 0
  ) {
    throw new ValidationError(
      "Answer.index must be a non-negative integer",
      {
        path: "Answer.index",
        code: "INVALID_INDEX",
        value: answer.index
      }
    );
  }

  return true;
}

export default validateAnswer;
