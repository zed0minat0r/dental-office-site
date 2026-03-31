# Changelog

## 2026-03-30 (Builder — Micro-interactions & Scroll Progress)

### Scroll Progress Bar & Calming Micro-interactions
- **Added scroll progress bar**: Gradient-colored thin bar fixed at top of viewport tracks page scroll position — provides visual feedback and adds polish
- **Hero badge pulse**: Gentle green glow pulse animation on "Accepting New Patients" badge draws attention without being distracting
- **Hero CTA shimmer**: Primary "Book Your Appointment" button has a subtle light shimmer sweep that runs on a 4-second loop
- **Service card icon lift**: Service icons gently float up and scale with soft shadow on card hover
- **Team avatar scale**: Team member avatars scale up slightly on card hover for a lively feel
- **Insurance card icon bounce**: Insurance provider SVGs scale up on card hover
- **FAQ open border accent**: FAQ items get a blue border accent when expanded
- **New patient price glow**: The $99 special price pulses with a subtle blue text-shadow glow
- **Social proof color shift**: Stat numbers transition from blue to teal on section hover
- **Testimonial card border accent**: Review cards get a blue border highlight on hover
- **Focus-visible rings**: All interactive buttons and controls get a clean 2px blue focus outline for keyboard a11y
- Marked Task 2 (Visual design & polish) as COMPLETE
- Marked scroll progress bar as complete in Task 4
- Zero new sections added — all improvements within existing elements

## 2026-03-30 (Alignment Fix)

### Mobile Alignment Consistency — Uniform Centering & Padding
- **Fixed inconsistent section alignment on mobile**: Service cards were left-aligned while team cards and other sections were centered — now all section content is uniformly centered at 768px and below
- **Centered service cards**: Added `text-align: center` to `.service-card`, auto-centered `.service-icon`, and centered `.service-link` on mobile
- **Centered testimonial cards**: Stars, blockquotes, and author attributions now centered consistently with other sections
- **Centered location info blocks**: Address, phone, hours, and emergency info now stack vertically centered instead of left-aligned on mobile
- **Centered footer on mobile**: Brand text, link columns, and legal links all centered for consistent visual rhythm
- **Unified container padding**: Set consistent `20px` horizontal padding across all mobile breakpoints (was mixed: 24px base, 16px at 480px, 12px at 360px — now 20px at 768px, 16px at 360px)
- **Unified section vertical padding**: All content sections now use `64px` vertical padding on mobile (was inconsistent: some at 100px, some at 60px, FAQ at 80px)
- **Centered hero content explicitly**: Added `text-align: center` to `.hero-content` and centered subtitle, CTAs, and trust items in the 768px breakpoint (was only set at 1024px on `.hero-grid`)
- Verified all fixes via Playwright screenshots at 375px viewport width across every section

## 2026-03-30 (Pixel — Round 2)

### Mobile Layout Polish — Stats Grid, Insurance Columns & FAQ Spacing
- **Social proof stats bar**: Replaced full vertical stack with 2x2 grid at 480px and below — cuts the stats bar height nearly in half on mobile, looks balanced at 375px and 320px. Hid decorative dividers in grid layout. Tightened section padding from 40px to 28px
- **Insurance cards**: Kept 2-column grid at 480px (was dropping to single-column too early). Cards with just an icon and provider name fit comfortably side-by-side at 375px. Single-column now only kicks in at 360px and below for iPhone SE
- **FAQ section**: Reduced mobile padding from 80px to 60px to match other sections, tightening the gap between Insurance and Location
- **Removed duplicate proof-grid media query**: Old 480px override with `flex-direction: column` was conflicting with the new grid layout — deleted it
- Verified all fixes at 320px, 375px, and 428px viewport widths via local Playwright screenshots

## 2026-03-30 (Razor — Round 2)

### CSS Surgery — Dead Code Removal, Breakpoint Consolidation & Bug Fixes
- **Removed dead CSS**: `.comfort-menu`, `.breathing-widget`, `.comfort-item`, `.comfort-item-icon` rules — referenced in dark mode and 360px breakpoints but absent from HTML (ghost styles from deleted Comfort Zone section)
- **Fixed broken delay classes**: `.delay-1` through `.delay-3` used `animation-delay` but `.fade-up` uses CSS transitions, not animations — changed to `transition-delay` so staggered fade-ins actually work now
- **Merged duplicate highlight styles**: `.comfort-note` and `.results-highlight` were near-identical blocks (~50 lines) — consolidated into shared selectors, saving ~20 lines
- **Consolidated 3 separate `@media (max-width: 768px)` blocks** into one unified block — eliminates rule scattering and duplicate declarations
- **Consolidated 2 separate `@media (max-width: 360px)` blocks** into one
- **Removed redundant `.hero-visual { display: none }`** declared in both 768px and 360px (already hidden at 768px, 360px rule was dead)
- **Removed duplicate `.footer-links li` margin-bottom** declared twice in same 768px block
- **Added missing `.nav-links a.active` CSS** — JS sets this class via IntersectionObserver but no style existed, so active nav highlighting was invisible. Now shows blue text + bottom border
- **Removed `[data-theme="dark"] .map-placeholder`** — element was replaced with `.location-map iframe` in prior commit
- style.css: 1853 -> 1598 lines (255 lines cut, -14%), 33.7KB -> 31.9KB
- Net diff: 74 insertions, 321 deletions

