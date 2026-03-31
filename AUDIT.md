# Bright Smile Dental — Website Audit (Round 3)

**Auditor**: Nigel Pemberton-Finch, Senior Digital Auditor
**Date**: 2026-03-30
**Site**: https://zed0minat0r.github.io/dental-office-site/

---

## Scores

```json
{
  "audit_date": "2026-03-30",
  "auditor": "Nigel",
  "overall_score": 6.5,
  "categories": {
    "design": 5,
    "content": 5,
    "ux": 8,
    "technical_quality": 8,
    "conversion_optimization": 4,
    "simplicity": 9
  },
  "score_history": [
    {
      "date": "2026-03-30",
      "audit": 1,
      "overall": 5.8,
      "design": 6,
      "content": 6,
      "ux": 6,
      "technical_quality": 7,
      "conversion_optimization": 5,
      "simplicity": null,
      "notes": "Initial audit of v1 build"
    },
    {
      "date": "2026-03-30",
      "audit": 2,
      "overall": 6.3,
      "design": 6,
      "content": 7,
      "ux": 7,
      "technical_quality": 8,
      "conversion_optimization": 5,
      "simplicity": 7,
      "notes": "Post-refactor audit: bloat removed, FAQ added, a11y + SEO improvements, micro-interactions, but still no real imagery or scheduling"
    },
    {
      "date": "2026-03-30",
      "audit": 3,
      "overall": 6.5,
      "design": 5,
      "content": 5,
      "ux": 8,
      "technical_quality": 8,
      "conversion_optimization": 4,
      "simplicity": 9,
      "notes": "Scoring caps enforced: placeholder content caps Content at 5, CSS avatars cap Design at 5, fake form caps Conversion at 4. Mobile UX genuinely excellent (section dots, swipeable carousel, ARIA validation). Simplicity jumps to 9 — lean, focused, well-structured."
    }
  ]
}
```

---

## Category Breakdown

### Design — 5/10 (CAPPED, was 6)

**SCORING CAP APPLIED:** No real photography anywhere on this site. CSS avatar illustrations with dot eyes and coloured blobs represent the dental team. The floating SVG cartoon tooth remains in the hero (hidden on mobile, still present on desktop). No real photos of the office, the team, or any patients. This caps Design at 5 regardless of other improvements.

**What improved since last audit:**
- Nothing material on the design front. The 6 commits since Round 2 focused on mobile UX (section dots, swipeable carousel, touch targets, ARIA). These are good changes but they are UX and Technical improvements, not Design improvements.

**What still does NOT work:**
- **CSS avatar illustrations remain.** 39 references to `avatar` in style.css. ~160 lines of CSS to render cartoon faces that should be `<img>` tags. Still P0. Still the single most damaging visual element on the site.
- **No real photography.** Zero. Not one photograph. A dental practice with zero photos is a dental practice that does not look real.
- **Insurance logos remain abstract SVG shapes.** A cross, a circle, a checkmark. No patient recognises their insurance provider from these.
- **Hero illustration still a cartoon tooth on desktop.**

**Priority fixes (unchanged from Round 2):**
1. **P0** — Replace CSS avatars with real team headshots
2. **P0** — Add real photography (office, patients, hero imagery)
3. **P1** — Use actual insurance provider logos
4. **P2** — Add office gallery or virtual tour

---

### Content — 5/10 (CAPPED, was 7)

**SCORING CAP APPLIED:** All contact information remains placeholder. "1234 Smile Avenue, Suite 200" appears in HTML, JSON-LD structured data, and footer. "(555) 123-4567" appears 7 times across the site. "hello@brightsmile.com" in the footer. These are obviously fake. Content is capped at 5.

**What improved since last audit:**
- Social media links added to footer (Facebook, Instagram, Google Business Profile). However, they all point to `href="#"` — dead links to nowhere. This is not an improvement; it is a new problem.

