/**
 * Define Global Variables
 * 
*/
const sections = Array.from(document.querySelectorAll('section'));
const sectionHeadings = Array.from(document.querySelectorAll('section h2')).map(section => section.outerText);
const navLinks = document.querySelectorAll('nav > ul')[0].children;

const toTopBtn = document.getElementById('scrollToTop');
/**
 * End Global Variables
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu(){
    document.getElementById('navbar__list').innerHTML = '';
    for(let i = 0; i < sectionHeadings.length; i++){
        let listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#${sections[i].id}" class="menu__link">${sectionHeadings[i]}</a>`;
        document.getElementById('navbar__list').appendChild(listItem);
    }
}


// Add class 'active-class' to section when near top of viewport
function setActiveSection(){
    let current = '';
    //get offset from top of each section as well as respective height --> compare with scrollY (how far you scrolled)
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= (sectionTop - sectionHeight / 3)){
           current = section.getAttribute('id');
        }
    })
    //highlight active section in viewport
    sections.forEach(section => {
        section.classList.remove('active-class');
        if(section.id === current){
            section.classList.add('active-class');
        }
    })
    //highlight current navbar link when on section
    Array.from(navLinks).forEach(item => {
        item.classList.remove('navbar__active');
        if(item.innerHTML.slice(10, 18) == current){
            item.classList.add('navbar__active')
        }
    })

    //enable back to top button if at fold of page ~1000px from top
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000){
        toTopBtn.style.display = 'block';
    } else {
        toTopBtn.style.display = 'none';
    }
}

function backToTop(){
    document.body.scrollTop = 0; //for safari
    document.documentElement.scrollTop = 0; //for chrome, firefox, etc.
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildMenu();

// Set sections as active
window.addEventListener('scroll', setActiveSection);

// Back to top button click
toTopBtn.addEventListener('click', backToTop)