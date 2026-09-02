# Examination Contract

## 1. Package

```text
@vngamemini/examination
```

Contract này mô tả public behavior của Examination `0.1.x`.

Mục tiêu là giữ implementation, tests và documentation nhất quán.

---

## 2. Core purpose

Examination là một data-processing engine cho dữ liệu examination/quiz.

Core pipeline:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ├── COMPARE
  └── RESULT
  ↓
SUMMARY
  ↓
SCORE
  ↓
OUTPUT
```

---

## 3. Public exports

Package phải cung cấp:

```text
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

`default` phải trỏ tới `Examination`.

---

## 4. Answer contract

Source:

```text
src/answer/Answer.js
```

Constructor:

```js
new Answer({
  id,
  text,
  metadata,
});
```

Properties:

```text
id
text
metadata
```

Contract:

```text
id       → string
text     → string
metadata → object
```

`metadata` mặc định là object rỗng.

Collection metadata phải được bảo vệ khỏi mutation trực tiếp.

---

## 5. Question contract

Source:

```text
src/question/Question.js
```

Constructor:

```js
new Question({
  id,
  text,
  answers,
  correct,
  metadata,
});
```

Properties:

```text
id
text
answers
correct
metadata
```

Contract:

```text
id        → string
text      → string
answers   → Answer[]
correct   → string[]
metadata  → object
```

`answers` được canonicalize thành `Answer` instances.

---

## 6. Result contract

Source:

```text
src/result/Result.js
```

Contract:

```js
{
  (status, expected, actual, correct);
}
```

### status

Chỉ có:

```text
correct
incorrect
unanswered
```

### expected

```text
string[]
```

### actual

```text
string[]
```

### correct

```text
boolean
```

`correct === true` khi status là `correct`.

---

## 7. Summary contract

Source:

```text
src/summary/Summary.js
```

Constructor nhận:

```text
Result[]
```

Properties:

```text
total
correct
incorrect
unanswered
```

Contract:

```text
total       → number
correct     → number
incorrect   → number
unanswered  → number
```

Invariant:

```text
total = correct + incorrect + unanswered
```

---

## 8. Score contract

Source:

```text
src/score/Score.js
```

Constructor nhận:

```text
Summary
```

Properties:

```text
points
percentage
```

Contract:

```text
points      → number
percentage  → number
```

Điểm hiện tại:

```text
points = summary.correct
```

Phần trăm:

```text
percentage =
  summary.correct / summary.total × 100
```

Nếu `summary.total === 0`:

```text
percentage = 0
```

---

## 9. normalize contract

Source:

```text
src/normalize/normalize.js
```

Function:

```js
normalize(input);
```

Output luôn là:

```text
Question[]
```

### Question input

```text
Question
```

trở thành:

```text
[Question]
```

### Array input

```text
Question[] hoặc raw question[]
```

được normalize thành:

```text
Question[]
```

### Object input

Object có:

```js
{
  questions: [...]
}
```

được normalize thành:

```text
Question[]
```

### Unsupported root input

Root input không thuộc các dạng hỗ trợ được normalize thành:

```text
[]
```

---

## 10. normalizeQuestion contract

Source:

```text
src/normalize/normalizeQuestion.js
```

Raw question được chuyển thành `Question`.

Default ID:

```text
q0
q1
q2
...
```

Nếu không có text:

```text
""
```

Answers được normalize thành `Answer[]`.

---

## 11. normalizeAnswer contract

Source:

```text
src/normalize/normalizeAnswer.js
```

String:

```js
"Paris";
```

được chuyển thành:

```js
{
  id: "a0",
  text: "Paris"
}
```

Object answer được canonicalize:

```text
id → string
text → string
metadata → object
```

Primitive khác được chuyển thành answer hợp lệ theo normalization rules hiện tại.

---

## 12. Correct answer normalization

`correct` có thể là scalar hoặc collection.

Ví dụ:

```js
correct: "a1";
```

hoặc:

```js
correct: ["a1", "a3"];
```

Numeric value được hiểu là answer index.

Ví dụ:

```js
correct: 1;
```

được resolve thành ID của answer ở index `1`.

Nếu không resolve được, giá trị fallback được tạo theo normalization rules hiện tại.

---

## 13. validate contract

Source:

```text
src/validate/validate.js
```

Input hợp lệ:

```text
Question
Question[]
```

Nếu input không phải canonical Question hoặc Question collection:

```text
ValidationError
```

---

## 14. Question validation

Question phải:

```text
Question instance
id là non-empty string
text là string
answers là array
correct là array
metadata là object
```

---

## 15. Answer validation

Answer phải:

```text
Answer instance
id là non-empty string
text là string
metadata là object
```

---

## 16. Answer ID uniqueness

Một Question không được chứa duplicate answer IDs.

Ví dụ không hợp lệ:

```js
[
  { id: "a1", text: "A" },
  { id: "a1", text: "B" },
];
```

Validation phải throw `ValidationError`.

---

## 17. Correct answer references

Mỗi ID trong `Question.correct` phải tồn tại trong answer collection.

Ví dụ:

```js
answers: [
  { id: "a1", text: "A" }
],

correct: ["a2"]
```

là invalid.

Validation phải throw `ValidationError`.

---

## 18. Empty correct collection

`correct: []` là hợp lệ.

Điều này cho phép Question tồn tại mà chưa có đáp án đúng được khai báo.

---

## 19. compare contract

Source:

```text
src/compare/compare.js
src/compare/compareAnswer.js
```

Function:

