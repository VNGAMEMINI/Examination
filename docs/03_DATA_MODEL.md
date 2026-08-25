# Data Model

## Exam

```js
{
  meta: {
    id: "english-test",
    name: "English Test",
    version: "1.0.0"
  },

  settings: {},

  subjects: []
}
```

## Subject

```js
{
  id: "english",
  name: "Tiếng Anh",
  questions: []
}
```

## Question

```js
{
  id: "en-001",
  type: "single",

  content: {
    text: "We ........ from the USA.",
    image: null
  },

  answers: [
    "is",
    "are",
    "being",
    "be"
  ],

  correct: 1
}
```

## Input alias và Internal Model

Input:

```js
{
  q: "...",
  a: ["A", "B", "C"],
  c: 1
}
```

Internal:

```js
{
  question: "...",
  answers: ["A", "B", "C"],
  correct: 1
}
```

`a` là cách viết input.

`answers` là tên chuẩn trong Internal Model.

## Answer identity

Khi hệ thống cần random đáp án, index hiển thị có thể thay đổi.

Vì vậy về lâu dài Answer nên có identity riêng:

```js
{
  id: "a2",
  text: "are"
}
```

và đáp án đúng có thể tham chiếu bằng ID:

```js
correct: ["a2"]
```

Normalizer có thể chuyển format index-based của input sang identity-based Internal Model.

Điều này giúp random không làm mất đáp án đúng.
