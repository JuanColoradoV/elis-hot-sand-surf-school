# Eli's Hot Sand Surf School — Website

A fast, bilingual (EN/ES) one-page site. Plain HTML/CSS/JS — no build step, no
dependencies. Hosts anywhere static; built for **Cloudflare Pages**.

```
site/
├─ index.html        ← all the content
├─ css/styles.css    ← all the styling
├─ js/script.js      ← language toggle, menu, scroll animations
└─ assets/
   ├─ img/           ← photos
   └─ video/         ← clips (not yet used; available if wanted)
```

## Preview locally
From inside the `site/` folder:
```
python3 -m http.server 8787
```
Then open http://localhost:8787

---

## ✅ Before you go live — quick edits

All editable spots are marked in `index.html` with `<!-- EDIT: ... -->`.

1. **Contact form delivery (important).** The form needs a free key to email you
   submissions. Go to https://web3forms.com, enter `Eabdalah.surf@gmail.com`, copy
   your **Access Key**, and paste it into `index.html`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
   ```
   Until then, the form won't send — but the **WhatsApp** button works immediately.

2. **Google reviews.**
   - Replace `based on dozens of reviews` with your real count (e.g. `based on 47 reviews`).
   - The 3 testimonials are placeholders — swap them for real Google quotes.
   - Put your Google listing link in the `Read our reviews on Google` button `href`.

3. **Social links.** Commented-out Instagram/Facebook slots are in the Contact list
   and footer — uncomment and add your handles.

Phone (`+506 8800 7880`) and email are already wired everywhere.

---

## 🚀 Deploy to Cloudflare Pages

**Option A — Direct upload (no Git, fastest):**
1. Log in at https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages**
   → **Upload assets**.
2. Drag the **contents of the `site/` folder** (not the folder itself) into the
   uploader, or zip them and upload.
3. Name the project (e.g. `elis-hot-sand`) and **Deploy**. You'll get a free
   `*.pages.dev` URL in seconds.
4. To update later: open the project → **Create new deployment** → upload again.

**Option B — Git-connected (auto-deploys on every change):**
1. Push this `site/` folder to a GitHub repo.
2. In Cloudflare Pages → **Connect to Git** → pick the repo.
3. Build settings: **Framework preset = None**, **Build command = (leave blank)**,
   **Build output directory = `/`** (or `site` if you committed the parent folder).
4. Deploy. Every `git push` now redeploys automatically.

**Custom domain:** In the Pages project → **Custom domains** → add your domain.
If the domain is already on Cloudflare, it's a couple of clicks.
