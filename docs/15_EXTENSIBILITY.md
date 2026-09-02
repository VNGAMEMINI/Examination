# Extensibility

## 1. Mục đích

Examination phải có khả năng mở rộng khi project lớn lên nhưng không làm pipeline trở nên khó kiểm soát.

Nguyên tắc chính:

```text id="x7p4ma"
Mở rộng behavior
      ↓
Xác định đúng layer
      ↓
Thay đổi layer đó
      ↓
Giữ nguyên pipeline
```

Pipeline chuẩn:

```text id="q8v2kn"
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
```

Không tạo một pipeline riêng cho từng feature.

---

## 2. Nguyên tắc mở rộng

Khi thêm tính năng, trước tiên phải xác định tính năng thuộc layer nào.

| Nhu cầu                   | Layer     |
| ------------------------- | --------- |
| Chuyển đổi input          | Normalize |
| Kiểm tra cấu trúc dữ liệu | Validate  |
| Xác định đáp án đúng/sai  | Evaluate  |
| So sánh lựa chọn          | Compare   |
| Biểu diễn kết quả         | Result    |
| Tổng hợp kết quả          | Summary   |
| Tính điểm                 | Score     |
| UI                        | Consumer  |
| Navigation                | Consumer  |
| Timer                     | Consumer  |
| Randomization             | Consumer  |
| Application state         | Consumer  |

Không đưa một feature vào core chỉ vì consumer hiện tại đang cần nó.

---

## 3. Mở rộng Question

Hiện tại Examination sử dụng một model `Question` duy nhất.

```text id="f6c1rd"
Question
├── id
├── text
├── answers
├── correct
└── metadata
```

Nếu cần hỗ trợ thêm thông tin cho Question, trước tiên xem xét:

```text id="w8z3kn"
metadata
```

Chỉ tạo cấu trúc mới khi dữ liệu hoặc behavior thực sự yêu cầu.

Không tạo nhiều class Question chỉ để phân biệt tên loại câu hỏi.

---

## 4. Mở rộng Normalize

Nếu Examination cần hỗ trợ thêm input format:

```text id="s4m9xt"
External Input
      ↓
normalize
      ↓
Question
```

Thay đổi nên tập trung tại:

```text id="e1v6qc"
src/normalize/
```

Không để consumer tự chuyển đổi dữ liệu thành nhiều format khác nhau.

Mục tiêu của Normalize là tạo một canonical model duy nhất.

---

## 5. Mở rộng Validate

Khi thêm invariant cho dữ liệu:

```text id="v2n8ks"
Question
   ↓
validateQuestion
```

hoặc:

```text id="p6x3mw"
Answer
   ↓
validateAnswer
```

Validation phải được đặt tại validation layer.

Không đưa validation vào UI component hoặc Score.

---

## 6. Mở rộng Compare

Nếu cách xác định đáp án đúng thay đổi, trước tiên xem xét Compare.

Ví dụ:

```text id="k4m7pz"
exact selection
multiple selection
normalized selection
```

Compare vẫn phải giữ contract đơn giản:

```text id="h5c2rx"
expected
actual
   ↓
boolean
```

Compare không được:

```text id="b8q1mv"
- tạo Result
- tính Score
- thay đổi Question
- quản lý UI
```

---

## 7. Mở rộng Evaluate

Evaluate là nơi kết hợp:

```text id="j7w3nf"
Question
+
actual
+
Compare
      ↓
Result
```

Nếu cần thêm behavior liên quan trực tiếp đến việc đánh giá câu hỏi, ưu tiên xem xét Evaluate trước khi tạo một abstraction mới.

Evaluate vẫn phải trả về `Result`.

---

## 8. Mở rộng Result

`Result` phải tiếp tục biểu diễn kết quả đánh giá.

Contract hiện tại:

```text id="r3v8cq"
status
expected
actual
correct
```

Nếu thêm dữ liệu mới, phải chứng minh dữ liệu đó cần thiết cho việc biểu diễn kết quả.

Không đưa application state hoặc UI state vào Result.

---

## 9. Mở rộng Summary

`Summary` chịu trách nhiệm tổng hợp `Result[]`.

Contract hiện tại:

```text id="m8k4xs"
total
correct
incorrect
unanswered
```

Nếu thêm một thống kê mới, nó phải được tính từ tập kết quả.

Không đưa logic UI hoặc Session vào Summary.

---

## 10. Mở rộng Score

`Score` chịu trách nhiệm chuyển `Summary` thành điểm.

Contract hiện tại:

```text id="q6v2nd"
points
percentage
```

Nếu hệ thống tương lai cần scoring khác nhau, trước tiên xác định requirement cụ thể.

Không tạo nhiều scoring abstraction chỉ vì dự đoán rằng tương lai có thể cần.

