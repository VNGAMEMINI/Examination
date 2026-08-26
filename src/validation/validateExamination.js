import Examination from "../examination/Examination.js";
import ValidationError from "./ValidationError.js";
import validateSubjectCollection
  from "./validateSubjectCollection.js";

function validateExamination(examination) {
  if (!(examination instanceof Examination)) {
    throw new ValidationError(
      "Expected Examination instance",
      {
        path: "Examination",
        code: "INVALID_TYPE",
        value: examination
      }
    );
  }

  validateSubjectCollection(
    examination.subjects
  );

  return true;
}

export default validateExamination;