**What still does NOT work:**
- **Placeholder contact information everywhere.** This was P0 in Round 2. Still P0. Still unfixed. The fake address appears in the JSON-LD structured data, which means Google will index fake data for local search. This is actively harmful to SEO.
- **Team bios remain thin.** Three sentences each. No personality, no founding story, no differentiators.
- **Social media links are dead.** `href="#"` on all three footer social links. Adding icons that go nowhere is worse than not having them — it signals a template, not a real practice.
- **Footer legal links still dead.** Privacy Policy, Terms of Service, Accessibility — all `href="#"`. For a medical practice, these are not optional.
- **No differentiators.** No mention of specific technology, certifications, or what makes this practice different.

**Priority fixes:**
1. **P0** — Replace ALL placeholder contact information with real data (address, phone, email)
2. **P0** — Wire social media links to actual profiles, or remove them entirely
3. **P0** — Create or link Privacy Policy, Terms of Service, and Accessibility Statement
4. **P1** — Add genuine practice differentiators (technology, founding story)
5. **P1** — Expand team bios with personality and depth

---

### UX — 8/10 (+1)

**What improved since last audit:**
- **Section dots navigator.** Fixed vertical dot strip on right edge for quick section jumping. Uses IntersectionObserver to track active section. Responsive sizing (12px desktop, 10px tablet, 9px small mobile). Progressive reveal after 200px scroll. This is a genuinely useful navigation aid for a long single-page site, especially on mobile where scrolling is the primary interaction. Well implemented.
- **Swipeable testimonials carousel on mobile.** Horizontal scroll-snap with `scroll-snap-type: x mandatory`. Dot indicators that track current card via scroll detection. 44px touch targets on dots. Animated "Swipe to read more reviews" hint that fades out. Hidden on desktop — zero impact on existing layout. This is exactly right. Mobile users expect to swipe; they got swipe.
- **Touch target compliance.** Footer social icons bumped to 44px. Footer links to 44px. Inline links given 12px vertical padding. Emergency phone link min-height 44px. Hero badge and CTA bar fonts bumped to 14px minimum. This is thorough mobile-first work.
- **Insurance cards vertical stacking at 480px.** "UnitedHealthcare" no longer truncated. Sensible layout adjustment.
- **Hours row gap fix.** "Monday - Friday" and "8:00 AM - 6:00 PM" no longer run together.
- **Back-to-top repositioned** to clear the sticky CTA bar on mobile.
- **ARIA form validation with inline error messages.** `aria-invalid`, `aria-describedby`, per-field error spans with `role="alert"`. Phone pattern validation. This was P0 from Round 2 — properly addressed.

**What still does NOT work:**
- **Booking form is still a dead end.** Still a `setTimeout` toast. Still "we will contact you within 1 business day." In 2026, this is unacceptable. Every competitor offers instant online booking. This is the UX ceiling.
- **"Learn More" on service cards still goes to the contact form.** 5 instances of `<a href="#contact" class="service-link">Learn More</a>`. A user clicking "Learn More" on Cosmetic Dentistry expects information about cosmetic dentistry.
- **Social media links go nowhere.** Clicking Facebook, Instagram, or Google Business Profile does nothing.

**Priority fixes:**
1. **P0** — Integrate real-time scheduling (Zocdoc, Calendly, or practice management widget)
2. **P1** — Make "Learn More" links expand service detail (accordions, modals, or sub-pages)
3. **P1** — Wire social media links to real profiles or remove them

---

### Technical Quality — 8/10 (no change)

