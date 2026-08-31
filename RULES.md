# Examination — RULES

> This document defines the mandatory development rules for the Examination library.

---

# 1. Core Rule

Examination is a **data-processing library**.

The primary responsibility is:

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

Every core implementation must respect this flow.

Do not create unrelated processing flows for the same data.

---

# 2. Examination Must Remain Independent

Examination must not depend on `Check`.

Allowed:

```text
Check
  ↓
Examination
```

Forbidden:

```text
Examination
  ↓
Check
```

Never import:

```text
Check UI
Check components
Check settings
Check navigation
Check timer
Check-specific state
```

from Examination.

---

# 3. No UI

Do not put UI responsibilities into Examination.

Forbidden:

```text
React
Vue
DOM
HTML
CSS
JSX
Components
Events
Buttons
Modals
Navigation UI
```

Examination returns data.

The consumer decides how to display that data.

---

# 4. No Time System

Do not implement these as Examination core features:

```text
Time
Timer
Countdown
TimeManager
QuestionTimer
ExamTimer
```

Time belongs to the consuming application.

Example:

```text
Check
 ├── Timer
 └── Examination
```

not:

```text
Examination
 ├── Timer
 └── Question
```

---

# 5. No Random System

Do not implement randomization as an Examination core responsibility.

Forbidden as core responsibilities:

```text
Random
RandomManager
RandomQuestion
RandomAnswer
ShuffleManager
```

The consumer may randomize questions or answers.

Examination must evaluate the resulting data consistently.

---

# 6. No Navigation System

Navigation belongs to the consumer.

Do not add:

```text
next()
previous()
goTo()
currentQuestion
questionNavigator
NavigationManager
```

to solve UI navigation.

Examination processes questions.

It does not decide which question the user should see next.

---

# 7. One Responsibility Per Module

Every module must have a clear responsibility.

Preferred:

```text
normalize/
validate/
question/
answer/
compare/
result/
```

Avoid modules with unclear responsibilities such as:

```text
helper/
manager/
common/
misc/
utility/
```

unless their purpose is explicitly defined.

---

# 8. One Concept — One Canonical Representation

Do not allow different internal modules to use different names for the same concept.

Bad:

```text
Module A → a
Module B → answers
Module C → options
Module D → choices
```

Preferred:

```text
Normalizer
    ↓
answers
    ↓
All internal modules
```

External aliases are allowed.

Internal aliases are not.

---

# 9. Normalize Before Processing

External data must be normalized before entering the core processing system.

Correct:

```text
External Data
      ↓
Normalize
      ↓
Validate
      ↓
Process
```

Incorrect:

```text
External Data
 ├── Module A understands q
 ├── Module B understands question
 └── Module C understands quizQuestion
```

Only the normalization layer should be responsible for translating supported external formats.

---

# 10. External Aliases

Supported external aliases may include:

```text
q        → question
a        → answers
c        → correct
```

Example:

```js
{
  q: "2 + 2 = ?",
  a: ["3", "4"],
  c: 1
}
```

After normalization:

```js
{
  question: "2 + 2 = ?",
  answers: [...],
  correct: [...]
}
```

Do not spread alias handling throughout the codebase.

---

# 11. Validation Comes After Normalization

The required order is:

```text
Input
 ↓
Normalize
 ↓
Validate
```

Do not make every module independently validate raw external formats.

Validation should work against the canonical representation.

---

# 12. Validation Does Not Modify Data

Validation determines whether data is valid.

It should not silently repair or transform data.

Bad:

```text
Validate
 ↓
Modify invalid data
 ↓
Continue
```

Preferred:

```text
Normalize
 ↓
Validate
 ├── valid
 └── invalid → error
```

If data needs transformation, that belongs to normalization.

---

# 13. Question Rules

A question must remain data-oriented.

A question may contain:

```text
id
type
content
answers
correct
metadata
```

A question must not contain:

```text
DOM
React state
timer
navigation
UI state
```

---

# 14. Answer Rules

Answers must have a predictable internal structure.

Prefer stable identifiers:

```js
{
  id: "a1",
  text: "are"
}
```

