# Bright Smile Dental — Website Audit (Round 4)

**Auditor**: Nigel Pemberton-Finch, Senior Digital Auditor
**Date**: 2026-03-30
**Site**: https://zed0minat0r.github.io/dental-office-site/

---

## Scores

```json
{
  "audit_date": "2026-03-30",
  "auditor": "Nigel",
  "overall_score": 6.7,
  "categories": {
    "design": 5,
    "content": 5,
    "ux": 9,
    "technical_quality": 8,
    "conversion_optimization": 4,
    "simplicity": 8
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
      "notes": "Scoring caps enforced: placeholder content caps Content at 5, CSS avatars cap Design at 5, fake form caps Conversion at 4. Mobile UX genuinely excellent. Simplicity jumps to 9."
    },
    {
      "date": "2026-03-30",
      "audit": 4,
      "overall": 6.7,
      "design": 5,
      "content": 5,
      "ux": 9,
      "technical_quality": 8,
      "conversion_optimization": 4,
      "simplicity": 8,
      "notes": "Mobile UX hits 9 — tap-to-expand service cards and time slot selector are excellent mobile-first work. Simplicity drops to 8 — codebase grew 10% with a second 768px media block. Caps unchanged: no real photos, no real contact info, no real booking."
    }
  ]
}
```

---

## Category Breakdown

### Design — 5/10 (CAPPED, unchanged)

**SCORING CAP APPLIED:** No real photography. CSS avatar illustrations with dot eyes. Floating SVG cartoon tooth on desktop hero. Zero photographs of office, team, or patients. Cap remains at 5.

**What changed since last audit:**
- Service cards now have expand-indicator chevrons with rotation animation and a colour shift to primary blue on expand. Nice micro-interaction, but this is polish on an already-polished surface — it doesn't address the photography problem.
- Section dots hidden on mobile (correct decision — they were visual clutter on 375px). This is a subtraction, not an addition, and the right call.

**What still does NOT work (unchanged):**
- **CSS avatar system: 39 references in style.css, ~160 lines of CSS.** Still the single most damaging visual element. P0. Round 4 and still here.
- **Zero real photographs.** Not one. A dental practice with no photos is a dental practice nobody trusts.
- **Insurance logos remain abstract SVG shapes.**
- **Hero illustration still a cartoon tooth on desktop.**

**Priority fixes (identical to Round 3, Round 2, and Round 1):**
1. **P0** — Replace CSS avatars with real team headshots
2. **P0** — Add real photography (office, patients, hero imagery)
3. **P1** — Use actual insurance provider logos

---

### Content — 5/10 (CAPPED, unchanged)

**SCORING CAP APPLIED:** Placeholder contact data everywhere. "1234 Smile Avenue, Suite 200" in HTML and JSON-LD. "(555) 123-4567" appears across the site — including in a `tel:` link on the Emergency service card (`tel:+15551234567`). "hello@brightsmile.com" in the footer. All fake. Cap at 5.

**What changed since last audit:**
- Time slot labels added to the appointment form (8:00 AM through 5:00 PM, with Saturday limited to 9 AM - 2 PM). The time ranges match the stated office hours, which shows attention to detail. But this is form UX, not content.
- Service card descriptions are now revealed on tap rather than always visible. The descriptions themselves have not changed — they remain generic single-sentence summaries.

**What still does NOT work (unchanged):**
- **All contact information is fake.** P0 since Round 1. Four audits later, still fake. The fake phone number now appears in a `tel:+15551234567` link on the Emergency card — so a mobile user tapping "Call Now" would literally dial a fake number.
- **Social media links remain dead** (`href="#"`). Still 8 instances of `href="#"` across the site.
- **Footer legal links still dead.** Privacy Policy, Terms of Service, Accessibility — all `href="#"`.
- **"Learn More" links still point to `#contact`** — 5 instances. A user tapping "Learn More" on Cosmetic Dentistry still gets dumped at the booking form.
- **Team bios still thin.** Three sentences each.

**Priority fixes (unchanged):**
1. **P0** — Replace ALL placeholder contact information
2. **P0** — Fix or remove dead `href="#"` links
3. **P1** — Make "Learn More" link to actual service content
4. **P1** — Create real legal pages (Privacy, Terms, Accessibility)

---

### UX — 9/10 (+1)

This is where the work has been concentrated, and it shows. The UX is now genuinely better than most production dental sites I audit.

