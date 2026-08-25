# Extensibility

Examination được thiết kế để mở rộng mà không phá core.

## Thêm Question Type

Ví dụ thêm:

```text
matching
ordering
number
text
custom
```

Luồng:

```text
Question
   │
   ▼
Type
   │
   ▼
Compare
   │
   ▼
AnswerResult
```

## Thêm Mode

Không sửa toàn bộ Session.

Thêm Policy tương ứng:

```text
Custom Mode
   ├── AnswerPolicy
   ├── TimePolicy
   ├── RandomPolicy
   └── ResultPolicy
```

## Thêm Input Format

Không sửa Question.

Thêm logic vào Normalizer:

```text
Format A ─┐
Format B ─┼──> Normalizer ──> Internal Model
Format C ─┘
```

## Thêm Comparator

Chỉ mở rộng Compare/Type.

Core Session vẫn giữ:

```js
session.answer(value)
```

## Nguyên tắc

> Mở rộng ở biên, giữ Internal Model và Core API ổn định.
