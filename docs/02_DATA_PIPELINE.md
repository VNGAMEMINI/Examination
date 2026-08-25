# Data Pipeline

Examination xử lý dữ liệu theo pipeline:

```text
Raw Input
   │
   ▼
Parser
   │
   ▼
Normalizer
   │
   ▼
Validator
   │
   ▼
Internal Model
   │
   ▼
Examination / Session
```

## 1. Raw Input

Người tạo đề có thể dùng tên ngắn:

```js
{
  q: "We ........ from the USA.",
  a: ["is", "are", "being", "be"],
  c: 1
}
```

hoặc tên rõ nghĩa:

```js
{
  question: "We ........ from the USA.",
  answers: ["is", "are", "being", "be"],
  correct: 1
}
```

## 2. Normalize

Normalizer biến chúng thành một format chuẩn.

```js
{
  question: "We ........ from the USA.",
  answers: ["is", "are", "being", "be"],
  correct: 1
}
```

Sau bước này, các phần còn lại của Examination chỉ làm việc với format chuẩn.

## 3. Validate

Validator kiểm tra:

- `question` có hợp lệ không
- `answers` có tồn tại không
- `answers` có đúng cấu trúc không
- `correct` có trỏ tới đáp án hợp lệ không
- `type` có được hỗ trợ không

## 4. Internal Model

Internal Model không phụ thuộc vào cách người viết đề đặt tên field.

```text
Input aliases
      │
      ▼
  Normalizer
      │
      ▼
Internal Model
```

Đây là nguyên tắc quan trọng để Examination có thể hỗ trợ nhiều format dữ liệu trong tương lai.
