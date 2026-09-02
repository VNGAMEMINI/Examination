# Workflow

## 1. Mục đích

Workflow của Examination mô tả cách dữ liệu đi qua toàn bộ processing pipeline.

Pipeline chỉ có một luồng chính:

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
  ↓
OUTPUT
```

Mỗi bước có một responsibility rõ ràng.

---

## 2. Tổng quan

```text
                ┌─────────────┐
                │    INPUT    │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │  NORMALIZE  │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │   VALIDATE  │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │   EVALUATE  │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │   SUMMARY   │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │    SCORE    │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │    OUTPUT   │
                └─────────────┘
```

---

## 3. Input

Input có thể là dữ liệu quiz thô.

Ví dụ:

```js
const quiz = {
  questions: [
    {
      id: "q1",
      text: "2 + 2 = ?",
      answers: [
        { id: "a1", text: "3" },
        { id: "a2", text: "4" },
      ],
      correct: "a2",
    },
  ],
};
```

Answers được cung cấp riêng:

```js
const answers = ["a2"];
```

Examination không yêu cầu consumer phải tạo `Question` trước.

---

## 4. Normalize

Input được đưa qua:

```js
normalize(input);
```

Kết quả:

```text
Question[]
```

Mục tiêu:

```text
External data
     ↓
Canonical Question model
```

Normalize chịu trách nhiệm chuyển đổi format.

Không đánh giá đúng/sai ở bước này.

---

## 5. Validate

Sau Normalize:

```js
validate(questions);
```

Validation kiểm tra canonical data.

Các invariant chính:

```text
Question instance
Question id
Question text
Answer instance
Answer id
Answer text
Answer metadata
Question metadata
Duplicate answer id
Correct answer reference
```

Nếu dữ liệu không hợp lệ:

```text
ValidationError
```

Pipeline dừng tại đây.

---

## 6. Evaluate

Sau khi validation thành công:

```js
evaluateCollection(questions, answers);
```

Mỗi Question được đánh giá:

```text
Question
   +
Actual answer
   ↓
Evaluate
   ↓
Compare
   ↓
Result
```

Kết quả:

```text
Result[]
```

---

## 7. Compare

Evaluate sử dụng:

```js
compare(question, actual);
```

Compare kiểm tra:

```text
expected === actual
```

theo semantics của selection set.

Các lựa chọn:

- không phụ thuộc thứ tự
- loại duplicate
- scalar được chuyển thành collection
- giá trị được chuẩn hóa thành string

Compare chỉ trả về:

```text
true
```

hoặc:

```text
false
```

Nó không tạo `Result`.

---

## 8. Result

Evaluate tạo:

```text
Result
```

Contract:

```js
{
  (status, expected, actual, correct);
}
```

Các status:

```text
correct
incorrect
unanswered
```

Một Question tương ứng với một Result trong collection evaluation.

---

## 9. Summary

Sau khi có toàn bộ Result:

```js
summarize(results);
```

Kết quả:

```text
Summary
```

Summary chứa:

```js
{
  (total, correct, incorrect, unanswered);
}
```

Summary không đánh giá lại câu hỏi.

Nó chỉ tổng hợp kết quả đã có.

---

## 10. Score

Sau Summary:

```js
score(summary);
```

Kết quả:

```text
Score
```

Contract:

```js
{
  (points, percentage);
}
```

Điểm hiện tại:

```text
points = summary.correct
```

Phần trăm:

```text
percentage =
  summary.correct / summary.total × 100
```

Nếu `total === 0`:

```text
percentage = 0
```

---

## 11. Output

Kết quả cuối cùng của:

```js
examination.run(input, answers);
```

là:

```js
{
  (results, summary, score);
}
```

Cấu trúc:

```text
output
├── results → Result[]
├── summary → Summary
└── score   → Score
```

---

## 12. Examination.run

`run()` là facade cấp cao nhất.

Implementation flow:

```text
run(input, answers)
       │
       ▼
   normalize
       │
       ▼
    validate
       │
       ▼
evaluateCollection
       │
       ▼
    summary
       │
       ▼
     score
       │
       ▼
    output
```

Không có pipeline thứ hai.

---

## 13. Ví dụ hoàn chỉnh

```js
import Examination from "@vngamemini/examination";

const examination = new Examination();

