function normalizeSelection(value) {
  if (value === undefined || value === null) {
    return [];
  }

  const values = Array.isArray(value)
    ? value
    : [value];

  return [...new Set(
    values.map(String)
  )].sort();
}

export default function compareAnswer(expected, actual) {
  const expectedValues = normalizeSelection(expected);
  const actualValues = normalizeSelection(actual);

  if (expectedValues.length !== actualValues.length) {
    return false;
  }

  return expectedValues.every(
    (value, index) =>
      value === actualValues[index]
  );
}
