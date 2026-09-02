# Settings and Policy

## Status

**Out of Core / Consumer Responsibility**

Examination 0.1.x không có một settings/policy system tổng quát.

## Core API

Core hiện tại không yêu cầu:

```js
{
  mode,
  random,
  navigation,
  time,
  policy
}
```

để thực hiện evaluation.

Flow chính vẫn là:

```text id="c9v4m2"
input
  ↓
normalize
  ↓
validate
  ↓
evaluate
  ↓
summary
  ↓
score
```

## Consumer Settings

Application có thể có settings riêng:

```js id="s7n3k5"
{
  randomQuestions: true,
  randomAnswers: true,
  autoNext: true,
  timeLimit: 45
}
```

Những settings này không thuộc canonical Examination model.

## Vì sao không đưa Settings vào Core

Các ứng dụng khác nhau có nhu cầu khác nhau.

Ví dụ:

```text id="n4x8p1"
Practice
 ├── random: false
 ├── timer: false
 └── autoNext: true

Exam
 ├── random: true
 ├── timer: true
 └── autoNext: false
```

Đây là application policy, không phải data-processing requirement.

## Policy

Không tạo các abstraction như:

```text id="u6q2m8"
Các policy abstraction dành cho timer, randomization,
navigation hoặc application mode không thuộc core hiện tại.
```

trong core hiện tại.

Chỉ thêm policy abstraction khi có nhiều behavior thực sự cần được thay thế hoặc mở rộng.

## Mode

Các mode như:

```text id="p3f7k1"
free
exam
practice
```

có thể được consumer sử dụng.

Examination không cần biết mode để evaluate một Question.

## Boundary

```text id="b8m5r2"
Consumer
  │
  ├── Settings
  ├── Policies
  ├── Mode
  ├── Navigation
  └── Time
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

## Future Extension

Nếu một setting thực sự làm thay đổi core processing behavior, cần xác định chính xác nó ảnh hưởng layer nào.

Không đưa toàn bộ application settings vào `Examination`.

## Nguyên tắc

Settings mô tả cách application vận hành.

Examination mô tả cách dữ liệu được xử lý.

Hai khái niệm phải được giữ độc lập.
