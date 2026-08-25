# Examination

> Data processing engine for web examinations, quizzes, practice systems and assessments.

## Examination là gì?

Examination là thư viện xử lý **dữ liệu và logic** cho hệ thống làm bài.

Nó không phải giao diện web.

```text
Exam Data
   ↓
Examination
   ↓
Answer / Compare / Score / Time / Session / Result
   ↓
Any UI Consumer
```

Một consumer tiêu biểu là **Check**.

## Khác biệt giữa Examination và Check

```text
Examination
= xử lý dữ liệu

Check
= hiển thị dữ liệu
```

Check có thể sử dụng React, Vue hoặc Vanilla JS mà không cần thay đổi core Examination.

## Các khả năng chính

- Flexible input normalization
- Data validation
- Subject management
- Question management
- Answer evaluation
- Multiple question types
- Random question
- Random answer
- Session state
- Total time
- Per-question time
- AnswerResult
- ExamResult
- Score
- Extensible policies
- Event-based integration

## Ví dụ ý tưởng API

```js
import { Examination } from "@vngamemini/examination"

const exam = new Examination(data)

const session = exam.createSession({
  candidate: "Nguyen Van A"
})

session.start()

const question = session.current()

const answerResult = session.answer(1)

console.log(answerResult)

const result = session.submit()

console.log(result)
```

## Documentation

- [Overview](./00_OVERVIEW.md)
- [Architecture](./01_ARCHITECTURE.md)
- [Data Pipeline](./02_DATA_PIPELINE.md)
- [Data Model](./03_DATA_MODEL.md)
- [Normalizer](./04_NORMALIZER.md)
- [Validator](./05_VALIDATOR.md)
- [Question Types](./06_QUESTION_TYPES.md)
- [Compare](./07_COMPARE.md)
- [Session](./08_SESSION.md)
- [State & Events](./09_STATE_AND_EVENTS.md)
- [Settings & Policy](./10_SETTINGS_AND_POLICY.md)
- [Time & Random](./11_TIME_AND_RANDOM.md)
- [Score & Result](./12_SCORE_AND_RESULT.md)
- [Check Integration](./13_CHECK_INTEGRATION.md)
- [API Design](./14_API_DESIGN.md)
- [Extensibility](./15_EXTENSIBILITY.md)
- [Workflow](./16_WORKFLOW.md)
- [Rules](./17_RULES.md)

## Design principle

> Examination xử lý câu trả lời. Consumer quyết định cách hiển thị kết quả.

## Status

Kiến trúc tài liệu này là blueprint cho giai đoạn xây dựng core. API và tên class cụ thể chỉ nên được coi là ổn định sau khi implementation và test tương ứng được hoàn thiện.