const output = examination.run(
  {
    questions: [
      {
        id: "q1",
        text: "2 + 2 = ?",
        answers: [
          { id: "a1", text: "3" },
          { id: "a2", text: "4" },
        ],
        correct: "a2",
      },
    ],
  },
  ["a2"],
);

console.log(output);
```

Luồng thực tế:

```text
quiz object
    ↓
normalize
    ↓
Question[]
    ↓
validate
    ↓
evaluateCollection
    ↓
Result[]
    ↓
Summary
    ↓
Score
```

---

## 14. Unanswered

Nếu không có answer tương ứng:

```js
const output = examination.run(quiz, []);
```

Evaluate tạo:

```text
Result.STATUS.UNANSWERED
```

Không coi unanswered là validation error.

Đây là trạng thái kết quả hợp lệ.

---

## 15. Incorrect

Nếu người dùng có trả lời nhưng lựa chọn không khớp:

```text
Question
    +
actual
    ↓
Compare
    ↓
false
    ↓
Result.STATUS.INCORRECT
```

Đây cũng là kết quả hợp lệ.

Không throw error chỉ vì người dùng trả lời sai.

---

## 16. Validation error

Validation error chỉ xảy ra khi dữ liệu không đáp ứng contract.

Ví dụ:

```text
invalid Question
invalid Answer
duplicate answer id
unknown correct answer
invalid metadata
```

Khi xảy ra:

```text
ValidationError
```

Pipeline không tiếp tục Evaluate.

---

## 17. Consumer workflow

Application như Check có thể có workflow riêng:

```text
User
  ↓
UI
  ↓
Application State
  ↓
collect answers
  ↓
Examination.run()
  ↓
Result / Summary / Score
  ↓
UI
```

Application workflow không phải Examination workflow.

Examination chỉ chịu trách nhiệm đoạn:

```text
answers
  ↓
Examination
  ↓
results / summary / score
```

---

## 18. Time và Random

Time và Random không nằm trong pipeline.

Nếu consumer sử dụng chúng:

```text
Application
   ├── Timer
   ├── Randomization
   └── Examination
```

Sau khi application chuẩn bị dữ liệu:

```text
Prepared data
     ↓
Examination
```

Core không biết dữ liệu đã được random hay thời gian được quản lý như thế nào.

---

## 19. Navigation

Navigation cũng nằm ngoài pipeline.

Các thao tác như:

```text
next
previous
current question
submit
```

là responsibility của consumer.

Examination chỉ xử lý dữ liệu được truyền vào.

---

## 20. Workflow invariant

Pipeline phải giữ các invariant:

```text
Normalize luôn xảy ra trước Validate.
Validate xảy ra trước Evaluate.
Evaluate tạo Result.
Summary nhận Result[].
Score nhận Summary.
```

Không bỏ qua bước chỉ vì consumer hiện tại không sử dụng kết quả trung gian.

---

## 21. Không tạo workflow riêng theo mode

Không tạo pipeline riêng cho:

```text
free
exam
practice
```

nếu sự khác biệt chỉ thuộc application behavior.

Core vẫn:

```text
Normalize
  ↓
Validate
  ↓
Evaluate
  ↓
Summary
  ↓
Score
```

Mode được xử lý bên ngoài.

---

## 22. Workflow invariant khi mở rộng

Feature mới phải được đặt vào một layer hiện có nếu có thể.

```text
New feature
     ↓
Identify responsibility
     ↓
Existing layer
     ↓
Existing pipeline
```

Chỉ tạo layer mới khi requirement thực sự không thuộc responsibility hiện tại.

---

## 23. Final architecture

Workflow hoàn chỉnh:

```text
                    INPUT
                      │
                      ▼
                 NORMALIZE
                      │
                      ▼
                  VALIDATE
                      │
                      ▼
                  EVALUATE
                      │
                  ┌───┴───┐
                  ▼       ▼
               COMPARE  RESULT
                          │
                          ▼
                       SUMMARY
                          │
                          ▼
                        SCORE
                          │
                          ▼
                        OUTPUT
```

Đây là workflow chuẩn của Examination `0.1.x`.

Mục tiêu của workflow là giữ cho toàn bộ data processing:

```text
Predictable
Deterministic
Testable
Maintainable
Extensible
```