**What improved since last audit:**
- **`<main>` landmark element added** wrapping page content. Skip-to-content now targets `#main`. Screen reader navigation fixed.
- **ARIA form validation complete.** `aria-invalid="true"`, `aria-describedby` pointing to per-field `<span class="field-error" role="alert">` elements. Phone pattern validation via `pattern` attribute. This was P0 — properly done.
- **Consolidated scroll listeners.** Sticky header, scroll progress, back-to-top, and section dots all in one passive handler. Clean.
- **Dynamic copyright year.** `new Date().getFullYear()` instead of hardcoded "2026".
- **IntersectionObserver for section dots** — efficient, no scroll listener overhead for dot tracking.
- **Scroll-snap carousel** uses CSS-native snapping with JS dot synchronization via scroll event. No library dependencies. Lean.
- **Horizontal overflow fix at 375px.** `minmax(0, 1fr)` on insurance grid, `min-width: 0` on cards. Root cause properly diagnosed and fixed.
- Total codebase: 3,406 lines across 3 files (997 HTML, 1997 CSS, 412 JS). 116KB total. No dependencies. No build step. This is admirably lean for the feature set.

**What still does NOT work:**
- **JSON-LD `image` field uses SVG data URI.** Better than the site URL (Round 1), but Google's rich results validator may reject a data URI. Should be a hosted image URL.
- **Multiple `@media (max-width: 768px)` blocks.** Lines 1407 and 1467 are separate 768px blocks. Lines 1585 and potentially others are duplicate breakpoints. The Round 2 consolidation was good but new features added new blocks.
- **Social links `href="#"` with `rel="noopener noreferrer"`.** Technically correct attributes on links that go nowhere. The technical implementation is fine; the content is missing.
- **No `<img>` elements with `loading="lazy"` anywhere** — because there are no images. When real photos arrive, ensure lazy loading is applied.
- **`novalidate` still on the form** — the custom validation is now better (ARIA, phone pattern), but the form still relies entirely on JS. A `required` attribute without `novalidate` would give users browser-native fallback.

**Priority fixes:**
1. **P0** — Fix JSON-LD `image` to use a hosted image URL (not data URI)
2. **P1** — Consolidate duplicate media query blocks added by new features
3. **P1** — Consider removing `novalidate` to allow browser-native validation as fallback
4. **P2** — Ensure lazy loading on all images when real photography is added

---

### Conversion Optimization — 4/10 (CAPPED, was 5)

**SCORING CAP APPLIED:** The appointment form uses `setTimeout` to simulate submission. No backend. No confirmation email. No real booking. The form shows a toast saying "Thank you! We will contact you shortly" — but nothing actually happens. No appointment is created. No data is sent. This is a conversion dead end, and it caps this category at 4.

**What improved since last audit:**
- Social media icons added to footer — but they are dead links (`href="#"`). This actually hurts conversion because it signals a template site.
- Swipeable testimonial carousel on mobile makes social proof more accessible and engaging on the primary user device. This is a genuine conversion micro-improvement.
- Touch target improvements ensure tappable elements are usable on mobile. Good for conversion hygiene.

**What still does NOT work:**
- **The form is fake.** `setTimeout` with a toast. No data goes anywhere. A patient who fills out the form gets nothing — no email, no confirmation, no appointment. This is the conversion killer.
- **Social media links are dead.** Dead social links actively damage credibility. Remove them or wire them up.
- **No Google Reviews link.** "4.9 rating / 500+ reviews" — where? Link to the actual reviews page.
- **Insurance logos unrecognisable.** Patients scanning for their provider cannot identify abstract SVG shapes.
- **$99 new patient special buried** in the contact sidebar. Should be hero-level prominent.
- **No patient financing detail.** CareCredit mentioned once in FAQ, not prominently.
- **No live chat, no SMS, no exit-intent capture.**

**Priority fixes:**
1. **P0** — Connect form to a real backend OR integrate scheduling service (Zocdoc, Calendly)
2. **P0** — Either wire social media links to real profiles or remove them entirely
3. **P1** — Link social proof numbers to actual Google Reviews page
4. **P1** — Make $99 new patient offer more prominent
5. **P1** — Add real insurance provider logos
6. **P2** — Add chat widget or "Text Us" option

