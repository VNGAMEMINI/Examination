# Examination Rules

## 1. Single Pipeline

Examination chỉ có một processing pipeline:

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

Không tạo pipeline song song cho cùng một nhiệm vụ.

---

## 2. One Responsibility

Mỗi module phải có một responsibility chính.

```text
normalize → normalize
validate  → validate
compare   → compare
evaluate  → evaluate
summary   → summarize
score     → score
```

Không gom nhiều responsibility không liên quan vào một module.

---

## 3. Data First

Examination xử lý data, không điều khiển application.

Không đưa UI hoặc application lifecycle vào core.

---

## 4. Consumer Boundary

Consumer chịu trách nhiệm:

```text
UI
Navigation
Timer
Randomization
Events
State
Persistence
Routing
Rendering
```

Examination chỉ cung cấp processing capability.

---

## 5. Dependency Direction

Luôn giữ:

```text
Consumer
   ↓
Examination
```

Không để Examination import dependency từ consumer.

---

## 6. Model Stability

Các model core:

```text
Answer
Question
Result
Summary
Score
```

chỉ thay đổi khi có yêu cầu contract rõ ràng.

Không thêm property tùy tiện.

---

## 7. Result Rule

`Result` chỉ mô tả kết quả đánh giá:

```text
status
expected
actual
correct
```

Không biến `Result` thành object chứa application state.

---

## 8. Summary Rule

`Summary` chỉ tổng hợp:

```text
total
correct
incorrect
unanswered
```

Không chứa policy của application.

---

## 9. Score Rule

`Score` chỉ tính:

```text
points
percentage
```

Không đưa runtime state vào Score.

---

## 10. Validation Rule

Validation không tự động sửa dữ liệu.

Dữ liệu sai phải được báo lỗi rõ ràng.

Validation failure sử dụng `ValidationError`.

---

## 11. Normalization Rule

Normalization có thể chuyển đổi input về canonical data model.

Sau normalization, core pipeline phải làm việc với model chuẩn.

---

## 12. Comparison Rule

Comparison phải có behavior xác định và có thể kiểm thử độc lập.

Không để UI hoặc application policy ảnh hưởng kết quả comparison.

---

## 13. Mutation Rule

Không cho phép caller thay đổi trực tiếp internal state của model.

Collections và metadata phải được bảo vệ khỏi mutation ngoài ý muốn.

---

## 14. API Rule

Chỉ public những gì được xác định trong contract.

Public API hiện tại:

```text
Answer
Examination
Question
Result
Score
Summary
ValidationError

normalize
validate
compare
evaluate
summarize
score

default
```

---

## 15. No Premature Abstraction

Không tạo abstraction nếu chưa có vấn đề thực tế cần giải quyết.

Đặc biệt không thêm các layer chỉ để:

```text
Time
Random
Navigation
Session
UI
```

nếu chúng không thuộc core responsibility.

---

## 16. Test Rule

Mỗi thay đổi behavior phải có test tương ứng.

Không coi test là bước tùy chọn.

---

## 17. Documentation Rule

Mọi public behavior phải được documentation mô tả.

Không để documentation quảng bá API không tồn tại.

---

## 18. Contract Rule

`CONTRACT.md` là contract của package.

Mọi thay đổi public API phải được đánh giá dưới góc độ compatibility.

---

## 19. Extension Rule

Khi thêm tính năng:

```text
Identify Layer
      ↓
Implement
      ↓
Test
      ↓
Review Contract
      ↓
Update Docs
```

Không sửa nhiều layer nếu không cần thiết.

---

## 20. Quality Gate

Trước mỗi commit:

```bash
npm test
git diff --check
npm pack --dry-run
```

Nếu một bước thất bại, không coi thay đổi là hoàn tất.

---

## 21. Architecture Integrity

Không chấp nhận code hoặc documentation mô tả architecture khác với implementation hiện tại.

Đặc biệt không đưa các API ngoài core vào public contract.

---

## 22. Maintainability

Mọi quyết định kiến trúc phải ưu tiên khả năng:

```text
Read
Understand
Test
Modify
Extend
```

khi project phát triển lớn hơn.
