# bhaigroww.co — agency website

Advanced, animated one-page site for bhaigroww. Runs for **free on GitHub Pages** (no server, no build step). Made with pure HTML/CSS/JS + [GSAP](https://gsap.com/) (free).

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure + all text/copy |
| `styles.css` | Design system, colors, animations |
| `script.js` | GSAP animations (reveals, counters, tilt, cursor…) |
| `README.md` | This file |

---

## 🚀 Deploy on GitHub Pages

1. Go to [github.com/new](https://github.com/new) and create a **new repository** (name it `bhaigroww` or anything). Keep it **public** (free).
2. On your computer, open this `bhaigroww` folder and run:
   ```
   git init
   git add .
   git commit -m "bhaigroww site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bhaigroww.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages** → *Source*: **Deploy from a branch** → Branch: `main` / `/ (root)` → **Save**.
4. Wait 1–2 minutes, then visit:
   `https://YOUR_USERNAME.github.io/bhaigroww/`

> No GitHub account? You can also just drag-and-drop the 3 files onto [netlify.com/drop](https://app.netlify.com/drop) — free hosting, same result.

---

## 🌐 Custom domain (bhaigroww.co)

Once the site works on `YOUR_USERNAME.github.io/bhaigroww/`:

1. In the repo, go to **Settings → Pages → Custom domain** and enter `bhaigroww.co` (tick *Enforce HTTPS*).
2. At your domain registrar (GoDaddy, Namecheap, Hostinger…), point the domain here:
   - **If bhaigroww.co is the root domain** → add an **ALIAS / ANAME** record pointing to `YOUR_USERNAME.github.io` (or 4 A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - **If you also want www** → add a CNAME `www` → `YOUR_USERNAME.github.io`.

DNS can take 24–48 hours to update.

---

## ✏️ Customize — do this before you show anyone

Open the files in any text editor (VS Code recommended) and replace:

### 1. WhatsApp number (most important)
Search `index.html` for **`91XXXXXXXXXX`** and replace with your real number — country code + number, no `+` or spaces (e.g. `9198XXXXXX00`). It appears in **6 places** (nav CTA, mobile menu, hero, CTA section, footer, float button — all searchable). The message text is already pre-filled with a friendly greeting.

### 2. Email
Search `hello@bhaigroww.co` (footer + CTA) → your real email.

### 3. Social links
Footer has `Instagram` and `Facebook` placeholders. Replace the `href="#"` with your real profile URLs.

### 4. Case studies (`index.html` → Work section)
The 3 cards are examples. Swap in your **real client stories** — real numbers beat generic ones every time.

### 5. Stats (Work hard on these)
Currently `30+ clients / 4.8× ROAS / 120+ campaigns / 98% retention`. Change the numbers in `index.html` (the `data-count` attribute). If a number is not a whole number, add `data-decimals="1"`.

### 6. Testimonials
Replace with real client feedback + their real name/business/city.

### 7. Brand colors
In `styles.css` at the top under `:root`, change:
- `--bg` / `--bg-2` → page background colors (light warm white by default)
- `--text` → primary text + button color (near-black by default)
- `--muted` → secondary text (warm gray by default)
- `--card` → card background (white by default)
- `--green` → WhatsApp green (keep it)

---

## 🎬 What's animated

- Hero entrance (staggered headline reveal)
- Interactive 3D particle ring in the hero (revolving torus — drag with mouse or finger to tilt the view)
- Infinite scrolling services marquee
- Scroll-triggered section reveals
- Animated stat counters
- 3D tilt cards on hover (services / work / quotes)
- Scroll progress bar (top)
- Custom cursor on desktop
- Floating WhatsApp button with pulse

Everything respects `prefers-reduced-motion` for accessibility, and if GSAP fails to load the site still works fully (just without animation).

---

## 🔧 Tips

- **Edit copy** → all text lives in `index.html`, clearly separated by `<!-- ==== -->` comment blocks.
- **New case study** → copy one `<article class="card work">…</article>` block, paste below it, edit the text.
- **Preview locally** → double-click `index.html`, or right-click → Open with → Chrome.
