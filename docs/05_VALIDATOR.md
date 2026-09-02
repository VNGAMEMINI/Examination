# Validator

## Mục đích

Validator kiểm tra canonical model sau normalization.

```text
Input
  ↓
Normalize
  ↓
Question[]
  ↓
Validate
  ↓
Valid / ValidationError
```

Validator không normalize dữ liệu.

## Public API

```js
import validate from "@vngamemini/examination";
```

Hoặc:

```js
const exam = new Examination();

exam.validate(questions);
```

API trả về:

```text
true
```

nếu dữ liệu hợp lệ.

Nếu không hợp lệ, Validator throw `ValidationError`.

## Validation Input

Validator nhận:

* một `Question`
* một array của `Question`

```js
validate(question);
```

hoặc:

```js
validate([question1, question2]);
```

Input không phải `Question` hoặc `Question[]` sẽ tạo `ValidationError`.

## Question Validation

Question phải là instance của:

```js
Question
```

### ID

```text
id: non-empty string
```

Không hợp lệ:

```js
id: ""
id: 123
id: null
```

### Text

`text` phải là string.

```js
text: "What is JavaScript?"
```

### Answers

`answers` phải là array.

Mỗi answer phải là instance của:

```js
Answer
```

## Answer Validation

Mỗi Answer phải có:

```text
id
text
metadata
```

### Answer ID

Phải là non-empty string.

```js
id: "a1"
```

### Answer Text

Phải là string.

```js
text: "Paris"
```

### Answer Metadata

Phải là object.

Không hợp lệ:

```js
metadata: null
metadata: []
metadata: "value"
```

## Duplicate Answer IDs

Một Question không được có hai Answer cùng ID.

Ví dụ không hợp lệ:

```js
answers: [
  { id: "a1", text: "Paris" },
  { id: "a1", text: "London" }
]
```

Validator tạo:

```text
Duplicate answer id: a1
```

## Correct Answers

`correct` phải là array.

Mỗi ID trong `correct` phải tồn tại trong Question answers.

Ví dụ:

```js
answers: [
  { id: "a1", text: "Paris" },
  { id: "a2", text: "London" }
],

correct: ["a1"]
```

hợp lệ.

Trong khi:

```js
correct: ["a3"]
```

không hợp lệ vì `a3` không tồn tại.

## Empty Correct

Validator hiện tại không yêu cầu Question phải có ít nhất một correct answer.

Do đó:

```js
correct: []
```

không tự động bị xem là validation error.

## Metadata

Question metadata phải là object.

Hợp lệ:

```js
metadata: {}
```

Không hợp lệ:

```js
metadata: null
metadata: []
metadata: "text"
```

## Error Type

Validation failure sử dụng:

```js
ValidationError
```

Consumer có thể:

```js
try {
  exam.validate(questions);
} catch (error) {
  if (error instanceof ValidationError) {
    // handle validation error
  }
}
```

## Validation Flow

```text
validate()
    │
    ├── Question?
    │      ↓
    │   validateQuestion()
    │
    └── Question[]?
           ↓
      validateQuestion()
           │
           ├── Question identity
           ├── Question id
           ├── Question text
           ├── Answers
           ├── Answer identity
           ├── Answer id
           ├── Answer text
           ├── Answer metadata
           ├── Duplicate answer ids
           ├── Correct answers
           └── Question metadata
```

## Source Files

```text
src/validate/
├── validate.js
├── validateQuestion.js
└── validateAnswer.js
```

Responsibilities:

```text
validate.js
    → validation entry point

validateQuestion.js
    → Question validation

validateAnswer.js
    → Answer validation
```

## Boundary

Normalizer:

```text
raw data
  ↓
canonical data
```

Validator:

```text
canonical data
  ↓
valid / invalid
```

Evaluator:

```text
valid Question
  +
actual answer
  ↓
Result
```

Không gộp ba trách nhiệm này thành một module.

## Nguyên tắc

Validator phải:

1. kiểm tra canonical model
2. fail rõ ràng bằng `ValidationError`
3. không mutate Question
4. không normalize
5. không evaluate
6. không compare
7. không score
8. không quản lý UI hoặc application state
