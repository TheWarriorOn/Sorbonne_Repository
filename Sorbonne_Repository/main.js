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