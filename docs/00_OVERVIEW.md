# Examination — Overview

## Mục đích

`Examination` là thư viện JavaScript chuyên xử lý dữ liệu và logic cho các hệ thống làm bài, kiểm tra, luyện tập và đánh giá.

Examination **không phải UI library** và không chịu trách nhiệm render giao diện.

```text
Question Data
      │
      ▼
  Examination
      │
      ├── Normalize
      ├── Validate
      ├── Question / Answer
      ├── Compare
      ├── Score
      ├── Time
      ├── Random
      ├── Session
      └── Result
      │
      ▼
   Consumer
      │
      └── Check / React / Vue / Vanilla JS / ...
```

## Examination và Check

| Thành phần | Trách nhiệm |
|---|---|
| Examination | Xử lý dữ liệu, logic và trạng thái |
| Check | Giao diện web sử dụng Examination |

Examination không chứa:

- HTML
- CSS
- React components
- Vue components
- DOM manipulation
- Question UI
- Answer UI
- Navigation UI

Check có thể thay đổi giao diện mà không phải thay đổi logic chấm bài.

## Nguyên tắc cốt lõi

1. Input có thể linh hoạt.
2. Internal Model phải thống nhất.
3. Core chỉ xử lý dữ liệu.
4. API phải nhất quán.
5. Question Type quyết định cách đánh giá Answer.
6. `answer()` đánh giá một câu.
7. `submit()` hoàn tất một Session.
8. Kết quả của một câu và kết quả toàn bài là hai khái niệm khác nhau.
