# Changelog

All notable changes to `@vngamemini/examination` are documented here.

## [0.1.0] - 2026-09-02

### Added

- `Answer` data model.
- `Question` data model.
- `Result` data model.
- `Summary` data model.
- `Score` data model.
- Input normalization pipeline.
- Question and answer validation.
- Answer comparison.
- Question evaluation.
- Result summarization.
- Score calculation.
- `Examination` processing facade.
- Public functional API.
- `ValidationError`.
- Contract tests for the public API.
- Architecture and processing documentation.

### Architecture

The package uses a single processing pipeline:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ├── COMPARE
  └── RESULT
  ↓
SUMMARY
  ↓
SCORE
```

### Scope

The package focuses on examination data processing.

Application-level responsibilities remain outside the core, including user interface, navigation, timing, randomization, events, persistence, routing, and rendering.

### Stability

`0.1.0` establishes the initial public API and core processing contract.
