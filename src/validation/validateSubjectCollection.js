import SubjectCollection
  from "../subject/SubjectCollection.js";

import ValidationError
  from "./ValidationError.js";

import validateSubject
  from "./validateSubject.js";


function validateSubjectCollection(collection) {
  if (!(collection instanceof SubjectCollection)) {
    throw new ValidationError(
      "Expected SubjectCollection instance",
      {
        path: "SubjectCollection",
        code: "INVALID_TYPE",
        value: collection
      }
    );
  }

  if (collection.length < 1) {
    throw new ValidationError(
      "SubjectCollection must contain at least one subject",
      {
        path: "SubjectCollection",
        code: "MIN_ITEMS",
        value: collection
      }
    );
  }

  const subjects = collection.toArray();

  const ids = new Set();

  for (const subject of subjects) {
    validateSubject(subject);

    if (subject.id !== null) {
      if (ids.has(subject.id)) {
        throw new ValidationError(
          "Duplicate subject id",
          {
            path: "SubjectCollection.id",
            code: "DUPLICATE_ID",
            value: subject.id
          }
        );
      }

      ids.add(subject.id);
    }
  }

  return true;
}

export default validateSubjectCollection;
