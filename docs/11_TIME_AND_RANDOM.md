# Time and Random

## Status

**Out of Core / Consumer Responsibility**

`Time` và `Random` không phải core services của Examination 0.1.x.

## Time

Examination không quản lý:

* countdown
* duration
* timeout
* start time
* end time
* pause
* resume

Evaluation không cần biết thời gian để xác định:

```text id="m2x8c5"
Question
+
Actual
→
Result
```

## Random

Examination không randomize:

* question order
* answer order
* question selection
* question pool

Normalizer phải tạo canonical data ổn định.

Compare phải deterministic.

Evaluate phải deterministic.

## Vì sao tách Time

Timer là lifecycle concern.

Ví dụ:

```text id="q5r9n1"
Timer
  ↓
Application State
  ↓
Session
  ↓
Examination
```

Examination chỉ nhận dữ liệu cần đánh giá.

## Vì sao tách Random

Randomization nên xảy ra trước processing hoặc ở application layer.

Ví dụ:

```text id="x7k3m6"
Question Pool
     ↓
Randomizer
     ↓
Selected Questions
     ↓
Examination
```

Examination không cần biết selection được tạo bằng cách nào.

## Deterministic Core

Một input và actual giống nhau phải tạo kết quả evaluation giống nhau.

```text id="a9v2c4"
Question + Actual
       ↓
    Evaluate
       ↓
     Result
```

Không nên có random behavior ẩn bên trong pipeline này.

## Consumer Example

Application có thể làm:

```js id="h4p8s2"
const questions = randomize(questionPool);

const result = exam.run(
  { questions },
  answers
);
```

Randomization xảy ra bên ngoài Examination.

## Time Example

Application có thể kiểm tra timeout trước khi submit:

```text id="w6n1q9"
Timer
  ↓
Application
  ↓
answers
  ↓
Examination
```

Examination không cần sở hữu timer.

## Future Package

Nếu Time hoặc Random trở thành reusable systems, chúng có thể tồn tại dưới dạng package/module riêng.

```text id="c8m4y7"
Application
 ├── Time
 ├── Random
 └── Examination
```

Không import trực tiếp các module này vào core chỉ để cung cấp convenience API.

## Nguyên tắc

```text id="f2r7k5"
Time   → lifecycle
Random → selection
Examination → data processing
```

Giữ ba trách nhiệm độc lập giúp core dễ kiểm thử và mở rộng.
