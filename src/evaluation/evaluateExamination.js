import Examination from "../examination/Examination.js";
import evaluateSubject from "./evaluateSubject.js";
import summarizeEvaluation from "./summarizeEvaluation.js";

function evaluateExamination(examination, selections = []) {
  if (!(examination instanceof Examination)) {
    throw new TypeError(
      "evaluateExamination expects an Examination instance"
    );
  }

  const subjects = examination.subjects.toArray();

  const subjectResults = subjects.map(
    (subject, subjectIndex) => {
      const subjectSelections = Array.isArray(selections)
        ? selections[subjectIndex]
        : undefined;

      return evaluateSubject(
        subject,
        subjectSelections
      );
    }
  );

  const results = subjectResults.flat();

  return {
    ...summarizeEvaluation(results),
    subjects: subjectResults,
  };
}

export default evaluateExamination;
