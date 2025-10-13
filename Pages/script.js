document.addEventListener('DOMContentLoaded', function() {
    initializeCollapsibles();
    initializeCardAnimations();
    initializeScrollEffects();
});

function initializeCollapsibles() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    collapsibleHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const item = header.closest('.collapsible-item');
            const content = item.querySelector('.collapsible-content');
            const icon = header.querySelector('.expand-icon');

            if (!item || !content || !icon) return;

            const isOpen = item.classList.contains('active');

            document.querySelectorAll('.collapsible-item').forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.collapsible-content');
                    const otherIcon = otherItem.querySelector('.expand-icon');
                    if (otherContent) otherContent.style.maxHeight = '0px';
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });

            if (isOpen) {
                item.classList.remove('active');
                content.style.maxHeight = '0px';
                icon.textContent = '+';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '−';
            }
        });
    });
}

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.stat-card, .about-card');

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        }
    );

    cards.forEach(function(card) {
        observer.observe(card);
    });
}

function initializeScrollEffects() {
    let ticking = false;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax(lastScrollY);
                ticking = false;
            });

            ticking = true;
        }
    });
}

function updateParallax(scrollY) {
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach(function(orb, index) {
        const speed = (index + 1) * 0.15;
        const yPos = -(scrollY * speed);
        orb.style.transform = 'translateY(' + yPos + 'px)';
    });
}

window.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(function(card) {
        card.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    });
});

const resourceItems = document.querySelectorAll('.resource-item');
resourceItems.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.resource-icon');
        if (icon) {
            icon.style.transform = 'scale(1.3) rotate(10deg)';
            icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
    });

    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.resource-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        const iconBg = this.querySelector('.stat-icon-bg');
        if (iconBg) {
            iconBg.style.animationPlayState = 'paused';
        }
    });

    card.addEventListener('mouseleave', function() {
        const iconBg = this.querySelector('.stat-icon-bg');
        if (iconBg) {
            iconBg.style.animationPlayState = 'running';
        }
    });
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    `;

    document.body.appendChild(sparkle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 30;
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;

    sparkle.animate([
        {
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        {
            transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = function() {
        sparkle.remove();
    };
}

const interactiveElements = document.querySelectorAll('.stat-card, .about-card, .collapsible-item');
interactiveElements.forEach(function(element) {
    element.addEventListener('click', function(e) {
        if (!e.target.closest('.collapsible-header')) {
            for (let i = 0; i < 3; i++) {
                setTimeout(function() {
                    createSparkle(
                        e.clientX + (Math.random() - 0.5) * 20,
                        e.clientY + (Math.random() - 0.5) * 20
                    );
                }, i * 50);
            }
        }
    });
});

let lastScrollTop = 0;
const headerSection = document.querySelector('.header-section');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 200) {
        headerSection.style.transform = 'translateY(-20px)';
        headerSection.style.opacity = '0.7';
    } else {
        headerSection.style.transform = 'translateY(0)';
        headerSection.style.opacity = '1';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

headerSection.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle)
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-menu')
    })

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose)
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-menu')
    })


/*=============== SHOW LOGIN ===============*/
const login = document.getElementById('login'),
      loginButton = document.getElementById('login-button'),
      loginClose = document.getElementById('login-close')

/*===== LOGIN SHOW =====*/
/* Validate if constant exists */
if(loginButton)
    loginButton.addEventListener("click", () => {
        login.classList.add('show-login')
    })

/*===== LOGIN HIDDEN =====*/
/* Validate if constant exists */
if(loginClose)
    loginClose.addEventListener("click", () => {
        login.classList.remove('show-login')
    })


/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItem = document.querySelectorAll('.questions__item')

accordionItem.forEach((item) => {
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () => {
    const openItem = document.querySelectorAll('.accordion-open')

    toggleItem(item)

    if(openItem && openItem !== item)
    {
        toggleItem(openItem)
    }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.question__content')
    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
     }
    else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }
    
}

const card = document.getElementById('animatedCard');

// Add click interaction (pulse effect)
card.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
});

// Add keyboard navigation (Enter or Space)
card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        this.click();
    }
});

// Make card focusable
card.setAttribute('tabindex', '0');

// Enhanced card interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    // Add enhanced hover effects
    cards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');
        
        // Card hover effect with mouse tracking
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                translateY(-8px) 
                scale(1.02) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                perspective(1000px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
        
        // Button click effect
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = exploreBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            exploreBtn.style.position = 'relative';
            exploreBtn.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate navigation (you can replace this with actual navigation)
            const cardTitle = card.querySelector('.card-title').textContent;
            console.log(`Navigating to: ${cardTitle}`);
            
            // Add a subtle success feedback
            exploreBtn.style.background = 'rgba(100,200,100,0.3)';
            setTimeout(() => {
                exploreBtn.style.background = '';
            }, 200);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .card {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide cards for scroll animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Enhance focus visibility for accessibility
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('explore-btn')) {
                focusedElement.style.outline = '2px solid rgba(100,150,255,0.8)';
                focusedElement.style.outlineOffset = '2px';
            }
        }
    });
    
    // Remove custom focus styles when clicking
    document.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.explore-btn');
        buttons.forEach(btn => {
            btn.style.outline = '';
            btn.style.outlineOffset = '';
        });
    });
});