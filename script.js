/* ─── Mobile Hamburger ─── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

/* ─── Navbar Scroll Effect ─── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── Cursor Glow ─── */
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

/* ─── Typewriter Effect ─── */
const typewriterEl = document.getElementById('typewriter');
const phrases = ['Full Stack Developer & Computer Scientist', 'MERN Stack Developer', 'AI Enthusiast', 'Competitive Programmer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimer;

function typewriterEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typewriterTimer = setTimeout(typewriterEffect, 500);
      return;
    }
    typewriterTimer = setTimeout(typewriterEffect, 30);
  } else {
    typewriterEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      typewriterTimer = setTimeout(typewriterEffect, 2000);
      return;
    }
    typewriterTimer = setTimeout(typewriterEffect, 60);
  }
}

typewriterEffect();

/* ─── Particle Canvas ─── */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.04 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ─── 3D Tilt Effect on Cards ─── */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;

    const glow = card.querySelector('.project-card-glow');
    if (glow) {
      glow.style.background =
        `radial-gradient(circle at ${x}px ${y}px, rgba(124,58,237,0.1) 0%, transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    const glow = card.querySelector('.project-card-glow');
    if (glow) glow.style.background = '';
  });
});

/* ─── Hero Image 3D Tilt ─── */
const heroTilt = document.getElementById('heroTilt');
if (heroTilt) {
  heroTilt.addEventListener('mousemove', (e) => {
    const rect = heroTilt.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    heroTilt.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroTilt.addEventListener('mouseleave', () => {
    heroTilt.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
}

/* ─── Parallax Scroll Effect ─── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.getElementById('hero');
  if (hero) {
    const heroBg = hero.querySelector('.hero-bg-rings');
    if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

/* ─── Scroll Reveal Animations ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.about-text p, .stat, .edu-card, .skill-category, .project-card, .achievement-card, .timeline-item, .contact-item').forEach((el, i) => {
  el.dataset.delay = (i % 6) * 100;
  revealObserver.observe(el);
});

/* ─── Contact Form ─── */
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});

/* ─── Smooth anchor scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
