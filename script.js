// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '10000';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'transform 0.3s ease';
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else {
            notification.style.background = '#ef4444';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Feature Timeline Animation for Features Section

document.addEventListener('DOMContentLoaded', function () {
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach(card => {
    const timeline = card.querySelector('.feature-timeline');
    const bar = timeline.querySelector('.timeline-bar');
    const btn = timeline.querySelector('.timeline-btn');
    let interval = null;
    let progress = 0;
    let running = false;

    function updateBar() {
      bar.style.width = progress + '%';
    }

    function startTimeline() {
      if (running) return;
      running = true;
      btn.textContent = 'Stop';
      interval = setInterval(() => {
        if (progress < 100) {
          progress += 1;
          updateBar();
        } else {
          stopTimeline();
        }
      }, 15);
    }

    function stopTimeline() {
      running = false;
      btn.textContent = 'Start';
      clearInterval(interval);
    }

    btn.addEventListener('click', function () {
      if (running) {
        stopTimeline();
      } else {
        startTimeline();
      }
    });

    // Reset timeline when mouse leaves card
    card.addEventListener('mouseleave', function () {
      stopTimeline();
      progress = 0;
      updateBar();
    });

    // Reset timeline when panel is hidden (for keyboard users)
    card.addEventListener('focusout', function (e) {
      if (!card.contains(e.relatedTarget)) {
        stopTimeline();
        progress = 0;
        updateBar();
      }
    });
  });
});

// How It Works Section Animation (trigger on scroll into view)
(function() {
  const hiwSection = document.querySelector('.how-it-works');
  if (!hiwSection) return;
  const steps = hiwSection.querySelectorAll('.hiw-step');
  const progress = hiwSection.querySelector('.hiw-progress');
  let hasAnimated = false;

  function activateStep(idx) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === idx);
      step.classList.remove('pulse');
    });
    if (steps[idx]) {
      steps[idx].classList.add('pulse');
    }
    if (progress) {
      progress.style.width = ((idx+1)/steps.length*100) + '%';
    }
  }

  function confetti(step) {
    step.classList.add('confetti');
    setTimeout(() => step.classList.remove('confetti'), 800);
  }

  // Animate steps in sequence
  function animateSteps() {
    activateStep(0);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < steps.length - 1) {
        idx++;
        activateStep(idx);
      } else {
        clearInterval(interval);
        setTimeout(() => activateStep(steps.length-1), 1000);
      }
    }, 1200);
  }

  // Step hover/click micro-interaction
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => confetti(step));
    step.addEventListener('click', () => confetti(step));
  });

  // IntersectionObserver to trigger animation on scroll
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateSteps();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(hiwSection);
})();

// Contact card copy-to-clipboard interactivity
(function() {
  const cards = document.querySelectorAll('.contact-card[data-number]');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const number = card.getAttribute('data-number');
      if (number) {
        navigator.clipboard.writeText(number);
        card.classList.add('copied');
        setTimeout(() => card.classList.remove('copied'), 1200);
      }
    });
  });
})();