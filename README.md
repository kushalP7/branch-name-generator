<div align="center">

# 🌿 Git Branch Generator

**A sleek, modern tool to generate clean Git branch names from ticket IDs — instantly.**

Built with ❤️ by **Kushal Prajapati (KP)**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-f97316?style=flat-square)](https://lucide.dev)

</div>

---

## 📖 Overview

**Git Branch Generator** is a productivity tool for developers who follow ticket-based workflows (Jira, Linear, GitHub Issues, etc.). Instead of manually formatting branch names, just pick your branch type, paste your ticket, and get a clean, consistent branch name in one click.

---

## ✨ Features

### 🃏 Branch Type Icon Cards
Choose from **7 branch types** — each with a unique icon, accent colour, and description. No more dropdowns.

| Type | Icon | Colour | Use Case |
|---|---|---|---|
| Bug Fix | 🐛 | Red | Fix a defect or issue |
| Feature | ✨ | Green | Build something new |
| Enhancement | 🔧 | Blue | Improve existing code |
| Hotfix | 🛡️ | Orange | Urgent production fix |
| Release | 🚀 | Purple | Prepare a new release |
| Refactor | 🔄 | Cyan | Restructure existing code |
| Experiment | 🧪 | Yellow | Try out new ideas |

### 🎨 Dark / Light Mode Toggle
- Smooth **animated theme transition** across every UI surface
- Preference **persisted** in `localStorage` — remembered across sessions
- Toggle with the ☀️ / 🌙 button in the top-right corner of the header

### 🎉 Animations
- **Ripple ring** — expands outward from the card when a branch type is selected
- **Icon pop** — spring-bounce on the icon bubble when a card becomes active
- **Confetti burst** — 90-particle canvas confetti fires from the Generate button on every successful generation (mixed rect + circle shapes, gravity & air resistance)
- **Fade-slide-up** — the output panel slides in with spring easing

### 🌿 Branch Name Generation
- **Format:** `type/TICKET-ID-ticket-title`
- Auto-lowercases and sanitises the ticket title
- Strips special characters that are invalid in branch names
- Validates expected input format (`TICKET-ID: Ticket title`)
- One-click copy to clipboard with visual feedback

### 🏷️ KP Branding
- **KP monogram** badge in the footer — purple → blue gradient with glow
- Custom **KP favicon** matching the app's colour palette
- Browser tab title: `Git Branch Generator · KP`

---

## 🖼️ UI Preview

```
╔═══════════════════════════════════════════════════════╗
║        🌿 BRANCH GENERATOR                       ☀️   ║
║                                                       ║
║             Generate Git Branches                     ║
║    Pick a type, enter your ticket, get a name         ║
║                                                       ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   ║
║  │   🐛    │ │   ✨    │ │   🔧    │ │   🛡️    │   ║
║  │ Bug Fix │ │ Feature │ │ Enhance │ │  Hotfix │   ║
║  └─────────┘ └─────────┘ └─────────┘ └─────────┘   ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐                 ║
║  │   🚀    │ │   🔄    │ │   🧪    │                 ║
║  │ Release │ │ Refactor│ │ Experim.│                 ║
║  └─────────┘ └─────────┘ └─────────┘                 ║
║                                                       ║
║  TICKET                                               ║
║  ┌───────────────────────────────────────────────┐   ║
║  │ ITDEV-278: Fix login page crash               │   ║
║  └───────────────────────────────────────────────┘   ║
║                                                       ║
║  ┌───────────────────────────────────────────────┐   ║
║  │    🐛   Generate Branch Name                  │   ║
║  └───────────────────────────────────────────────┘   ║
║                                                       ║
║  🌿 bugfix/ITDEV-278-fix-login-page-crash   [ 📋 ]  ║
╚═══════════════════════════════════════════════════════╝
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm**, yarn, or pnpm

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd branch-generator

# 2. Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads on save.

### Production Build

```bash
npm run build
npm run start
```

---

## 🗂️ Project Structure

```
branch-generator/
├── public/
│   └── favicon.png           # Custom KP branded favicon (512×512)
├── src/
│   └── app/
│       ├── layout.tsx         # Root layout — metadata, fonts, favicon
│       ├── page.tsx           # Main app — all components & logic
│       ├── globals.css        # Tailwind base styles
│       └── page.module.css    # Legacy CSS module (unused)
├── tailwind.config.js
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | React framework (App Router) |
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first CSS |
| [Lucide React](https://lucide.dev) | 0.577 | Icon system |
| [Geist Font](https://vercel.com/font) | — | Typography via `next/font` |

> **Zero runtime dependencies** beyond the above — no Redux, no external animation library, no component library. The confetti system is hand-rolled with the Canvas API.

---

## 📄 Branch Name Format

```
type/TICKET-ID-ticket-title
```

### Examples

```bash
bugfix/ITDEV-278-fix-login-page-crash
feature/PROJ-42-add-dark-mode-toggle
enhancement/APP-15-improve-sidebar-performance
hotfix/CORE-999-patch-payment-gateway
release/v2-3-0-march-release
refactor/TECH-88-restructure-auth-module
experiment/RD-7-try-ai-suggestions
```

### Input Format

The ticket input expects:
```
TICKET-ID: Ticket title
```
For example: `ITDEV-278: Fix login page crash`

---

## 🔮 Planned Features

- [ ] **Live branch preview** — updates in real-time as you type
- [ ] **Git command panel** — `git checkout -b ...` & `git push -u origin ...` ready to copy
- [ ] **Branch history** — last 10 branches saved in `localStorage`
- [ ] **Toast notifications** — slide-in "Copied!" / "Generated!" feedback
- [ ] **Custom ticket prefix** — save your project prefix (e.g. `ITDEV`) permanently
- [ ] **Format switcher** — toggle between `type/ID-title`, `ID/type/title`, etc.
- [ ] **Keyboard shortcuts** — `1–7` to pick type · `Enter` to generate · `Ctrl+Shift+C` to copy
- [ ] **Shareable URL** — encode config into query params to share branch configs
- [ ] **PWA support** — `manifest.json` to install as a desktop app
- [ ] **GitHub deep link** — open the new branch directly on GitHub

---

## 👤 Author

**Kushal Prajapati**
> Built as a personal productivity tool for daily Git workflow. Designed to be fast, beautiful, and distraction-free.

---

## 📝 License

This project is for personal use. Feel free to fork and customise.
