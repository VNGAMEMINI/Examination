# State & Events

## State

Session cần có trạng thái rõ ràng.

```text
READY
  │
  ▼
RUNNING
  │
  ├── PAUSED
  │      │
  │      ▼
  │   RUNNING
  │
  ▼
SUBMITTED
  │
  ▼
FINISHED
```

Các state có thể được mở rộng tùy thiết kế API.

## Vì sao cần State?

Check không phải tự suy đoán:

```js
if (session.state === "finished") {
  // render result
}
```

Examination là nguồn sự thật về trạng thái Session.

## Events

Examination có thể phát event để consumer biết có thay đổi.

Ví dụ:

```js
session.on("answer", callback)
session.on("questionChanged", callback)
session.on("time", callback)
session.on("state", callback)
session.on("finish", callback)
```

Event chỉ thông báo dữ liệu hoặc trạng thái.

Event không render UI.

## Check

```text
Examination
    │
    │ event
    ▼
  Check
    │
    ▼
 render UI
```
