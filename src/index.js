import Examination from "./examination/Examination.js";

export { default as Answer } from "./answer/Answer.js";
export { default as Question } from "./question/Question.js";

export { default as normalize } from "./normalize/normalize.js";
export { default as normalizeAnswer } from "./normalize/normalizeAnswer.js";
export { default as normalizeQuestion } from "./normalize/normalizeQuestion.js";

export { default as validate } from "./validate/validate.js";
export { default as validateAnswer } from "./validate/validateAnswer.js";
export { default as validateQuestion } from "./validate/validateQuestion.js";

export { default as compare } from "./compare/compare.js";
export { default as compareAnswer } from "./compare/compareAnswer.js";

export { default as Result } from "./result/Result.js";
export { default as evaluate } from "./evaluate/evaluate.js";

export { default as ValidationError } from "./errors/ValidationError.js";

export { Examination };
export default Examination;
