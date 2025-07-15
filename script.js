document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

AOS.init({
    duration: 800,
    once: true,
});

// Expand/collapse project details
function closeAllProjectDetails() {
  document.querySelectorAll('.project-details').forEach(d => {
    d.hidden = true;
    d.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.details-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'More Details';
  });
}
// Animated typewriter effect for hero tagline
const taglines = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI & Real-Time Apps Enthusiast',
  'Open Source Contributor'
];
let taglineIndex = 0;
let charIndex = 0;
let typing = true;
const taglineEl = document.getElementById('hero-animated-tagline');
function typeTagline() {
  if (!taglineEl) return;
  const current = taglines[taglineIndex];
  if (typing) {
    taglineEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      typing = false;
      setTimeout(typeTagline, 1200);
    } else {
      setTimeout(typeTagline, 60);
    }
  } else {
    taglineEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      typing = true;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      setTimeout(typeTagline, 500);
    } else {
      setTimeout(typeTagline, 30);
    }
  }
}
// Hamburger menu and mobile nav
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mobile-nav-overlay').classList.remove('open');
  document.getElementById('mobile-nav').setAttribute('aria-hidden', 'true');
  document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'false');
}
function openMobileNav() {
  document.getElementById('mobile-nav').classList.add('open');
  document.getElementById('mobile-nav-overlay').classList.add('open');
  document.getElementById('mobile-nav').setAttribute('aria-hidden', 'false');
  document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'true');
}
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu logic
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  hamburger.addEventListener('click', function() {
    if (mobileNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
  overlay.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  // Scrollspy logic
  const sections = ['about', 'projects', 'skills', 'contact'];
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav a, .mobile-nav a'));
  function onScrollSpy() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let found = false;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = document.getElementById(sections[i]);
      if (sec && scrollPos + 80 >= sec.offsetTop) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + sections[i]);
        });
        found = true;
        break;
      }
    }
    if (!found) {
      navLinks.forEach(link => link.classList.remove('active'));
    }
  }
  window.addEventListener('scroll', onScrollSpy);
  onScrollSpy();

  const sortSelect = document.getElementById('project-sort');
  const grid = document.querySelector('.project-grid');
  const originalOrder = Array.from(grid.children); // Store original order for 'featured'
  originalOrder.forEach((card, i) => card.setAttribute('data-featured-order', i));

  sortSelect.addEventListener('change', function() {
    let sorted;
    const value = sortSelect.value;
    if (value === 'featured') {
      sorted = originalOrder;
    } else {
      // Always get the current order from the DOM for other sorts
      const cards = Array.from(grid.children);
      if (value === 'recent') {
        sorted = cards.slice().sort((a, b) => {
          return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
        });
      } else if (value === 'az') {
        sorted = cards.slice().sort((a, b) => {
          return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
        });
      } else if (value === 'tech') {
        sorted = cards.slice().sort((a, b) => {
          return a.getAttribute('data-tech').localeCompare(b.getAttribute('data-tech'));
        });
      }
    }
    // Remove all cards and re-append in sorted order
    sorted.forEach(card => grid.appendChild(card));
  });

  // Details expand/collapse logic
  document.querySelectorAll('.details-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const detailsId = btn.getAttribute('aria-controls');
      const details = document.getElementById(detailsId);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      closeAllProjectDetails();
      if (!expanded) {
        details.hidden = false;
        details.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Less Details';
      }
    });
  });
  setTimeout(typeTagline, 800);
}); 