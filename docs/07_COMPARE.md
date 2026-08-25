# Compare

## Mục đích

`Compare` là bộ phận chuyên phân tích câu trả lời.

Nó không chịu trách nhiệm UI.

```text
Expected Answer
      +
User Answer
      │
      ▼
   Compare
      │
      ▼
 AnswerResult
```

## API thống nhất

Khái niệm chính:

```js
Compare.evaluate(question, userAnswer)
```

## Single

```js
expected = 1
actual = 1
```

Kết quả:

```js
{
  correct: true,
  selected: 1,
  expected: 1
}
```

## Multiple

```js
expected = [1, 3]
actual = [1, 3]
```

Kết quả:

```js
{
  correct: true
}
```

## Boolean

```js
expected = true
actual = false
```

Kết quả:

```js
{
  correct: false
}
```

## Text

```js
expected = "HTML"
actual = "html"
```

Việc có coi hai chuỗi là giống nhau hay không phụ thuộc comparison policy.

## Nguyên tắc

Compare chỉ phân tích Answer.

Không để Compare xử lý:

- navigation
- timer
- rendering
- DOM
- React
- toàn bộ exam state

## Hai mức phân tích

Nếu cần API cấp thấp, Compare có thể cung cấp các phép so sánh dữ liệu như:

```js
Compare.answer(...)
Compare.index(...)
```

Nhưng mục tiêu chính vẫn là đánh giá câu trả lời của Question.
