// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// GSAP — progressive enhancement
if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("animate"));

    // Scroll reveal animations
    function animateIfExists(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        elements.forEach((element, index) => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleClass: 'show',
                    once: true,
                    ...options
                }
            });
        });
    }

    // Initialize animations
    window.addEventListener('load', function() {
        // Animate hero section
        const hero = document.getElementById('hero');
        if (hero) {
            gsap.from('.hero-content h1', {
                duration: 0.8,
                opacity: 0,
                y: 30,
                delay: 0.2
            });

            gsap.from('.hero-content p', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                delay: 0.4
            });

            gsap.from('.cta-button', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                delay: 0.6
            });

            gsap.from('.hero-visual', {
                duration: 1,
                opacity: 0,
                scale: 0.9,
                delay: 0.3
            });
        }

        // Animate service cards on scroll
        animateIfExists('.service-card', {
            onComplete: function() {
                const cards = document.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    gsap.from(card, {
                        duration: 0.6,
                        opacity: 0,
                        y: 30,
                        delay: index * 0.1,
                        overwrite: 'auto'
                    });
                });
            }
        });

        // Animate feature items
        animateIfExists('.feature-item', {
            onComplete: function() {
                const items = document.querySelectorAll('.feature-item');
                items.forEach((item, index) => {
                    gsap.from(item, {
                        duration: 0.6,
                        opacity: 0,
                        x: -30,
                        delay: index * 0.1,
                        overwrite: 'auto'
                    });
                });
            }
        });

        // Animate contact cards
        animateIfExists('.contact-info-card', {
            onComplete: function() {
                const cards = document.querySelectorAll('.contact-info-card');
                cards.forEach((card, index) => {
                    gsap.from(card, {
                        duration: 0.6,
                        opacity: 0,
                        y: 20,
                        delay: index * 0.1,
                        overwrite: 'auto'
                    });
                });
            }
        });

        // Refresh ScrollTrigger after all animations
        ScrollTrigger.refresh();
    });

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: { y: target, offsetY: 70 },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}
