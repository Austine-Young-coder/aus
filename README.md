# PRIOR — GSAP Animated Scroll Effect Modern Website Template

![PRIOR intro preview](./intro.gif)

A free, open-source **cinematic website template** built with GSAP ScrollTrigger. Features canvas-based frame scrubbing, parallax video backgrounds, clip-path reveals, and scroll-driven motion design — all in **vanilla HTML, CSS, and JavaScript**. Zero frameworks. Zero build tools. Just open and go.

**Designed by [RelaxKartikey](https://github.com/RelaxKartikey)** | by Entospark Studios

---

## Features

- **Canvas Frame Scrub** — Apple-style scroll-controlled frame sequences (hero + video transition sections)
- **Parallax Fixed Video** — Fullscreen video backgrounds that stay fixed while content scrolls over them
- **Clip-Path Reveals** — Scroll-driven inset animations that expand and contract viewport frames
- **Cinematic Preloader** — Resource-aware loading screen with percentage counter and smooth reveal
- **Scroll-Linked Animations** — Text reveals, staggered entries, opacity fades, scale transitions
- **Dark Premium Design** — Tight typography, minimal palette, high contrast, Inter typeface
- **Fully Responsive** — Works on desktop and mobile down to 375px
- **No Dependencies** — Just GSAP (CDN) + vanilla code. No React, no Webpack, no npm install

## Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic markup, canvas elements |
| **CSS3** | Custom properties, grid, sticky, clip-path, responsive |
| **Vanilla JavaScript** | All logic, no frameworks |
| **[GSAP 3.12.5](https://greensock.com/gsap/)** | Animation engine |
| **[ScrollTrigger](https://greensock.com/scrolltrigger/)** | Scroll-driven animation plugin |
| **Canvas API** | Frame-by-frame scroll scrub rendering |
| **Google Fonts** | Inter (300–900 weights) |

## Quick Start

```bash
git clone https://github.com/RelaxKartikey/agency-site.git
cd agency-site
```

Open `index.html` in a browser — that's it. Or serve locally:

```bash
npx serve .
```

No build step. No `npm install`. No configuration.

## Project Structure

```
agency-site/
├── index.html        # Single page — all sections
├── styles.css        # Complete design system
├── main.js           # GSAP animations & scroll logic
├── frames_1/         # Hero canvas frames (147 JPGs)
├── frames_2/         # Video transition canvas frames (168 JPGs)
└── README.md
```

## Use It In Your Project

This template is designed to be forked, customized, and shipped:

1. **Replace frame sequences** — Swap `frames_1/` and `frames_2/` with your own JPG sequences
2. **Change videos** — Update the Pexels video URLs in `index.html` to your own
3. **Edit content** — All text is in `index.html`, all styles in `styles.css`
4. **Adjust timing** — Tweak GSAP durations, easing, and scroll ranges in `main.js`
5. **Brand it** — Update colors in CSS custom properties, swap the Inter font, change the logo

## Contributing

Contributions are welcome! This project is built for the frontend community.

### How to Contribute

1. **Fork** this repository
2. **Create a branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes** — keep commits focused and descriptive
4. **Test locally** in Chrome, Firefox, and Safari
5. **Push** and open a **Pull Request**

### Guidelines

- **No build tools** — vanilla HTML/CSS/JS only. No bundlers, preprocessors, or frameworks.
- **Performance first** — GPU-accelerated animations, no layout thrashing, test on low-end devices.
- **Keep it clean** — self-documenting code, no comments in production.
- **Mobile responsive** — must work down to 375px.
- **GSAP only** — all animations through GSAP/ScrollTrigger.
- **Compress assets** — optimize JPG frames and images before committing.

### Areas Open for Contribution

- Responsive refinements for tablets
- Accessibility (ARIA labels, keyboard nav, `prefers-reduced-motion`)
- Performance optimizations (intersection observer fallbacks, frame caching)
- New scroll-driven sections or visual effects
- Cross-browser fixes (Safari, Firefox quirks)
- Additional SEO enhancements

### Report Issues

Include browser/OS, steps to reproduce, and screenshots or recordings.

---

**Star the repo** if you found it useful. Built for developers who care about motion.

&copy; 2026 PRIOR by Entospark Studios. Designed by [RelaxKartikey](https://github.com/RelaxKartikey).
