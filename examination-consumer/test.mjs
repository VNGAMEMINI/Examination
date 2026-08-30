import {
  Answer,
  AnswerCollection,
  Question,
  QuestionCollection,
  Subject,
  SubjectCollection,
  Examination,
  Session,
} from "@vngamemini/examination";

const answers = new AnswerCollection([
  new Answer({
    value: "A",
    correct: true,
  }),
  new Answer({
    value: "B",
    correct: false,
  }),
]);

const question = new Question({
  text: "2 + 2 = ?",
  answers,
});

const questions = new QuestionCollection([question]);

const subject = new Subject({
  name: "Mathematics",
  questions,
});

const subjects = new SubjectCollection([subject]);

const examination = new Examination({
  title: "Package Test",
  subjects,
});

const session = new Session({
  examination,
});

console.log("Answer:", answers.length);
console.log("Question:", question.text);
console.log("Subject:", subject.name);
console.log("Examination:", examination.title);
console.log("Session:", session.constructor.name);
console.log("PASS");
