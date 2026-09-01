import normalize from "../normalize/normalize.js";
import validate from "../validate/validate.js";
import evaluate, {
  evaluateCollection,
} from "../evaluate/evaluate.js";
import summarize from "../summary/summarize.js";
import score from "../score/score.js";

export default class Examination {
  normalize(input) {
    return normalize(input);
  }

  validate(input) {
    return validate(input);
  }

  evaluate(question, actual) {
    return evaluate(question, actual);
  }

  evaluateCollection(questions, answers = []) {
    return evaluateCollection(questions, answers);
  }

  summary(results) {
    return summarize(results);
  }

  score(summary) {
    return score(summary);
  }

  run(input, answers = []) {
    const questions = this.normalize(input);

    this.validate(questions);

    const results = this.evaluateCollection(
      questions,
      answers
    );

    const summary = this.summary(results);
    const score = this.score(summary);

    return {
      results,
      summary,
      score,
    };
  }
}
