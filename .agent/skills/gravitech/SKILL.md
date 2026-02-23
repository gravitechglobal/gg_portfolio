---
name: gravitech-pro-design
description: Professional UI/UX and 3D orchestration for the Gravitech Global project. Use this for high-end landing pages, Three.js integrations, and seamless animations.
---

# Gravitech Pro Design Skill

This skill guides the implementation of industrial-grade, minimalistic, and "seamless" web interfaces using the Antigravity tech stack.

## Core Design Principles
* **Minimalism**: Maintain a signal-to-noise ratio of at least 80% content to 20% UI chrome.
* **Seamlessness**: Use "Antigravity Easing" for all transitions: `cubic-bezier(0.22, 1, 0.36, 1)`.
* **Glassmorphism**: Service cards must use `backdrop-filter: blur(12px)` with a 1px border of `rgba(255, 255, 255, 0.1)`.

## Technical Implementation Logic
1.  **3D Globe**: Always use `react-three-fiber`. The globe texture must be loaded via `KTX2` for performance.
2.  **Responsiveness**: Use fluid typography logic: `font-size: clamp(2rem, 5vw, 5rem)` for H1 headers.
3.  **Scroll Animations**: Implement Framer Motion `useScroll` and `useTransform` to rotate the globe based on the user's scroll position.

## Constraints
* Do not use standard CSS breakpoints for font sizes; use fluid `clamp()`.
* Do not load 3D assets on the main thread; use React Suspense.
* Avoid "flat" buttons; all CTAs must have a subtle $Z$-axis depth shift on hover.

## Verification Checklist
- [ ] 60fps performance on mobile simulation.
- [ ] WCAG 2.2 color contrast compliance.
- [ ] No layout shift (CLS) during 3D asset hydration.