**What improved since last audit:**

- **Tap-to-expand service cards on mobile.** Accordion pattern: tapping a card reveals description + CTA; tapping another collapses the first. Chevron rotates 180 degrees with spring easing. Ripple effect on tap. Cards have `role="button"`, `tabindex="0"`, `aria-expanded`, and respond to Enter/Space. Desktop layout completely unaffected (`display: contents` on expand zone, indicator hidden). This is exactly the right mobile pattern — saves vertical scroll space while keeping all content accessible. Well implemented.

- **Appointment time slot selector.** After selecting a date, a grid of time slots slides in with staggered animation. 2-column grid on mobile with 48px min-height touch targets. Saturday hours correctly limited to 9 AM - 2 PM. Selected state clearly differentiated. Hidden input stores value for form submission. The interaction model is intuitive — pick a date, pick a time. This is what appointment booking *should* feel like.

- **Section dots removed from mobile.** The right call. The fixed right-edge dots were competing with the sticky CTA bar and eating into the narrow mobile viewport. Desktop keeps them for quick-jump navigation.

**What still does NOT work:**
- **The form is still a dead end.** The time slot selector makes the *experience* of choosing a time feel real, but the form still submits to `setTimeout`. The user picks a date, picks a time, fills in their details, hits submit... and nothing happens. This is now *worse* UX than before because the added specificity of the time slot selector raises expectations of a real booking, making the fake submission feel like a betrayal.
- **"Learn More" still goes to `#contact`.** Now that cards expand to show descriptions, the "Learn More" link at the bottom of each expanded card is even more confusing — the user just expanded for more info and the link says "Learn More" but goes to a booking form.

**Priority fixes:**
1. **P0** — Connect form to real backend or scheduling service
2. **P1** — Rename "Learn More" to "Book Consultation" or similar (since it goes to the contact form anyway, at least be honest about it)

---

### Technical Quality — 8/10 (unchanged)

**What improved since last audit:**
- **CSS consolidation pass.** Merged 3 duplicate `@media (max-width: 768px)` blocks into 1. Removed dead rules (`.testimonials-grid` override, redundant `.insurance-note`, duplicate `background` on `.carousel-dot`). Merged section padding rules. Good housekeeping: -178 bytes.
- **Time slot selector architecture.** Uses change event on date field to trigger slot grid. Hidden input for form value. Saturday logic correctly scoped. Staggered animations via `nth-child` delays (10 individual rules). Clean.
- **Service card expand system.** Accordion state management is simple: loop all `.expanded`, remove class, toggle current. `aria-expanded` properly toggled. `display: contents` for desktop passthrough is the right technique.

**What still does NOT work:**
- **Second `@media (max-width: 768px)` block is back.** Line 1542 and line 2062. The consolidation pass (commit `b3788ef`) merged duplicates, then the very next commit (`736fb74`, tap-to-expand cards) added a new separate block. Two commits later (`4ed8efb`, time slot selector) added CSS inside the first block. The result: two 768px blocks again. This is a process issue — the left hand consolidates, the right hand re-fragments.
- **`novalidate` still on the form.**
- **JSON-LD `image` still uses data URI.**
- **Codebase grew 10%:** 3,406 lines (Round 3) to 3,746 lines. 116KB to 122KB total. The growth is proportionate to features added, so it is justified. But the trajectory bears watching.
- **10 individual `nth-child` animation-delay rules** for time slot stagger (lines 1201-1210). Pragmatic but verbose.

**Priority fixes:**
1. **P1** — Consolidate the re-duplicated 768px media query blocks (again)
2. **P1** — Fix JSON-LD `image` to use hosted URL
3. **P2** — Consider removing `novalidate` for browser-native fallback

---

### Conversion Optimization — 4/10 (CAPPED, unchanged)

**SCORING CAP APPLIED:** The form still uses `setTimeout` to fake submission. No data is sent anywhere. No appointment is created. Cap at 4.

**What changed since last audit:**
- The time slot selector *improves the booking experience* but does not *enable* booking. It is a beautifully crafted steering wheel bolted to a car with no engine. The user can now select a specific date and time slot, which makes the interaction feel more real and specific — but the form still submits to nowhere. This actually makes the fake submission feel worse, because the user invested more effort selecting a specific time.
- Tap-to-expand service cards improve service discovery on mobile — users can quickly scan services and expand ones they are interested in. This is a positive conversion micro-interaction.

