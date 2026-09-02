# Architecture

## Tổng quan

Examination sử dụng kiến trúc xử lý dữ liệu tuyến tính.

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
  ▼
RESULT
  │
  ▼
SUMMARY
  │
  ▼
SCORE
```

Mục tiêu là giữ mỗi bước có một trách nhiệm rõ ràng.

## Layers

### Input

Input có thể ở nhiều dạng.

Consumer không cần tạo trực tiếp Internal Model trước khi đưa dữ liệu vào Examination.

### Normalize

Normalizer chuyển input về representation chuẩn.

```text
Flexible Input
      │
      ▼
  Normalizer
      │
      ▼
Canonical Model
```

Canonical model gồm:

```text
Question
 ├── id
 ├── text
 ├── answers
 ├── correct
 └── metadata
```

### Validate

Validator kiểm tra canonical model.

```text
Canonical Model
      │
      ▼
   Validator
      │
      ├── valid
      │
      └── ValidationError
```

Validator không có nhiệm vụ parse hoặc chuẩn hóa input.

### Evaluate

Evaluate nhận `Question` và actual answer.

```text
Question
   │
   ├── expected
   │
   ▼
Evaluate
   ▲
   │
actual answer
```

Evaluate:

1. kiểm tra Question
2. chuẩn hóa actual answer
3. resolve answer identity
4. gọi Compare
5. tạo Result

### Compare

Compare chỉ xác định expected và actual có tương đương hay không.

```text
Expected ─┐
          ├── Compare ──> boolean
Actual ───┘
```

Compare không quản lý application state.

### Result

Evaluate tạo `Result`.

```text
Evaluate
   │
   ▼
Result
```

Result chỉ chứa dữ liệu kết quả.

### Summary

Các Result được tổng hợp:

```text
Result[]
   │
   ▼
Summary
```

Summary cung cấp:

```text
total
correct
incorrect
unanswered
```

### Score

Score được tính từ Summary:

```text
Summary
   │
   ▼
Score
```

Score hiện tại cung cấp:

```text
points
percentage
```

## Examination Facade

`Examination` là interface cấp cao cho các bước xử lý.

```text
Examination
 ├── normalize()
 ├── validate()
 ├── evaluate()
 ├── evaluateCollection()
 ├── summary()
 ├── score()
 └── run()
```

`run()` nối các bước thành một execution flow thống nhất.

## Dependency Direction

```text
Consumer
   │
   ▼
Examination
   │
   ├── Normalize
   ├── Validate
   ├── Evaluate
   ├── Summary
   └── Score
```

Examination không phụ thuộc vào UI consumer.

## Ngoài phạm vi

Không đưa các hệ thống sau vào core chỉ vì consumer có nhu cầu:

```text
Time
Random
Navigation
Session
UI State
Rendering
React
DOM
```

Các chức năng này thuộc application layer hoặc consumer.

## Nguyên tắc mở rộng

Khi thêm functionality:

1. xác định functionality có thuộc data processing hay không
2. nếu thuộc core, đặt nó vào đúng pipeline layer
3. không tạo abstraction chỉ để giải quyết một trường hợp đơn giản
4. giữ public API nhỏ
5. giữ canonical model ổn định
6. bổ sung test trước khi mở rộng behavior
