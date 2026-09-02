# Examination Rules

## 1. Mục đích

File này định nghĩa các quy tắc bắt buộc khi phát triển `@vngamemini/examination`.

Mục tiêu:

```text
Một pipeline
Một hướng dữ liệu
Một responsibility cho mỗi layer
Public API ổn định
Dễ kiểm thử
Dễ bảo trì
Dễ mở rộng
```

---

## 2. Core responsibility

Examination là **data-processing engine**.

Core chỉ chịu trách nhiệm:

```text
Normalize
Validate
Evaluate
Compare
Result
Summary
Score
```

Không đưa application behavior vào core.

---

## 3. Pipeline duy nhất

Pipeline chuẩn:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ├── COMPARE
  └── RESULT
  ↓
SUMMARY
  ↓
SCORE
  ↓
OUTPUT
```

Không tạo pipeline riêng cho từng application mode.

---

## 4. Data flow một chiều

Dữ liệu đi theo hướng:

```text
Input
  ↓
Question
  ↓
Result
  ↓
Summary
  ↓
Score
```

Không tạo dependency ngược trong pipeline.

Ví dụ không hợp lệ:

```text
Score
  ↓
Question
```

hoặc:

```text
Result
  ↓
UI
```

---

## 5. Responsibility của Normalize

Normalize chịu trách nhiệm:

```text
External input
      ↓
Canonical model
```

Normalize không được:

- validate business invariant
- evaluate answer
- compare answer
- calculate score
- quản lý UI
- quản lý application state

---

## 6. Responsibility của Validate

Validate chịu trách nhiệm đảm bảo canonical data đáp ứng contract.

Validate không được:

- sửa Question
- sửa Answer
- evaluate câu hỏi
- tính điểm
- quản lý UI
- quản lý Session

Validation failure phải được biểu diễn bằng `ValidationError` khi phù hợp với contract hiện tại.

---

## 7. Responsibility của Compare

Compare chỉ trả lời:

```text
expected có bằng actual hay không?
```

Output:

```text
boolean
```

Compare không được:

- tạo Result
- tính Score
- thay đổi Question
- quản lý UI
- quản lý application state

---

## 8. Responsibility của Evaluate

Evaluate kết hợp:

```text
Question
+
actual
+
Compare
      ↓
Result
```

Evaluate không được biến thành:

```text
Session manager
Navigation manager
Timer manager
UI manager
```

---

## 9. Responsibility của Result

`Result` biểu diễn kết quả của evaluation.

Contract:

```text
status
expected
actual
correct
```

Status hợp lệ:

```text
correct
incorrect
unanswered
```

Không đưa application state vào Result.

---

## 10. Responsibility của Summary

`Summary` tổng hợp `Result[]`.

Contract:

```text
total
correct
incorrect
unanswered
```

Summary không đánh giá lại Question.

Summary không quản lý UI.

---

## 11. Responsibility của Score

`Score` tính điểm từ `Summary`.

Contract hiện tại:

```text
points
percentage
```

Score không được tự đọc Question hoặc Answer.

Score không được phụ thuộc UI.

---

## 12. Question

`Question` là canonical question model.

Contract hiện tại:

```text
id
text
answers
correct
metadata
```

Question không được chứa:

```text
UI state
navigation state
timer state
application state
rendering logic
session lifecycle
```

---

## 13. Answer

`Answer` là canonical answer model.

Contract:

```text
id
text
metadata
```

Answer không chứa UI behavior.

---

## 14. Immutability

Public data model không cung cấp setter tùy tiện.

Các getter collection phải tránh cho consumer sửa trực tiếp internal state.

Ví dụ:

```js
question.answers.push(...)
```

không được phép làm thay đổi internal collection của `Question`.

---

## 15. Metadata

`metadata` dành cho dữ liệu bổ sung.

Metadata không tự động tạo behavior mới.

Ví dụ metadata có thể chứa thông tin mô tả:

```js
{
  type: "multiple-choice";
}
```

nhưng Examination không tự động tạo một Question class hoặc processing pipeline mới chỉ vì metadata đó tồn tại.

---

## 16. Time

Time không thuộc core.

Không thêm Timer vào:

```text
Examination
Question
Result
Summary
Score
```

Timer thuộc consumer/application.

---

## 17. Random

Randomization không thuộc core.

Không thêm randomization state vào:

```text
Question
Examination
Session
Result
```

Consumer quyết định dữ liệu được random như thế nào.

---

## 18. Navigation

Navigation không thuộc Examination.

Các khái niệm như:

```text
current
next
previous
```

thuộc consumer.

Examination không quản lý vị trí câu hỏi hiện tại.

---

## 19. Session

Session không thuộc core hiện tại.

Examination không quản lý lifecycle của một phiên làm bài.

Không thêm session state vào `Examination`.

---

## 20. UI

Examination không phụ thuộc:

```text
React
Vue
Svelte
DOM
Browser API
CSS
UI component
```

Core phải có khả năng chạy độc lập với UI framework.

---

## 21. Application mode

Các mode của application không thuộc core.

Ví dụ:

```text
free
exam
practice
challenge
```

không được dùng làm lý do để tạo nhiều Examination pipeline.

---

## 22. Public API

Public API hiện tại:

```text
Answer
Examination
Question
Result
Score
Summary
ValidationError

compare
evaluate
normalize
score
summarize
validate

