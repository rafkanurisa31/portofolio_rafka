/* ================================
   PORTFOLIO — DARK LUXURY EDITORIAL
   script.js
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .work-card, .tag');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });


  // ---- NAVBAR SCROLL ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });


  // ---- MOBILE MENU ----
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // ---- SKILL BARS ----
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => skillObserver.observe(fill));


  // ---- HERO PARALLAX ----
  const heroBgText = document.querySelector('.hero-bg-text');
  const heroContent = document.querySelector('.hero-content');
  const heroNumber = document.querySelector('.hero-number');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBgText) {
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    }
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
      heroContent.style.opacity = `${1 - scrollY * 0.002}`;
    }
    if (heroNumber) {
      heroNumber.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  }, { passive: true });


  // ---- WORK CARDS TILT ----
  const workCards = document.querySelectorAll('.work-card');

  workCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;
      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s, box-shadow 0.5s';
    });
  });


  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-primary');
      const btnText = btn.querySelector('.btn-text');
      const btnIcon = btn.querySelector('.btn-icon');

      // Loading state
      btn.disabled = true;
      btnText.textContent = 'Mengirim...';
      btnIcon.textContent = '↻';
      btnIcon.style.animation = 'spin 1s linear infinite';

      // Simulate send
      setTimeout(() => {
        btn.style.display = 'none';
        formSuccess.classList.add('visible');
        contactForm.reset();

        // Reset after 4s
        setTimeout(() => {
          btn.style.display = '';
          btn.disabled = false;
          btnText.textContent = 'Kirim Pesan';
          btnIcon.textContent = '→';
          btnIcon.style.animation = '';
          formSuccess.classList.remove('visible');
          setTimeout(() => { formSuccess.style.display = 'none'; }, 500);
        }, 4000);
      }, 1800);
    });
  }


  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });


  // ---- ACTIVE NAV LINK on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));


  // ---- STAGGERED HERO REVEAL on load ----
  const heroRevealEls = document.querySelectorAll('.hero .reveal-up');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 120);
  });


  // ---- TECH TAGS scroll animation ----
  const tags = document.querySelectorAll('.tag');
  const tagObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0)';
        }, i * 60);
      });
      tagObserver.disconnect();
    }
  }, { threshold: 0.3 });

  tags.forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(15px)';
    tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s, color 0.3s, background 0.3s';
  });
  const techTagsEl = document.querySelector('.tech-tags');
  if (techTagsEl) tagObserver.observe(techTagsEl);


  // ---- STAT NUMBERS counter animation ----
  const stats = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent);
        const suffix = el.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const duration = 1500;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  stats.forEach(stat => counterObserver.observe(stat));


  // ---- SPIN keyframe injection ----
  const style = document.createElement('style');
  style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);

});