# Pizza Hub — website

Next.js 14 + Tailwind CSS, Poppins font, brand colours green `#007545`, yellow `#FFCC00`, orange `#FF8D28`.
Customers build their cart on the site and **“Place order” opens WhatsApp with the full order filled in** for the branch they choose. No server, database or payment account needed.

## Pages
| URL | What it is |
|---|---|
| `/` | Home: hero slider, full menu, Find us (Google Map), branches, feedback form |
| `/menu` | Menu with search, category and price filters |
| `/menu/[pizza]` | Pizza page: sizes, extras, notes, quantity, add to cart |
| `/cart` | Cart, delivery/pickup, summary (shows the empty-cart screen when empty) |
| `/checkout` | Details, branch, ASAP/scheduled time, payment, **Place order on WhatsApp** |
| `/order-sent` | Confirmation + what happens next |
| `/my-orders` | Orders placed on this device, one-tap reorder |
| `/deals` `/branches` `/contact` `/about` `/faq` | Info pages |
| any wrong URL | “This slice is missing” 404 page |

Also built in: “Open now / Closed — opens at 2 PM” bar (Pakistan time), first-visit Delivery/Pickup popup, floating cart bar, mobile menu drawer.

## Edit your details — one file
Open **`lib/data.js`**. Everything is there:
- `SITE` – WhatsApp number, phones, email, address, opening hours, **delivery fee (placeholder Rs. 100)**, social links
- `BRANCHES` – **replace the placeholder addresses and numbers for Branch 2 and 3**; each branch’s `whatsapp` number receives its orders
- `MENU` – names, descriptions, sizes and prices (from your printed menu)
- `EXTRAS` – extra toppings (placeholder prices, edit or empty the list)
- `DEALS` – **sample deals and prices**; edit them or set `SHOW_DEALS = false`
- `FAQ` – questions and answers

## Photos
Put photos in `public/images/menu/` using the file names in `MENU` (e.g. `kebab-stuffer.webp`).
Missing right now (they show a “photo coming soon” drawing): **kebab-stuffer, crown-crust, creamy, creamy-pasta, grilled-pasta**.
Tip: in Figma select each pizza image → Export → PNG/WebP, then rename to the slug.
The logo is `public/images/logo.png` (green) and `logo-white.png` (for dark backgrounds). They were cut from a screenshot — replace them with your original logo files for the sharpest result.

## Put it live on Vercel (free)
1. Create a free account at **github.com**, click **New repository** → name it `pizza-hub` → Create.
2. On the new repo page click **“uploading an existing file”**, drag in everything inside this folder (not the folder itself), then **Commit changes**.
3. Go to **vercel.com** → sign up with GitHub → **Add New… → Project** → pick `pizza-hub` → **Deploy**. Vercel installs and builds it automatically (about 1 minute).
4. Your site is live at `pizza-hub-xxxx.vercel.app`. To use your own domain: Project → **Settings → Domains → Add**.

Every time you change a file on GitHub (e.g. a price in `lib/data.js`), Vercel updates the live site by itself.

## Run on your computer (optional)
Needs Node.js 18+:
```
npm install
npm run dev
```
Open http://localhost:3000

## Go live on Cloudflare Pages (free)

The site is a static export (`output: 'export'` in `next.config.mjs`), so it builds into plain files.

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `20`
4. Deploy. The site is live at `your-project.pages.dev`.
5. **Custom domains → Set up a custom domain** → enter your domain, then follow Cloudflare's steps
   (usually: add the domain to Cloudflare and change the nameservers at your domain registrar).

Every push to GitHub redeploys the site automatically.
