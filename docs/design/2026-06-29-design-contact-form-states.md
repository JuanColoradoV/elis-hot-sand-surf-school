# Design — Contact form states

**upstream:** site flow (visitor → inquiry). **downstream:** mocks (this is the live build), writing.
**System:** the site's own CSS design system (see `DESIGN.md`); no external component library.

## Screen: Contact / Book — inquiry form

**Purpose:** let a visitor send Eli a lesson inquiry without leaving the page. WhatsApp remains the
primary path; this is the "prefer to write" fallback. Submits to Web3Forms via AJAX (progressive
enhancement: native POST still works if JS fails).

**One primary action:** "Send inquiry". WhatsApp note is subordinate.

### States (the backbone)

1. **Default** — fields empty; Name + Email marked required (`*`); submit enabled.
2. **Inline-invalid** — validate on **blur** (not keystroke). Required empty → message; bad email → message.
   Field gets `.invalid` (danger border), error text below via `aria-describedby`, `aria-invalid="true"`.
   Error text is color-independent (text + border, not color alone).
3. **Submit-blocked** — on submit with invalid fields: prevent send, mark all invalid, move focus to the
   **first** invalid field, announce via the form status region.
4. **Submitting** — submit disabled + `aria-disabled`, label → "Sending…" with spinner, form `aria-busy`.
   No input blocked elsewhere; user can't double-submit.
5. **Success** — replace the form body with a confirmation panel: check mark, "Message sent!", a warm
   line, and a WhatsApp button for a faster reply. Focus moves to the panel; announced `aria-live=polite`.
6. **Error** (network / Web3Forms failure, incl. missing access key) — `role="alert"` banner above submit:
   states cause + recovery (try again / WhatsApp). Submit re-enabled, label restored. Focus to alert.

### Components used (real, from site CSS)
`.contact-form`, `.field` / `.field-req`, `.btn.btn-dark.btn-block`, plus new state parts:
`.field-error`, `.form-alert` (role=alert), `.form-success`, `.btn.is-loading` (spinner). Tokens:
`--rust` (label/asterisk), new `--danger` for invalid borders/error text (AA on `--paper`).

### Annotations
- **Validation rules:** Name required (non-empty trimmed). Email required + valid format. Others optional.
- **Focus order:** Name → Email → Preferred dates → Lesson type → Message → Send. Errors auto-focus first
  invalid; success focuses panel; error focuses alert.
- **A11y:** labels present; `aria-describedby` links field→error; `aria-invalid` toggled; status region
  `aria-live="polite"`; error alert `role="alert"`; spinner hidden from SR (button text carries state).
- **Bilingual:** all state copy has EN/ES; dynamic messages set in the active language and given
  `data-en`/`data-es` so the language toggle keeps them in sync.

### Gaps flagged
None for the system; this is implemented directly in the site.
