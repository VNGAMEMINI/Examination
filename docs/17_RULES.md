# Rules

## Rule 1 — Examination không chứa UI

Không thêm:

- DOM
- JSX
- CSS
- UI component

## Rule 2 — Internal Model thống nhất

Mọi input phải đi qua Normalizer.

## Rule 3 — Validator kiểm tra Internal Model

Không để Validator trở thành parser thứ hai.

## Rule 4 — Compare chỉ xử lý Answer

Không đưa navigation hoặc UI logic vào Compare.

## Rule 5 — Session là runtime state

Không lưu trạng thái của người làm bài trực tiếp vào Examination definition.

## Rule 6 — Answer và Submit khác nhau

```text
answer() → một câu
submit() → toàn bài
```

## Rule 7 — Result chỉ là data

Result không render.

## Rule 8 — Random phải giữ Answer identity

Random không được làm thay đổi đáp án đúng.

## Rule 9 — Mode không được rải condition

Ưu tiên Policy.

## Rule 10 — API nhất quán

Một hành động nên có một tên API rõ nghĩa.

## Rule 11 — Consumer không chấm lại

Check không được tự triển khai lại thuật toán:

```js
selected === correct
```

Examination là nguồn đánh giá chính.

## Rule 12 — Input linh hoạt, Core nghiêm ngặt

```text
Flexible Input
      ↓
Normalizer
      ↓
Strict Internal Model
```
