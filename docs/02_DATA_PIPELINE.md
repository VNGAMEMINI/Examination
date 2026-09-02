# Data Pipeline

## Pipeline

Examination xử lý dữ liệu theo một flow thống nhất:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ↓
RESULT
  ↓
SUMMARY
  ↓
SCORE
```

## 1. Input

Input là dữ liệu do consumer cung cấp.

Ví dụ:

```js
{
  questions: [
    {
      id: "q1",
      text: "Capital of France?",
      answers: [
        { id: "a1", text: "Paris" },
        { id: "a2", text: "London" }
      ],
      correct: "a1"
    }
  ]
}
```

## 2. Normalize

```js
const questions = exam.normalize(input);
```

Normalizer chuyển dữ liệu thành các `Question` instance.

Ví dụ:

```text
raw object
   ↓
Question
   ├── Answer
   ├── Answer
   └── correct
```

Normalization không thực hiện scoring hoặc evaluation.

## 3. Validate

```js
exam.validate(questions);
```

Validation chỉ nhận canonical model.

Các vấn đề về:

* Question type
* Answer type
* empty id
* duplicate answer id
* unknown correct answer

được phát hiện ở bước này.

Invalid data tạo `ValidationError`.

## 4. Evaluate

```js
const result = exam.evaluate(question, actual);
```

Evaluate xử lý một Question.

```text
Question
   +
Actual
   ↓
Evaluate
   ↓
Result
```

Actual answer có thể được resolve từ answer ID hoặc answer text.

## 5. Evaluate Collection

```js
const results = exam.evaluateCollection(
  questions,
  answers
);
```

Mỗi Question tương ứng với một actual answer.

Nếu answer không tồn tại tại index tương ứng, Question được đánh giá là `unanswered`.

## 6. Summary

```js
const summary = exam.summary(results);
```

Summary tổng hợp:

```text
Result[]
   ↓
Summary
```

## 7. Score

```js
const score = exam.score(summary);
```

Score được tính từ số câu đúng và tổng số câu.

```text
Summary
 ├── correct
 └── total
       ↓
     Score
```

## 8. Complete Flow

```js
const result = exam.run(input, answers);
```

Tương đương về mặt xử lý với:

```js
const questions = exam.normalize(input);

exam.validate(questions);

const results = exam.evaluateCollection(
  questions,
  answers
);

const summary = exam.summary(results);

const score = exam.score(summary);
```

Kết quả:

```js
{
  results,
  summary,
  score
}
```

## Pipeline Invariants

Các nguyên tắc phải được giữ:

```text
Normalize → Validate
```

Không đảo ngược hai bước.

```text
Evaluate → Result
```

Evaluate không trả UI state.

```text
Result[] → Summary
```

Summary không tự đánh giá câu trả lời.

```text
Summary → Score
```

Score không tự chấm lại Question.

## Consumer Boundary

Consumer chịu trách nhiệm cho:

```text
UI
Navigation
Timer
Randomization
Application State
Session
```

Examination chịu trách nhiệm cho:

```text
Normalization
Validation
Evaluation
Comparison
Result
Summary
Score
```
