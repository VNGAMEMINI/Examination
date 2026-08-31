# Examination — CONTEXT

## 1. Project Context

**Examination** is a library developed to provide the data-processing layer for web-based examination applications.

The main consumer application is **Check**.

The relationship is:

```text
Check
  │
  │ consumes
  ▼
Examination
```

`Check` provides the examination experience.

`Examination` provides the examination-data processing engine.

---

# 2. Main Goal

The goal of Examination is to create a reusable library that can process examination data independently from any specific UI or web application.

The library should be usable by:

```text
Check
Other quiz applications
Other examination applications
Future consumers
```

The library must therefore not depend on the implementation of Check.

---

# 3. Examination Responsibility

Examination is responsible for processing data.

Its main responsibilities are:

```text
Data
Normalize
Validate
Subjects
Questions
Answers
Compare
Evaluate
Result
```

The central purpose is:

> Receive examination data and user-answer data, process them consistently, compare them, and return structured results.

---

# 4. Check Responsibility

Check is the application consuming Examination.

Check is responsible for the user-facing examination experience.

Examples:

```text
UI
Settings
Timer
Question countdown
Random question
Random answer
Navigation
Previous / Next
Auto Next
User interaction
Rendering
Animations
```

These responsibilities should not be moved into Examination simply because Check needs them.

---

# 5. Core Processing Flow

The current architecture is intentionally based on one unified flow:

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

This is the primary architectural rule of the project.

New core functionality should fit into this flow.

---

# 6. Why One Flow

The project should avoid having multiple unrelated ways of processing the same data.

Bad:

```text
Input
 ├── Path A
 │    └── Compare
 │
 ├── Path B
 │    └── Special Compare
 │
 └── Path C
      └── Another Processor
```

Preferred:

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

This makes the project:

- easier to understand
- easier to test
- easier to debug
- easier to extend
- easier to maintain

---

# 7. External Data vs Internal Data

External data may use different structures.

For example:

```js
{
  q: "...",
  a: ["is", "are", "being", "be"],
  c: 1
}
```

or:

```js
{
  question: "...",
  answers: ["is", "are", "being", "be"],
  correct: 1
}
```

Examination should not force every internal module to understand all possible input formats.

Instead:

```text
External Data
      ↓
Normalization
      ↓
Canonical Internal Data
```

After normalization, the internal system should use one consistent representation.

---

# 8. Canonical Terminology

The preferred internal terminology is:

```text
question
answers
correct
subjects
result
```

Short aliases such as:

```text
q
a
c
```

may be accepted as external input.

They should be converted during normalization.

---

# 9. Subjects

Subjects belong to examination data.

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

Subjects are data organization, not UI navigation.

Examination should process questions from different subjects through the same core mechanisms.

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

# 10. Question

A question represents a unit of examination content.

Conceptually:

```text
Question
├── id
├── type
├── content
├── answers
└── correct
```

The question model should remain independent from UI.

It must not contain:

```text
DOM
React components
Navigation
Timer
Visual state
```

---

# 11. Answer

Answer represents the possible response associated with a question.

Example:

```js
{
  id: "a1",
  text: "are"
}
```

The system must distinguish between:

```text
Expected answer
```

and:

```text
User answer
```

This distinction is important for comparison.

---

# 12. User Answer

The user answer is external data supplied by the consuming application.

Example:

```js
{
  answer: [
    {
      text: "is",
      correct: true,
    },
    {
      text: "are",
      correct: false,
    },
  ];
}
```

The exact external representation may change.

Examination should normalize supported representations before evaluation.

---

# 13. Answer Comparison

The central use case is comparing expected answer data against user-answer data.

Example:

```text
Expected:

is    → false
are   → true
being → false
be    → false
```

User:

```text
is    → true
are   → false
being → false
be    → false
```

The comparison determines:

```text
Wrong
```

If the user selects:

```text
are
```

the result becomes:

```text
Correct
```

---

# 14. Comparison Levels

The project has two important comparison requirements.

## Complete Object Analysis

Compare the complete answer collection.

```text
Expected Answer Object
+
User Answer Object
        ↓
     Compare
        ↓
 Complete Result
```

This is useful when determining whether the whole response is correct.

## Individual Index Analysis

Compare a specific answer entry.

```text
Expected[index]
+
User[index]
        ↓
     Compare
        ↓
   true / false
```

This is useful when the consumer wants immediate feedback for a selected answer.

Both operations must use consistent comparison rules.

---

# 15. Immediate Evaluation

Examination may be used to evaluate an answer immediately after the user selects it.

Conceptually:

```text
User selects answer
       ↓
Check
       ↓
Examination.compare(...)
       ↓
Result
       ↓
Check displays feedback
```

