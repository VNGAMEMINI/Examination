# Question Types

Question Type xác định cách một câu hỏi nhận và đánh giá đáp án.

## Single

Một đáp án đúng.

```js
{
  type: "single",
  answers: ["A", "B", "C", "D"],
  correct: 1
}
```

User answer:

```js
1
```

## Multiple

Nhiều đáp án đúng.

```js
{
  type: "multiple",
  answers: ["A", "B", "C", "D"],
  correct: [0, 2]
}
```

User answer:

```js
[0, 2]
```

## Boolean

```js
{
  type: "boolean",
  correct: true
}
```

User answer:

```js
false
```

## Text

```js
{
  type: "text",
  correct: "HTML"
}
```

User answer:

```js
"html"
```

Cách so sánh phụ thuộc policy của type.

## Mở rộng

Kiến trúc phải cho phép thêm:

- number
- matching
- ordering
- fill
- custom

Không nên hard-code toàn bộ logic vào Session.

```text
Question
   │
   ▼
Type
   │
   ▼
Compare
```
