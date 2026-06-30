# Architecture — Eli's Hot Sand Surf School

A static, zero-build marketing site deployed on **Cloudflare Pages**.

```
Eli's Hot Sand Surf School/
├─ site/                     ← deploy root (Cloudflare Pages "output directory")
│  ├─ index.html             ← the whole one-page site
│  ├─ css/styles.css
│  ├─ js/script.js
│  ├─ assets/img · video     ← photos & clips
│  ├─ _headers               ← security + cache headers (Cloudflare reads this)
│  └─ _redirects             ← URL redirects (Cloudflare reads this)
├─ wrangler.toml             ← Cloudflare project config (name, output dir)
├─ package.json              ← dev/preview/deploy scripts
├─ PRODUCT.md · DESIGN.md    ← brand + design system
└─ docs/                     ← specs & design notes
```

## Hosting: Cloudflare Pages
- **Static assets** served from Cloudflare's global edge (fast everywhere; ideal for
  Guanacaste/US/EU tourist traffic).
- **No build step.** The `site/` folder is published as-is.
- **TLS, HTTP/3, Brotli, DDoS protection** are automatic.
- Caching/security via `site/_headers`; redirects via `site/_redirects`.

## Two ways to deploy

**A. Git-connected (recommended, auto-deploys on push)**
1. Push this repo to GitHub.
2. Cloudflare dash → Workers & Pages → Create → Pages → Connect to Git.
3. Build settings: Framework preset **None**, Build command **(empty)**,
   **Build output directory = `site`**.
4. Every `git push` redeploys. Preview deployments per branch/PR come free.

**B. Wrangler CLI (direct upload)**
```bash
npm install              # installs wrangler locally
npx wrangler login       # one-time browser auth
npm run deploy           # = wrangler pages deploy site --project-name elis-hot-sand
```

Local preview: `npm run dev` (Python server) or `npm run preview` (Wrangler, mimics edge).

## Contact form
Currently posts via AJAX to **Web3Forms** (a free, no-backend form-to-email relay).
Set the access key in `index.html` (`name="access_key"`). WhatsApp is the primary
path regardless.

**Optional upgrade (remove the third party):** add a Cloudflare **Pages Function** at
`site/functions/api/contact.js` that forwards submissions to an email API
(e.g. Resend). This keeps everything on Cloudflare. Not built yet — needs an email
provider + API key stored as a Pages secret (`wrangler pages secret put`).

## Custom domain
Pages project → Custom domains → add the domain. If it's already on Cloudflare DNS,
it's a couple of clicks (records added automatically).

## What's intentionally NOT here
No bundler, framework, database, or server. The site is content + presentation only;
the one dynamic action (inquiry) is delegated to a form relay. This keeps it cheap
(free tier), fast, and trivial to maintain.