Examination does not decide how feedback is displayed.

It only produces the data required by the consumer.

---

# 16. Question Types

The architecture is expected to support multiple answer models.

Potential types include:

```text
single
multiple
boolean
text
number
matching
ordering
```

These should not all be implemented prematurely.

The architecture should make future extension possible without rewriting the entire processing system.

---

# 17. Time

Time is intentionally outside the current Examination core.

Example Check settings:

```js
{
  time: 45,
  timeQuestion: 1
}
```

These values belong to Check's examination-session behavior.

Examination does not need to know:

```text
How many minutes remain?
When should the next question appear?
When should the exam end?
```

Those are application-level decisions.

---

# 18. Randomization

Randomization is intentionally outside the current Examination core.

Check may randomize:

```text
questions
answers
```

Examination should still be able to compare answers correctly.

Therefore, answer identity should not depend solely on the current visual index.

---

# 19. Navigation

Navigation belongs to Check.

Examples:

```text
next
previous
jump to question
question navigator
```

Examination processes question data but does not control how users move between questions.

---

# 20. Settings

Settings are primarily consumer configuration.

A Check configuration may contain:

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

The consumer interprets these settings.

Examination should only receive the data it actually needs for data processing.

Do not move the entire Check settings object into Examination.

---

# 21. Old Check Data

The previous Check project used question JSON files such as:

```text
anh.json
test.json
```

These files represent consumer-side examination content.

They are useful references for understanding real-world input requirements.

However:

> Check's JSON format must not automatically become Examination's internal architecture.

Examination should normalize external formats into its own canonical model.

---

# 22. Library Independence

Examination must remain independent from Check.

Correct:

```text
Check ───────────────► Examination
```

Incorrect:

```text
Examination ─────────► Check
```

Examination must not import:

```text
Check components
Check settings
Check UI
Check navigation
Check timer
```

---

# 23. Internal Architecture

The implementation may be divided into clear areas:

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

The exact filenames may evolve.

The responsibility boundaries should remain clear.

---

# 24. Public API Philosophy

The consumer should not need to know the entire internal structure.

Preferred:

```js
import Examination from "@vngamemini/examination";
```

Then:

```text
Consumer
    ↓
Public API
    ↓
Internal pipeline
```

Internal classes should not automatically become public API.

---

# 25. Maintainability

The project is expected to become larger over time.

Every new module should therefore have:

- one clear responsibility
- predictable naming
- minimal coupling
- no unnecessary duplication
- independent tests
- clear input and output
- no hidden side effects

The architecture should become easier to control as features increase.

---

# 26. Avoid Unnecessary Classes

Do not create a class simply because a concept exists.

For example, the following should not be created automatically:

```text
TimeManager
RandomManager
NavigationManager
SessionManager
ExamController
QuizController
StateManager
```

unless a concrete requirement establishes that the class belongs to Examination.

The project favors simple, focused data-processing modules.

---

# 27. Current Priority

The immediate priority is to build the core data engine correctly.

Priority order:

```text
1. Data Model
2. Normalize
3. Validate
4. Question
5. Answer
6. Compare
7. Result
8. Public API
9. Tests
10. Check Integration
```

Do not jump to UI-related features before the core data pipeline is stable.

---

# 28. Development Rule

When implementing a new feature, ask:

```text
1. Is this data processing?
2. Does it belong to Examination?
3. Where does it fit in the main pipeline?
4. Can an existing module handle it?
5. Does it create duplicated logic?
6. Does it introduce a second processing flow?
7. Does it force the consumer to understand internals?
```

If the answer indicates that the feature belongs to Check, keep it out of Examination.

---

# 29. Current Architectural Decision

The following decisions are currently established:

```text
Examination
    = Data Processing Library

Check
    = Consumer Web Application
```

And:

```text
Time       → Check
Random     → Check
Navigation → Check
UI         → Check
Settings   → Check
```

While:

```text
Normalize  → Examination
Validate   → Examination
Question   → Examination
Answer     → Examination
Compare    → Examination
Result     → Examination
```

---

# 30. Final Context

The project should be understood as a reusable examination-data engine, not as a complete quiz application.

The most important separation is:

```text
                 ┌──────────────────────┐
                 │        Check          │
                 │   Examination UI      │
                 │                      │
                 │ Time                 │
                 │ Random               │
                 │ Navigation           │
                 │ Settings             │
                 │ User interaction     │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Examination       │
                 │   Data Processing    │
                 │                      │
                 │ Normalize            │
                 │ Validate             │
                 │ Question             │
                 │ Answer               │
                 │ Compare              │
                 │ Result               │
                 └──────────────────────┘
```

> **Examination processes the data. Check creates the experience.**