Nguyên tắc:

```text id="c5w9pr"
Requirement thực tế
      ↓
Xác định scoring behavior
      ↓
Mở rộng Score layer
```

---

## 11. Không mở rộng bằng cách tạo pipeline mới

Không tạo các luồng song song như:

```text id="d4m8qx"
QuizPipeline
ExamPipeline
PracticePipeline
SessionPipeline
```

nếu chúng chỉ khác nhau ở một vài policy hoặc option.

Pipeline core vẫn phải duy nhất:

```text id="u7p2ms"
normalize
 → validate
 → evaluate
 → summary
 → score
```

Consumer quyết định cách sử dụng kết quả.

---

## 12. Time

Timer không thuộc Examination core.

Nếu application cần giới hạn thời gian:

```text id="f3n8wy"
Check
 ├── Timer
 └── Examination
```

Timer không trở thành dependency của Examination.

---

## 13. Randomization

Randomization không thuộc Examination core.

Consumer có thể random dữ liệu trước khi đưa vào Examination:

```text id="q9v4kc"
Quiz
 ↓
Consumer Randomization
 ↓
Examination
```

Examination xử lý dữ liệu đã được chuẩn bị.

---

## 14. Navigation

Navigation thuộc application.

Ví dụ:

```text id="a8m2vz"
current question
next
previous
submit
```

không phải responsibility của Examination.

Examination chỉ nhận dữ liệu cần thiết để evaluate.

---

## 15. Application State

Các trạng thái như:

```text id="r6k1xf"
current question
selected answers
timer state
page state
UI state
```

không được lưu trong core.

Nếu application cần state management, state nằm ở consumer.

---

## 16. Public API Extension

Không thêm public export chỉ vì một internal module mới được tạo.

Một module chỉ trở thành public API khi có requirement rõ ràng.

Trước khi export API mới:

1. Xác định use case.
2. Xác định contract.
3. Xác định ownership.
4. Viết test.
5. Cập nhật documentation.
6. Kiểm tra compatibility.

---

## 17. Internal trước, Public sau

Ưu tiên:

```text id="k9s5wd"
Internal implementation
        ↓
Tests
        ↓
Real usage
        ↓
Stable behavior
        ↓
Public API
```

Không nên public hóa abstraction khi behavior chưa ổn định.

---

## 18. File organization

Khi thêm module mới, đặt module vào layer tương ứng.

Ví dụ:

```text id="n5x7rc"
src/
├── normalize/
├── validate/
├── compare/
├── evaluate/
├── result/
├── summary/
├── score/
└── examination/
```

Không tạo một thư mục chung chứa các utility có responsibility khác nhau chỉ để giảm số thư mục.

Tên file phải mô tả rõ responsibility.

---

## 19. Dependency direction

Dependency phải đi theo hướng của pipeline:

```text id="s8q2mf"
normalize
   ↓
validate
   ↓
evaluate
   ↓
result
   ↓
summary
   ↓
score
```

Không tạo dependency vòng:

```text id="j4v6tp"
A → B → C → A
```

Consumer nằm bên ngoài:

```text id="p2m7xk"
Consumer
    ↓
Examination
```

---

## 20. Backward compatibility

Khi mở rộng:

- giữ nguyên API hiện tại nếu có thể
- không đổi semantics mà không có lý do
- không đổi kiểu dữ liệu trả về tùy tiện
- không xóa export đang được sử dụng
- cập nhật test cùng với implementation

Một feature mới không được phá behavior cũ nếu không phải breaking change có chủ đích.

---

## 21. Extension checklist

Trước khi merge một feature mới:

```text id="w3n8qa"
[ ] Feature thuộc layer nào đã rõ?
[ ] Có thực sự cần abstraction mới?
[ ] Có thể mở rộng implementation hiện tại không?
[ ] Pipeline vẫn duy nhất?
[ ] Consumer boundary vẫn rõ?
[ ] Không kéo UI vào core?
[ ] Không kéo application state vào core?
[ ] Không kéo Timer vào core?
[ ] Không kéo Randomization vào core?
[ ] Public API có thực sự cần thay đổi?
[ ] Tests đã được cập nhật?
[ ] Documentation đã được cập nhật?
```

---

## 22. Quy tắc quan trọng nhất

Khi project lớn lên:

```text id="h1c7mz"
Không mở rộng theo số lượng feature.
Mở rộng theo responsibility.
```

Mỗi behavior mới phải có một vị trí rõ ràng trong architecture.

Mục tiêu cuối cùng:

```text id="v5n2kr"
Một pipeline
Một hướng dữ liệu
Một responsibility cho mỗi layer
Một public API có kiểm soát
```

Đây là nguyên tắc nền tảng để Examination có thể mở rộng mà vẫn dễ bảo trì.
