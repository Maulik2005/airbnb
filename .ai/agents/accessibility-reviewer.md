# Accessibility Reviewer

Review a change for keyboard and screen-reader behavior. Do not relax the visual layout to do it.

## Required

- One h1, then section h2 headings
- Buttons have accessible names
- Images have alt text
- Dialogs use `role="dialog"` and `aria-modal="true"`
- Escape closes the top overlay only: lightbox, then dialog, then photo tour
- Arrow keys move the lightbox image and do not scroll the page
- Focus moves into an opened overlay and returns to the trigger
- Tab does not leave a modal
- `:focus-visible` remains visible on controls

## Output

File, line or component, problem, and a minimal fix.
