# Check Integration

## 1. Mục đích

`Check` là ứng dụng sử dụng Examination để xử lý dữ liệu bài kiểm tra.

Dependency:

```text
Check
  ↓
Examination
```

Examination không phụ thuộc vào Check.

---

## 2. Trách nhiệm của Check

Check chịu trách nhiệm về application và UI:

```text
- hiển thị câu hỏi
- nhận lựa chọn của người dùng
- quản lý câu hỏi hiện tại
- chuyển câu hỏi
- quay lại câu hỏi
- quản lý thời gian
- random câu hỏi
- random đáp án
- quản lý trạng thái giao diện
- submit bài kiểm tra
- hiển thị kết quả
```

Examination không xử lý các chức năng trên.

---

## 3. Trách nhiệm của Examination

Examination chỉ xử lý dữ liệu:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ↓
SUMMARY
  ↓
SCORE
```

Cụ thể:

```text
normalize
validate
evaluate
compare
summarize
score
```

---

## 4. Luồng dữ liệu

Check cung cấp dữ liệu bài kiểm tra cho Examination.

```text
Quiz Data
   ↓
Examination
   ↓
Question[]
```

Khi người dùng hoàn thành bài:

```text
Question[]
   +
Actual Answers[]
   ↓
Examination
   ↓
{
  results,
  summary,
  score
}
```

---

## 5. Ví dụ tích hợp

Ví dụ sử dụng public API:

```js
import Examination from "@vngamemini/examination";

const examination = new Examination();

const result = examination.run(quiz, answers);

console.log(result.results);
console.log(result.summary);
console.log(result.score);
```

Examination không cần biết dữ liệu này đến từ component, form, page hay application nào.

---

## 6. Answer từ Check

Check có thể lưu lựa chọn của người dùng theo ID đáp án:

```js
const answers = ["a1", "a3", "a2"];
```

Examination sẽ xử lý và đối chiếu với đáp án đúng của từng `Question`.

Check không cần tự triển khai thuật toán so sánh.

---

## 7. Evaluation

Khi cần đánh giá một câu riêng lẻ:

```js
const result = examination.evaluate(question, actual);
```

Kết quả là một `Result`.

```js
{
  (status, expected, actual, correct);
}
```

---

## 8. Chạy toàn bộ bài kiểm tra

Để xử lý toàn bộ bài:

```js
const output = examination.run(quiz, answers);
```

Kết quả:

```js
{
  (results, summary, score);
}
```

Trong đó:

```text
results → Result[]
summary → Summary
score   → Score
```

---

## 9. Không tạo application state trong Examination

Examination không lưu trạng thái của giao diện hoặc phiên làm bài.

Ví dụ các trạng thái sau thuộc Check:

```text
current question
selected answers
current page
navigation state
timer state
submitted state
```

Nếu Check cần lưu các dữ liệu này, Check tự quản lý.

---

## 10. Time và Random

Timer và randomization không thuộc Examination core.

Check có thể quyết định:

```text
- thời gian làm bài
- có random câu hỏi hay không
- có random đáp án hay không
```

Sau khi Check tạo ra dữ liệu đầu vào cuối cùng, Examination chỉ xử lý dữ liệu đó.

---

## 11. Application mode

Các chế độ của ứng dụng như:

```text
free
exam
practice
challenge
```

không phải responsibility của Examination.

Check có thể sử dụng các mode để quyết định cách ứng dụng hoạt động, sau đó truyền dữ liệu phù hợp cho Examination.

---

## 12. Dependency boundary

Kiến trúc đúng:

```text
┌─────────────────────┐
│        Check        │
│                     │
│ UI                  │
│ Application State   │
│ Navigation          │
│ Timer               │
│ Randomization       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Examination      │
│                     │
│ Normalize           │
│ Validate            │
│ Evaluate            │
│ Compare             │
│ Summary             │
│ Score               │
└─────────────────────┘
```

Không được tạo dependency ngược:

```text
Examination
     ✕
      ↓
     Check
```

---

## 13. Public API được sử dụng

Check chỉ cần sử dụng public API của package:

```text
Examination
Answer
Question
Result
Summary
Score
ValidationError

normalize
validate
compare
evaluate
summarize
score
```

Không truy cập implementation nội bộ của package.

---

## 14. Nguyên tắc tích hợp

Khi Check cần chức năng mới:

1. Xác định chức năng thuộc application hay data engine.
2. Nếu thuộc UI/application, triển khai ở Check.
3. Nếu thuộc data processing, xem xét Examination.
4. Không đưa application state vào Examination chỉ để tiện tích hợp.
5. Không tạo API mới nếu pipeline hiện tại đã đáp ứng yêu cầu.

Mục tiêu là giữ Examination nhỏ, ổn định và có thể tái sử dụng cho nhiều ứng dụng khác ngoài Check.
