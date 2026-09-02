# Score and Result

## 1. Mục đích

Layer này chuyển kết quả đánh giá từng câu hỏi thành:

```text
Result
  ↓
Summary
  ↓
Score
```

Mỗi lớp chỉ chịu trách nhiệm cho một cấp độ dữ liệu.

- `Result`: kết quả của một câu hỏi.
- `Summary`: tổng hợp toàn bộ `Result`.
- `Score`: tính điểm từ `Summary`.

Không lớp nào quản lý UI, Session, Timer, Random hoặc Navigation.

---

## 2. Result

Source:

```text
src/result/Result.js
```

`Result` biểu diễn kết quả đánh giá của một câu hỏi.

Cấu trúc:

```js
{
  status: "correct" | "incorrect" | "unanswered",
  expected: string[],
  actual: string[],
  correct: boolean
}
```

### Status

Có ba trạng thái:

```js
Result.STATUS.CORRECT;
Result.STATUS.INCORRECT;
Result.STATUS.UNANSWERED;
```

Giá trị thực tế:

```text
correct
incorrect
unanswered
```

### expected

Danh sách đáp án đúng mà câu hỏi yêu cầu.

Ví dụ:

```js
["a1"];
```

hoặc:

```js
["a1", "a3"];
```

### actual

Danh sách đáp án người dùng đã chọn.

Ví dụ:

```js
["a1"];
```

Nếu không trả lời:

```js
[];
```

### correct

Giá trị boolean cho biết kết quả có chính xác hay không.

```js
true;
```

chỉ khi:

```text
status === "correct"
```

---

## 3. Result không chứa Score

`Result` không tính điểm.

Không thêm các thuộc tính như:

```text
status
expected
actual
correct
```

Việc tính điểm thuộc `Score`.

---

## 4. Result không chứa Question metadata

`Result` hiện tại chỉ chứa dữ liệu cần thiết để biểu diễn kết quả:

```text
status
expected
actual
correct
```

Không tự động thêm:

```text
questionId
question
metadata
```

nếu pipeline không yêu cầu.

---

## 5. Summary

Source:

```text
src/summary/Summary.js
```

`Summary` nhận một mảng `Result` và tổng hợp trạng thái.

Cấu trúc:

```js
{
  total: number,
  correct: number,
  incorrect: number,
  unanswered: number
}
```

Ví dụ:

```js
{
  total: 10,
  correct: 7,
  incorrect: 2,
  unanswered: 1
}
```

### total

Tổng số `Result`.

```text
total = correct + incorrect + unanswered
```

### correct

Số câu có:

```text
status === "correct"
```

### incorrect

Số câu có:

```text
status === "incorrect"
```

### unanswered

Số câu có:

```text
status === "unanswered"
```

---

## 6. Summary không tính phần trăm

`Summary` chỉ tổng hợp số lượng.

Không chứa:

```text
percentage
score
points
```

Việc tính điểm thuộc `Score`.

---

## 7. Score

Source:

```text
src/score/Score.js
src/score/score.js
```

`Score` nhận một `Summary`.

Cấu trúc:

```js
{
  points: number,
  percentage: number
}
```

### points

Điểm hiện tại được tính trực tiếp từ số câu đúng:

```text
points = summary.correct
```

Ví dụ:

```js
summary.correct === 7;
```

thì:

```js
score.points === 7;
```

### percentage

Tỷ lệ câu đúng:

```text
percentage = correct / total × 100
```

Nếu không có câu hỏi:

```text
percentage = 0
```

Ví dụ:

```js
{
  total: 10,
  correct: 7
}
```

kết quả:

```js
{
  points: 7,
  percentage: 70
}
```

---

## 8. Score không quản lý kết quả chi tiết

`Score` không chứa:

```text
results
incorrect
unanswered
expected
actual
```

Các dữ liệu này thuộc những layer khác.

Quan hệ:

```text
Result
  ↓
Summary
  ↓
Score
```

---

## 9. Pipeline

Toàn bộ luồng:

```text
Question[]
    ↓
evaluate()
    ↓
Result[]
    ↓
summarize()
    ↓
Summary
    ↓
score()
    ↓
Score
```

Trong `Examination.run()`:

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

Kết quả cuối:

```js
{
  (results, summary, score);
}
```

---

## 10. Public functions

### evaluate

Source:

```text
src/evaluate/evaluate.js
```

Chuyển một `Question` và câu trả lời thực tế thành `Result`.

```js
evaluate(question, actual);
```

### summarize

Source:

```text
src/summary/summarize.js
```

Chuyển:

```text
Result[]
```

thành:

```text
Summary
```

### score

Source:

```text
src/score/score.js
```

Chuyển:

```text
Summary
```

thành:

```text
Score
```

---

## 11. Không thuộc Score/Result

Các chức năng sau không thuộc layer này:

```text
Timer
Random
Navigation
Session
UI
Question rendering
Answer input
Application mode
```

Chúng phải được xử lý bởi consumer hoặc các layer bên ngoài core.

Dependency đúng:

```text
Check
  ↓
Examination
  ↓
Result / Summary / Score
```

Không tạo dependency ngược:

```text
Examination
  ✕
Check
```

---

## 12. Nguyên tắc mở rộng

Khi cần thay đổi hệ thống điểm:

1. Không đưa logic điểm vào `Result`.
2. Không đưa logic điểm vào `Summary` nếu đó chỉ là phép tính điểm.
3. Xác định rõ điểm mới thuộc `Score`.
4. Giữ `Result` tập trung vào kết quả đánh giá.
5. Giữ `Summary` tập trung vào tổng hợp.

Nếu hệ thống trong tương lai cần nhiều scoring strategy, có thể mở rộng `score` theo một thiết kế rõ ràng hơn.

Không tạo abstraction trước khi có yêu cầu thực tế.

---

## 13. Contract hiện tại

### Result

```text
status
expected
actual
correct
```

### Summary

```text
total
correct
incorrect
unanswered
```

### Score

```text
points
percentage
```

Đây là contract của Examination `0.1.x`.

Mọi thay đổi breaking phải được xem xét ở cấp public API và documentation trước khi triển khai.
