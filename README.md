# Remi — marketing &amp; legal site

Static site (plain HTML/CSS, no build step) for the **Remi** iOS app: a landing
page plus the App Store–required Privacy and Support pages.

## Pages
- `index.html` — landing page
- `privacy.html` — Privacy Policy (App Store: Privacy Policy URL)
- `support.html` — Support / FAQ (App Store: Support URL)
- Terms of Use links to Apple's standard EULA:
  <https://www.apple.com/legal/internet-services/itunes/dev/stdeula/>

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
