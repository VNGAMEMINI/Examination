import test from "node:test";
import assert from "node:assert/strict";

import {
  Examination,
  Session,
  Question,
  Answer,
  Settings,
  Mode,
  Subject,
  SubjectCollection,
  QuestionCollection,
  AnswerCollection,
} from "@vngamemini/examination";

test("Package should import core API from package name", () => {
  assert.equal(typeof Examination, "function");
  assert.equal(typeof Session, "function");
  assert.equal(typeof Question, "function");
  assert.equal(typeof Answer, "function");
  assert.equal(typeof Settings, "function");
  assert.equal(typeof Mode, "function");
});

test("Package should preserve class identity", () => {
  const examination = new Examination();

  assert.ok(examination instanceof Examination);
});

test("Package should support complete basic flow", () => {
  const answer1 = new Answer("A", { correct: true });
  const answer2 = new Answer("B", { correct: false });

  const answers = new AnswerCollection([
    answer1,
    answer2,
  ]);

  const question = new Question(
    "Test question",
    answers,
  );

  const questions = new QuestionCollection([
    question,
  ]);

  const subject = new Subject(
    "Test",
    questions,
  );

  const subjects = new SubjectCollection([
    subject,
  ]);

  const examination = new Examination({
    subjects,
  });

  const session = new Session({
    examination,
  });

  assert.ok(answer1 instanceof Answer);
  assert.ok(question instanceof Question);
  assert.ok(subject instanceof Subject);
  assert.ok(examination instanceof Examination);
  assert.ok(session instanceof Session);
});