Do not rely exclusively on visual index when the application may reorder answers.

This is especially important because Check may randomize answer order.

---

# 15. Expected Answer vs User Answer

Always distinguish between:

```text
Expected Answer
```

and:

```text
User Answer
```

They are different data sources.

Example:

```text
Expected
   ↓
Examination

User
   ↓
Examination
```

The comparison layer determines whether they match.

---

# 16. Compare Is Deterministic

For the same normalized input, comparison must produce the same result.

Example:

```text
Expected: are
User:     are
          ↓
        true
```

```text
Expected: are
User:     is
          ↓
        false
```

Do not introduce random or time-dependent behavior into comparison.

---

# 17. Two Comparison Levels

The comparison system must support two conceptual operations.

## Complete Object Comparison

Compare the complete expected answer object/collection against the user's answer object/collection.

```text
Expected Object
      +
User Object
      ↓
Complete Compare
      ↓
Result
```

## Individual Index Comparison

Compare a specific answer at an index.

```text
Expected[index]
      +
User[index]
      ↓
Index Compare
      ↓
Result
```

These operations must share the same underlying comparison rules.

Do not create two unrelated comparison algorithms.

---

# 18. Immediate Evaluation

The library may evaluate a user's answer immediately.

Conceptually:

```js
const result = examination.compare(
  question,
  userAnswer
);
```

The result belongs to Examination.

The presentation belongs to Check.

For example, Examination may return:

```js
{
  correct: true
}
```

Check decides whether to display:

```text
Correct
```

or perform another action.

---

# 19. Result Is Data Only

Result objects must contain data.

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

Do not return:

```text
HTML
JSX
DOM nodes
React elements
UI components
```

---

# 20. Subjects

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

All subjects must use the same processing architecture.

Do not create:

```text
EnglishProcessor
ITProcessor
MathProcessor
```

unless a genuine domain-specific requirement exists.

The default processing path is shared.

---

# 21. Question Types

The architecture may support:

```text
single
multiple
boolean
text
number
matching
ordering
```

Do not implement every possible type before there is a real requirement.

When adding a type:

1. Define its data model.
2. Define normalization.
3. Define validation.
4. Define comparison rules.
5. Add tests.
6. Update documentation.

---

# 22. No Premature Abstraction

Do not create abstractions only for hypothetical future requirements.

Avoid automatically creating:

```text
BaseManager
BaseProcessor
AbstractQuiz
SessionController
ExamController
StateManager
PolicyManager
```

unless the architecture actually requires them.

Prefer simple code with clear responsibilities.

---

# 23. No Duplicate Logic

Never duplicate the same processing logic in multiple locations.

Bad:

```text
CompareSingle.js
Question.js
Answer.js
CheckAnswer.js
```

all independently determining whether an answer is correct.

Preferred:

```text
                Compare
              /         \
 Complete Compare     Index Compare
        \                /
         Shared Rules
```

There should be one source of truth for comparison behavior.

---

# 24. Avoid Hidden Side Effects

Core data-processing functions should be predictable.

Avoid functions that unexpectedly:

```text
modify unrelated objects
change global state
change question order
change answer order
start timers
navigate
render UI
```

Prefer:

```text
input → output
```

with clearly documented mutation behavior when mutation is genuinely required.

---

# 25. Public API

Keep the public API small.

Preferred:

```js
import Examination from "@vngamemini/examination";
```

Consumers should not need to understand internal modules.

Do not expose every internal class simply because it exists.

---

# 26. Internal vs Public

Internal implementation:

```text
src/
├── normalize/
├── validate/
├── question/
├── answer/
├── compare/
└── result/
```

Public API:

```text
Examination
```

Only intentionally supported functionality should become public.

---

# 27. Naming Rules

Names must clearly describe their responsibility.

Prefer:

```text
normalize
validate
question
answer
compare
result
```

Avoid vague names:

```text
helper
manager
handler
stuff
common
misc
```

A name should make it possible to understand the purpose without opening the file.

---

# 28. File Organization

Files should be grouped by responsibility.

Preferred:

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

Do not organize unrelated functionality into one large file simply because the code is short.

Do not create unnecessary directory depth.

