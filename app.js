// Modern JavaScript for Gruu's landing page with animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initStatCounters();
    initSmoothScrolling();
    initNavbarScroll();
    initNavActiveStates();
    initSocialLinks();
});

// Typing effect for hero title
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    const text = 'Gruu';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 200);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 500);
}

// Particle system for hero background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (Math.random() * 2000 + 3000));
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .social-link, .about-text, .about-stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger stat counters when about section is visible
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide elements and set transform
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
    
    // Stagger skill cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });
    
    // Stagger social links animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.transitionDelay = (index * 0.1) + 's';
    });
}

// Animated counters for statistics
function initStatCounters() {
    window.animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    };
}

// Smooth scrolling for navigation and buttons
function initSmoothScrolling() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Global scroll function for buttons
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 80;
            const offsetTop = section.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
}

// Initialize social media links
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Make sure it opens in a new tab
                window.open(href, '_blank');
            }
        });
    });
}

// Navbar scroll effects
function initNavbarScroll() {
    const navbar = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background blur based on scroll position
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(12, 12, 12, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(12, 12, 12, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add hover effects for skill cards
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(50, 184, 198, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Social platform specific hover effects
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    const platformColors = {
        github: '#333',
        telegram: '#0088cc',
        vk: '#45668e',
        donation: '#f96854',
        discord: '#5865f2'
    };
    
    socialLinks.forEach(link => {
        const platform = link.getAttribute('data-platform');
        
        if (platformColors[platform]) {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.social-icon');
                icon.style.color = platformColors[platform];
            });
            
            link.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.social-icon');
                icon.style.color = 'var(--color-teal-300)';
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for navigation active states
function initNavActiveStates() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Add CSS for active nav state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-teal-300);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createTrailDot() {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--color-teal-300);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transition: all 0.3s ease;
        left: ${mouseX}px;
        top: ${mouseY}px;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(dot);
    
    // Remove dot after animation
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => {
            if (dot.parentNode) {
                dot.remove();
            }
        }, 300);
    }, 100);
}

// Create trail dots on mouse move (throttled)
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 50) { // Throttle to every 50ms
        createTrailDot();
        lastTrailTime = now;
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to scroll to top
    if (e.key === 'Escape') {
        scrollToSection('hero');
    }
    
    // Arrow keys for section navigation
    const sections = ['hero', 'about', 'skills', 'social'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        scrollToSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        scrollToSection(sections[currentIndex - 1]);
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    for (let section of sections) {
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.offsetHeight) {
            return section.id;
        }
    }
    return 'hero';
}