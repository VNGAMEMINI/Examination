import SubjectCollection from "../subject/SubjectCollection.js";
import normalizeSubject from "./normalizeSubject.js";

function normalizeSubjectCollection(input = []) {
  if (input instanceof SubjectCollection) {
    return input;
  }

  if (!Array.isArray(input)) {
    throw new TypeError(
      "SubjectCollection input must be an array"
    );
  }

  const collection = new SubjectCollection();

  input.forEach((subject) => {
    collection.add(
      normalizeSubject(subject)
    );
  });

  return collection;
}

export default normalizeSubjectCollection;
