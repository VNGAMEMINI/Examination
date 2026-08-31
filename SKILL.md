# Examination — SKILL

## 1. Purpose

Examination is a data-processing library for examination, quiz, assessment, and answer-evaluation applications.

The library exists to process examination data consistently.

The consuming application, such as `Check`, is responsible for the examination experience and user interface.

---

# 2. Core Principle

Examination must maintain **one unified processing flow**.

```text
Input
  ↓
Normalize
  ↓
Validate
  ↓
Question / Answer
  ↓
Compare
  ↓
Result
```

Every new feature must be evaluated against this flow.

If a feature does not belong to examination-data processing, it should not be added to the Examination core.

---

# 3. Responsibility Boundary

## Examination

Examination is responsible for:

* examination data
* data normalization
* data validation
* subjects
* questions
* answers
* answer comparison
* question types
* evaluation
* result generation
* score-related data
* extensible data processing

## Consumer

The consumer application is responsible for:

* UI
* rendering
* user interaction
* timer
* countdown
* random question order
* random answer order
* navigation
* previous / next controls
* auto-next
* settings UI
* animations
* application state related to presentation

---

# 4. Do Not Add UI Responsibilities

Never add UI behavior to Examination.

Do not add:

```text
DOM
React
Vue
HTML
CSS
Component
Navigation UI
Modal
Button
Input
```

Examination returns data.

The consumer decides how that data is displayed.

---

# 5. Time Is Not Examination Core

Do not create a `Time`, `Timer`, or `Countdown` system inside Examination unless a future architectural decision explicitly requires it.

Example:

```text
Incorrect:

Examination
 ├── Question
 ├── Answer
 ├── Compare
 └── Time
```

Preferred:

```text
Check
 ├── UI
 ├── Time
 ├── Random
 └── Navigation
          │
          ▼
     Examination
```

Time belongs to the application controlling the examination experience.

---

# 6. Random Is Not Examination Core

Do not create randomization logic inside Examination for normal examination flow.

The consumer may randomize:

```text
questions
answers
```

before passing or presenting the data.

Examination must evaluate the data it receives.

It must not care about the visual order chosen by the consumer.

---

# 7. Navigation Is Not Examination Core

Do not implement:

```text
next()
previous()
goTo()
currentIndex
```

as UI-navigation responsibilities inside the core.

The consumer decides how users move through questions.

Examination focuses on processing the question and answer data.

---

# 8. Internal Modules

Internal code may be separated into modules for maintainability.

Possible internal areas:

```text
src/
├── Examination.js
├── normalize/
├── validate/
├── question/
├── answer/
├── compare/
└── result/
```

These modules exist to keep the implementation organized.

They are not automatically public APIs.

---

# 9. Public API

The consumer should have a small and stable entry point.

Preferred:

```js
import Examination from "@vngamemini/examination";
```

Avoid requiring consumers to understand internal implementation.

Do not design the library around:

```js
import Time from "...";
import Random from "...";
import Compare from "...";
import Validator from "...";
```

The internal architecture belongs to Examination.

The consumer should interact with the public API.

---

# 10. Data Normalization

External data may use different property names.

For example:

```text
q → question
a → answers
c → correct
```

Example external input:

```js
{
  q: "We .................... from the USA.",
  a: ["is", "are", "being", "be"],
  c: 1
}
```

The normalizer converts this into the canonical internal representation.

```text
External Data
      ↓
  Normalize
      ↓
Canonical Data
```

Only the normalized representation should be used by the remaining processing pipeline.

---

# 11. Canonical Data

The library must avoid having different parts of the code understand different data formats.

Bad:

```text
Module A → a
Module B → answers
Module C → answerList
Module D → options
```

Preferred:

```text
Normalize
    ↓
answers
    ↓
All internal modules
```

One concept should have one canonical representation.

---

# 12. Validation

Validation must occur after normalization.

```text
Input
 ↓
Normalize
 ↓
Validate
```

Validation is responsible for determining whether the data structure is valid.

Validation should not:

* render UI
* randomize data
* navigate questions
* start timers
* compare user answers

---

# 13. Subjects

Subjects are part of examination data.

Example:

```js
{
  subjects: [
    {
      name: "Tiếng Anh",
      questions: [...]
    },
    {
      name: "IT Web",
      questions: [...]
    }
  ]
}
```

Subjects must be handled consistently.

Do not create different processing pipelines for different subjects.

The same question-processing pipeline should be reusable across subjects.

```text
Subjects
   ↓
Questions
   ↓
Normalize
   ↓
Validate
   ↓
Compare
   ↓
Result
```

---

# 14. Question Types

The architecture must support different answer mechanisms.

Possible types include:

