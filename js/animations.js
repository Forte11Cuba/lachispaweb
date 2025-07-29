const observerOptions = {
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right',
    scaleIn: 'animate-scale-in'
};

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                
                if (entry.target.classList.contains('stagger-container')) {
                    animateStaggeredChildren(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.stagger-container').forEach(el => {
        observer.observe(el);
    });
}

function animateStaggeredChildren(container) {
    const children = container.querySelectorAll('.stagger-item');
    children.forEach((child, index) => {
        setTimeout(() => {
            child.classList.add('animate-visible');
        }, index * 100);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

function initButtonEffects() {
    document.querySelectorAll('.btn, .download-btn, .feature-card, .step').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 500);
}

function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, duration / steps);
    });
}

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    toggleButton.style.display = 'none';
    
    navbar.querySelector('.container').appendChild(toggleButton);
    
    toggleButton.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-menu-open');
        const icon = toggleButton.querySelector('i');
        icon.className = navLinks.classList.contains('mobile-menu-open') 
            ? 'fas fa-times' 
            : 'fas fa-bars';
    });
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'block';
        } else {
            toggleButton.style.display = 'none';
            navLinks.classList.remove('mobile-menu-open');
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            document.querySelector('.hero-content').classList.add('animate-visible');
            document.querySelector('.hero-visual').classList.add('animate-visible');
        }, 300);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarEffects();
    initButtonEffects();
    initMobileMenu();
    initLoadingAnimation();
    
    if (window.innerWidth > 768) {
        initParallaxEffect();
    }
});

function addAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) .hero-content,
        body:not(.loaded) .hero-visual {
            opacity: 0;
            transform: translateY(30px);
        }

        [data-animate] {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        [data-animate].animate-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .stagger-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stagger-item.animate-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .navbar.scrolled {
            background: rgba(15, 20, 25, 0.95);
            backdrop-filter: blur(30px);
        }

        .mobile-menu-toggle {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: white;
            padding: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
            background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background: rgba(15, 20, 25, 0.95);
                backdrop-filter: blur(30px);
                flex-direction: column;
                padding: 32px;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .nav-links.mobile-menu-open {
                transform: translateY(0);
                opacity: 1;
            }

            .nav-links a {
                padding: 16px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .nav-links a:last-child {
                border-bottom: none;
            }
        }

        .feature-card:hover,
        .step:hover,
        .team-member:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .btn:hover {
            transform: translateY(-2px) scale(1.05);
        }

        .hero-title {
            animation: heroGlow 3s ease-in-out infinite alternate;
        }

        @keyframes heroGlow {
            from { 
                filter: drop-shadow(0 0 10px rgba(75, 99, 247, 0.3));
            }
            to { 
                filter: drop-shadow(0 0 20px rgba(75, 99, 247, 0.6));
            }
        }
    `;
    document.head.appendChild(style);
}

addAnimationCSS();