# API Design

## Mục tiêu

API phải nhất quán và dễ dùng.

## Examination

```js
const exam = new Examination(data)
```

Các nhóm API chính:

```text
exam
 ├── subjects()
 ├── subject(id)
 └── createSession(options)
```

## Session

```js
session.start()
session.pause()
session.resume()

session.current()

session.answer(value)

session.next()
session.previous()

session.submit()

session.result()
```

## Event

```js
session.on(event, callback)
```

## API không phụ thuộc UI

Không tạo API kiểu:

```js
session.render()
session.showQuestion()
session.updateButton()
```

## Một cách gọi — một ý nghĩa

```text
answer()   → trả lời câu hiện tại
next()     → chuyển câu
previous() → quay lại
submit()   → nộp bài
result()   → lấy kết quả
```

Tên API phải có ngữ nghĩa ổn định và không thay đổi theo UI consumer.
