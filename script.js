// ==========================================
// NAVIGATION SCROLL EFFECT
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.problem-card, .ecosystem-card, .audience-card, .timeline-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add animate-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ==========================================

const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// CARD GLOW EFFECT FOLLOWING MOUSE
// ==========================================

const ecosystemCards = document.querySelectorAll('.ecosystem-card');

ecosystemCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(138, 92, 246, 0.15) 0%, transparent 50%)`;
        }
    });
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================

const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const isInfinity = target === Infinity;

    const timer = setInterval(() => {
        if (isInfinity) {
            clearInterval(timer);
            return;
        }

        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text === '∞') return;
                const target = parseInt(text);
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
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
document.head.appendChild(rippleStyle);

// ==========================================
// TIMELINE PROGRESS ANIMATION
// ==========================================

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineConnectors = document.querySelectorAll('.timeline-connector');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';

                // Animate the connector after the item
                if (index < timelineConnectors.length) {
                    setTimeout(() => {
                        timelineConnectors[index].style.opacity = '1';
                        timelineConnectors[index].style.transform = 'scaleY(1)';
                    }, 300);
                }
            }, index * 200);

            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    timelineObserver.observe(item);
});

timelineConnectors.forEach(connector => {
    connector.style.opacity = '0';
    connector.style.transform = 'scaleY(0)';
    connector.style.transformOrigin = 'top';
    connector.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
});

// ==========================================
// MISSION CIRCLE INTERACTION
// ==========================================

const missionCircle = document.querySelector('.mission-circle');

if (missionCircle) {
    missionCircle.addEventListener('mouseenter', () => {
        missionCircle.style.animationPlayState = 'paused';
    });

    missionCircle.addEventListener('mouseleave', () => {
        missionCircle.style.animationPlayState = 'running';
    });
}

// ==========================================
// LAZY LOADING OPTIMIZATION
// ==========================================

// Add loading="lazy" to images if they exist
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
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

// Use debounced scroll for parallax
const debouncedParallax = debounce((e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}, 10);

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c🏠 MAHTO - Building Dreams', 'font-size: 20px; font-weight: bold; color: #8A5CF6;');
console.log('%cInterested in joining our team? Reach out to us!', 'font-size: 14px; color: #00C9FF;');
console.log('%cFrom a college side project to a full-stack platform 🚀', 'font-size: 12px; color: #888;');

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Add keyboard navigation for cards
const interactiveCards = document.querySelectorAll('.ecosystem-card, .audience-card, .problem-card');

interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Focus visible styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    *:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 4px;
        border-radius: 4px;
    }
    
    button:focus-visible {
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ==========================================
// PREFERS REDUCED MOTION
// ==========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('MAHTO Landing Page Loaded Successfully ✨');

    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
});
