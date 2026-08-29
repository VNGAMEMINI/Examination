import Examination from "../examination/Examination.js";
import Evaluation from "./Evaluation.js";
import evaluateSubject from "./evaluateSubject.js";
import summarizeEvaluation from "./summarizeEvaluation.js";

function evaluateExamination(examination, selections = []) {
  if (!(examination instanceof Examination)) {
    throw new TypeError("evaluateExamination expects an Examination instance");
  }

  const subjects = examination.subjects.toArray();

  const subjectEvaluations = subjects.map((subject, subjectIndex) => {
    const subjectSelections = Array.isArray(selections)
      ? selections[subjectIndex]
      : undefined;

    return evaluateSubject(subject, subjectSelections);
  });

  const results = subjectEvaluations.flatMap(
    (evaluation) => evaluation.results,
  );

  const summary = summarizeEvaluation(results);

  return new Evaluation({
    ...summary,
    subjects: subjectEvaluations,
  });
}

export default evaluateExamination;