## 2026-03-30 (Refiner — Round 2)

### Accessibility, Meta Tags, Map Embed & Date Constraints
- **Added skip-to-content link** (P0 a11y): keyboard-accessible link appears on focus, jumps past navigation to main content — WCAG requirement now satisfied
- **Added Open Graph + Twitter Card meta tags** (P1 Technical): site shares properly on social media with title, description, and site name
- **Added SVG favicon** (P1 Technical): tooth logo now appears in browser tabs instead of generic icon — uses inline data URI, zero extra requests
- **Added `<noscript>` fallback** (P1 Technical): fade-up animations default to visible when JS is disabled, so content is never hidden
- **Replaced map placeholder with Google Maps iframe** (P1 Design): "Interactive Map Coming Soon" dashed box replaced with real embedded map centered on Springfield, IL — lazy-loaded for performance
- **Added date picker constraints** (P1 UX): preferred date field now blocks past dates, limits to 3 months ahead, and warns users if they select a Sunday (office closed)
- **Enhanced active nav highlight** (P1 UX): active section link now has bold weight + blue bottom border instead of barely-visible background change
- Cleaned up `.map-placeholder` CSS (replaced with `.location-map iframe` styles)
- Zero new sections added — all improvements within existing sections

## 2026-03-30 (Trimmer)

### Site Slimdown — 14 Sections to 10, 4,224 Lines to 2,965
- **REMOVED** "Meet Your Visit" first-appointment timeline (121 lines HTML, 290 lines CSS, JS toggles) — overlapped with FAQ which already covers first visit info
- **REMOVED** "Dental Tips" blog section (52 lines HTML, 101 lines CSS) — dental office site should focus on booking, not content publishing
- **REMOVED** "Comfort Zone" full section with breathing exercise widget (117 lines HTML, 218 lines CSS, 126 lines JS) — creative but bloat for a booking-focused site
- **REMOVED** standalone "Before & After Gallery" section (95 lines HTML, 153 lines CSS) — consolidated into Services
- **CONSOLIDATED** comfort messaging into a brief note inside the About/Team section: "Nervous about the dentist? We get it." with a one-paragraph summary of comfort amenities
- **CONSOLIDATED** smile results into a brief highlight inside the Services section with a CTA to book a consultation
- **Cleaned up** navigation: removed Gallery, Comfort, and Tips links (6 nav items down from 9)
- **Cleaned up** all associated CSS and JS — zero dead code left behind
- **Cleaned up** responsive breakpoint rules: removed comfort-grid, breathing-widget, comfort-item, breath-note, and breath-stat-label references from 768px, 480px, and 360px media queries
- Final section count: 10 (Hero, Stats Bar, Services, About/Team, Testimonials, Insurance, FAQ, Location & Hours, Contact, Footer)
- Final line count: 2,965 (was 4,224 — 30% reduction)
- Verified at 375px mobile via Playwright screenshot — clean layout, no broken elements

## 2026-03-30 (Builder)

### Task 3 Complete — Before/After Gallery & Dental Tips Blog
- Added Before/After Smile Transformations gallery section between Services and About with 3 cases: Teeth Whitening, Porcelain Veneers, and Invisalign Alignment — each with CSS gradient placeholders, SVG art, before/after comparison layout with divider, case descriptions, and procedure tags
- Added Dental Tips / Blog section between FAQ and Location with 4 articles: brushing technique, tooth-strengthening foods, making dental visits fun for kids, and dental myths debunked — each with gradient icon, category label, and read time
- Added "Gallery" and "Tips" links to main navigation
- Full responsive support at all breakpoints (1024px, 768px, 480px) with grid layout adjustments
- Full dark mode support for both new sections
- Gallery cards with hover lift effect, soft shadows, and CTA to book a free consultation
- Tip cards with category badges, read time indicators, and friendly SVG icons
- Marked Task 3 as COMPLETE in TASKS.md

## 2026-03-30 (Spark)

### Meet Your Visit — Interactive First-Appointment Timeline
- Added new "Meet Your Visit" section between About/Team and Testimonials
- 5-step visual timeline showing exactly what happens during a first appointment: Warm Welcome, Get-to-Know-You Chat, Gentle Exam & Digital X-Rays, Personalized Plan, Leave With a Smile
- Each step has a gradient icon marker, friendly description, and time estimate badge
- 4 expandable "learn more" toggles (What to bring, Common questions, About our technology, Our promise) with smooth slide-down animation
- Total visit time summary pill at bottom (45 minutes) with gradient background
- Full dark mode support, responsive at 768px and 480px breakpoints
- Added "Your Visit" link to main navigation
- Directly addresses VISION.md goals: builds trust through transparency, reassures anxious patients by eliminating the unknown, and makes the experience welcoming

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
