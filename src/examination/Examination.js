import normalize from "../normalize/normalize.js";
import validate from "../validate/validate.js";
import evaluate from "../evaluate/evaluate.js";

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
}
