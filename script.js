// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation class
        themeToggle.classList.add('theme-switching');
        setTimeout(() => {
            themeToggle.classList.remove('theme-switching');
        }, 300);
    }
    
    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Call initTheme when document loads
document.addEventListener('DOMContentLoaded', initTheme);

// Testimonials Data
const testimonials = [
    {
        text: "Before joining the career counseling program, I was completely lost. Now, I feel much more confident about my future.",
        author: "Rohan Das"
    },
    {
        text: "The career counseling program was a game-changer for me. The interactive tools and resources they provided were incredibly helpful.",
        author: "Alok Kumar Raghuwanshi"
    },
    {
        text: "My career counselor was amazing! They took the time to really understand my goals and aspirations.",
        author: "Karan Vishwakarma"
    },
    {
        text: "I highly recommend this career counseling program to any student who is unsure about their future.",
        author: "Mohit Shrivastava"
    }
];

// FAQ Data
const faqs = [
    {
        question: "What are the benefits of career counselling and guidance for students?",
        answer: "Career counselling helps students understand their strengths, interests, and potential career paths. It provides valuable insights and guidance for making informed decisions about their future."
    },
    {
        question: "How can AI-powered platforms contribute to career guidance?",
        answer: "AI platforms provide personalized recommendations based on your interests, skills, and goals. They can analyze vast amounts of data to suggest suitable career paths and learning opportunities."
    },
    {
        question: "What role do mentorship programs play in career guidance?",
        answer: "Mentorship programs connect students with experienced professionals who can provide real-world insights, guidance, and networking opportunities in their chosen field."
    }
];

// Testimonial Slider
let currentTestimonial = 0;
const testimonialContainer = document.querySelector('.testimonial-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.testimonial-dots');

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    dotsContainer.appendChild(dot);
});

function showTestimonial() {
    const testimonial = document.querySelector('.testimonial');
    testimonial.querySelector('.testimonial-text').textContent = testimonials[currentTestimonial].text;
    testimonial.querySelector('.author-name').textContent = testimonials[currentTestimonial].author;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial();
}

prevBtn.addEventListener('click', prevTestimonial);
nextBtn.addEventListener('click', nextTestimonial);

// Initialize testimonials
showTestimonial();
setInterval(nextTestimonial, 5000);

// FAQ Functionality
const faqContainer = document.querySelector('.faq-container');

faqs.forEach(faq => {
    const faqElement = document.createElement('div');
    faqElement.classList.add('faq-item');
    faqElement.innerHTML = `
        <h3>${faq.question}</h3>
        <p>${faq.answer}</p>
    `;
    
    faqElement.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== faqElement) {
            currentlyActive.classList.remove('active');
        }
        faqElement.classList.toggle('active');
    });
    
    faqContainer.appendChild(faqElement);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Update the existing mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (!menuToggle || !navMenu || !hamburger) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    // ... other init functions ...
});

// Function to check if user is authenticated
function isAuthenticated() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.isLoggedIn;
}

// Function to protect dashboard route
function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// Add this to student-dashboard.html
if (document.querySelector('.dashboard-container')) {
    protectRoute();
} 