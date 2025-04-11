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
}); 