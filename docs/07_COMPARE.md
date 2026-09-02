# Compare

## Mục đích

Compare xác định hai tập giá trị đáp án có tương đương hay không.

```text id="m7tq2c"
Expected
    +
Actual
    ↓
 Compare
    ↓
 boolean
```

Compare không tạo `Result`.

Compare không biết:

* UI
* Session
* Navigation
* Timer
* Score
* Application state

## Public API

```js id="g8xq3n"
import compare from "@vngamemini/examination";
```

Hoặc sử dụng thông qua:

```js id="q7a4k2"
const exam = new Examination();

const result = exam.evaluate(question, actual);
```

Trong trường hợp này `evaluate()` gọi Compare internally.

## compare()

`compare()` nhận một `Question` và actual answer:

```js id="2f5g3p"
compare(question, actual);
```

Question phải là instance của `Question`.

Nếu không:

```text id="6j5q9b"
TypeError
```

được throw.

## compareAnswer()

Internal comparison function:

```text id="f8c0a1"
expected
actual
  ↓
normalizeSelection()
  ↓
compare
  ↓
boolean
```

## Selection Normalization

Một selection có thể là:

```text id="s4f8nm"
undefined
null
string
number
array
```

### Missing Value

```js id="7z4w6p"
undefined
```

hoặc:

```js id="2g0f4m"
null
```

được chuyển thành:

```js id="b8x9p1"
[]
```

### Single Value

```js id="9h1k4c"
"a1"
```

được chuyển thành:

```js id="8f4r3y"
["a1"]
```

### Multiple Values

```js id="7x1m8n"
["a1", "a2"]
```

được giữ dưới dạng collection.

## String Conversion

Các giá trị được chuyển thành string trước khi so sánh.

Ví dụ:

```text id="n2c5b7"
1
```

trở thành:

```text id="k8v4m1"
"1"
```

## Duplicate Removal

Compare loại bỏ duplicate:

```text id="p3d7x9"
["a1", "a1"]
```

trở thành:

```text id="r4h2s6"
["a1"]
```

Do đó:

```text id="b6m9q2"
["a1"]
=
["a1", "a1"]
```

về mặt selection.

## Order Independence

Thứ tự answer không ảnh hưởng đến kết quả.

```text id="v3k8q1"
["a1", "a2"]
=
["a2", "a1"]
```

Kết quả:

```text id="h6p2w4"
true
```

## Exact Set Equality

Hai selection được coi là giống nhau khi:

1. có cùng số lượng giá trị sau normalization
2. các giá trị tại từng vị trí sau sort giống nhau

Ví dụ:

```text id="m1r7c5"
expected: ["a1", "a3"]
actual:   ["a3", "a1"]

→ true
```

Nhưng:

```text id="j8q2v6"
expected: ["a1", "a3"]
actual:   ["a1"]

→ false
```

và:

```text id="p5x9d2"
expected: ["a1", "a3"]
actual:   ["a1", "a2"]

→ false
```

## Compare Does Not Grade

Compare chỉ trả về:

```text id="k7s1m3"
true
false
```

Nó không trả về:

```text id="e2v8q4"
correct
incorrect
unanswered
```

Việc tạo `Result` thuộc `evaluate()`.

```text id="c6h4w9"
Compare
  ↓
boolean
  ↓
Evaluate
  ↓
Result
```

## Evaluate Integration

```js id="w5j2r8"
const result = evaluate(question, actual);
```

Evaluate:

1. validate Question
2. resolve actual answer
3. gọi Compare
4. xác định status
5. tạo Result

```text id="q9n3x6"
Question
   │
   ├── correct
   │
   ▼
Evaluate ◄── actual
   │
   ▼
Compare
   │
   ▼
boolean
   │
   ▼
Result
```

## Multiple Correct Answers

Compare hỗ trợ nhiều correct answers.

```text id="z4c7m1"
expected: ["a1", "a2"]
actual:   ["a1", "a2"]

→ true
```

Thứ tự không quan trọng:

```text id="n8v2k5"
expected: ["a1", "a2"]
actual:   ["a2", "a1"]

→ true
```

Thiếu một answer:

```text id="r6d3p9"
expected: ["a1", "a2"]
actual:   ["a1"]

→ false
```

Thừa một answer:

```text id="u1x5q8"
expected: ["a1"]
actual:   ["a1", "a2"]

→ false
```

## Scope

Compare chỉ giải quyết equality của answer selections.

Không đưa vào Compare:

```text id="a7k4m2"
scoring
weight
partial credit
timer
randomization
navigation
session state
UI state
```

Nếu tương lai cần partial credit hoặc weighted scoring, đó là processing behavior mới và phải được thiết kế ở layer phù hợp.

## Source

```text id="v8q3n6"
src/compare/
├── compare.js
└── compareAnswer.js
```

### `compare.js`

Chịu trách nhiệm:

```text id="s2m7c4"
Question validation boundary
        ↓
compareAnswer()
```

### `compareAnswer.js`

Chịu trách nhiệm:

```text id="d9f1k6"
selection normalization
        ↓
set equality
```

## Nguyên tắc

Compare phải:

1. deterministic
2. không mutate input
3. không phụ thuộc UI
4. không phụ thuộc Session
5. không phụ thuộc Time
6. không phụ thuộc Random
7. không tính Score
8. không tạo Result

Compare chỉ trả lời một câu hỏi:

> Expected selection và actual selection có giống nhau không?
