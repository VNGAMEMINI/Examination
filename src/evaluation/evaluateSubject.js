import Subject from "../subject/Subject.js";
import SubjectEvaluation from "./SubjectEvaluation.js";
import evaluateQuestionCollection from "./evaluateQuestionCollection.js";
import summarizeEvaluation from "./summarizeEvaluation.js";

function evaluateSubject(subject, selections = []) {
  if (!(subject instanceof Subject)) {
    throw new TypeError("evaluateSubject expects a Subject instance");
  }

  const results = evaluateQuestionCollection(subject.questions, selections);

  const summary = summarizeEvaluation(results);

  return new SubjectEvaluation({
    subject,
    ...summary,
    results,
  });
}

export default evaluateSubject;
