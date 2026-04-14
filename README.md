# AhamSutra Media Lab — Landing Page

> *"The golden thread that connects a creator to their creation."*

A premium, static landing page for **AhamSutra Media Lab** — a creative and digital media agency. Built with a minimalist editorial aesthetic, custom animations, and a bespoke Bauhaus-inspired typographic identity.

---

## 🗂 Project Structure

```
ahamsutra/
├── index.html                 # Main HTML entry point
├── style.css                  # All styles (design system + components)
├── script.js                  # Animations, scroll behaviour, cursor, modal
├── assets/
│   ├── svgs/
│   │   ├── favicon.svg        # Browser tab icon
│   │   ├── herologo.svg       # Navigation bar brandmark
│   │   └── logo.svg           # Full brandmark (footer)
│   ├── images/                # Static image assets
│   └── fonts/                 # Bauhaus font files
├── contact form/              # Legacy contact page (deprecated)
└── README.md
```

---

## 🚀 Getting Started

This is a **fully static site** — no build tools or server required.

### Option 1: Direct Open
Simply open `index.html` in any modern browser.

### Option 2: Local Dev Server (Recommended)
Using any static file server:

```bash
# Using npx serve
npx serve .

# Using http-server
npx http-server -p 3000

# Using Python
python -m http.server 8080
```

Then open `http://localhost:3000` in your browser.

> ⚠️ A local server is recommended to avoid CORS issues with local font and SVG asset loading.

---

## 🎨 Design System

### Colour Palette

| Token        | Value                   | Usage                        |
|--------------|-------------------------|------------------------------|
| `--onyx`     | `#0f0e0c`              | Primary dark background     |
| `--deep`     | `#080706`              | Deeper dark sections        |
| `--charcoal` | `#1a1816`              | Modal / card backgrounds    |
| `--cream`    | `#faf8f4`              | Light section backgrounds   |
| `--parchment`| `#f3f0ea`              | Alternate light sections    |
| `--gold`     | `#c9892e`              | Primary accent / brand colour|
| `--gold-l`   | `#e0a84f`              | Lighter gold for hover states|

### Typography

| Role        | Font Family     | Notes                        |
|-------------|-----------------|------------------------------|
| Display     | `Bauhaus`       | Custom TTF, used for headings|
| Body        | System serif    | Editorial body text          |
| UI / Labels | System sans-serif| Navigation, labels, metadata|

### Sections

| ID   | Section Name         | Description                              |
|------|----------------------|------------------------------------------|
| `s1` | Hero / Manifesto     | Full-screen poem with animated reveal    |
| `s3` | What is AhamSutra?   | Sanskrit definitions + brand philosophy  |
| `s4` | Our Approach         | 5-step AEIOU process                     |
| `s5` | What We Do           | 4 practice cards                         |
| `s6` | Flagship Initiative  | The S.P.A.R.K Model                      |
| `s7` | Our Philosophy       | 3 philosophical pillars + blockquote     |
| `s8` | Collaboration CTA    | Begin the Thread                         |

---

## ✨ Features

- **Splash Screen Animation** — GSAP-powered SVG path reveal with smooth exit transition
- **Custom Cursor** — Dot + ring cursor with interactive hover scaling
- **Scroll Progress Bar** — Gold bar at the top tracking page scroll depth
- **Poem Reveal** — Hero text lines animate in sequentially after splash exits
- **Scroll Reveal** — `IntersectionObserver`-based reveal for all sections
- **Marquee Banners** — Two auto-scrolling service/value marquee bands (pause on hover)
- **Smooth Scrolling** — Powered by [Lenis](https://github.com/darkroomengineering/lenis)
- **Sticky Navigation** — Nav fades in after splash; gains backdrop blur on scroll
- **Modal Contact Form** — Contact form opens as popup on same page (no page navigation)
  - Triggered by "Start a Project" (nav) and "Join the Network" (section 8)
  - Closes via X button, backdrop click, or Escape key
  - Form submission via Web3Forms API
  - Success message displays after submission
- **Responsive Design** — Full mobile/tablet support with adapted layouts

---

## 📦 External Dependencies

All dependencies are loaded via CDN — no `npm install` needed.

| Library         | Version  | Purpose                          |
|-----------------|----------|----------------------------------|
| [GSAP](https://gsap.com)           | `3.12.2` | Splash animation & timeline     |
| [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | `3.12.2` | GSAP scroll integration |
| [Lenis](https://github.com/darkroomengineering/lenis) | `1.3.21` | Smooth scroll engine |
| [Web3Forms](https://web3forms.com) | - | Contact form submission API |

---

## 🛠 Editing Content

All user-facing text is clearly marked with `[EDITABLE TEXT REGION]` comments in the HTML.

**Common edits:**

- **Hero poem** → Lines inside `<div id="poem">` in Section 1
- **Services** → Cards inside `<div class="sgrid">` in Section 5
- **Contact details** → Email / phone links in the `<footer>`
- **Social links** → Anchor tags inside `.ft-social` in the footer

---

## 📦 Web3Forms Setup

The contact form uses [Web3Forms](https://web3forms.com) for submissions. The form includes:

- Access key: `71ae9ddf-fdfe-48f6-b95b-fabff8eafca6` (already configured)
- Custom subject line for admin notifications
- Automatic success message display

To change the access key, update the `value` in the hidden input:
```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
```

---

## 🖼 Assets

| File                      | Usage                                |
|---------------------------|--------------------------------------|
| `assets/svgs/favicon.svg` | Browser tab icon (`<link rel="icon">`) |
| `assets/svgs/herologo.svg`| Navigation bar logo                  |
| `assets/svgs/logo.svg`    | Full brandmark used in the footer    |

---

## 📝 Known Notes

- **Font Warnings:** The Bauhaus TTF files may trigger "overlapping tables" OTS parsing warnings in some browsers. The site remains fully functional; replace with re-exported clean TTFs to resolve.
- **Cache Busting:** The stylesheet link uses `?v=N` query parameter (e.g. `style.css?v=7`). Increment this version number after any CSS changes if deploying behind a cache.
- **Legacy Contact Page:** The `contact form/` folder contains a deprecated separate contact page. The new modal form is the recommended approach.

---

## 👤 Project Credits

**Crafted by:** [Ithish Jonnes](https://wa.me/917207667827)  
**Brand:** AhamSutra Media Lab  
**Year:** 2026