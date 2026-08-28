import Subject from "../subject/Subject.js";
import evaluateQuestionCollection
  from "./evaluateQuestionCollection.js";

function evaluateSubject(subject, selections = []) {
  if (!(subject instanceof Subject)) {
    throw new TypeError(
      "evaluateSubject expects a Subject instance"
    );
  }

  return evaluateQuestionCollection(
    subject.questions,
    selections
  );
}

export default evaluateSubject;
