# Score & Result

## AnswerResult

Kết quả của một câu:

```js
{
  status: "evaluated",
  correct: true,
  selected: 1,
  expected: 1,
  score: {
    earned: 1,
    max: 1
  }
}
```

Đây là kết quả của **một câu**.

## ExamResult

Kết quả của toàn bộ Session:

```js
{
  candidate: "Nguyen Van A",

  total: 20,
  answered: 18,
  correct: 15,
  wrong: 3,
  unanswered: 2,

  score: 7.5,
  percentage: 75
}
```

## Score

Score tổng hợp các AnswerResult.

```text
AnswerResult
   │
   ├── correct
   ├── wrong
   └── score
          │
          ▼
       Score
          │
          ▼
      ExamResult
```

## Result không render UI

Không có:

```js
result.show()
result.render()
```

Chỉ có dữ liệu.

Check có thể hiển thị:

```text
75 / 100
15 đúng
3 sai
2 bỏ qua
```

hoặc bất kỳ giao diện nào khác.
