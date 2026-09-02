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
      id: input.id == null ? `a${index}` : String(input.id),
      text: input.text == null ? "" : String(input.text),
      metadata: normalizeMetadata(input.metadata),
    });
  }

  return new Answer({
    id: `a${index}`,
    text: String(input ?? ""),
  });
}

function normalizeMetadata(metadata) {
  if (
    metadata === null ||
    typeof metadata !== "object" ||
    Array.isArray(metadata)
  ) {
    return {};
  }

  return metadata;
}
