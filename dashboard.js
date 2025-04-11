document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Handle card actions
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            switch(action) {
                case 'Start Assessment':
                    window.location.href = 'assessment.html';
                    break;
                    
                case 'Chat with AI':
                    window.location.href = 'ai-chat.html';
                    break;
                    
                case 'Explore Careers':
                    window.location.href = 'career-explorer.html';
                    break;
                    
                case 'Find Mentors':
                    window.location.href = 'mentors.html';
                    break;
            }
        });
    });

    // Update user profile from localStorage
    updateUserProfile();

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if(confirm('Are you sure you want to logout?')) {
            logout();
        }
    });
});

// Authentication check
function checkAuth() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Update user profile
function updateUserProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const userProfile = document.querySelector('.user-profile span');
        userProfile.textContent = userData.name;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

// Update dashboard data
function updateDashboardData() {
    // This function would typically fetch data from an API
    // For now, we'll use static data
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Update progress
        document.querySelector('.progress').style.width = '40%';
        document.querySelector('.progress-info span').textContent = '2/5 completed';
        
        // Update last session
        document.querySelector('.last-session span').textContent = 'Last session: 2 days ago';
        
        // Update recommendations
        document.querySelector('.recommendations span').textContent = '5 new recommendations';
        
        // Update available mentors
        document.querySelector('.available-mentors span').textContent = '15 mentors available';
    }
} 