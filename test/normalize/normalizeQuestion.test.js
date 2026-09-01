test("normalizeQuestion converts numeric id to string", () => {
  const question = normalizeQuestion({
    id: 123,
    text: "Capital?",
  });

  assert.equal(question.id, "123");
});

test("normalizeQuestion converts numeric text to string", () => {
  const question = normalizeQuestion({
    id: "q1",
    text: 123,
  });

  assert.equal(question.text, "123");
});

test("normalizeQuestion normalizes missing metadata", () => {
  const question = normalizeQuestion({
    id: "q1",
    text: "Capital?",
    metadata: null,
  });

  assert.deepEqual(question.metadata, {});
});

test("normalizeQuestion normalizes array metadata", () => {
  const question = normalizeQuestion({
    id: "q1",
    text: "Capital?",
    metadata: [],
  });

  assert.deepEqual(question.metadata, {});
});

test("normalizeQuestion supports correct answer id", () => {
  const question = normalizeQuestion({
    id: "q1",
    text: "Capital?",
    answers: ["Paris", "London"],
    correct: "a0",
  });

  assert.deepEqual(question.correct, ["a0"]);
});

test("normalizeQuestion supports multiple correct answer ids", () => {
  const question = normalizeQuestion({
    id: "q1",
    text: "Select",
    answers: ["A", "B", "C"],
    correct: ["a0", "a2"],
  });

  assert.deepEqual(question.correct, ["a0", "a2"]);
});