```text
single
multiple
boolean
text
number
matching
ordering
```

Additional types may be introduced later.

Do not create unnecessary abstractions before an actual requirement exists.

---

# 15. Answer Processing

Answers are data.

Example:

```js
{
  text: "are",
  correct: true
}
```

or, after normalization:

```js
{
  id: "a1",
  text: "are"
}
```

The internal representation must be consistent.

The library must distinguish between:

```text
Correct answer data
```

and:

```text
User answer data
```

---

# 16. Compare

Compare is one of the central operations of Examination.

Basic flow:

```text
Question
   +
User Answer
   ↓
Compare
   ↓
Result
```

Example:

```text
Correct:
are

User:
are

Result:
correct
```

The comparison mechanism must be deterministic.

The same input must produce the same evaluation result.

---

# 17. Two Comparison Operations

Examination should support two levels of answer analysis.

## Complete Object Comparison

Analyze the complete answer object or collection.

Example:

```text
Expected answers
+
User answers
↓
Compare
↓
Complete result
```

## Individual Index Comparison

Analyze one answer at a specific index.

Example:

```text
Expected answer[index]
+
User answer[index]
↓
Compare
↓
Result
```

Both operations must ultimately follow the same comparison rules.

Do not implement two unrelated comparison systems.

---

# 18. Immediate Answer Evaluation

Examination may support immediate evaluation when the consumer provides an answer.

Example:

```js
const result = examination.compare(question, userAnswer);
```

Possible result:

```js
{
  correct: true
}
```

The consumer decides whether to display:

```text
Correct
Wrong
Explanation
Next question
```

Examination only provides the processing result.

---

# 19. Result

Result must remain data.

Example:

```js
{
  total: 10,
  correct: 8,
  wrong: 2,
  unanswered: 0,
  percentage: 80
}
```

Do not return UI elements.

Do not return HTML.

Do not control navigation.

---

# 20. Single Flow Rule

Every core feature should fit into:

```text
Input
 ↓
Normalize
 ↓
Validate
 ↓
Process
 ↓
Compare
 ↓
Result
```

Before adding a new module, ask:

1. What data does it process?
2. Where does it belong in the pipeline?
3. Does it duplicate an existing step?
4. Does it create a second processing path?
5. Does it belong to the consumer instead?

If the feature creates an unrelated processing path, reconsider the design.

---

# 21. Avoid Overengineering

Do not create classes only because a concept has a name.

For example, do not automatically create:

```text
TimeManager
RandomManager
NavigationManager
SessionManager
ExamController
QuizController
StateManager
PolicyManager
```

unless the requirement demonstrates that the abstraction is necessary.

Prefer the smallest implementation that correctly solves the current data-processing problem.

---

# 22. Maintainability

The project is expected to grow.

New code must therefore:

* have one clear responsibility
* follow the existing processing flow
* use canonical data
* avoid duplicated logic
* avoid circular dependencies
* keep public APIs stable
* be independently testable
* have predictable naming
* avoid hidden side effects

A larger project must become easier to control, not harder.

---

# 23. Naming

Names must describe responsibility clearly.

Prefer:

```text
normalize
validate
compare
question
answer
result
```

Avoid vague names such as:

```text
helper
manager
handler
processor
utility
common
misc
```

unless their responsibility is genuinely broad and clearly defined.

---

# 24. Consumer Independence

Examination must not depend on `Check`.

The dependency direction is:

```text
Check
  ↓
Examination
```

Never:

```text
Examination
  ↓
Check
```

Examination must remain usable by other applications.

For example:

```text
Check
      \
       \
        → Examination
       /
      /
Other App
```

---

# 25. Testing

Tests should follow the same architecture:

```text
Normalize
 ↓
Validate
 ↓
Question / Answer
 ↓
Compare
 ↓
Result
```

Each stage should have focused tests.

Do not test UI behavior in Examination.

---

# 26. Documentation Rule

Documentation must describe the current architecture.

Do not document planned features as existing features.

If a feature is not implemented, clearly label it as:

```text
Planned
```

or:

```text
Future
```

Do not let documentation and implementation diverge.

---

# 27. Change Rule

Before modifying the architecture:

1. Understand the existing pipeline.
2. Determine whether the new requirement belongs to Examination.
3. Check whether an existing module already solves the problem.
4. Avoid creating a parallel solution.
5. Update tests.
6. Update documentation.
7. Verify the public API remains consistent.

---

# 28. Final Rule

The most important rule of Examination is:

> **Keep Examination focused on processing examination data.**

The core should remain:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
QUESTION / ANSWER
  ↓
COMPARE
  ↓
RESULT
```

Everything outside this responsibility should remain outside the core unless a future requirement provides a strong architectural reason to include it.
