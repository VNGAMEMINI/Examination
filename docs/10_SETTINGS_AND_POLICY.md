# Settings & Policy

## Settings

Settings mô tả cách một bài kiểm tra hoạt động.

Ví dụ:

```js
{
  mode: "exam",

  question: {
    limit: 20
  },

  random: {
    question: true,
    answer: true
  },

  navigation: {
    autoNext: true
  },

  time: {
    total: 2700,
    perQuestion: 60
  }
}
```

## Các nhóm setting

### Candidate

Tên thí sinh hoặc thông tin session.

### Question

Giới hạn số câu.

### Random

- random question
- random answer

### Navigation behavior

- auto next
- cho phép quay lại
- các policy khác

### Time

- total time
- per-question time

### Mode

Ví dụ:

- free
- exam
- practice
- custom

## Mode và Policy

Không nên rải:

```js
if (mode === "exam") ...
```

khắp core.

Thay vào đó:

```text
Mode
  │
  ▼
Policy
  ├── AnswerPolicy
  ├── TimePolicy
  ├── NavigationPolicy
  ├── RandomPolicy
  └── ResultPolicy
```

Nhờ vậy có thể thêm mode mới mà không phá core.
