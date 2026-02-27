// Custom Cursor Movement
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let lastX = 0, lastY = 0;

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Create trail effect
    createTrail(mouseX, mouseY);

    // Create particle effect occasionally
    if (Math.random() > 0.85) {
        createParticle(mouseX, mouseY);
    }

    // Create scanline effect on fast movement
    const speed = Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2));
    if (speed > 50) {
        createScanline(mouseY);
        if (Math.random() > 0.7) {
            createGlitch(mouseX, mouseY);
        }
    }

    lastX = mouseX;
    lastY = mouseY;
});

// Smooth follower animation
function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    
    followerX += dx * 0.2;
    followerY += dy * 0.2;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Create trail effect
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
}

// Create particle effect
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Create glitch effect
function createGlitch(x, y) {
    const glitch = document.createElement('div');
    glitch.className = 'cursor-glitch';
    glitch.style.left = x + 'px';
    glitch.style.top = y + 'px';
    document.body.appendChild(glitch);
    
    setTimeout(() => glitch.remove(), 300);
}

// Create scanline effect
function createScanline(y) {
    const scanline = document.createElement('div');
    scanline.className = 'cursor-scanline';
    scanline.style.top = y + 'px';
    document.body.appendChild(scanline);
    
    setTimeout(() => scanline.remove(), 500);
}

// Cursor hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .stat-item, .tech-tag, .contact-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.borderColor = 'var(--accent-purple)';
        cursor.style.background = 'rgba(168, 85, 247, 0.1)';
        cursorFollower.style.width = '15px';
        cursorFollower.style.height = '15px';
        cursorFollower.style.background = 'var(--accent-purple)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.borderColor = 'var(--accent-cyan)';
        cursor.style.background = 'transparent';
        cursorFollower.style.width = '8px';
        cursorFollower.style.height = '8px';
        cursorFollower.style.background = 'var(--accent-cyan)';
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Demo video interaction
document.querySelector('.demo-video')?.addEventListener('click', function() {
    this.innerHTML = '⏸';
    this.style.background = 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(168, 85, 247, 0.3))';
    
    // Create explosion effect
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const rect = this.getBoundingClientRect();
            createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, i * 50);
    }
    
    setTimeout(() => {
        this.innerHTML = '▶';
        this.style.background = 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(168, 85, 247, 0.1))';
    }, 2000);
});

// Add click ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.border = '2px solid var(--accent-cyan)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'clickRipple 0.6s ease-out';
    ripple.style.zIndex = '9994';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Console message
console.log('%c🛡️ RansomGuard - AI-Powered Ransomware Detection System', 'color: #00f5ff; font-size: 20px; font-weight: bold;');
console.log('%cCustom Cursor Effects Active', 'color: #a855f7; font-size: 14px;');
document.querySelectorAll("button, a, .clickable").forEach(el => {
  el.addEventListener("click", function () {
    this.classList.add("blink-click");

    setTimeout(() => {
      this.classList.remove("blink-click");
    }, 600);
  });
});
