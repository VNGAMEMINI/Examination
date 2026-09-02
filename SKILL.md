# Examination Skill

## Purpose

`@vngamemini/examination` là data-processing engine dành cho web examination và quiz.

Skill này định nghĩa cách phát triển, mở rộng và kiểm tra Examination mà không phá vỡ processing pipeline.

---

## Core Pipeline

Mọi processing flow phải tuân theo:

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
```

Không tạo processing flow thứ hai nếu tính năng có thể tích hợp vào pipeline hiện tại.

---

## Layer Responsibilities

### Normalize

Chuyển dữ liệu đầu vào về data model chuẩn.

```text
input
 ↓
Question
 ↓
Answer
```

Normalize không chịu trách nhiệm đánh giá đáp án.

### Validate

Kiểm tra tính hợp lệ của data model.

```text
Question
 ↓
Answer
 ↓
ValidationError
```

Validate không tự sửa dữ liệu.

### Compare

So sánh đáp án mong đợi với đáp án thực tế.

Compare không tạo `Result`.

### Evaluate

Kết hợp validation và comparison để tạo `Result`.

### Summary

Tổng hợp nhiều `Result`.

### Score

Tính điểm từ `Summary`.

---

## Data Model

### Answer

```text
id
text
metadata
```

### Question

```text
id
text
answers
correct
metadata
```

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

---

## Examination

`Examination` là facade của processing pipeline.

Public methods:

```text
normalize()
validate()
evaluate()
evaluateCollection()
summary()
score()
run()
```

`run()` phải duy trì flow:

```text
normalize
 ↓
validate
 ↓
evaluateCollection
 ↓
summary
 ↓
score
```

---

## Public API

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

`default` export là `Examination`.

Không export implementation nội bộ nếu chưa được xác định là public API.

---

## Mutation Rules

Không expose mutable internal state.

Các collection getter phải trả về bản sao.

Ví dụ:

```js
question.answers;
```

không được cho phép caller thay đổi trực tiếp collection nội bộ.

Metadata cũng phải được bảo vệ khỏi mutation trực tiếp.

---

## Error Rules

Validation failure phải sử dụng:

```text
ValidationError
```

API nhận sai loại argument ở các function/model có thể sử dụng:

```text
TypeError
```

Không silently bỏ qua dữ liệu không hợp lệ ở validation layer.

---

## Consumer Boundary

Examination không quản lý:

```text
UI
Navigation
Timer
Randomization
Application state
Events
Rendering
Persistence
Routing
User interaction
```

Các trách nhiệm này thuộc application sử dụng Examination.

Dependency:

```text
Application
     ↓
Examination
```

Không đảo ngược dependency.

---

## Extension Rules

Khi thêm tính năng:

1. Xác định layer chịu trách nhiệm.
2. Kiểm tra contract hiện tại.
3. Thêm implementation nhỏ nhất cần thiết.
4. Thêm test.
5. Cập nhật documentation.
6. Kiểm tra public API.
7. Chạy toàn bộ test suite.

Không tạo class/module chỉ vì một abstraction nghe có vẻ hữu ích.

---

## Testing

Mọi thay đổi phải kiểm tra:

```bash
npm test
```

Sau khi test pass:

```bash
git diff --check
```

Kiểm tra package:

```bash
npm pack --dry-run
```

---

## Stability Rule

Không thay đổi:

```text
Result contract
Summary contract
Score contract
Public API
Processing order
```

trừ khi thay đổi đó được xác định là một contract change.

---

## Documentation Rule

Code, tests và documentation phải mô tả cùng một architecture.

Nếu documentation mâu thuẫn với implementation:

```text
implementation
    ↓
tests
    ↓
contract
    ↓
documentation
```

phải được đồng bộ lại trước khi tiếp tục phát triển.

---

## Anti-Patterns

Không đưa vào core:

```text
Session
Timer
Random
Navigation
UI
Event emitter
Application lifecycle
```

Không tạo:

```text
Không tạo các abstraction riêng cho session, timer, randomization hoặc application lifecycle chỉ để giải quyết trách nhiệm nằm ngoài Examination core.
```

chỉ để giải quyết các vấn đề thuộc application layer.

---

## Development Principle

Ưu tiên:

```text
Simple
Explicit
Predictable
Testable
Maintainable
Extensible
```

Không ưu tiên abstraction phức tạp nếu không giải quyết vấn đề thực tế.
