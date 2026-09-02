# @vngamemini/examination

Data processing engine for web examinations.

`@vngamemini/examination` là thư viện JavaScript tập trung vào **chuẩn hóa, kiểm tra, đánh giá và tính kết quả dữ liệu bài kiểm tra**.

Thư viện được thiết kế để làm core processing layer cho các ứng dụng examination/quiz như `Check`.

---

## Architecture

Examination sử dụng một pipeline thống nhất:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ├── COMPARE
  └── RESULT
  ↓
SUMMARY
  ↓
SCORE
```

Mỗi layer có một trách nhiệm rõ ràng và có thể được kiểm thử độc lập.

---

## Installation

```bash
npm install @vngamemini/examination
```

---

## Quick Start

```js
import Examination from "@vngamemini/examination";

const exam = new Examination();

const result = exam.run(
  [
    {
      id: "q1",
      text: "2 + 2 = ?",
      answers: [
        { id: "a1", text: "3" },
        { id: "a2", text: "4" },
        { id: "a3", text: "5" },
      ],
      correct: ["a2"],
    },
  ],
  ["a2"],
);

console.log(result.summary);
console.log(result.score);
```

Kết quả gồm:

```js
{
  results: [...],
  summary: {
    total: 1,
    correct: 1,
    incorrect: 0,
    unanswered: 0
  },
  score: {
    points: 1,
    percentage: 100
  }
}
```

---

## Core Models

### Answer

Đại diện cho một lựa chọn trả lời.

```js
const answer = new Answer({
  id: "a1",
  text: "Answer",
});
```

Properties:

```text
id
text
metadata
```

---

### Question

Đại diện cho một câu hỏi.

```js
const question = new Question({
  id: "q1",
  text: "Question",
  answers: [
    {
      id: "a1",
      text: "Answer A",
    },
    {
      id: "a2",
      text: "Answer B",
    },
  ],
  correct: ["a2"],
});
```

Properties:

```text
id
text
answers
correct
metadata
```

---

### Result

Đại diện cho kết quả đánh giá một câu hỏi.

Các trạng thái:

```js
Result.STATUS.CORRECT;
Result.STATUS.INCORRECT;
Result.STATUS.UNANSWERED;
```

Result chứa:

```text
status
expected
actual
correct
```

---

### Summary

Tổng hợp nhiều `Result`.

```js
const summary = summarize(results);
```

Kết quả:

```js
{
  (total, correct, incorrect, unanswered);
}
```

---

### Score

Tính điểm từ `Summary`.

```js
const score = score(summary);
```

Kết quả:

```js
{
  (points, percentage);
}
```

---

## Processing API

### normalize

Chuẩn hóa dữ liệu đầu vào thành `Question`.

```js
const questions = normalize(input);
```

---

### validate

Kiểm tra dữ liệu đã chuẩn hóa.

```js
validate(questions);
```

Nếu dữ liệu không hợp lệ, `ValidationError` được ném ra.

---

### compare

So sánh đáp án mong đợi với đáp án thực tế.

```js
const correct = compare(question, actual);
```

So sánh theo tập giá trị:

- Không phụ thuộc thứ tự.
- Loại bỏ giá trị trùng.
- Hỗ trợ một hoặc nhiều đáp án.

---

### evaluate

Đánh giá một câu hỏi.

```js
const result = evaluate(question, actual);
```

---

### summarize

Tổng hợp các kết quả.

```js
const summary = summarize(results);
```

---

### score

Tính điểm từ summary.

```js
const scoreResult = score(summary);
```

---

## Examination

`Examination` cung cấp facade thống nhất cho toàn bộ pipeline.

```js
const exam = new Examination();
```

Các phương thức:

```text
normalize()
validate()
evaluate()
evaluateCollection()
summary()
score()
run()
```

Trong đó:

```js
exam.run(input, answers);
```

thực hiện:

```text
normalize
    ↓
validate
    ↓
evaluate
    ↓
summary
    ↓
score
```

---

## Public API

Package public API gồm:

```js
Answer
Examination
Question
Result
Score
Summary

ValidationError

normalize
validate
compare
evaluate
summarize
score

default
```

`default` export chính là `Examination`.

---

## Responsibility Boundary

Examination chỉ xử lý **dữ liệu examination**.

Các trách nhiệm sau thuộc application sử dụng thư viện:

```text
UI
Navigation
Timer
Randomization
Application state
Events
Persistence
Routing
Rendering
User interaction
```

Ví dụ:

```text
Check
  │
  └── Examination
        │
        ├── Normalize
        ├── Validate
        ├── Evaluate
        ├── Summary
        └── Score
```

Dependency luôn đi theo hướng:

```text
Application → Examination
```

Examination không phụ thuộc vào application.

---

## Design Principles

### Single Processing Flow

Mọi dữ liệu đi qua pipeline thống nhất.

### Separation of Responsibility

Mỗi module chỉ xử lý một trách nhiệm chính.

### Immutable Public Data

Các model không cho phép thay đổi trực tiếp state nội bộ thông qua getter.

### Explicit Contracts

Public API và data model được định nghĩa rõ ràng.

### Independent Testing

Các layer có thể được kiểm thử độc lập.

### Extensible Architecture

Tính năng mới phải được thêm vào đúng layer thay vì tạo thêm một processing flow riêng.

---

## Project Structure

```text
src/
├── answer/
│   └── Answer.js
├── question/
│   └── Question.js
├── result/
│   └── Result.js
├── summary/
│   ├── Summary.js
│   └── summarize.js
├── score/
│   ├── Score.js
│   └── score.js
├── normalize/
│   ├── normalize.js
│   ├── normalizeAnswer.js
│   └── normalizeQuestion.js
├── validate/
│   ├── validate.js
│   ├── validateAnswer.js
│   └── validateQuestion.js
├── compare/
│   ├── compare.js
│   └── compareAnswer.js
├── evaluate/
│   └── evaluate.js
├── errors/
│   └── ValidationError.js
├── examination/
│   └── Examination.js
└── index.js
```

---

## Documentation

Architecture và contract chi tiết nằm trong thư mục [`docs/`](./docs/).

Các tài liệu quan trọng:

```text
00_OVERVIEW.md
01_ARCHITECTURE.md
02_DATA_PIPELINE.md
03_DATA_MODEL.md
04_NORMALIZER.md
05_VALIDATOR.md
06_QUESTION_TYPES.md
07_COMPARE.md
08_SESSION.md
09_STATE_AND_EVENTS.md
10_SETTINGS_AND_POLICY.md
11_TIME_AND_RANDOM.md
12_SCORE_AND_RESULT.md
13_CHECK_INTEGRATION.md
14_API_DESIGN.md
15_EXTENSIBILITY.md
16_WORKFLOW.md
17_RULES.md
CONTRACT.md
```

Các tài liệu về Session, State, Time và Random hiện mô tả **boundary/out-of-core**, không phải API của Examination 0.1.x.

---

## Development

Chạy test:

```bash
npm test
```

Kiểm tra package:

```bash
npm pack --dry-run
```

Kiểm tra whitespace:

```bash
git diff --check
```

---

## Version

Current contract:

```text
0.1.x
```

Public API chỉ nên thay đổi khi contract và test suite được cập nhật tương ứng.

---

## License

MIT
