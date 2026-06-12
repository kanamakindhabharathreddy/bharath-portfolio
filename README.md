# 🧠 Neural Cosmos Portfolio
### Kanamakindha Bharath Reddy — Awwwards-level Personal Portfolio

> *"Where AI intelligence meets deep space aesthetics"*

---

## ✨ Features

- **Cinematic Loader** — 4s neural particle assembly with typewriter intro
- **3D Brain Particles** — 6000+ particle neural network with synapse lines
- **Custom Cursor** — Glowing cyan orb with 8-position trailing particles
- **Floating Glass Navbar** — Auto-detects active section
- **Hero Section** — GSAP letter drop + typewriter role cycling
- **About Section** — ASCII art glitch portrait + animated counters
- **Skills Solar System** — React Three Fiber orbiting planet system
- **Projects** — 3D CSS flip cards with scanner & workflow animations
- **Experience Timeline** — Interactive particle timeline with expandable nodes
- **Awards** — Canvas confetti burst + animated trophy SVG
- **Contact** — Glassmorphism form with glowing social orbs
- **Aurora Background** — Persistent animated space backdrop
- **Scroll Progress Bar** — Glowing plasma line at viewport top

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Animation | GSAP 3 + ScrollTrigger |
| Styling | Tailwind CSS v3 |
| Fonts | Orbitron + Space Grotesk |
| Build | Vite (with manual code splitting) |
| Deploy | GitHub Pages |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
portfolio/
├── index.html                   ← Entry HTML with SEO meta tags
├── vite.config.js               ← Vite config (GitHub Pages base)
├── tailwind.config.js           ← Design tokens
├── src/
│   ├── App.jsx                  ← Root: loader + aurora + sections
│   ├── index.css                ← Global styles + animations
│   ├── components/
│   │   ├── Loader.jsx           ← 4s cinematic neural intro
│   │   ├── Cursor.jsx           ← Custom glowing cursor
│   │   ├── Navbar.jsx           ← Floating glass navbar
│   │   ├── Hero.jsx             ← 3D brain + name reveal
│   │   ├── About.jsx            ← ASCII glitch + stat counters
│   │   ├── Skills.jsx           ← Planet orbit system UI
│   │   ├── Projects.jsx         ← Holographic flip cards
│   │   ├── Experience.jsx       ← Timeline + certifications
│   │   ├── Awards.jsx           ← Confetti + trophy
│   │   └── Contact.jsx          ← Glassmorphism form
│   ├── three/
│   │   ├── BrainParticles.jsx   ← Neural network 3D scene
│   │   ├── PlanetSkills.jsx     ← Orbiting skill planets
│   │   └── AuroraBackground.jsx ← Space backdrop + stars
│   ├── animations/
│   │   └── gsap.js              ← All ScrollTrigger timelines
│   └── hooks/
│       └── useMouseParallax.js  ← Smooth mouse tracking
```

---

## 🎨 Design System

**Palette (Neural Cosmos)**

| Token | Color | Usage |
|-------|-------|-------|
| `--black` | `#000000` | Background |
| `--indigo` | `#4F00FF` | Primary accent |
| `--cyan` | `#00FFFF` | Glow / highlights |
| `--orange` | `#FF6B00` | CTA / awards |
| `--white` | `#FFFFFF` | Text |

**Typography**
- **Display**: Orbitron — headings, name, numbers
- **Body**: Space Grotesk — paragraphs, labels

---

## ⚡ Performance

- Code splitting: Three.js, R3F, and GSAP in separate chunks
- Particle count auto-reduced on mobile (< 768px)
- `prefers-reduced-motion` respected
- Low-power GPU mode for background aurora canvas

---

## 👤 Author

**Kanamakindha Bharath Reddy**  
📧 kanamakindhabharathreddy@gmail.com  
📱 +91 8688587050  
🎓 SVCE Tirupati | B.Tech CSE | CGPA 8.8/10 (2022–2026)  
🏆 5th Nationally — E-Box Top Coders 2023
