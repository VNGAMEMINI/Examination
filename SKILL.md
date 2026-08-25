# Examination Skill

## 1. Purpose

Examination is a data-processing engine for building web-based examination,
quiz, practice, assessment, and testing systems.

Examination is responsible for:

- data processing
- data normalization
- data validation
- question processing
- answer evaluation
- session management
- score calculation
- result generation
- time management
- randomization
- state management

Examination is NOT responsible for:

- UI
- DOM
- HTML rendering
- CSS
- React components
- Vue components
- navigation UI
- buttons
- visual feedback

A consumer such as Check is responsible for the UI.

---

## 2. Core Principle

The most important principle is:

> Flexible input, strict internal model.

User-provided data may use short aliases:

```js
{
  q: "2 + 2 = ?",
  a: ["3", "4", "5"],
  c: 1
}
