document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress chart
    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Student Progress',
                data: [65, 70, 75, 80, 85, 90],
                borderColor: '#007bff',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0, 123, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if(confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('mentorData');
            window.location.href = 'login.html';
        }
    });

    // Load mentor data
    const mentorData = JSON.parse(localStorage.getItem('mentorData'));
    if (mentorData) {
        document.getElementById('mentorName').textContent = mentorData.name;
        document.getElementById('mentorGreeting').textContent = mentorData.name;
    }

    // Handle schedule button
    document.querySelector('.schedule-btn').addEventListener('click', function() {
        // Add your scheduling functionality here
        console.log('Schedule new session');
    });

    // Handle join buttons
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Add your join session functionality here
            console.log('Joining session');
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle?.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu?.classList.toggle('active');
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});