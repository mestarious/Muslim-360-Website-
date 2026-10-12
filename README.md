# Muslim 360 — Marketing Website

A high-end, 3D marketing / landing website for the **Muslim 360** app — your daily
Islamic companion for prayer, Qur'an and remembrance.

It is based on the [Muslim360 app repository](https://github.com/mestarious/Muslim360)
(React 19 + Capacitor), mirroring its brand, feature set and bilingual (EN / AR) experience.

## Highlights

- **3D WebGL hero** built with [three.js](https://threejs.org/) — an extruded crescent +
  star floating above the headline, with a tilted orbit ring, travelling gems, sparkles,
  pointer parallax and a CSS starry-sky backdrop (SVG fallback when WebGL is unavailable).
- **3D tilt feature cards** for all 20 Islamic tools (Prayer Times, Qibla, Quran, Hadith,
  Dhikr, Zakat, Hajj & Umrah guides, 99 Names, Ramadan mode, and more).
- **3D CSS phone mockups** showcasing the Prayer Times and Qur'an screens.
- **Fully bilingual** — one-tap toggle between English and Arabic with full RTL support.
- Animated counters, scroll-reveal, sticky glass nav, branded boot splash.
- **Zero build step.** Pure HTML/CSS/JS — open `index.html` or deploy the folder as-is.
- Responsive, dark-themed, and `prefers-reduced-motion` aware.

## Structure

```
.
├── index.html            # the page
├── assets/
│   ├── css/styles.css     # all styles (brand tokens, layout, RTL, responsive)
│   ├── js/scene.js        # three.js 3D hero scene
│   ├── js/app.js          # feature cards, tilt, reveal, counters, EN/AR i18n
│   └── favicon.svg        # crescent + star mark
└── README.md
```

## Run locally

No tooling required. Serve the folder with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Brand

| Token            | Value       |
| ---------------- | ----------- |
| Primary (green)  | `#059B52`   |
| Accent (gold)    | `#FAC775`   |
| Background (ink) | `#060f0a`   |
| Display font     | Space Grotesk |
| Arabic font      | Amiri       |

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). For GitHub
Pages, enable Pages on this branch/root and the site serves straight from `index.html`.
