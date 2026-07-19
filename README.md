# Remi — marketing &amp; legal site

Static site (plain HTML/CSS, no build step) for the **Remi** iOS app: a landing
page plus the App Store–required Privacy and Support pages.

## Pages
- `index.html` — landing page
- `privacy.html` — Privacy Policy (App Store: Privacy Policy URL)
- `support.html` — Support / FAQ (App Store: Support URL)
- Terms of Use links to Apple's standard EULA:
  <https://www.apple.com/legal/internet-services/itunes/dev/stdeula/>

## Bilingual (English / 中文)
The site switches language at runtime — no build step, matching the app.
- All copy lives in `i18n.js` as `T.en` / `T.zh`; the HTML holds the English
  fallback plus a `data-i18n*` key on each element:
  - `data-i18n="key"` → text · `data-i18n-html="key"` → markup (links, `<strong>`,
    `<br>`) · `data-i18n-attr="attr:key"` → attributes (`content`, `aria-label`).
- Language resolves from `?lang=en|zh` → `localStorage("remi.lang")` →
  `navigator.language`, and the nav **EN / 中文** toggle persists the choice.
- A small inline `<head>` snippet applies the language before paint (hides the
  page only for 中文, so English visitors never wait; JS-off shows English).
- **When you add or change a string, update BOTH `T.en` and `T.zh`.** Verify with:
  ```sh
  node tools/i18n-check.js .   # every used key must exist in both en + zh
  ```
  The Chinese **privacy** copy is a machine draft and should be reviewed by a
  human before publishing.

## Preview locally
```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)
This repo is served as a **project site** at
`https://beizhedenglong.github.io/remi-site/`, so all links are relative.
Enable **Settings → Pages → Deploy from branch → `main` / root**. `.nojekyll`
keeps GitHub Pages from running Jekyll on the plain HTML.

## TODO before App Store submission
Search the HTML for `[TODO:` (rendered as highlighted markers) and fill in:
- Provider / developer name
- Support email (also add a `mailto:` link on `support.html`)
- Privacy Policy effective date
- Cloud host name (e.g. Alibaba Cloud) in `privacy.html`
- Backend logging/retention statement in `privacy.html`
- Subscription price on `index.html`
- App Store product URL for every `href="#"` Download button
