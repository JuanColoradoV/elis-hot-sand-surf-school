# Eli's Hot Sand Surf School

Marketing website for Eli's Hot Sand Surf School — surf lessons in **Playa Grande &
Playa Tamarindo, Guanacaste, Costa Rica**. Fast, bilingual (EN/ES), static, deployed
on Cloudflare Pages.

## Quick start
```bash
npm run dev        # local preview at http://localhost:8787
```
The deployable site is the `site/` folder (no build step).

## Structure
- `site/` — the website (HTML/CSS/JS + assets). This is what gets deployed.
- `ARCHITECTURE.md` — hosting/deploy architecture (Cloudflare Pages).
- `PRODUCT.md` / `DESIGN.md` — brand, voice, and design system.
- `docs/` — specs and design notes.
- `logo2.png` — logo master.

## Deploy
See [`ARCHITECTURE.md`](ARCHITECTURE.md). Two paths: connect this repo to Cloudflare
Pages (output directory `site`), or `npm run deploy` with Wrangler.

## Before going live (placeholders to fill)
- Web3Forms access key (contact form) — `site/index.html`
- Cal.com link (booking calendar) — `data-cal-link` in `site/index.html`
- Real Google rating + reviews — Reviews section
- Instagram/Facebook handles
- Real domain — replace `elishotsand.com` in canonical/OG/sitemap/robots
