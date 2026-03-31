/* ========================================
   Bright Smile Dental — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Navigation ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---------- Sticky Header ----------
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ---------- Dark Mode Toggle ----------
  const darkToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  darkToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ---------- Scroll Animations ----------
  const animatedElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ---------- Active Navigation Highlight ----------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ---------- Form Validation & Submission ----------
  const form = document.getElementById('appointmentForm');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate required fields
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    // Validate email format
    const emailField = form.querySelector('#email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailPattern.test(emailField.value)) {
      emailField.classList.add('error');
      valid = false;
    }

    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Request Appointment</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

      // Show toast
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 5000);
    }, 1200);
  });

  // Remove error on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
    });
  });

  // ---------- Breathing Exercise ----------
  const breathBtn = document.getElementById('breathBtn');
  const breathCircle = document.getElementById('breathCircle');
  const breathText = document.getElementById('breathText');
  const breathTimer = document.getElementById('breathTimer');
  const breathStats = document.getElementById('breathStats');
  const breathCyclesEl = document.getElementById('breathCycles');
  const breathDurationEl = document.getElementById('breathDuration');
  const breathRing = document.getElementById('breathRingProgress');

  let breathActive = false;
  let breathInterval = null;
  let breathTimeout = null;
  let breathCycles = 0;
  let breathStartTime = null;
  let breathDurationInterval = null;
  const CIRCUMFERENCE = 2 * Math.PI * 90; // ~565.48

  function updateBreathDuration() {
    if (!breathStartTime) return;
    const elapsed = Math.floor((Date.now() - breathStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = String(elapsed % 60).padStart(2, '0');
    breathDurationEl.textContent = mins + ':' + secs;
  }

  function runBreathCycle() {
    if (!breathActive) return;

    // Phase 1: Inhale (4s)
    breathCircle.className = 'breath-circle inhale';
    breathText.textContent = 'Breathe In';
    animateRingPhase(0, 1/3, 4000);
    let countdown = 4;
    breathTimer.textContent = countdown;
    const inhaleCount = setInterval(() => {
      countdown--;
      if (countdown > 0) breathTimer.textContent = countdown;
      else clearInterval(inhaleCount);
    }, 1000);

    breathTimeout = setTimeout(() => {
      if (!breathActive) return;
      clearInterval(inhaleCount);

      // Phase 2: Hold (4s)
      breathCircle.className = 'breath-circle hold';
      breathText.textContent = 'Hold';
      animateRingPhase(1/3, 2/3, 4000);
      countdown = 4;
      breathTimer.textContent = countdown;
      const holdCount = setInterval(() => {
        countdown--;
        if (countdown > 0) breathTimer.textContent = countdown;
        else clearInterval(holdCount);
      }, 1000);

      breathTimeout = setTimeout(() => {
        if (!breathActive) return;
        clearInterval(holdCount);

        // Phase 3: Exhale (4s)
        breathCircle.className = 'breath-circle exhale';
        breathText.textContent = 'Breathe Out';
        animateRingPhase(2/3, 1, 4000);
        countdown = 4;
        breathTimer.textContent = countdown;
        const exhaleCount = setInterval(() => {
          countdown--;
          if (countdown > 0) breathTimer.textContent = countdown;
          else clearInterval(exhaleCount);
        }, 1000);

        breathTimeout = setTimeout(() => {
          if (!breathActive) return;
          clearInterval(exhaleCount);
          breathCycles++;
          breathCyclesEl.textContent = breathCycles;
          // Reset ring and start next cycle
          breathRing.style.transition = 'none';
          breathRing.style.strokeDashoffset = CIRCUMFERENCE;
          void breathRing.offsetWidth; // force reflow
          breathRing.style.transition = 'stroke-dashoffset 1s linear';
          runBreathCycle();
        }, 4000);
      }, 4000);
    }, 4000);
  }

  function animateRingPhase(fromFrac, toFrac, duration) {
    breathRing.style.transition = 'stroke-dashoffset ' + (duration / 1000) + 's linear';
    breathRing.style.strokeDashoffset = CIRCUMFERENCE * (1 - toFrac);
  }

  function startBreathing() {
    breathActive = true;
    breathCycles = 0;
    breathStartTime = Date.now();
    breathCyclesEl.textContent = '0';
    breathDurationEl.textContent = '0:00';
    breathStats.style.display = 'flex';
    breathBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Stop Exercise';
    breathDurationInterval = setInterval(updateBreathDuration, 1000);
    breathRing.style.strokeDashoffset = CIRCUMFERENCE;
    runBreathCycle();
  }

  function stopBreathing() {
    breathActive = false;
    clearTimeout(breathTimeout);
    clearInterval(breathDurationInterval);
    breathCircle.className = 'breath-circle';
    breathText.textContent = 'Start';
    breathTimer.textContent = '';
    breathRing.style.transition = 'stroke-dashoffset 0.5s ease';
    breathRing.style.strokeDashoffset = CIRCUMFERENCE;
    breathBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg> Begin Breathing Exercise';
  }

  breathBtn.addEventListener('click', () => {
    if (breathActive) {
      stopBreathing();
    } else {
      startBreathing();
    }
  });

  // ---------- Visit Timeline Toggles ----------
  document.querySelectorAll('.timeline-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      details.hidden = expanded;
    });
  });

  // ---------- Smooth anchor scrolling fallback ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Back to Top Button ----------
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
