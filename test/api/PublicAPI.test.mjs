import {
  Answer,
  AnswerCollection,
  Question,
  QuestionCollection,
  Subject,
  SubjectCollection,
  Examination,
  Evaluation,
  Settings,
  Mode,
  Session,
  Score,
  Result,
  evaluateExamination,
  validateQuestion,
  validateExamination,
} from "@vngamemini/examination";

console.log("=== Public API / Model Contract Test ===");

// Answer
const answers = new AnswerCollection([
  new Answer({
    value: "A",
    index: 0,
    correct: true,
  }),

  new Answer({
    value: "B",
    index: 1,
    correct: false,
  }),
]);

console.log("AnswerCollection:", answers.length);

// Question

const question = new Question({
  id: "q1",
  text: "2 + 2 = ?",
  answers,
  type: "single",
});

console.log("Question:", question.text);

// QuestionCollection

const questions = new QuestionCollection([question]);

console.log("QuestionCollection:", questions.length);

// Subject

const subject = new Subject({
  id: "math",
  name: "Mathematics",
  questions,
});

console.log("Subject:", subject.name);

// SubjectCollection

const subjects = new SubjectCollection([subject]);

console.log("SubjectCollection:", subjects.length);

// Settings

const settings = new Settings({
  mode: new Mode("free"),
  limit: 0,
  randomSen: false,
  randomAns: false,
  autoNext: true,
  timeTotal: 0,
});

console.log("Settings mode:", settings.mode.value);

// Examination

const examination = new Examination({
  id: "api-test",
  title: "Public API Test",
  subjects,
  settings,
});

console.log("Examination:", examination.title);

validateQuestion(question);
validateExamination(examination);

console.log("Validation: PASS");

const session = new Session({
  examination,
});

session.start();

session.answerCurrent([0]);

const evaluation = evaluateExamination(examination, [[[0]]]);

console.log("Evaluation:", evaluation.constructor.name);
console.log(
  "Evaluation instanceof Evaluation:",
  evaluation instanceof Evaluation,
);
console.log("Evaluation total:", evaluation.total);
console.log("Evaluation correct:", evaluation.correct);

const score = Score.fromEvaluation(evaluation);

console.log("Score:", score.constructor.name);
console.log("Score total:", score.total);
console.log("Score correct:", score.correct);
console.log("Score points:", score.points);
console.log("Score percentage:", score.percentage);

const result = score.toResult();

console.log("Result:", result.constructor.name);
console.log("Result total:", result.total);
console.log("Result correct:", result.correct);
console.log("Result score:", result.score);
console.log("Result percentage:", result.percentage);

//  Contract assertions

console.log("=== Contract Assertions ===");

console.assert(
  answers instanceof AnswerCollection,
  "answers must be AnswerCollection",
);

console.assert(question instanceof Question, "question must be Question");

console.assert(
  question.answers instanceof AnswerCollection,
  "question.answers must be AnswerCollection",
);

console.assert(question.text === "2 + 2 = ?", "question.text must be correct");

console.assert(
  questions instanceof QuestionCollection,
  "questions must be QuestionCollection",
);

console.assert(subject instanceof Subject, "subject must be Subject");

console.assert(
  subject.questions instanceof QuestionCollection,
  "subject.questions must be QuestionCollection",
);

console.assert(
  subjects instanceof SubjectCollection,
  "subjects must be SubjectCollection",
);

console.assert(
  examination instanceof Examination,
  "examination must be Examination",
);

console.assert(
  examination.subjects instanceof SubjectCollection,
  "examination.subjects must be SubjectCollection",
);

console.assert(
  examination.settings instanceof Settings,
  "examination.settings must be Settings",
);

console.assert(session instanceof Session, "session must be Session");

console.assert(score instanceof Score, "score must be Score");

console.assert(result instanceof Result, "result must be Result");

console.assert(evaluation.correct === 1, "expected 1 correct answer");

console.assert(score.points === 1, "expected score = 1");

console.assert(score.percentage === 100, "expected percentage = 100");

console.log("Public API / Model Contract: PASS");
