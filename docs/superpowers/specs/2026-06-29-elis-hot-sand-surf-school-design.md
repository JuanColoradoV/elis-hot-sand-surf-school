# Eli's Hot Sand Surf School — Website Design Spec

**Date:** 2026-06-29
**Status:** Approved (build in progress)

## Goal
A beautiful, fast, one-page bilingual (EN/ES) marketing site for a surf school in
Tamarindo, Costa Rica. Drives bookings via WhatsApp and a contact form. Hosted on
Cloudflare Pages.

## Business facts
- **Name:** Eli's Hot Sand Surf School
- **Instructor:** Eli
- **Location:** Playa Grande & Playa Tamarindo, Guanacaste, Costa Rica
- **WhatsApp:** +506 8800 7880
- **Email:** Eabdalah.surf@gmail.com
- **Lessons (all 90 min, board + rashguard included, all levels):**
  - Private — $120
  - Group (2+ people) — $60 / person
  - Packages — pricing on request (contact)
- **Social:** none provided yet — leave an editable placeholder slot
- **Reviews:** has a Google Business rating — show stars + review count + link to
  Google listing (exact numbers TBD, use a clearly-marked placeholder)

## Decisions
- Booking: **WhatsApp + contact form** (no live payment). Form uses a free
  no-backend service (Web3Forms) to email submissions; WhatsApp is primary CTA.
- Language: **Bilingual EN/ES**, JS toggle with `data-en`/`data-es` attributes,
  preference saved to `localStorage`.
- Scope: **single scrolling page**.
- Stack: **plain HTML / CSS / JS**, no framework, no build step.
- Deploy: **Cloudflare Pages** (drag-and-drop or git).

## Visual direction
Warm Costa Rica golden hour. Palette from the photos: sunset amber/orange, deep
ocean blue, teal wave-green, soft sand, off-white. Bold display headings + clean
sans body. Full-bleed photography. No logo yet → custom typographic wordmark with a
small sun/wave mark (swappable later).

## Sections
1. **Sticky header** — wordmark · nav (Lessons · About · Gallery · Reviews ·
   Location · Contact) · EN/ES toggle · WhatsApp button. Mobile hamburger.
2. **Hero** — full-bleed `hero-wave.jpg` (Eli carving a green wave). Headline +
   subhead (Playa Grande & Playa Tamarindo). CTAs: Book on WhatsApp / See lessons.
3. **Lessons & pricing** — 3 cards (Private / Group / Packages). Each → WhatsApp.
4. **About Eli / Why us** — longboard shots, story, what's included, safety &
   family-friendly.
5. **Reviews** — Google rating (stars + count + link) and a few short quotes.
6. **Gallery** — curated responsive photo grid.
7. **Location** — Playa Grande & Playa Tamarindo, embedded map, meeting note.
8. **CTA band** — dramatic sunset image + "Book your lesson" → WhatsApp.
9. **Contact / Book** — form (name, email, dates, lesson, message) via Web3Forms +
   WhatsApp + email.
10. **Footer** — contact, quick links, social slot, copyright.

## Assets
Copied + renamed into `site/assets/img` and `site/assets/video`. Hero =
`hero-wave.jpg`. Eli longboarding = `extra-4.jpg` / `extra-5.jpg`. Sunset accent =
`extra-1.jpg`. Group/lesson + beach shots fill gallery.

## Files
- `site/index.html`
- `site/css/styles.css`
- `site/js/script.js`
- `site/assets/...`
- `site/README.md` (deploy + edit instructions: contact info, Web3Forms key,
  Google rating numbers, social links)

## Out of scope (v1)
Live payment/calendar booking, blog, multi-page, CMS.