default
```

Không tự ý thêm export mới.

---

## 23. Facade

`Examination` là facade chính.

Các method hiện tại:

```text
normalize(input)
validate(input)
evaluate(question, actual)
evaluateCollection(questions, answers)
summary(results)
score(summary)
run(input, answers)
```

Facade phải sử dụng cùng processing implementation với functional API.

Không tạo implementation thứ hai cho `run()`.

---

## 24. Error handling

Input không đáp ứng contract phải được xử lý rõ ràng.

Không silently bỏ qua lỗi validation nghiêm trọng.

Không dùng `console.error()` thay cho error contract của library.

Error message phải có ý nghĩa đối với developer sử dụng package.

---

## 25. Không mutate input

Normalize và processing không được tùy tiện mutate dữ liệu input của consumer.

Ưu tiên tạo canonical model mới.

---

## 26. Không tạo abstraction sớm

Không tạo class, interface hoặc policy abstraction chỉ vì:

```text
"có thể cần trong tương lai"
```

Chỉ tạo abstraction khi có:

```text
Requirement thực tế
+
Behavior khác biệt
+
Testable contract
```

---

## 27. Không duplicate logic

Nếu behavior đã tồn tại trong một layer:

```text
normalize
validate
compare
evaluate
summary
score
```

không viết lại behavior tương tự ở layer khác.

Ví dụ:

```text
Không tự compare trong Summary.
Không tự calculate score trong Evaluate.
Không tự validate trong UI.
```

---

## 28. File organization

File phải nằm theo responsibility:

```text
src/
├── answer/
├── compare/
├── errors/
├── evaluate/
├── examination/
├── normalize/
├── question/
├── result/
├── score/
├── summary/
└── validate/
```

Không tạo thư mục `misc`, `common` hoặc `helpers` để chứa code không rõ responsibility.

---

## 29. Naming

Tên file và function phải mô tả responsibility.

Ví dụ:

```text
normalize.js
validate.js
compare.js
evaluate.js
summarize.js
score.js
```

Không dùng tên mơ hồ như:

```text
manager.js
handler.js
processor.js
helper.js
utils.js
```

nếu tên đó không thể hiện responsibility cụ thể.

---

## 30. Dependency direction

Consumer phụ thuộc Examination:

```text
Check
  ↓
Examination
```

Không được tạo:

```text
Examination
  ↓
Check
```

Core không biết application cụ thể nào đang sử dụng nó.

---

## 31. Testing

Mỗi behavior quan trọng phải có test.

Ưu tiên test:

```text
Normalize
Validate
Compare
Evaluate
Result
Summary
Score
Examination
Public API
```

Khi thay đổi behavior:

```text
Implementation
+
Test
+
Documentation
```

phải được cập nhật đồng bộ.

---

## 32. Contract tests

Public API phải có contract tests.

Contract tests phải xác nhận:

```text
export tồn tại
constructor hoạt động
method tồn tại
return type đúng
data shape đúng
semantics đúng
```

Không chỉ test implementation nội bộ.

---

## 33. Documentation

Khi thay đổi public behavior:

```text
Code
 ↓
Tests
 ↓
Docs
```

Documentation phải phản ánh implementation thực tế.

Không mô tả API chưa tồn tại như API hiện tại.

---

## 34. Breaking changes

Breaking change phải được xem xét đặc biệt.

Ví dụ:

```text
đổi tên export
xóa export
đổi return shape
đổi property
đổi semantics
```

Không thực hiện breaking change âm thầm.

---

## 35. Extension rule

Khi thêm feature:

```text
1. Xác định responsibility.
2. Chọn layer phù hợp.
3. Kiểm tra abstraction hiện tại.
4. Implement.
5. Test.
6. Cập nhật docs.
```

Không bắt đầu bằng việc tạo class mới nếu chưa xác định responsibility.

---

## 36. Consumer boundary

Nếu feature thuộc application:

```text
UI
Timer
Random
Navigation
Session
State
```

hãy triển khai ở consumer.

Không chuyển responsibility đó vào Examination chỉ để consumer code ngắn hơn.

---

## 37. Core stability

Mục tiêu của core:

```text
Small
Stable
Predictable
Reusable
Testable
```

Core không cần biết toàn bộ behavior của application.

---

## 38. Quy tắc ưu tiên

Khi có xung đột thiết kế, ưu tiên theo thứ tự:

```text
1. Correctness
2. Contract stability
3. Clear responsibility
4. Testability
5. Maintainability
6. Extensibility
7. Convenience
```

Không hy sinh architecture chỉ để giảm vài dòng code ở consumer.

---

## 39. Definition of Done

Một feature chỉ được xem là hoàn thành khi:

```text
[ ] Đúng responsibility
[ ] Không phá pipeline
[ ] Không tạo dependency ngược
[ ] Không duplicate logic
[ ] Có tests
[ ] Public API được xem xét
[ ] Documentation được cập nhật
[ ] git diff --check sạch
[ ] Test suite pass
```

---

## 40. Rule cốt lõi

Examination phải luôn giữ nguyên nguyên tắc:

```text
ONE PIPELINE
ONE DATA FLOW
CLEAR RESPONSIBILITY
CONTROLLED PUBLIC API
```

Mọi mở rộng trong tương lai phải bảo vệ bốn nguyên tắc này.
