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