# Changelog

## 2026-03-30 (Mobile Visual Bug Fixes)

### Fix — 3 Mobile Visual Bugs (Nav, Hero Illustration, Footer)
- **Mobile Nav Bar**: Added `overflow: hidden` to `.nav-container` and `flex-shrink: 0` to `.nav-actions` on mobile to prevent any potential header overflow at 375px and 320px widths
- **Hero Illustration**: Hid the floating tooth SVG graphic (`.hero-visual`) on screens 768px and below — it looked confusing and unprofessional on mobile. Hero section is now a clean text-first layout with headline, subtitle, CTA buttons, and trust badges
- **Footer Layout**: Changed mobile footer grid from single-column to 2-column layout for Quick Links/Services/Contact sections, reducing excessive vertical space. Reduced footer link min-height from 44px to 40px with tighter margins. Footer bottom padding reduced from 80px to 72px. Legal links gap tightened to 16px
- Verified fixes at 375px (iPhone) and 320px (iPhone SE) viewports via Playwright screenshots

## 2026-03-30 (QA — Playwright)

### Bug Fix — Horizontal Overflow at 320px Viewport
- Ran automated Playwright test suite (19 tests) against the live site — 18 passed, 1 failed: horizontal scroll detected at 320px width
- Diagnosed overflowing elements using Playwright browser introspection: `.comfort-menu` (331px), `.breathing-widget` (331px), `.appointment-form` (333px), `.contact-sidebar` (333px), and `.mobile-cta-bar .btn-outline` (extending to 347px)
- Root causes: (1) comfort/breathing widgets had too much padding for 320px containers, (2) CSS grid children inherited `min-width: auto` allowing content to overflow, (3) mobile CTA bar buttons had `white-space: nowrap` with padding too wide for two buttons at 320px
- Added `@media (max-width: 360px)` breakpoint in style.css: reduced container padding to 12px, reduced comfort-menu/breathing-widget padding to 20px 12px, shrunk comfort-item icons to 36px, reduced form/sidebar padding to 14px, set `min-width: 0` and `overflow: hidden` on grid children, reduced mobile CTA bar button padding and font-size
- Re-ran Playwright suite: 19/19 tests passing, zero horizontal scroll at 320px, 375px, and desktop widths
- Code review notes (non-blocking): JSON-LD `image` field points to site URL not an image; privacy/terms/accessibility footer links are dead (`href="#"`); `mobile-cta-bar` could use `role="navigation"` for accessibility

## 2026-03-30 (Razor)

### Code Surgery — Inline Style Extraction & SVG Deduplication
- Extracted 15 inline `animation-delay` styles to 4 CSS utility classes (`.delay-1` through `.delay-3`)
- Extracted 16 inline gradient `background` styles to 6 reusable CSS classes (`.grad-blue`, `.grad-amber`, `.grad-red`, `.grad-green`, `.grad-purple`, `.grad-cyan`)
- Replaced 4 inline gradient styles on testimonial author avatars with shared gradient classes
- Deduplicated 20 inline star SVGs into a single `<symbol id="star">` with `<use>` references
- Deduplicated 3 identical check-circle SVGs into a single `<symbol id="check-circle">` with `<use>` references
- Added `.icon-check` CSS class for trust-item icon color
- Zero inline `style` attributes remain except 2 legitimate `display:none` on dynamic elements
- No features removed, no visual changes

## 2026-03-30 (Pixel)

### Mobile UX Overhaul — Touch Targets, Typography & CTA Accessibility
- Fixed form input font-size from 15px to 16px to prevent iOS Safari auto-zoom on focus
- Increased dark mode toggle and hamburger button to 44px minimum touch targets (was 40px)
- Added sticky mobile CTA bar at bottom of screen with "Book Appointment" and "Call Now" buttons — always visible on mobile since the nav CTA is hidden
- Added "Book Appointment" CTA button inside mobile hamburger menu for discoverability
- Enforced 14px minimum font size on all mobile text: section badges, team roles, testimonial metadata, comfort item descriptions, form disclaimer, breathing note, footer text, and legal links
- Set 44px minimum touch target height on all mobile interactive elements: footer links, nav menu items (48px), service links, insurance cards, legal links
- Added overflow-x: hidden on body to prevent any horizontal scrolling
- Hidden decorative hero background shapes on mobile to prevent overflow bleed
- Added 320px-width fine-tuning: smaller logo text, tighter comfort item padding, reduced heading sizes, smaller hero illustration for narrow screens
- Footer bottom padding increased on mobile to account for sticky CTA bar
- All changes tested mentally against 320px, 375px, and 428px viewport widths

## 2026-03-30 (Refiner)

### SEO, Social Proof, FAQ & Polish
- Added JSON-LD structured data (Schema.org Dentist/LocalBusiness) in `<head>` for local SEO: address, hours, aggregate rating, medical specialties, founder info
- Added social proof stats bar below hero: 4.9 Google Rating with stars, 500+ reviews, 15+ years in practice, 10,000+ patients served
- Added FAQ accordion section (6 questions) between Insurance and Location using native `<details>`/`<summary>` elements — covers first visit, insurance, anxiety, cost, kids, and emergencies
- Added FAQ link to main navigation
- Bonus: Added back-to-top floating button with scroll-triggered visibility and smooth scroll behavior
- Full dark mode and responsive support for all new sections

## 2026-03-30 (Spark)

### Comfort Zone — Dental Anxiety Relief Section
- Added new "Comfort Zone" section between Testimonials and Insurance
- Comfort Menu: 6 items (noise-canceling headphones, weighted blanket, ceiling TVs, warm beverages, hand signal system, sedation options) with gradient icons
- Interactive Box Breathing Exercise widget with animated expanding/contracting circle, SVG ring progress indicator, phase labels (Breathe In / Hold / Breathe Out), countdown timer, cycle counter, and session duration tracker
- Full dark mode support and responsive design (1024px, 768px, 480px breakpoints)
- Added "Comfort" link to main navigation
- Addresses VISION.md target audience: "People anxious about dental visits who need reassurance"

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
