# Session

## Mục đích

`Session` đại diện cho một lần làm bài.

```js
const exam = new Examination(data)

const session = exam.createSession({
  candidate: "Nguyen Van A"
})
```

## Examination và Session

```text
Examination
   │
   ├── Session A
   ├── Session B
   └── Session C
```

Examination chứa đề và cấu hình.

Session chứa trạng thái của một người đang làm bài.

## Session data

Một Session có thể quản lý:

- candidate
- current question
- user answers
- start time
- remaining time
- state
- answer results
- final result

## Trả lời

```js
const result = session.answer(1)
```

`answer()` xử lý một câu và có thể trả kết quả ngay.

## Submit

```js
const result = session.submit()
```

`submit()` hoàn tất bài và tạo ExamResult.

## Không trộn answer và submit

```text
answer()
  = xử lý một câu

submit()
  = hoàn tất toàn bộ bài
```
