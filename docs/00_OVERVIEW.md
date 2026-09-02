# Examination Overview

## Mục đích

Examination là thư viện JavaScript xử lý dữ liệu và logic đánh giá cho các hệ thống:

* examination
* quiz
* practice
* assessment

Examination tập trung vào **data processing**, không phụ trách giao diện hoặc vòng đời UI.

## Core Pipeline

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

Trong quá trình `EVALUATE`, Examination sử dụng `COMPARE` để xác định câu trả lời có chính xác hay không.

```text
Question + Actual Answer
          │
          ▼
       Evaluate
          │
          ├── Compare
          │
          ▼
        Result
```

## Core Models

```text
Answer
   │
   ▼
Question
   │
   ▼
Result
   │
   ▼
Summary
   │
   ▼
Score
```

### Answer

Đại diện cho một đáp án chuẩn hóa.

```js
new Answer({
  id: "a1",
  text: "Paris"
});
```

### Question

Đại diện cho một câu hỏi cùng các đáp án và đáp án đúng.

```js
new Question({
  id: "q1",
  text: "What is the capital of France?",
  answers: [
    { id: "a1", text: "Paris" },
    { id: "a2", text: "London" }
  ],
  correct: ["a1"]
});
```

### Result

Đại diện cho kết quả đánh giá của một câu hỏi.

Các trạng thái:

```text
correct
incorrect
unanswered
```

### Summary

Tổng hợp các `Result`:

```text
total
correct
incorrect
unanswered
```

### Score

Tính điểm từ `Summary`:

```text
points
percentage
```

## Processing Functions

Examination cung cấp các tầng xử lý độc lập:

```js
normalize(input);
validate(input);
compare(question, actual);
evaluate(question, actual);
summarize(results);
score(summary);
```

## Examination

`Examination` cung cấp một interface thống nhất cho pipeline:

```js
const exam = new Examination();

const result = exam.run(input, answers);
```

`run()` thực hiện:

```text
normalize
   ↓
validate
   ↓
evaluateCollection
   ↓
summary
   ↓
score
```

Kết quả:

```js
{
  results,
  summary,
  score
}
```

## Không thuộc Core

Các trách nhiệm sau không thuộc Examination core hiện tại:

* UI
* DOM
* React
* Vue
* rendering
* navigation
* timer
* randomization
* application state
* session management
* consumer settings

Consumer có thể xây dựng các chức năng này bên ngoài Examination.

## Design Principle

> Examination xử lý dữ liệu và logic đánh giá. Consumer quyết định cách sử dụng và hiển thị dữ liệu đó.