---

### Simplicity — 9/10 (+2)

**What works:**
- **3,406 total lines across 3 files.** No build step. No dependencies. No framework. One HTML file, one CSS file, one JS file. 116KB total. This is refreshingly lean.
- **10 sections, 6 nav links.** The structure is focused and logical: Hero, Stats, Services, About/Team, Testimonials, Insurance, FAQ, Location, Contact, Footer.
- **New features added without bloat.** Section dots navigator: ~90 lines CSS, ~35 lines JS. Testimonial carousel: ~80 lines CSS, ~50 lines JS. These are proportionate additions for the functionality they deliver.
- **Consolidated scroll handler.** One passive listener handles sticky header, progress bar, back-to-top, and section dots. Clean architecture.
- **IntersectionObserver used correctly** for fade-ups, count-up animations, section dot tracking, and carousel dot tracking. No unnecessary scroll listeners.
- **CSS avatar system is STILL 160+ lines that should be replaced by `<img>` tags.** But I am scoring Simplicity on the code that exists, and within its constraints, the code is clean and well-organised.
- **No dead code.** The dead CSS removal passes were effective. No ghost styles found.

**What could be leaner:**
- **Duplicate media query blocks.** New features added new `@media (max-width: 768px)` blocks instead of appending to the existing consolidated block. This is a mild organisational issue, not a complexity problem.
- **Carousel CSS (80 lines) only applies on mobile.** Properly scoped with media queries. No desktop impact. This is the right way to add mobile-specific features.

**Priority fixes:**
1. **P1** — Consolidate duplicate media query blocks
2. **P2** — When real photos replace CSS avatars, delete ~160 lines of avatar CSS

---

## Overall Assessment

**Overall Score: 6.5/10** (was 6.3 — up 0.2)

The mobile UX work since Round 2 has been genuinely excellent. The section dots navigator, swipeable testimonial carousel, 44px touch targets, ARIA form validation, and insurance card layout fixes are all well-implemented, mobile-first improvements that demonstrate real understanding of how people use phones. The codebase remains admirably lean at 3,406 lines with zero dependencies. Simplicity jumps to 9 — this is clean, focused work.

However, I am now enforcing strict scoring caps that were implicit but not formalised in previous rounds:

- **Design is CAPPED at 5** because there is no real photography. CSS avatars with dot eyes are not team headshots. A floating SVG tooth is not a hero image. This cap cannot be overridden by colour palette quality or animation polish.
- **Content is CAPPED at 5** because "1234 Smile Avenue" and "(555) 123-4567" are placeholder data, not real content. This fake data now appears in JSON-LD structured data being served to Google. The addition of dead social media links (`href="#"`) makes this worse, not better.
- **Conversion is CAPPED at 4** because the booking form uses `setTimeout` to fake a submission. No data goes anywhere. No appointment is created. Adding dead social media links compounds the problem.

The fundamental reality has not changed since Round 1: the code is excellent, but it is dressing a mannequin. The technical execution is professional-grade. The content is template-grade. Until real photography, real contact information, and real scheduling are added, this site cannot break 7.0.

**Trajectory:** UX and Simplicity are approaching their ceilings (8 and 9). Technical is solid at 8. The bottleneck is now entirely Content (real data), Design (real photography), and Conversion (real scheduling). These are not code problems — they are business decisions.

**Top 5 actions, in order:**
1. Real photography (team headshots, office photos, hero image) — unlocks Design past 5
2. Real contact information (address, phone, email, social links) — unlocks Content past 5
3. Real-time scheduling integration — unlocks Conversion past 4
4. Wire or remove dead social media links — currently hurting credibility
5. Make "Learn More" on service cards link to actual service information

---

*Audit conducted by Nigel. The mobile UX is now genuinely good — better than most real dental sites, frankly. But a beautifully tailored suit still needs a person inside it. Give me real content and I will give you real scores.*
