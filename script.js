/**
 * ItzRustam Portfolio - Interactive Core Script
 * Focus: Agentic AI, Multi-Agent Systems, High-Performance Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroSimulation();
  initTechStackFilters();
  initCopyButtons();
  initContactForm();
  initAmbientCanvas();
  initTiltCards();
  initScrollReveal();
  initScrollProgress();
  initCustomCursor();
  initParallaxHero();
  initHeroTyping();
  initBackToTop();
  // Auto-start simulation after 3s (once, subtle)
  setTimeout(() => {
    const runBtn = document.getElementById('run-simulation-btn');
    if (runBtn && !runBtn.disabled) runBtn.click();
  }, 3000);
});

/* ==========================================================================
   1. Navbar & Scroll Spy
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Intersection Observer for active nav state
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ESC key closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Interactive Hero Multi-Agent Simulation
   ========================================================================== */
function initHeroSimulation() {
  const runBtn = document.getElementById('run-simulation-btn');
  const steps = document.querySelectorAll('.flow-step');
  const statusText = document.getElementById('simulation-status');
  const statusDot = document.querySelector('.terminal-status-text span:first-child');
  const latencyBadge = document.getElementById('simulation-latency');
  const logLine = document.getElementById('terminal-log');

  if (!runBtn || steps.length === 0) return;

  let isRunning = false;

  const simulationStages = [
    { text: 'Decomposing intent into sub-agent DAG...', latency: '18ms', log: '> orchestrator.plan() → DAG(4 nodes)' },
    { text: 'rsroute: Routing to Gemini 1.5 Pro with fallbacks...', latency: '82ms', log: '> rsroute.route(provider="auto") → gemini-1.5-pro' },
    { text: 'Blade Agent: Executing sandboxed tool call...', latency: '144ms', log: '> blade.execute(tool="web_search") → OK' },
    { text: 'Pipeline complete. All agent assertions passed.', latency: '189ms', log: '> assertions.verify() → PASS ✓' }
  ];

  function setStatusDotColor(color) {
    if (statusDot) statusDot.style.background = color;
  }

  function runPipeline() {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.style.opacity = '0.6';
    setStatusDotColor('#f59e0b');

    steps.forEach(s => s.classList.remove('active'));
    if (logLine) logLine.textContent = '';

    let currentStep = 0;

    function stepForward() {
      if (currentStep < steps.length) {
        if (currentStep > 0) {
          steps[currentStep - 1].classList.remove('active');
        }
        steps[currentStep].classList.add('active');

        const stage = simulationStages[currentStep];
        if (statusText) statusText.textContent = stage.text;
        if (latencyBadge) latencyBadge.textContent = `latency: ${stage.latency}`;
        if (logLine) logLine.textContent = stage.log;

        currentStep++;
        setTimeout(stepForward, 780);
      } else {
        // All done — keep all active, show success
        steps.forEach(s => s.classList.add('active'));
        if (statusText) statusText.textContent = 'Pipeline complete. Ready for next run.';
        if (latencyBadge) latencyBadge.textContent = 'latency: 189ms';
        if (logLine) logLine.textContent = '> pipeline.run() → SUCCESS ✓ (4/4 steps)';
        setStatusDotColor('#10b981');
        isRunning = false;
        runBtn.disabled = false;
        runBtn.style.opacity = '1';

        // Reset latency display after 3s
        setTimeout(() => {
          if (latencyBadge) latencyBadge.textContent = 'latency: 42ms';
          if (logLine) logLine.textContent = '';
          if (statusText) statusText.textContent = 'System idle. Ready for agent execution.';
          steps.forEach(s => s.classList.remove('active'));
          steps[0].classList.add('active');
        }, 4000);
      }
    }

    stepForward();
  }

  runBtn.addEventListener('click', runPipeline);
}

/* ==========================================================================
   4. Tech Stack Filters
   ========================================================================== */
function initTechStackFilters() {
  const filterBtns = document.querySelectorAll('.stack-filter-btn');
  const stackCards = document.querySelectorAll('.stack-card');

  if (filterBtns.length === 0 || stackCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleIndex = 0;

      stackCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isMatch = filter === 'all' || category === filter || category.includes(filter);

        if (isMatch) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          const delay = visibleIndex * 40;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10 + delay);
          visibleIndex++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Copy to Clipboard & Toast
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => {
        // Fallback prompt
        prompt('Copy the link/email below:', text);
      });
    });
  });
}

/* ==========================================================================
   6. Contact Form Quick Dispatch
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const topicInput = document.getElementById('form-topic');
    const messageInput = document.getElementById('form-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const topic = topicInput ? topicInput.value : 'General Inquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic} - from ${name || 'Collaborator'}`);
    const body = encodeURIComponent(
      `Hello ItzRustam,\n\n${message}\n\nFrom: ${name} (${email})\nTopic: ${topic}`
    );

    const mailtoUrl = `mailto:rustambhadouriya7@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    showToast('Redirecting to your email client...');
  });
}

/* ==========================================================================
   7. Ambient Particle Starfield Canvas
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const numParticles = Math.min(Math.floor(width / 32), 40);
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
      ctx.fill();

      // Connect close particles with subtle faint lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  render();

  // Pause when tab is not visible to preserve GPU/battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });
}

/* ==========================================================================
   8. Subtle 3D Card Spotlight / Tilt
   ========================================================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('.project-card, .why-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}


/* ==========================================================================
   9. Scroll Reveal — IntersectionObserver
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   10. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   11. Custom Cursor
   ========================================================================== */
function initCustomCursor() {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Disable on touch devices
  if ('ontouchstart' in window) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = -100, mouseY = -100;
  let curX = -100, curY = -100;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });

  // Smooth following
  function animateCursor() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    cursor.style.left = `${curX}px`;
    cursor.style.top = `${curY}px`;
    rafId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale on hover over interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .why-card, .stack-card, .contact-item-link, .icon-link');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else animateCursor();
  });
}

/* ==========================================================================
   12. Parallax Hero
   ========================================================================== */
function initParallaxHero() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroContent || !heroVisual) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) return;
    const shift = scrollY * 0.12;
    heroContent.style.transform = `translateY(${shift}px)`;
    heroVisual.style.transform = `translateY(${shift * 0.6}px)`;
  }, { passive: true });
}

/* ==========================================================================
   13. Hero Subtitle Typing Effect
   ========================================================================== */
function initHeroTyping() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const phrases = [
    'AI Engineer crafting practical GenAI systems for automation, routing, orchestration, and developer tooling.',
    'Building multi-agent frameworks, LLM gateways, and scalable agentic workflows with Python.',
    'Turning foundation models into reliable, production-ready operational tools.'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseFrames = 0;

  subtitle.classList.add('hero-subtitle-typing');
  subtitle.textContent = '';

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];

    if (pauseFrames > 0) {
      pauseFrames--;
      setTimeout(typeLoop, 80);
      return;
    }

    if (!deleting) {
      subtitle.textContent = currentPhrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentPhrase.length) {
        deleting = true;
        pauseFrames = 24; // pause at end
      }
      setTimeout(typeLoop, 36);
    } else {
      subtitle.textContent = currentPhrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pauseFrames = 8;
      }
      setTimeout(typeLoop, 18);
    }
  }

  // Start after a short delay so page load feels natural
  setTimeout(typeLoop, 1200);
}

/* ==========================================================================
   14. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
