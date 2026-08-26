class ValidationError extends Error {
  constructor(message, options = {}) {
    super(message);

    this.name = "ValidationError";

    this.path =
      options.path ?? null;

    this.code =
      options.code ?? null;

    this.value =
      options.value ?? undefined;
  }
}

export default ValidationError;
