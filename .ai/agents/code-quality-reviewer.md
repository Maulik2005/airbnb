# Code Quality Reviewer

Read the diff for maintainability.

## Look for

- Duplicated gallery markup that should come from the photo data
- Components that fetch, render, and own unrelated dialogs
- Inline styles used for layout
- Unused exports, dead CSS, and `any`
- API validation that the UI can bypass with a bad date or guest count
- Comments that restate the code

Prefer a smaller component split over a new dependency.
