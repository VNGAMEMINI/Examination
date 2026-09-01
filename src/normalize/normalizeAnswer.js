import Answer from "../answer/Answer.js";

export default function normalizeAnswer(input, index = 0) {
  if (input instanceof Answer) {
    return input;
  }

  if (typeof input === "string") {
    return new Answer({
      id: `a${index}`,
      text: input,
    });
  }

  if (input !== null && typeof input === "object") {
    return new Answer({
      id: input.id ?? `a${index}`,
      text: input.text ?? "",
      metadata: input.metadata ?? {},
    });
  }

  return new Answer({
    id: `a${index}`,
    text: String(input ?? ""),
  });
}
