# Examination Workflow

## Toàn bộ vòng đời

```text
             RAW DATA
                │
                ▼
              Parser
                │
                ▼
            Normalizer
                │
                ▼
             Validator
                │
                ▼
        Internal Examination
                │
                ▼
        createSession()
                │
                ▼
              READY
                │
              start()
                ▼
             RUNNING
                │
                ▼
          currentQuestion
                │
                ▼
          user selects answer
                │
                ▼
          session.answer()
                │
                ▼
             Compare
                │
                ▼
          AnswerResult
                │
          ┌─────┴─────┐
          │           │
       autoNext     stay
          │           │
          └─────┬─────┘
                ▼
             Next
                │
                ▼
          ... questions ...
                │
                ▼
           session.submit()
                │
                ▼
              Score
                │
                ▼
           ExamResult
                │
                ▼
              Check
                │
                ▼
               UI
```

## Hai thời điểm đánh giá

### Đánh giá từng câu

```js
session.answer(value)
```

Có thể trả `AnswerResult` ngay.

### Đánh giá toàn bài

```js
session.submit()
```

Tạo `ExamResult`.

## Free / Practice

Có thể hiển thị AnswerResult ngay:

```text
Chọn đáp án
    ↓
Compare
    ↓
✓ Đúng
```

## Exam

Examination vẫn có thể đánh giá ngay, nhưng Check có thể không tiết lộ:

```text
Chọn đáp án
    ↓
Compare
    ↓
AnswerResult
    ↓
Không hiển thị
    ↓
Submit
    ↓
ExamResult
```

Điều này giữ logic đánh giá trong Examination nhưng không khóa cách UI sử dụng kết quả.
