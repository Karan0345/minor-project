document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.getElementById('careerSearch');
    const careerCards = document.querySelectorAll('.career-card');

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        careerCards.forEach(card => {
            const cardContent = card.textContent.toLowerCase();
            const isMatch = cardContent.includes(searchTerm);
            
            card.style.display = isMatch ? 'block' : 'none';
            
            if (isMatch) {
                card.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    });

    // Career card hover effects
    careerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.career-icon i');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.career-icon i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Learn More button click handler
    const exploreButtons = document.querySelectorAll('.explore-btn');
    exploreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const careerCard = button.closest('.career-card');
            const careerTitle = careerCard.querySelector('h2').textContent;
            
            // Here you can add logic to show more details about the career
            console.log(`Exploring more about ${careerTitle}`);
            // For example: window.location.href = `/career-details/${careerTitle.toLowerCase()}`;
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on system preference
    document.documentElement.setAttribute('data-theme', 
        prefersDarkScheme.matches ? 'dark' : 'light'
    );

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle?.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu?.classList.toggle('active');
    });
});
