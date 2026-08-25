# Validator

## Mục đích

Validator chỉ kiểm tra dữ liệu sau khi đã Normalize.

```js
Validator.validate(data)
```

## Ví dụ hợp lệ

```js
{
  question: "2 + 2 = ?",
  answers: ["3", "4", "5"],
  correct: 1
}
```

## Ví dụ không hợp lệ

```js
{
  question: "2 + 2 = ?",
  answers: ["3", "4", "5"],
  correct: 10
}
```

`correct: 10` không tồn tại trong `answers`.

## Validator không làm

Validator không:

- sửa dữ liệu
- random đáp án
- tính điểm
- hiển thị lỗi
- thao tác DOM

Nó chỉ trả về trạng thái hoặc lỗi validation theo API của thư viện.

## Pipeline

```text
Input
 ↓
Normalize
 ↓
Validate
 ↓
Valid Internal Model
```
