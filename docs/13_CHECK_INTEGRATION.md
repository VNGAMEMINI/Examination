# Check Integration

## Vai trò

Check là consumer của Examination.

```text
              Examination
                   │
                   │ API
                   ▼
                Check
                   │
                   ▼
                 Web UI
```

## Khởi tạo

```js
import { Examination } from "@vngamemini/examination"

const exam = new Examination(data)
```

## Tạo Session

```js
const session = exam.createSession({
  candidate: "Nguyen Van A"
})
```

## Bắt đầu

```js
session.start()
```

## Lấy câu hiện tại

```js
const question = session.current()
```

Check dùng dữ liệu đó để render Question UI.

## Trả lời

```js
const result = session.answer(selectedAnswer)
```

Check có thể:

```js
if (result.correct) {
  // hiển thị đúng
}
```

hoặc không hiển thị kết quả ngay tùy mode/policy.

## Chuyển câu

Check gọi API của Session.

```js
session.next()
session.previous()
```

Examination quản lý state; Check quản lý nút bấm và giao diện.

## Submit

```js
const result = session.submit()
```

Check render Result UI.

## Nguyên tắc

Check không được tự viết lại:

```js
if (selected === correct) ...
```

Logic đánh giá phải nằm trong Examination.

```text
Check
  │
  └── "Người dùng chọn đáp án này"
             │
             ▼
       Examination
             │
             └── "Đây là kết quả"
```