**What still does NOT work:**
- **The form is fake.** Round 4. Still fake. Still the conversion ceiling.
- **Social media links still dead.**
- **No Google Reviews link for the claimed "4.9 rating / 500+ reviews."**
- **$99 new patient special still buried in sidebar.**
- **"Learn More" mislabels what is actually "Go to booking form."**

**Priority fixes (unchanged since Round 1):**
1. **P0** — Connect to real scheduling backend
2. **P0** — Fix or remove dead social links
3. **P1** — Link review claims to actual reviews

---

### Simplicity — 8/10 (-1)

**What changed since last audit:**
- Codebase grew from 3,406 to 3,746 lines (+10%). From 116KB to 122KB. Three files, no dependencies, no build step — the fundamentals remain admirably lean.
- However: the CSS consolidation pass merged duplicate media queries, and then the very next feature commit re-introduced a separate `@media (max-width: 768px)` block. There are now two 768px blocks again (lines 1542 and 2062). This is a simplicity regression.
- The time slot system adds 10 individual `nth-child` animation-delay rules, a `.time-slot-group.animate-in` system, and responsive grid adjustments across 3 breakpoints. It is clean code, but it is *more* code.
- The service card expand system adds ~100 lines of CSS scoped inside a mobile media query. The `display: contents` desktop passthrough is elegant, but the ripple pseudo-element, bounce keyframe, spring easing, and expand animations are ornate for an accordion.

**The trend:** Round 3's simplicity score of 9 reflected a codebase that had been recently cleaned. Since then, 340 lines of new code have been added with cosmetic animations (spring easing, ripple effects, staggered reveals, bounce keyframes) that add visual delight but also complexity. The code is still clean and well-organised, but it is drifting toward over-engineering the details while the fundamentals (real content, real booking) remain unaddressed.

**Priority fixes:**
1. **P1** — Consolidate duplicate 768px media query blocks
2. **P2** — Consider whether bounce keyframes and ripple effects are necessary for a dental booking form

---

## Overall Assessment

**Overall Score: 6.7/10** (was 6.5 — up 0.2)

The mobile UX earns its 9. The tap-to-expand service cards are the right pattern — compact view for scanning, expand for detail, accordion to keep the page tidy. The time slot selector makes appointment booking feel specific and real. Both features are well-implemented with proper ARIA attributes, keyboard accessibility, and clean mobile-only scoping. Section dots correctly removed from mobile where they were clutter. The CSS consolidation pass was good housekeeping.

**But the caps hold firm:**
- **Design stays at 5.** No real photos. CSS avatars with dot eyes. Four audits and not a single `<img>` tag in the codebase.
- **Content stays at 5.** "(555) 123-4567" is now in a `tel:` link. A mobile user tapping "Call Now" on the Emergency service card will dial a fake number. This is not a theoretical problem — it is a broken user flow.
- **Conversion stays at 4.** The time slot selector makes the fake form *feel* more real, which makes the fake submission *feel* more deceptive. The engine is still missing.

**The paradox of this codebase:** Each round, the code gets better and the scores barely move. That is because the code was never the problem. The problem is that this is a beautifully engineered template with no real content inside it. The UX work is genuinely excellent — 9/10, better than most production dental sites. But UX without content is a hollow shell.

**Trajectory:** UX has hit 9. Technical is solid at 8. Simplicity is healthy at 8. These three categories are approaching their ceilings and further investment yields diminishing returns. The only path to a 7+ overall is through the capped categories: real photography (Design), real contact data (Content), and real scheduling (Conversion). These are business decisions, not engineering tasks.

**Top 5 actions, in priority order:**
1. Real photography — team headshots, office photos, hero image. Unlocks Design past 5.
2. Real contact information — address, phone, email, social links. Unlocks Content past 5.
3. Real scheduling backend — Zocdoc, Calendly, or webhook to practice management. Unlocks Conversion past 4.
4. Fix the `tel:+15551234567` link on Emergency card — this is a broken user flow today.
5. Consolidate the re-duplicated 768px media query blocks.

---

*Audit conducted by Nigel. The mobile UX is now a 9, and I do not hand those out lightly. But I audit websites, not code. And a website needs content. Four rounds in, the engineering is superb. Now give me something to engineer around.*
