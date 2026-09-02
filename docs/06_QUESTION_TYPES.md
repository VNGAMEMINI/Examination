# Question Types

## Mục đích

Examination hiện sử dụng một `Question` model thống nhất.

Thư viện **không tạo class riêng cho từng loại câu hỏi** ở core hiện tại.

```text id="x8gk4q"
Question
 ├── id
 ├── text
 ├── answers[]
 ├── correct[]
 └── metadata
```

Điều này giúp pipeline giữ được một representation đơn giản:

```text id="9q5r4a"
Input
  ↓
Normalize
  ↓
Question
  ↓
Validate
  ↓
Evaluate
```

## Question hiện tại

Một Question cơ bản:

```js id="o2t8x4"
{
  id: "q1",
  text: "What is the capital of France?",
  answers: [
    {
      id: "a1",
      text: "Paris"
    },
    {
      id: "a2",
      text: "London"
    }
  ],
  correct: ["a1"]
}
```

## Single Correct Answer

Một câu hỏi có một đáp án đúng:

```js id="4v2v7r"
{
  correct: ["a1"]
}
```

Input raw cũng có thể sử dụng:

```js id="3x6vqn"
{
  correct: "a1"
}
```

Normalizer chuyển thành:

```js id="fzf6jr"
["a1"]
```

## Multiple Correct Answers

Question có thể có nhiều đáp án đúng:

```js id="x8j4my"
{
  correct: ["a1", "a3"]
}
```

Evaluate sử dụng Compare để kiểm tra tập actual answers.

Thứ tự không quan trọng:

```text id="7twzpu"
expected: ["a1", "a3"]
actual:   ["a3", "a1"]

→ correct
```

Actual phải chứa đầy đủ tập đáp án đúng.

```text id="y3d7h4"
expected: ["a1", "a3"]
actual:   ["a1"]

→ incorrect
```

## Unanswered Question

Question không có actual answer:

```js id="s2jjf7"
exam.evaluate(question, undefined);
```

hoặc:

```js id="5trj8d"
exam.evaluate(question, null);
```

hoặc:

```js id="0x6k1p"
exam.evaluate(question, []);
```

sẽ tạo:

```js id="p8x8m5"
{
  status: "unanswered"
}
```

## Answer Identity

Answer được xác định bằng `id`.

Ví dụ:

```js id="f9c9x0"
{
  id: "a1",
  text: "Paris"
}
```

Actual có thể được resolve từ text:

```js id="u4c7hr"
exam.evaluate(question, "Paris");
```

Evaluate resolve text về:

```text id="w9j6aq"
"Paris"
   ↓
"a1"
```

Result lưu actual canonical identity:

```js id="4y1x8r"
["a1"]
```

## Numeric Answer Values

Actual numeric value được chuyển thành string.

Ví dụ:

```js id="3k3vnm"
exam.evaluate(question, 1);
```

được normalize thành:

```text id="0e4d9r"
["1"]
```

Giá trị này không tự động được coi là answer index.

Answer index chỉ được sử dụng trong normalization của `correct`.

## Question Metadata

Question có thể chứa metadata:

```js id="g0y5do"
{
  id: "q1",
  text: "Capital of France?",
  answers: [...],
  correct: ["a1"],
  metadata: {
    category: "geography",
    difficulty: "easy"
  }
}
```

Metadata không tham gia compare hoặc score trong core hiện tại.

## Question Type Through Metadata

Consumer có thể sử dụng metadata để mô tả loại câu hỏi:

```js id="0fd7ot"
metadata: {
  type: "multiple-choice"
}
```

hoặc:

```js id="n3b9y4"
metadata: {
  type: "true-false"
}
```

Examination không tự động tạo behavior riêng dựa trên các giá trị metadata này.

Metadata chỉ là dữ liệu.

## Không tạo Type System khi chưa cần

Không nên thêm các class như:

```text id="xq7x4g"
MultipleChoiceQuestion
TrueFalseQuestion
TextQuestion
MatchingQuestion
OrderingQuestion
```

chỉ để biểu diễn các biến thể khi core chưa có behavior tương ứng.

Việc thêm class phải xuất phát từ một processing requirement thực tế.

## Mở rộng Question

Nếu tương lai xuất hiện một question type cần behavior riêng, phải xác định trước:

1. behavior khác ở Normalize?
2. behavior khác ở Validate?
3. behavior khác ở Compare?
4. behavior khác ở Evaluate?
5. hay chỉ khác metadata?

Nếu chỉ khác dữ liệu, ưu tiên giữ cùng `Question` model.

Nếu khác processing behavior, mở rộng đúng layer thay vì tạo một hệ thống type độc lập.

## Question Type Boundary

```text id="5xg6y3"
Question Type
     │
     ├── Data difference
     │      ↓
     │   metadata
     │
     └── Processing difference
            ↓
      appropriate pipeline layer
```

Không đưa behavior vào UI chỉ vì Question được hiển thị khác nhau.

## Current Scope

Core hiện tại hỗ trợ:

* single correct answer
* multiple correct answers
* unanswered question
* answer ID
* answer text resolution
* question metadata
* answer metadata

Core chưa định nghĩa riêng:

* drag and drop questions
* matching engine
* ordering engine
* free-text grading engine
* media-specific grading
* adaptive questions

Những chức năng này chỉ nên được thêm khi có requirement rõ ràng và có processing contract tương ứng.

## Source

Question model:

```text id="y4e3b8"
src/question/Question.js
```

Question normalization:

```text id="0u6jhl"
src/normalize/normalizeQuestion.js
```

Question validation:

```text id="x5y2km"
src/validate/validateQuestion.js
```

Question evaluation:

```text id="8r0tqa"
src/evaluate/evaluate.js
```

## Nguyên tắc

`Question` là canonical data model.

Không biến `Question` thành nơi chứa:

* UI state
* navigation
* timer
* randomization
* session state
* scoring logic

Question chỉ đại diện cho dữ liệu của một câu hỏi.
