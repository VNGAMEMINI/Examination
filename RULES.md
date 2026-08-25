# Examination Rules

## 1. Core Identity

Examination is a data-processing engine.

Examination is NOT a UI library.

Examination must never become responsible for:

- HTML
- CSS
- DOM
- React
- Vue
- UI rendering
- UI components
- visual effects
- navigation components
- buttons
- forms

A consumer such as Check is responsible for the user interface.

---

# 2. Architecture Rule

The core processing flow is:

Raw Data
    ↓
Parser
    ↓
Normalizer
    ↓
Validator
    ↓
Internal Model
    ↓
Session
    ↓
Answer
    ↓
Compare
    ↓
Score
    ↓
Result

Do not bypass this architecture without a documented reason.

---

# 3. Input Data Rule

Input data may be flexible.

For example:

```js
{
  q: "2 + 2 = ?",
  a: ["3", "4", "5"],
  c: 1
}
