# Examination Context

## 1. Project Identity

Examination is a JavaScript library for processing examination, quiz,
practice, assessment, and testing data.

The project is designed as a reusable processing engine.

Examination is not the application that users directly interact with.

A consumer such as `Check` uses Examination to build the actual web
examination application.

---

# 2. Examination vs Check

The most important project context is the separation between:

```text
Examination
    =
Data + Logic + State

Check
    =
UI + User Interaction + Presentation
