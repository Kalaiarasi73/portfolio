// Smooth scroll for navigation links
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

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Hide/show navbar on scroll
  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skill bars when visible
      if (entry.target.classList.contains('skills-section')) {
        animateSkillBars();
      }
      
      // Animate stats when visible
      if (entry.target.querySelector('.stats-grid')) {
        animateStats();
      }
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.animation = 'fillBar 1.5s ease-out forwards';
    }, index * 100);
  });
}

// Animate stats counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-item h3');
  stats.forEach(stat => {
    const target = stat.textContent;
    const isPercentage = target.includes('%');
    const numericValue = parseFloat(target);
    
    if (!isNaN(numericValue)) {
      animateValue(stat, 0, numericValue, 2000, isPercentage);
    }
  });
}

function animateValue(element, start, end, duration, isPercentage) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * easeOutQuart;
    
    if (isPercentage) {
      element.textContent = current.toFixed(2) + '%';
    } else if (end >= 10) {
      element.textContent = Math.floor(current) + '+';
    } else {
      element.textContent = Math.floor(current);
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Project modal functionality
function openModal(projectId) {
  const modal = document.getElementById(projectId);
  const overlay = document.getElementById('modal-overlay');
  
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modals = document.querySelectorAll('.project-modal');
  const overlay = document.getElementById('modal-overlay');
  
  modals.forEach(modal => {
    modal.classList.remove('active');
  });
  
  if (overlay) {
    overlay.classList.remove('active');
  }
  
  document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Prevent modal content click from closing modal
document.querySelectorAll('.project-modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

// Typing effect for hero subtitle (alternative implementation)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// Add glowing cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.2;
  
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .project-card');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message (you can customize this)
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      button.textContent = 'Message Sent! ✓';
      button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// Add custom cursor styles dynamically
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--secondary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s, border-color 0.2s;
    mix-blend-mode: difference;
  }
  
  .custom-cursor.cursor-hover {
    transform: scale(1.5);
    border-color: var(--accent);
  }
  
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;
document.head.appendChild(cursorStyles);

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
  ripple.classList.add('ripple');
  
  const rippleElement = button.getElementsByClassName('ripple')[0];
  if (rippleElement) {
    rippleElement.remove();
  }
  
  button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.cta-button, .view-details');
buttons.forEach(button => {
  button.addEventListener('click', createRipple);
});

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  .cta-button, .view-details {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);

// Add active navigation highlighting
function highlightActiveSection() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightActiveSection);

// Add active link styles
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
  .nav-menu a.active {
    color: var(--secondary);
  }
  
  .nav-menu a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(activeLinkStyles);

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add tilt effect to cards
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
  highlightActiveSection();
}, 10));

// Initialize animations on page load
window.addEventListener('load', () => {
  // Fade in page
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '1';
  }, 100);
  
  // Trigger any initial animations
  const firstSection = document.querySelector('.section');
  if (firstSection) {
    observer.observe(firstSection);
  }
});

// Console message
console.log('%c👋 Welcome to my portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion for cloud engineering 🚀', 'color: #7c3aed; font-size: 14px;');
console.log('%cKalaiarasi R - AWS Cloud Engineer', 'color: #0a66c2; font-size: 12px;');