---

# 29. Dependency Direction

Dependencies should move toward the core processing pipeline.

Conceptually:

```text
Public API
    ↓
Processing
    ↓
Domain Data
```

Avoid circular dependencies.

Forbidden:

```text
A → B
B → C
C → A
```

If circular dependencies appear, reconsider the responsibility boundaries.

---

# 30. Consumer Settings

Settings such as:

```js
{
  name: "VNGAMEMINI",
  randomAnswer: true,
  randomQuestion: false,
  time: 45,
  timeQuestion: 1,
  mode: "free",
  autoNext: true
}
```

are primarily consumer settings.

Do not automatically place the entire settings object inside Examination.

Only pass the data Examination actually needs.

---

# 31. Check JSON Files

Files such as:

```text
anh.json
test.json
```

are consumer-side data examples.

They may be used as compatibility references when designing normalization.

They are not the Examination internal model.

---

# 32. Error Handling

Errors must clearly identify the processing problem.

Avoid vague errors such as:

```text
Error
Invalid
Something went wrong
```

Prefer errors that identify:

```text
data
field
question
answer
index
reason
```

Example concept:

```text
Invalid correct answer index: 5.
Question contains 4 answers.
```

---

# 33. Tests Are Mandatory

Every core behavior must have tests.

At minimum:

```text
Normalization
Validation
Question
Answer
Compare
Result
```

When fixing a bug:

1. Reproduce it with a test.
2. Fix the implementation.
3. Confirm the test passes.
4. Run related tests.

Do not fix behavior without protecting it with a test when practical.

---

# 34. Documentation Must Follow Code

When architecture changes:

```text
Code
+
Tests
+
Docs
```

must be updated together.

Do not leave old documentation describing removed features.

---

# 35. No False Features

Never document a feature as implemented if it is only planned.

Use explicit labels:

```text
Planned
Future
Experimental
```

when appropriate.

---

# 36. Breaking Changes

Do not change the public data contract casually.

Before changing a public API:

1. Identify affected consumers.
2. Determine whether compatibility can be preserved.
3. Update tests.
4. Update documentation.
5. Clearly document the breaking change if unavoidable.

---

# 37. Extension Rule

When adding a feature, first determine whether it belongs to:

```text
Examination
```

or:

```text
Consumer
```

Use this decision:

```text
Does it process examination data?
        │
       Yes
        ↓
Examination candidate

Does it control user experience?
        │
       Yes
        ↓
Consumer candidate
```

Examples:

```text
Compare answers → Examination
Normalize JSON → Examination
Validate question → Examination

Timer → Consumer
Random → Consumer
Navigation → Consumer
UI → Consumer
Auto Next → Consumer
```

---

# 38. Development Sequence

When implementing a new core feature, follow:

```text
1. Define data
2. Normalize
3. Validate
4. Process
5. Compare
6. Return result
7. Test
8. Document
```

Do not skip directly from raw input to specialized business logic.

---

# 39. Review Checklist

Before considering a change complete, verify:

```text
[ ] Does it belong to Examination?
[ ] Does it follow the main processing flow?
[ ] Is input normalized?
[ ] Is data validated?
[ ] Is there one canonical representation?
[ ] Is logic duplicated?
[ ] Is the public API unnecessarily expanded?
[ ] Does it introduce UI responsibility?
[ ] Does it introduce Time?
[ ] Does it introduce Random?
[ ] Does it introduce Navigation?
[ ] Are tests included?
[ ] Is documentation updated?
```

---

# 40. Final Rule

The most important rule is:

> **Do not turn Examination into a complete quiz application.**

Examination is the processing engine.

```text
                 CHECK
          ┌─────────────────┐
          │ UI              │
          │ Time            │
          │ Random          │
          │ Navigation      │
          │ Settings        │
          └────────┬────────┘
                   │
                   ▼
             EXAMINATION
          ┌─────────────────┐
          │ Normalize       │
          │ Validate        │
          │ Question        │
          │ Answer          │
          │ Compare         │
          │ Result          │
          └─────────────────┘
```

**Keep the core small, deterministic, reusable, and maintainable.**
