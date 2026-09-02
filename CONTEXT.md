# Examination Context

## Project

```text
@vngamemini/examination
```

Examination là thư viện JavaScript xử lý dữ liệu cho hệ thống web examination/quiz.

---

## Current Version

```text
0.1.x
```

Đây là contract hiện tại của package.

---

## Current Architecture

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

Đây là processing flow chuẩn duy nhất.

---

## Core Models

```text
Answer
Question
Result
Summary
Score
```

---

## Processing Modules

```text
normalize
validate
compare
evaluate
summarize
score
```

---

## Main Facade

```text
Examination
```

`Examination` cung cấp facade thống nhất cho processing pipeline.

---

## Public Boundary

Examination chỉ chịu trách nhiệm xử lý examination data.

Không chịu trách nhiệm:

```text
UI
Navigation
Timer
Randomization
Events
Application state
Persistence
Routing
Rendering
```

---

## Dependency Direction

```text
Consumer Application
        ↓
    Examination
```

Examination không phụ thuộc vào consumer application.

---

## Design Goal

Architecture phải:

- dễ hiểu;
- dễ kiểm thử;
- dễ bảo trì;
- dễ mở rộng;
- có processing flow thống nhất;
- hạn chế abstraction không cần thiết.

---

## Source of Truth

Khi phát triển:

```text
Source Code
    ↓
Tests
    ↓
CONTRACT.md
    ↓
Documentation
```

Contract phải phản ánh implementation thực tế.

---

## Extension Strategy

Tính năng mới phải được đặt vào layer phù hợp.

Không thêm một flow xử lý riêng nếu có thể mở rộng pipeline hiện tại.

Không đưa application concern vào core.

---

## Current Scope

Examination hiện tập trung vào:

```text
Normalization
Validation
Comparison
Evaluation
Result
Summary
Score
```

Các hệ thống runtime như timer, randomization, navigation và UI nằm ngoài core scope.
