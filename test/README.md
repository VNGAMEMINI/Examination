# Examination — Validation Test Fix

Replace the five files in `test/validation/` with the files in this package.

The fixes address the 13 failing tests caused by assigning to getter-only model
properties such as `examination.subjects`, `subject.name`, `subject.questions`,
`question.text`, and `question.answers`.

Production `src/` files are intentionally unchanged.

After replacing the files, run:

    npm test

Expected result: the previous TypeError failures should be gone.
