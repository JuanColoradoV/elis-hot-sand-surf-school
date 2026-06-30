# DESIGN.md — Eli's Hot Sand Surf School

## Aesthetic
Sun-soaked surf-travel. Warm sand canvas, deep ocean ink, hot sunset accent.
Full-bleed photography. Confident, friendly, a little hand-made. Light theme
(the scene: a tourist on a sunny patio at golden hour deciding tomorrow's plan).

## Color (light theme)
Tinted-warm neutrals; one hot accent family for action + emphasis.
- `--sand` #FBF1E1 — warm cream base
- `--sand-deep` #F3E3CB — alternating section base
- `--paper` #FFFCF6 — cards / raised surfaces (never pure #fff)
- `--ink` #15323B — deep ocean ink, primary text + dark sections
- `--ink-soft` #2B4D55 — secondary text
- `--teal` #137A6E / `--teal-deep` #0C4D49 — footer, beach headings
- Hot accent: `--sun` #FFC247 → `--amber` #FF8A2A → `--coral` #FF5236
- `--hot` gradient: used for button/sun/badge BACKGROUNDS only. Never for text
  (`background-clip:text` is banned). Emphasis text uses solid `--coral`.

Strategy: Restrained-plus — tinted neutrals carry the surface, the hot family is
the single accent for CTAs, prices, kickers, and one emphasized hero word.

## Typography
- Display: **Bricolage Grotesque** (600–800) — headings, brand, prices.
  Distinctive, contemporary, warm-friendly. (Chosen over the Fraunces reflex.)
- Body/UI: **Hanken Grotesk** (400–700).
- Fluid `clamp()` headings, ≥1.25 step ratio, tight tracking (-0.02em) on display.

## Components & conventions
- Buttons: pill (999px). `.btn-wa` = hot gradient (primary). `.btn-dark` = ink.
  `.btn-ghost` / `.btn-ghost-dark` = outline.
- Cards: lesson cards on `--paper`; featured card inverts to `--ink`. Radius 18px.
- Section labels (kicker): coral dash + uppercase tracked label — a deliberate,
  consistent wayfinding system across sections (intentional, not scaffolding).
- Emphasis word in hero: solid coral + hand-drawn amber underline SVG.
- **Brand mark:** the official logo (`assets/logo-full.png`, transparent PNG) — a
  circular emblem (orange sunset sun + white sun disc + teal mountains + aqua waves)
  with the "Eli's Hot Sand / SURF SCHOOL" wordmark. Usage:
  - `logo-emblem.png` (tight transparent circle) — header over the hero, footer,
    favicon (`logo-emblem-128.png`), and the center of the CTA-band seal. Works on
    any background.
  - `logo-full.png` (full lockup) — shown in the header once scrolled (cream bar).
  - Footer pairs the emblem with a cream wordmark (the lockup's navy text would not
    read on the dark teal footer).
  Source master: `logo2.png` at project root.
- Motion: IntersectionObserver reveals, staggered via `--d`. ease-out curves.
  Respects `prefers-reduced-motion`.
- Focus: visible amber `:focus-visible` ring for keyboard nav.

## Accessibility
WCAG AA text contrast, 44px touch targets, semantic landmarks, alt text on all
photos, bilingual labels, reduced-motion support.
