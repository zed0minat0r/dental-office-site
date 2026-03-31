# Changelog

## 2026-03-30

### QA Pass — Bug Fixes (QA)
- Fixed label/input mismatch: `<label for="insurance">` pointed to the `<section id="insurance">` instead of the insurance `<select>` element. Changed select `id="insurance-select"` to `id="insurance"` so the label properly associates with its form control.
- Fixed missing copyright symbol in footer: added `&copy;` before "2026 Bright Smile Dental"
- Fixed incomplete CSS error-state coverage: added `textarea.error` selector alongside `input.error` and `select.error` so textareas display the red border on validation failure
- Hardened external link: added `noreferrer` to Google Maps link `rel` attribute (was only `noopener`)

## 2026-03-30

### Audit Complete — Nigel's Full Site Review (Auditor)
- Comprehensive audit across 5 categories: Design (6), Content (6), UX (6), Technical Quality (7), Conversion Optimization (5)
- Overall score: 5.8/10 — solid template, not yet a real practice site
- Key findings: no real photography, no real scheduling, missing structured data, placeholder content throughout
- Created AUDIT.md with JSON scores, score_history, detailed findings and prioritized recommendations per category
- Top priorities: real photography, scheduling integration, JSON-LD structured data, social proof, FAQ section

## 2026-03-30

### Task 1 Complete — Full Initial Build (Builder)
- Built complete index.html, style.css, main.js from scratch
- Hero section with gradient text, floating tooth illustration, trust badges, dual CTAs
- Services grid: 6 cards (General, Cosmetic, Emergency, Pediatric, Orthodontics, Preventive) with custom SVG icons
- About/Team section: 4 team members with CSS avatar illustrations (no emojis, no images)
- Patient testimonials: 4 reviews with varied star ratings (4-5 stars), specific dental feedback
- Insurance section: 8 providers with SVG logos (Delta Dental, Cigna, Aetna, MetLife, Guardian, UHC, Humana, BlueCross)
- Location & Hours: address, phone, hours table, emergency line, map placeholder
- Appointment request form: name, email, phone, service, date, insurance, patient type, notes
- Contact sidebar with new patient special ($99) and call CTA
- Responsive navigation with hamburger menu for mobile
- Dark mode toggle with localStorage persistence + system preference detection
- Scroll animations via IntersectionObserver
- 3 responsive breakpoints: 1024px (tablet), 768px (mobile), 480px (small mobile)
- Full footer with brand, quick links, services, contact info
- Form validation with error states, success toast
- Style guide colors: primary #2B7DE9, teal #06B6D4, accent #F59E0B
- Rounded corners, soft shadows, calming gradients throughout

## 2026-03-31

### Initial Setup
- Created repo with VISION.md, STYLE-GUIDE.md, REQUIREMENTS.md, TASKS.md
- Dental office site: Bright Smile Dental
- 4 tasks defined, agent team deployed
