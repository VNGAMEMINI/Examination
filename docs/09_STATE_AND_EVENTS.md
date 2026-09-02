# State and Events

## Status

**Out of Core / Future Scope**

Examination 0.1.x không cung cấp state machine hoặc event system.

## Core Behavior

Examination thực hiện processing đồng bộ:

```text id="z6c1p4"
Input
  ↓
normalize()
  ↓
validate()
  ↓
evaluate()
  ↓
summary()
  ↓
score()
```

`run()` trả về execution result.

```js id="p8w4r2"
const result = exam.run(input, answers);
```

Không có lifecycle:

```text id="q5m9x1"
READY
RUNNING
PAUSED
SUBMITTED
FINISHED
```

## Không có Event API

Examination không cung cấp:

```js id="k2v7n3"
Examination không cung cấp event emitter hoặc lifecycle event API.
```

Examination không phát lifecycle events.

Các event như thay đổi câu hỏi, thay đổi câu trả lời,
thay đổi thời gian hoặc thay đổi trạng thái phiên thuộc
application/session layer.

## Vì sao

Event system phù hợp với application/UI lifecycle.

Ví dụ:

```text id="a3f8q6"
User
  ↓
UI
  ↓
Application State
  ↓
Session
  ↓
Examination
```

Examination chỉ cần xử lý dữ liệu khi được yêu cầu.

## Future State Layer

Nếu cần state management, có thể xây dựng ở consumer:

```text id="h7m2v9"
Application State
      │
      ├── currentQuestion
      ├── answers
      ├── status
      └── time
             │
             ▼
       Examination
```

Examination không cần biết state đó đến từ đâu.

## Future Events

Nếu một package Session được xây dựng trong tương lai, event system có thể thuộc package đó.

Ví dụ:

```text id="r4n8c2"
Session
  ├── state
  └── events
```

Không thêm event system vào Examination chỉ vì Session cần nó.

## Nguyên tắc

State và Events thuộc lifecycle/application layer.

Examination chỉ chịu trách nhiệm xử lý dữ liệu.
