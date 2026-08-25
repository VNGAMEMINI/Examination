# Normalizer

## Mục đích

Normalizer là lớp chuyển đổi dữ liệu đầu vào về một cấu trúc thống nhất.

```js
Normalizer.normalize(input)
```

## Ví dụ

### Input ngắn

```js
{
  q: "2 + 2 = ?",
  a: ["3", "4", "5"],
  c: 1
}
```

### Input chuẩn

```js
{
  question: "2 + 2 = ?",
  answers: ["3", "4", "5"],
  correct: 1
}
```

### Output

Cả hai đều trở thành:

```js
{
  question: "2 + 2 = ?",
  answers: ["3", "4", "5"],
  correct: 1
}
```

## Quy tắc

Normalizer chịu trách nhiệm:

- alias field
- giá trị mặc định
- cấu trúc lồng nhau
- chuyển đổi format cũ
- tạo identity khi cần
- chuẩn hóa question type
- chuẩn hóa settings

Normalizer **không chấm đáp án**.

Normalizer **không render UI**.

## Triết lý

```text
Input có thể linh hoạt
        ↓
Normalizer
        ↓
Core phải nghiêm ngặt
```

Điều này cho phép người dùng viết JSON thuận tiện nhưng core vẫn giữ API ổn định.
