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
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
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

  // ---------- Date Picker Constraints ----------
  const dateField = document.getElementById('preferredDate');
  if (dateField) {
    // Set minimum date to tomorrow (no past dates, no today since same-day may be full)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Skip to Monday if tomorrow is Sunday
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    dateField.min = tomorrow.toISOString().split('T')[0];

    // Set max date to 3 months out
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateField.max = maxDate.toISOString().split('T')[0];

    // Prevent Sunday selection (office is closed)
    dateField.addEventListener('input', () => {
      const selected = new Date(dateField.value + 'T12:00:00');
      if (selected.getDay() === 0) {
        dateField.setCustomValidity('Our office is closed on Sundays. Please choose another day.');
        dateField.classList.add('error');
      } else {
        dateField.setCustomValidity('');
        dateField.classList.remove('error');
      }
    });
  }

  // ---------- Time Slot Picker ----------
  const timeSlotGroup = document.getElementById('timeSlotGroup');
  const timeSlotGrid = document.getElementById('timeSlotGrid');
  const preferredTimeInput = document.getElementById('preferredTime');

  if (dateField && timeSlotGroup && timeSlotGrid) {
    // Show time slots when date is selected
    dateField.addEventListener('change', () => {
      if (!dateField.value) {
        timeSlotGroup.style.display = 'none';
        preferredTimeInput.value = '';
        return;
      }

      const selected = new Date(dateField.value + 'T12:00:00');
      const isSaturday = selected.getDay() === 6;

      // Reset selection
      preferredTimeInput.value = '';
      timeSlotGrid.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected', 'unavailable');
        const hour = parseInt(slot.dataset.time.split(':')[0], 10);

        // Saturday: only 9 AM - 2 PM (last slot at 1 PM)
        if (isSaturday && (hour < 9 || hour >= 14)) {
          slot.classList.add('unavailable');
        }

        // Randomly mark 1-2 slots as "unavailable" for realism
        if (!slot.classList.contains('unavailable') && Math.random() < 0.15) {
          slot.classList.add('unavailable');
        }
      });

      // Show with animation
      timeSlotGroup.style.display = 'block';
      timeSlotGroup.classList.remove('animate-in');
      // Force reflow for re-animation
      void timeSlotGroup.offsetHeight;
      timeSlotGroup.classList.add('animate-in');
    });

    // Handle slot selection
    timeSlotGrid.addEventListener('click', (e) => {
      const slot = e.target.closest('.time-slot');
      if (!slot || slot.classList.contains('unavailable')) return;

      // Deselect all
      timeSlotGrid.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));

      // Select this one
      slot.classList.add('selected');
      preferredTimeInput.value = slot.dataset.time;
    });
  }

  // ---------- Form Validation & Submission ----------
  const form = document.getElementById('appointmentForm');
  const toast = document.getElementById('toast');

  // Helper: set field error with ARIA attributes and inline message
  function setFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  // Helper: clear field error
  function clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
      el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });

    // Validate required fields
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        const label = field.closest('.form-group').querySelector('label').textContent.replace('*', '').trim();
        setFieldError(field, label + ' is required.');
        valid = false;
      }
    });

    // Validate email format
    const emailField = form.querySelector('#email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailPattern.test(emailField.value)) {
      setFieldError(emailField, 'Please enter a valid email address.');
      valid = false;
    }

    // Validate phone format
    const phoneField = form.querySelector('#phone');
    const phonePattern = /[\d]{7,}/;
    const phoneDigits = (phoneField.value || '').replace(/\D/g, '');
    if (phoneField.value && phoneDigits.length < 7) {
      setFieldError(phoneField, 'Please enter a valid phone number.');
      valid = false;
    }

    if (!valid) {
      // Scroll to first error and focus it
      const firstError = form.querySelector('[aria-invalid="true"]');
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
      // Clear any lingering ARIA states after reset
      form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
      form.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
      // Reset time slot picker
      if (timeSlotGroup) { timeSlotGroup.style.display = 'none'; timeSlotGroup.classList.remove('animate-in'); }
      if (preferredTimeInput) preferredTimeInput.value = '';
      if (timeSlotGrid) timeSlotGrid.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected', 'unavailable'));
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
      clearFieldError(field);
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

  // ---------- Animated Counter (Social Proof Stats) ----------
  const countElements = document.querySelectorAll('.proof-number[data-count]');
  let countStarted = false;

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const suffix = el.dataset.suffix || '';
    const useComma = el.dataset.comma === 'true';
    const duration = 1600;
    const start = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      let current = eased * target;

      if (decimals > 0) {
        el.textContent = current.toFixed(decimals) + suffix;
      } else {
        const rounded = Math.round(current);
        el.textContent = (useComma ? rounded.toLocaleString('en-US') : rounded) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        if (decimals > 0) {
          el.textContent = target.toFixed(decimals) + suffix;
        } else {
          el.textContent = (useComma ? target.toLocaleString('en-US') : target) + suffix;
        }
        el.classList.add('counted');
      }
    }

    requestAnimationFrame(tick);
  }

  if (countElements.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countStarted) {
          countStarted = true;
          countElements.forEach((el, i) => {
            setTimeout(() => animateCount(el), i * 150);
          });
          countObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const proofGrid = document.querySelector('.proof-grid');
    if (proofGrid) countObserver.observe(proofGrid);
  }

  // ---------- Section Dots Navigator ----------
  const dotsNav = document.getElementById('sectionDots');
  const dots = dotsNav ? dotsNav.querySelectorAll('.dot') : [];

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const dotSections = ['hero', 'services', 'about', 'testimonials', 'insurance', 'faq', 'location', 'contact'];
  const dotSectionEls = dotSections.map(id => document.getElementById(id)).filter(Boolean);

  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dots.forEach(d => {
          d.classList.toggle('active', d.dataset.target === id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  dotSectionEls.forEach(section => dotObserver.observe(section));

  // ---------- Consolidated Scroll Handler ----------
  // Sticky header, scroll progress bar, back-to-top, and section dots — one listener for performance
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Sticky header
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (currentScroll > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Section dots visibility (show after scrolling 200px)
    if (dotsNav) {
      if (currentScroll > 200) {
        dotsNav.classList.add('visible');
      } else {
        dotsNav.classList.remove('visible');
      }
    }

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Mobile Testimonials Carousel ----------
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  const carouselDots = document.querySelectorAll('.carousel-dot');

  if (testimonialsGrid && carouselDots.length > 0) {
    // Update dots on scroll
    let scrollTimeout;
    testimonialsGrid.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cards = testimonialsGrid.querySelectorAll('.testimonial-card');
        const gridRect = testimonialsGrid.getBoundingClientRect();
        const gridCenter = gridRect.left + gridRect.width / 2;
        let closestIndex = 0;
        let closestDist = Infinity;

        cards.forEach((card, i) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenter - gridCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });

        carouselDots.forEach(dot => dot.classList.remove('active'));
        if (carouselDots[closestIndex]) {
          carouselDots[closestIndex].classList.add('active');
        }
      }, 50);
    }, { passive: true });

    // Tap dot to scroll to card
    carouselDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index, 10);
        const cards = testimonialsGrid.querySelectorAll('.testimonial-card');
        if (cards[index]) {
          cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });
  }

  // ---------- Mobile Tap-to-Expand Service Cards ----------
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!isMobile()) return;
      // Don't interfere with link taps inside expanded card
      if (e.target.closest('.service-link')) return;

      const isExpanded = card.classList.contains('expanded');

      // Collapse all other cards (accordion behavior)
      document.querySelectorAll('.service-card.expanded').forEach(other => {
        if (other !== card) {
          other.classList.remove('expanded', 'ripple');
          other.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this card
      card.classList.toggle('expanded', !isExpanded);
      card.setAttribute('aria-expanded', !isExpanded);

      // Ripple effect
      if (!isExpanded) {
        card.classList.add('ripple');
        setTimeout(() => card.classList.remove('ripple'), 600);
      }
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (!isMobile()) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ---------- Dynamic Copyright Year ----------
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
