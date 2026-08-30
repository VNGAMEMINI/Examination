import Examination from "./Examination.js";
import normalizeSessionAnswers from "../data/normalizeSessionAnswers.js";
import SESSION_STATES from "./sessionStates.js";
import evaluateExamination from "../evaluation/evaluateExamination.js";
import Score from "../score/Score.js";
import SessionQuestion from "../session/SessionQuestion.js";
import SessionQuestionCollection from "../session/SessionQuestionCollection.js";
import SessionNavigation from "../navigation/SessionNavigation.js";
import SessionTimer from "../time/SessionTimer.js";

class Session {
  #id;
  #examination;
  #answers;
  #started;
  #completed;
  #metadata;
  #questions;
  #navigation;
  #timer;

  constructor({
    id = null,
    examination,
    answers = [],
    started = false,
    completed = false,
    metadata = {},
    timer = null,
  } = {}) {
    if (!(examination instanceof Examination)) {
      throw new TypeError("Session examination must be an Examination");
    }

    this.#id = id;
    this.#examination = examination;
    this.#answers = normalizeSessionAnswers(answers);
    this.#started = started;
    this.#completed = completed;
    this.#metadata = metadata;

    this.#questions = this.#selectQuestions();
    this.#navigation = new SessionNavigation(this.#questions);
    this.#timer =
      timer instanceof SessionTimer
        ? timer
        : new SessionTimer(this.#examination.settings.timeTotal * 60);
  }

  #shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }

  #selectQuestions() {
    const selected = [];

    for (
      let subjectIndex = 0;
      subjectIndex < this.#examination.subjects.length;
      subjectIndex++
    ) {
      const subject = this.#examination.subjects.get(subjectIndex);

      for (
        let questionIndex = 0;
        questionIndex < subject.questions.length;
        questionIndex++
      ) {
        selected.push(
          new SessionQuestion({
            question: subject.questions.get(questionIndex),
            subjectIndex,
            questionIndex,
          }),
        );
      }
    }

    const { limit, randomSen } = this.#examination.settings;

    if (randomSen) {
      for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [selected[i], selected[j]] = [selected[j], selected[i]];
      }
    }

    const questions = limit === 0 ? selected : selected.slice(0, limit);

    return new SessionQuestionCollection(questions);
  }

  start() {
    if (this.#completed) {
      throw new SessionError("Cannot start a completed Session", {
        code: "SESSION_ALREADY_COMPLETED",
      });
    }

    this.#started = true;
    this.#timer.start();

    return this;
  }

  complete() {
    if (!this.#started) {
      throw new SessionError("Cannot complete a Session that has not started", {
        code: "SESSION_NOT_STARTED",
      });
    }

    this.#completed = true;
    this.#timer.stop();

    return this;
  }

  answer(subjectIndex, questionIndex, selection) {
    if (!this.#started) {
      throw new SessionError("Cannot answer a Session that has not started", {
        code: "SESSION_NOT_STARTED",
      });
    }

    if (this.#completed) {
      throw new SessionError("Cannot answer a completed Session", {
        code: "SESSION_ALREADY_COMPLETED",
      });
    }

    if (!Number.isInteger(subjectIndex) || subjectIndex < 0) {
      throw new TypeError(
        "Session subject index must be a non-negative integer",
      );
    }

    if (!Number.isInteger(questionIndex) || questionIndex < 0) {
      throw new TypeError(
        "Session question index must be a non-negative integer",
      );
    }

    const subject = this.#examination.subjects.get(subjectIndex);

    if (!subject) {
      throw new RangeError("Session subject index is out of range");
    }

    const question = subject.questions.get(questionIndex);

    if (!question) {
      throw new RangeError("Session question index is out of range");
    }

    if (!Array.isArray(this.#answers[subjectIndex])) {
      this.#answers[subjectIndex] = [];
    }

    this.#answers[subjectIndex][questionIndex] = Array.isArray(selection)
      ? [...selection]
      : selection;

    return this;
  }

  evaluate() {
    if (!this.#started) {
      throw new SessionError("Cannot evaluate a Session that has not started", {
        code: "SESSION_NOT_STARTED",
      });
    }

    const evaluation = evaluateExamination(this.#examination, this.#answers);

    const score = Score.fromEvaluation(evaluation);

    return score.toResult();
  }

  answerCurrent(selection) {
    const current = this.#navigation.current;

    if (!current) {
      throw new RangeError("Session has no current question");
    }

    return this.answer(current.subjectIndex, current.questionIndex, selection);
  }

  static fromJSON(data, examination) {
    if (data == null || typeof data !== "object" || Array.isArray(data)) {
      throw new TypeError("Session.fromJSON expects a data object");
    }

    if (!(examination instanceof Examination)) {
      throw new TypeError("Session.fromJSON expects an Examination");
    }

    if (
      data.examinationId !== undefined &&
      data.examinationId !== examination.id
    ) {
      throw new Error("Session examination id does not match");
    }

    return new Session({
      id: data.id ?? null,
      examination,
      answers: data.answers ?? [],
      started: data.started ?? false,
      completed: data.completed ?? false,
      metadata:
        data.metadata && typeof data.metadata === "object"
          ? { ...data.metadata }
          : {},
      timer:
        data.timer && typeof data.timer === "object"
          ? SessionTimer.fromJSON(data.timer)
          : null,
    });
  }

  toJSON() {
    return {
      id: this.#id,
      examinationId: this.#examination.id,
      answers: this.#answers.map((subjectAnswers) =>
        Array.isArray(subjectAnswers)
          ? subjectAnswers.map((selection) =>
              Array.isArray(selection) ? [...selection] : selection,
            )
          : subjectAnswers,
      ),
      started: this.#started,
      completed: this.#completed,
      metadata: this.#metadata,
      timer: this.#timer.toJSON(),
    };
  }

  get id() {
    return this.#id;
  }

  get examination() {
    return this.#examination;
  }

  get answers() {
    return this.#answers;
  }

  get questions() {
    return this.#questions.toArray();
  }

  get started() {
    return this.#started;
  }

  get completed() {
    return this.#completed;
  }

  get state() {
    if (this.#completed) {
      return SESSION_STATES.COMPLETED;
    }

    if (this.#started) {
      return SESSION_STATES.STARTED;
    }

    return SESSION_STATES.CREATED;
  }

  get metadata() {
    return this.#metadata;
  }

  get questionCount() {
    return this.#questions.length;
  }

  get navigation() {
    return this.#navigation;
  }

  get answeredCount() {
    let count = 0;

    for (const subjectAnswers of this.#answers) {
      if (!Array.isArray(subjectAnswers)) {
        continue;
      }

      for (const answer of subjectAnswers) {
        if (answer !== undefined && answer !== null) {
          count += 1;
        }
      }
    }

    return count;
  }

  get unansweredCount() {
    return this.questionCount - this.answeredCount;
  }

  get progress() {
    if (this.questionCount === 0) {
      return 0;
    }

    return (this.answeredCount / this.questionCount) * 100;
  }

  get timer() {
    return this.#timer;
  }
}

export default Session;