```js
compare(question, actual);
```

`question` phải là `Question`.

Output:

```text
boolean
```

Compare sử dụng selection-set semantics.

---

## 20. Selection normalization

Compare:

- scalar thành collection
- `null`/`undefined` thành collection rỗng
- mọi value thành string
- duplicate bị loại bỏ
- thứ tự không có ý nghĩa

Ví dụ:

```text
["a1", "a2"]
```

và:

```text
["a2", "a1"]
```

được xem là tương đương.

---

## 21. evaluate contract

Source:

```text
src/evaluate/evaluate.js
```

Function:

```js
evaluate(question, actual);
```

Input:

```text
Question
actual
```

Output:

```text
Result
```

Evaluation phải validate Question trước khi evaluate.

---

## 22. Actual answer resolution

Evaluate hỗ trợ actual answer bằng:

```text
answer ID
```

hoặc:

```text
answer text
```

Nếu actual value khớp answer ID hoặc answer text, evaluation sử dụng canonical answer ID.

---

## 23. Unanswered evaluation

Nếu actual answer là:

```text
undefined
null
[]
```

evaluation tạo:

```text
Result.STATUS.UNANSWERED
```

với:

```text
actual = []
```

Đây là kết quả hợp lệ, không phải validation error.

---

## 24. Incorrect evaluation

Nếu có actual answer nhưng selection không khớp expected selection:

```text
Result.STATUS.INCORRECT
```

Đây là kết quả hợp lệ.

---

## 25. Correct evaluation

Nếu actual selection khớp expected selection:

```text
Result.STATUS.CORRECT
```

và:

```text
correct = true
```

---

## 26. evaluateCollection contract

Function:

```js
evaluateCollection(questions, answers);
```

Input:

```text
Question[]
answers[]
```

Output:

```text
Result[]
```

Mỗi Question sử dụng answer ở cùng index.

---

## 27. summarize contract

Source:

```text
src/summary/summarize.js
```

Function:

```js
summarize(results);
```

Input:

```text
Result[]
```

Output:

```text
Summary
```

---

## 28. score function contract

Source:

```text
src/score/score.js
```

Function:

```js
score(summary);
```

Input:

```text
Summary
```

Output:

```text
Score
```

---

## 29. Examination contract

Source:

```text
src/examination/Examination.js
```

`Examination` là facade chính.

Methods:

```text
normalize(input)
validate(input)
evaluate(question, actual)
evaluateCollection(questions, answers)
summary(results)
score(summary)
run(input, answers)
```

---

## 30. run contract

Function:

```js
examination.run(input, answers);
```

Pipeline:

```text
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

```js
{
  (results, summary, score);
}
```

---

## 31. Functional API consistency

Facade và functional API phải sử dụng cùng behavior.

Ví dụ:

```js
examination.normalize(input);
```

phải tương đương về behavior với:

```js
normalize(input);
```

Tương tự cho:

```text
validate
evaluate
summary
score
```

Không tạo implementation khác nhau cho facade.

---

## 32. Error contract

Các lỗi validation sử dụng:

```text
ValidationError
```

Các API yêu cầu một model cụ thể có thể throw `TypeError` khi nhận sai loại object theo implementation contract.

Error phải fail rõ ràng thay vì trả về dữ liệu không hợp lệ.

---

## 33. Mutation contract

Models không cung cấp setter cho các field chính.

Collection getter trả về collection độc lập với internal collection.

Consumer không được sửa internal state thông qua:

```text
answers
correct
metadata
```

---

## 34. Consumer boundary

Examination không quản lý:

```text
UI
DOM
React
Vue
Svelte
Navigation
Timer
Randomization
Application state
Session lifecycle
Rendering
```

Các responsibility này thuộc consumer.

---

## 35. Dependency contract

Dependency direction:

```text
Consumer
   ↓
Examination
```

Không được tạo dependency ngược từ Examination tới consumer.

---

## 36. Pipeline contract

Mọi high-level execution phải tuân thủ:

```text
Normalize
  ↓
Validate
  ↓
Evaluate
  ↓
Summary
  ↓
Score
```

Không bỏ qua hoặc tạo pipeline song song nếu không có requirement kiến trúc rõ ràng.

---

## 37. Public API stability

Các export sau được xem là public contract:

```text
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

Thay đổi breaking phải được xem xét như một API change.

---

## 38. Version contract

Contract này áp dụng cho:

```text
0.1.x
```

Nếu behavior thay đổi theo hướng breaking:

```text
major version
```

phải được xem xét theo semantic versioning.

---

## 39. Contract verification

Contract phải được kiểm tra bằng:

```text
unit tests
integration tests
contract tests
```

Các thành phần quan trọng:

```text
Answer
Question
Result
Summary
Score
Normalize
Validate
Compare
Evaluate
Examination
Public exports
```

---

## 40. Source of truth

Khi có sự khác biệt giữa documentation và implementation:

```text
Tests
  ↓
Implementation
  ↓
Contract
  ↓
Other documentation
```

Tuy nhiên, thay đổi implementation không được xem là hợp lệ chỉ vì code đã thay đổi.

Một behavior mới cần đồng bộ:

```text
Implementation
+
Tests
+
Contract
+
Documentation
```

---

## 41. Final contract

Examination được xem là ổn định khi:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ↓
RESULT[]
  ↓
SUMMARY
  ↓
SCORE
  ↓
OUTPUT
```

và public surface vẫn giữ:

```text
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

Đây là contract nền tảng của `@vngamemini/examination 0.1.x`.
