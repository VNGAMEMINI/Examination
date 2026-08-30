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
  Settings,
  Mode,
} from "../../src/index.js";

test("Examination.fromJSON should restore Examination", () => {
  const examination = new Examination({
    id: "exam-1",
    title: "Math Test",
    subjects: new SubjectCollection([
      new Subject(
        "Mathematics",
        new QuestionCollection([
          new Question(
            "2 + 2 = ?",
            new AnswerCollection([
              new Answer("4", { correct: true }),
              new Answer("5", { correct: false }),
            ])
          ),
        ])
      ),
    ]),
    settings: new Settings({
      mode: Mode.EXAM,
      limit: 10,
      randomSen: true,
      randomAns: true,
      autoNext: false,
      timeTotal: 45,
    }),
    metadata: {
      author: "VNGAMEMINI",
    },
  });

  const json = examination.toJSON();

  const restored = Examination.fromJSON(json);

  assert.ok(restored instanceof Examination);

  assert.equal(restored.id, "exam-1");
  assert.equal(restored.title, "Math Test");

  assert.ok(
    restored.subjects instanceof SubjectCollection
  );

  assert.equal(restored.subjects.length, 1);

  const subject = restored.subjects.get(0);

  assert.ok(subject instanceof Subject);
  assert.equal(subject.name, "Mathematics");

  assert.ok(
    subject.questions instanceof QuestionCollection
  );

  const question = subject.questions.get(0);

  assert.ok(question instanceof Question);
  assert.equal(question.text, "2 + 2 = ?");

  assert.ok(
    question.answers instanceof AnswerCollection
  );

  assert.equal(question.answers.length, 2);

  assert.ok(
    restored.settings instanceof Settings
  );

  assert.equal(
    restored.settings.mode.value,
    Mode.EXAM
  );

  assert.equal(restored.settings.limit, 10);
  assert.equal(restored.settings.randomSen, true);
  assert.equal(restored.settings.randomAns, true);
  assert.equal(restored.settings.autoNext, false);
  assert.equal(restored.settings.timeTotal, 45);

  assert.deepEqual(
    restored.metadata,
    {
      author: "VNGAMEMINI",
    }
  );
});

test("Examination.fromJSON should reject invalid input", () => {
  assert.throws(
    () => Examination.fromJSON(null),
    TypeError
  );

  assert.throws(
    () => Examination.fromJSON([]),
    TypeError
  );

  assert.throws(
    () => Examination.fromJSON("invalid"),
    TypeError
  );
});

test("Examination should survive JSON round-trip", () => {
  const examination = new Examination({
    id: "round-trip",
    title: "Round Trip Test",
    subjects: new SubjectCollection([
      new Subject(
        "Science",
        new QuestionCollection([
          new Question(
            "Water formula?",
            new AnswerCollection([
              new Answer("H2O", {
                correct: true,
              }),
              new Answer("CO2", {
                correct: false,
              }),
            ])
          ),
        ])
      ),
    ]),
    metadata: {
      source: "test",
    },
  });

  const restored = Examination.fromJSON(
    JSON.parse(
      JSON.stringify(examination)
    )
  );

  assert.ok(restored instanceof Examination);
  assert.equal(restored.id, "round-trip");
  assert.equal(restored.title, "Round Trip Test");
  assert.equal(restored.subjects.length, 1);

  assert.equal(
    restored.subjects
      .get(0)
      .questions
      .get(0)
      .text,
    "Water formula?"
  );

  assert.deepEqual(
    restored.metadata,
    {
      source: "test",
    }
  );
});
