# Normalizer

## Mục đích

Normalizer chuyển input có cấu trúc khác nhau thành canonical model của Examination.

```text
Input
  ↓
normalize()
  ↓
Question[]
```

Normalizer không:

* validate dữ liệu cuối cùng
* evaluate câu trả lời
* compare đáp án
* tính score
* quản lý session
* quản lý time
* randomize câu hỏi hoặc đáp án
* quản lý UI

## Public API

```js
import normalize from "@vngamemini/examination/normalize";
```

Hoặc thông qua `Examination`:

```js
const exam = new Examination();

const questions = exam.normalize(input);
```

## Input Types

### Question

Nếu input đã là `Question`:

```js
const questions = normalize(question);
```

Kết quả là:

```text
Question[]
```

với Question được đặt trong array.

### Array

```js
normalize([
  question1,
  question2
]);
```

Mỗi phần tử được chuyển qua `normalizeQuestion()`.

### Object

Object có property `questions`:

```js
normalize({
  questions: [
    {
      id: "q1",
      text: "Capital of France?",
      answers: [
        { id: "a1", text: "Paris" }
      ],
      correct: "a1"
    }
  ]
});
```

### Invalid / Unsupported Input

Input không phải object, array hoặc Question sẽ cho:

```js
[]
```

Ví dụ:

```js
normalize(null);
normalize(undefined);
normalize("invalid");
```

## Question Normalization

Raw Question:

```js
{
  id: "q1",
  text: "Capital of France?",
  answers: [
    { id: "a1", text: "Paris" }
  ],
  correct: "a1"
}
```

được chuyển thành:

```text
Question
 ├── id
 ├── text
 ├── answers[]
 │    └── Answer
 ├── correct[]
 └── metadata
```

## Question ID

Nếu `id` không tồn tại:

```js
{
  text: "Question"
}
```

Normalizer tạo:

```text
q0
```

Với question ở index `2`:

```text
q2
```

Nếu `id` tồn tại, giá trị được chuyển thành string.

```js
{
  id: 10
}
```

trở thành:

```text
"10"
```

## Question Text

Nếu `text` là:

* `undefined`
* `null`

thì trở thành:

```text
""
```

Các giá trị khác được chuyển thành string.

## Answer Normalization

Mỗi answer được chuyển thành `Answer`.

### String

```js
"Paris"
```

trở thành:

```js
{
  id: "a0",
  text: "Paris"
}
```

### Object

```js
{
  id: 1,
  text: "Paris"
}
```

trở thành:

```text
Answer
id   → "1"
text → "Paris"
```

### Answer ID

Nếu không có ID, ID được tạo dựa trên index:

```text
a0
a1
a2
...
```

### Answer Text

Nếu text là `null` hoặc `undefined`:

```text
""
```

Các giá trị khác được chuyển thành string.

## Correct Normalization

`correct` có thể là một giá trị:

```js
correct: "a1"
```

hoặc array:

```js
correct: ["a1", "a2"]
```

Một giá trị đơn được chuyển thành array.

```text
"a1"
 ↓
["a1"]
```

### Numeric Correct Value

Nếu `correct` là number, nó được hiểu là answer index.

```js
correct: 1
```

Nếu answer tại index `1` tồn tại:

```text
correct → ["a1"]
```

Nếu không tồn tại:

```text
correct → ["a1"]
```

Giá trị được tạo từ index vẫn được giữ để Validation phát hiện answer không tồn tại.

## Metadata

Metadata hợp lệ phải là object.

```js
metadata: {
  category: "geography"
}
```

được copy thành object mới.

Nếu metadata là:

* `null`
* array
* primitive

thì trở thành:

```js
{}
```

## Responsibility Boundary

Normalizer chịu trách nhiệm:

```text
Raw Input
   ↓
Canonical Question[]
```

Validator chịu trách nhiệm xác định canonical data có hợp lệ hay không.

Do đó:

```text
normalize()
    ↓
validate()
```

là thứ tự chuẩn của pipeline.

## Source Files

```text
src/normalize/
├── normalize.js
├── normalizeQuestion.js
└── normalizeAnswer.js
```

Mỗi file có một trách nhiệm:

```text
normalize.js
    → entry point

normalizeQuestion.js
    → Question normalization

normalizeAnswer.js
    → Answer normalization
```

## Nguyên tắc

Normalizer phải:

1. tạo canonical model
2. giữ flow đơn giản
3. không chứa business logic của consumer
4. không phụ thuộc UI
5. không quản lý session
6. không quản lý timer
7. không randomize dữ liệu
8. không tính điểm
