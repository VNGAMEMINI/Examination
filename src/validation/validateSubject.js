import Subject from "../subject/Subject.js";
import ValidationError from "./ValidationError.js";
import validateQuestionCollection
  from "./validateQuestionCollection.js";

function validateSubject(subject) {
  if (!(subject instanceof Subject)) {
    throw new ValidationError(
      "Expected Subject instance",
      {
        path: "Subject",
        code: "INVALID_TYPE",
        value: subject
      }
    );
  }

  if (
    typeof subject.name !== "string" ||
    subject.name.trim() === ""
  ) {
    throw new ValidationError(
      "Subject.name must be a non-empty string",
      {
        path: "Subject.name",
        code: "INVALID_VALUE",
        value: subject.name
      }
    );
  }

  validateQuestionCollection(
    subject.questions
  );

  return true;
}

export default validateSubject;
