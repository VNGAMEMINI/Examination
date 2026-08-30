import test from "node:test";
import assert from "node:assert/strict";

import {
  Answer,
  AnswerCollection,
  Question,
  QuestionCollection,
  Subject,
  SubjectCollection,
  Examination,
} from "../../src/index.js";

test("Examination should serialize its public state", () => {
  const answers = new AnswerCollection([
    new Answer("A", { correct: true }),
    new Answer("B", { correct: false }),
  ]);

  const question = new Question("2 + 2 = ?", answers);

  const questions = new QuestionCollection([
    question,
  ]);

  const subject = new Subject(
    "Mathematics",
    questions
  );

  const subjects = new SubjectCollection([
    subject,
  ]);

  const examination = new Examination({
    id: "exam-1",
    title: "Math Test",
    subjects,
    metadata: {
      author: "VNGAMEMINI",
    },
  });

  const json = examination.toJSON();

  assert.equal(json.id, "exam-1");
  assert.equal(json.title, "Math Test");

  assert.ok(json.subjects);

  assert.deepEqual(
    json.metadata,
    {
      author: "VNGAMEMINI",
    }
  );
});
