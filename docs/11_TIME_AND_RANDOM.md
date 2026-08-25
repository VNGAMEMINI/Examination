# Time & Random

## Time

Time là service xử lý thời gian, không phải timer UI.

```text
Examination Time
       │
       ├── total time
       └── question time
```

Check chỉ hiển thị:

```text
44:59
```

Examination quản lý giá trị và trạng thái thời gian.

## Total time

```js
time.total = 2700
```

45 phút.

Khi hết thời gian, Session có thể chuyển sang trạng thái kết thúc theo policy.

## Per-question time

```js
time.perQuestion = 60
```

Mỗi câu có giới hạn riêng.

## Random

Random là service hỗ trợ Session.

```text
Session
 ├── Random Question
 └── Random Answer
```

### Random question

```text
1 2 3 4 5
↓
3 1 5 2 4
```

### Random answer

```text
A B C D
↓
C A D B
```

Điều bắt buộc:

> Random không được làm mất identity của đáp án đúng.

Nếu Answer dùng ID:

```js
{
  id: "a2",
  text: "are"
}
```

thì thứ tự hiển thị có thể thay đổi nhưng `a2` vẫn là đáp án đúng.
