/* =========================================================
   VSC Projects (Pty) Ltd — script.js
   Vanilla JavaScript. No frameworks, no build step.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close menu when a link inside it is tapped */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- Smooth scroll for in-page anchor links ---------- */
  /* (CSS 'scroll-behavior: smooth' already handles most cases;
     this ensures older browsers and dynamically-clicked links work too) */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  /* ---------- Bottom navigation active state ---------- */
  var bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-target]');
  var sections = [];
  bottomNavItems.forEach(function (item) {
    var target = document.querySelector(item.getAttribute('data-target'));
    if (target) sections.push({ item: item, target: target });
  });

  function updateActiveBottomNav() {
    if (!sections.length) return;
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (entry) {
      if (entry.target.offsetTop <= scrollPos) current = entry;
    });
    sections.forEach(function (entry) {
      entry.item.classList.toggle('active', entry === current);
    });
  }

  window.addEventListener('scroll', updateActiveBottomNav, { passive: true });
  updateActiveBottomNav();

  /* ---------- Quote form ---------- */
  var quoteForm = document.getElementById('quote-form');
  var formMessage = document.getElementById('form-message');

  if (quoteForm && formMessage) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = quoteForm.querySelectorAll('[required]');
      var isValid = true;

      requiredFields.forEach(function (field) {
        if (!field.value || !field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#C0392B';
        } else {
          field.style.borderColor = '';
        }
      });

      var emailField = document.getElementById('q-email');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          isValid = false;
          emailField.style.borderColor = '#C0392B';
        }
      }

      formMessage.classList.remove('success', 'error');

      if (!isValid) {
        formMessage.textContent = 'Please fill in all required fields correctly.';
        formMessage.classList.add('error');
        return;
      }

      /* No backend is connected yet — this form does not send data anywhere. */
      formMessage.textContent = 'Thank you. This form is not yet connected to an email or form service, so this request has not been sent. Please call or WhatsApp 067 031 0228, or email info@vscprojects.co.za, to reach VSC Projects directly.';
      formMessage.classList.add('success');
      quoteForm.reset();
    });
  }

});
