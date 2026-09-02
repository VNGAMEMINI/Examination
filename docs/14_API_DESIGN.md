# API Design

## 1. Mục đích

Public API của `@vngamemini/examination` được thiết kế để cung cấp một data-processing engine đơn giản và ổn định.

Public API chỉ bao gồm những thành phần cần thiết cho pipeline:

```text id="7k6x1v"
Input
  ↓
normalize
  ↓
validate
  ↓
evaluate
  ↓
summarize
  ↓
score
```

---

## 2. Public API

Package export các thành phần sau:

```text id="3t5b1h"
Answer
Examination
Question
Result
Score
Summary
ValidationError

compare
evaluate
normalize
score
summarize
validate

default
```

`default` export chính là `Examination`.

---

## 3. Examination

`Examination` là facade chính của package.

```js id="v9z0z7"
import Examination from "@vngamemini/examination";

const examination = new Examination();
```

Các method:

```text id="o5tx0h"
normalize(input)
validate(input)
evaluate(question, actual)
evaluateCollection(questions, answers)
summary(results)
score(summary)
run(input, answers)
```

---

## 4. normalize

```js id="9m55z0"
examination.normalize(input);
```

Chuyển input thành:

```text id="w1d8i4"
Question[]
```

Các dạng input chính:

```text id="8x5pby"
Question
Question[]
{ questions: [...] }
```

Input không hợp lệ ở cấp root sẽ được normalize thành collection rỗng theo behavior hiện tại.

Normalization không thực hiện:

```text id="8oy0yn"
validation
evaluation
scoring
navigation
timer
randomization
```

---

## 5. validate

```js id="o2z4c4"
examination.validate(input);
```

Validation yêu cầu dữ liệu canonical phải là:

```text id="k4qu45"
Question
```

hoặc:

```text id="m5dr4v"
Question[]
```

Nếu dữ liệu không hợp lệ, `ValidationError` được ném ra.

---

## 6. evaluate

```js id="52kgjh"
examination.evaluate(question, actual);
```

Input:

```text id="slw7qk"
Question
actual answer
```

Output:

```text id="5vq0pc"
Result
```

Evaluation thực hiện:

```text id="f1b8ds"
validate question
      ↓
resolve actual answer
      ↓
compare
      ↓
create Result
```

---

## 7. evaluateCollection

```js id="5w7f38"
examination.evaluateCollection(questions, answers);
```

Input:

```text id="7hz5z8"
Question[]
answers[]
```

Output:

```text id="6nt7kd"
Result[]
```

Mỗi vị trí trong `answers` tương ứng với một `Question`.

---

## 8. summary

```js id="8tq0kg"
examination.summary(results);
```

Input:

```text id="t7x0i3"
Result[]
```

Output:

```text id="q4m2vz"
Summary
```

`Summary` tổng hợp:

```text id="z7c9nl"
total
correct
incorrect
unanswered
```

---

## 9. score

```js id="cz2j7s"
examination.score(summary);
```

Input:

```text id="a7r3q5"
Summary
```

Output:

```text id="8n1m6p"
Score
```

`Score` hiện tại cung cấp:

```text id="k4w5ts"
points
percentage
```

---

## 10. compare

```js id="b0g8t1"
compare(question, actual);
```

`compare` kiểm tra tập đáp án thực tế có bằng tập đáp án đúng hay không.

Kết quả:

```text id="q7k9p3"
true
```

hoặc:

```text id="c4r1x8"
false
```

Compare không tạo `Result` và không tính điểm.

---

## 11. Data classes

### Answer

```text id="t6n4jw"
id
text
metadata
```

### Question

```text id="h3p8kz"
id
text
answers
correct
metadata
```

### Result

```text id="v2m6qs"
status
expected
actual
correct
```

### Summary

```text id="c8y4mx"
total
correct
incorrect
unanswered
```

### Score

```text id="n5q7wd"
points
percentage
```

---

## 12. ValidationError

```js id="j5z8q2"
import { ValidationError } from "@vngamemini/examination";
```

`ValidationError` được sử dụng cho lỗi dữ liệu không đáp ứng contract validation.

---

## 13. default export

Package hỗ trợ:

```js id="y8r4f1"
import Examination from "@vngamemini/examination";
```

Tương đương với:

```js id="j2m9vc"
import { Examination } from "@vngamemini/examination";
```

---

## 14. Named exports

Package cũng hỗ trợ:

```js id="z1x6pt"
import {
  Answer,
  Question,
  Result,
  Summary,
  Score,
  ValidationError,
  normalize,
  validate,
  compare,
  evaluate,
  summarize,
  score,
  Examination,
} from "@vngamemini/examination";
```

---

## 15. Facade và functional API

Hai cách sử dụng đều được hỗ trợ.

### Facade

```js id="p8f2ym"
const examination = new Examination();

const output = examination.run(quiz, answers);
```

### Functional

```js id="r5d9kx"
const questions = normalize(quiz);

validate(questions);

const results = questions.map((question, index) =>
  evaluate(question, answers[index]),
);

const summary = summarize(results);
const scoreResult = score(summary);
```

Facade không tạo ra pipeline khác.

Cả hai đều sử dụng cùng implementation.

---

## 16. run

`run()` là entry point cấp cao nhất.

```js id="m6k2qx"
examination.run(input, answers);
```

Pipeline:

```text id="v4h8cn"
input
 ↓
normalize
 ↓
validate
 ↓
evaluateCollection
 ↓
summary
 ↓
score
```

Output:

```js id="j9s3wd"
{
  (results, summary, score);
}
```

---

## 17. API không thuộc Examination

Các API sau không thuộc public API:

```text id="f7x2qm"
Session
Navigation
Timer
Randomization
UI state
Application state
Rendering
Event emitter
Application mode
```

Examination không cung cấp API cho các chức năng này.

---

## 18. API stability

Public API cần được xem là contract của package.

Không tự ý:

- đổi tên export
- đổi kiểu dữ liệu trả về
- đổi tên thuộc tính
- thay đổi semantics của `compare`
- thay đổi status của `Result`
- thêm dependency vào UI hoặc application layer

Mọi thay đổi breaking phải được xác định rõ trước khi triển khai.

---

## 19. Dependency boundary

Public API được thiết kế để consumer sử dụng Examination như một thư viện độc lập:

```text id="r3k7vs"
Application
    ↓
Examination API
    ↓
Processing Pipeline
```

Examination không biết consumer đang sử dụng framework, UI library hoặc application architecture nào.

---

## 20. API contract hiện tại

Contract của phiên bản hiện tại:

```text id="w8p3fz"
Answer
Examination
Question
Result
Score
Summary
ValidationError

compare
evaluate
normalize
score
summarize
validate

default
```

Đây là public surface cần được kiểm thử bằng contract tests và giữ ổn định trong quá trình mở rộng package.
