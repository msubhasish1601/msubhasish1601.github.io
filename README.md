# Subhasish Mukherjee — Developer Portfolio

**Live Site:** https://msubhasish1601.github.io/MyPortfolio/

A premium, recruiter-focused personal developer portfolio for **Subhasish Mukherjee** — Senior Full-Stack Software Developer & AI Engineer with 22+ years of engineering experience.

---

## 🏗️ Architecture

This is a **zero-dependency, zero-build-step** static website:

```
index.html              ← Single-page portfolio
assets/
  css/style.css         ← All styles (dark-first, responsive, CSS custom properties)
  js/main.js            ← Vanilla JavaScript (theme, animations, filters, nav)
  resume/
    subhasish_developer_resume.pdf  ← Resume download
.github/
  workflows/
    deploy.yml          ← GitHub Actions → GitHub Pages deployment
```

No Node.js, no React, no build tools. Just HTML + CSS + JS.

---

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions automatically deploys to GitHub Pages
3. Enable GitHub Pages in repository **Settings → Pages → Source: GitHub Actions**

### Local Development

Open `index.html` directly in a browser, or use a simple server:

```bash
# Python
python -m http.server 3000

# Node.js (if available)
npx serve .
```

---

## 🎨 Sections

| Section | Description |
|---------|-------------|
| Hero | Name, title, engineering flow diagram, CTA buttons, stats |
| About | Professional biography, avatar, quick info |
| Engineering Stack | Interactive SVG-style stack diagram |
| Career Timeline | 22-year career evolution with macro + detailed timelines |
| Experience | 6 roles with tech stacks and achievements |
| Capabilities | Grouped tech tiles by engineering domain |
| AI Evolution | Engineering progression from traditional → agentic AI |
| AI Projects | Featured cards: Laravel RAG, GraphRAG, TinyGPT |
| Projects | Curated GitHub repo grid with filters |
| Engineering | Architecture thinking: API, DB, microservices, RAG, agents |
| Current Focus | Active 2025–2026 exploration areas |
| Contact | Email, LinkedIn, GitHub, resume download |

---

## ✏️ Updating Content

### Update Resume
Replace the file:
```
assets/resume/subhasish_developer_resume.pdf
```

### Update Contact Links
Edit `index.html` — search for `linkedin.com/in/subhasish-mukherjee-6110764a` and `m.subhasish@gmail.com`

### Add a New Project
Add a new `<article class="project-card">` inside `#projectsGrid` in `index.html`

### Change Theme Colors
Edit the CSS custom properties in `assets/css/style.css` under `:root { ... }`

---

## ♿ Accessibility

- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels on interactive elements
- `prefers-reduced-motion` support
- Focus-visible styles
- Alt text on all images
- Color contrast compliant

---

## 🔍 SEO

- `<title>`, `<meta description>`, canonical URL
- Open Graph tags (LinkedIn, Facebook sharing)
- Twitter Card metadata
- JSON-LD structured data (Person schema)
- Semantic heading hierarchy

---

## 📱 Responsive

Tested at: 320px (iPhone SE) · 375px · 768px (tablet) · 1024px · 1280px (desktop)

---

## 📄 License

Personal portfolio — © 2026 Subhasish Mukherjee