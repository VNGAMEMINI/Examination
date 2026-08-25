# Architecture

## Tổng quan

```text
                         Examination
                              │
              ┌───────────────┼───────────────┐
              │               │               │
             Data          Settings          Model
              │               │               │
      Parser/Normalize     Policy      Subject/Question
          Validator                     /Answer
              │               │               │
              └───────────────┼───────────────┘
                              │
                           Session
                              │
                 ┌────────────┼────────────┐
                 │            │            │
               Random        Time         State
                 │            │            │
                 └────────────┼────────────┘
                              │
                         User Answer
                              │
                              ▼
                           Type
                              │
                              ▼
                           Compare
                              │
                              ▼
                      AnswerResult
                              │
                              ▼
                            Score
                              │
                              ▼
                         ExamResult
                              │
                              ▼
                            Check
```

## Các lớp logic chính

### Data

Tiếp nhận dữ liệu đầu vào.

### Parser

Chuyển dữ liệu dạng string thành JavaScript data khi cần.

### Normalizer

Chuyển nhiều cách viết input về một Internal Model thống nhất.

Ví dụ:

```js
{
  q: "2 + 2 = ?",
  a: ["3", "4", "5"],
  c: 1
}
```

được chuẩn hóa thành:

```js
{
  question: "2 + 2 = ?",
  answers: ["3", "4", "5"],
  correct: 1
}
```

### Validator

Chỉ kiểm tra Internal Model sau khi Normalize.

### Model

Đại diện cho:

- Examination
- Subject
- Question
- Answer

### Session

Đại diện cho một lần làm bài cụ thể.

### Compare

Chỉ tập trung vào việc đánh giá Answer.

### Score

Tổng hợp kết quả thành điểm.

### Result

Chứa dữ liệu kết quả, không render UI.

## Nguyên tắc Session

Một Examination có thể tạo nhiều Session:

```text
Examination
 ├── Session A
 ├── Session B
 └── Session C
```

Đề gốc không được biến thành trạng thái của một người dùng cụ thể.
