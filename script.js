let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav ul li a');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');

// Theme logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-theme') {
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    } else {
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = 'light-theme';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark-theme';
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    } else {
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
    }
    localStorage.setItem('theme', theme);
});

window.addEventListener('scroll', () => {
    // Navbar hide/show on scroll
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;

    // Navbar active link on scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for fixed header
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({
            behavior: 'smooth'
        });
    });
});