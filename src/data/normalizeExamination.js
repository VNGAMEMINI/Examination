import SubjectCollection from "../subject/SubjectCollection.js";

import normalizeSubjectCollection
  from "./normalizeSubjectCollection.js";

function normalizeExamination(input = []) {
  if (input instanceof SubjectCollection) {
    return input;
  }

  let subjects;

  if (Array.isArray(input)) {
    subjects = input;
  } else if (
    input !== null &&
    typeof input === "object"
  ) {
    subjects =
      input.subjects ??
      input.s ??
      [];
  } else {
    throw new TypeError(
      "Examination input must be an object or array"
    );
  }

  return normalizeSubjectCollection(
    subjects
  );
}

export default normalizeExamination;
