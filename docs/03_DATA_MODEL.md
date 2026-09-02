# Data Model

## Canonical Model

Examination sử dụng một representation thống nhất sau normalization.

```text
Question
 ├── id
 ├── text
 ├── answers[]
 ├── correct[]
 └── metadata
```

Mỗi Answer:

```text
Answer
 ├── id
 ├── text
 └── metadata
```

## Answer

```js
new Answer({
  id: "a1",
  text: "Paris",
  metadata: {},
});
```

Properties:

```text
id        string
text      string
metadata  object
```

`Answer` bảo vệ dữ liệu nội bộ khỏi mutation trực tiếp.

## Question

```js
new Question({
  id: "q1",
  text: "Capital of France?",
  answers: [
    {
      id: "a1",
      text: "Paris",
    },
    {
      id: "a2",
      text: "London",
    },
  ],
  correct: ["a1"],
  metadata: {},
});
```

Properties:

```text
id        string
text      string
answers   Answer[]
correct   string[]
metadata  object
```

## Answer Identity

`id` là identity của Answer.

Ví dụ:

```js
{
  id: "a1",
  text: "Paris"
}
```

Text có thể được sử dụng để resolve actual answer trong evaluation, nhưng canonical result sử dụng Answer ID.

## Multiple Correct Answers

Question có thể có nhiều đáp án đúng:

```js
correct: ["a1", "a3"];
```

Compare không phụ thuộc thứ tự:

```text
["a1", "a3"]
=
["a3", "a1"]
```

## Result

Result đại diện cho một lần đánh giá:

```js
{
  status: "correct",
  expected: ["a1"],
  actual: ["a1"],
  correct: true
}
```

Status hợp lệ:

```text
correct
incorrect
unanswered
```

## Summary

Summary tổng hợp Result:

```js
{
  total: 10,
  correct: 7,
  incorrect: 2,
  unanswered: 1
}
```

## Score

Score được tạo từ Summary:

```js
{
  points: 7,
  percentage: 70
}
```

## Serialization

Các model hỗ trợ `toJSON()` để tạo canonical plain data.

Ví dụ:

```js
question.toJSON();
result.toJSON();
summary.toJSON();
score.toJSON();
```

## Data Protection

Các collection getter trả về bản sao thay vì cho phép mutation trực tiếp internal state.

Ví dụ:

```js
question.answers;
question.correct;
question.metadata;
```

Consumer không nên dựa vào việc mutate trực tiếp model.

## Model Flow

```text
Answer
   │
   ▼
Question
   │
   ▼
Evaluate
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

## Scope

Data model hiện tại tập trung vào:

- Question
- Answer
- Result
- Summary
- Score

Các khái niệm như Session, timer, navigation hoặc UI state không phải canonical model của core hiện tại.
