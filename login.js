document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Simple validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        // Simulate login authentication
        // In real application, this would be an API call
        if (authenticateUser(email, password)) {
            // Store user data in localStorage
            const userData = {
                id: '12345',
                name: 'John Doe',
                email: email,
                isLoggedIn: true
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Redirect to dashboard
            window.location.href = 'student-dashboard.html';
        } else {
            showAlert('Invalid email or password', 'error');
        }
    });

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    togglePassword.addEventListener('click', function() {
        const passwordInput = document.querySelector('input[type="password"]');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Simulated authentication function
    function authenticateUser(email, password) {
        // This is a dummy authentication
        // In real application, this would verify credentials with a backend server
        return email && password;
    }

    // Alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const loginBox = document.querySelector('.login-box');
        loginBox.insertBefore(alertDiv, loginBox.firstChild);
        
        setTimeout(() => alertDiv.remove(), 3000);
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`${this.classList.contains('google') ? 'Google' : 'Facebook'} login attempted`);
        });
    });

    // Add this to your existing login.js
    function handleLogin(userData) {
        // Store user data
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update navbar
        updateNavbar(userData);
        
        // Redirect to dashboard
        window.location.href = 'student-dashboard.html';
    }

    function updateNavbar(userData) {
        const authButtons = document.querySelector('.auth-buttons');
        if (userData && userData.isLoggedIn) {
            authButtons.innerHTML = `
                <a href="student-dashboard.html" class="dashboard-link">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
                <div class="user-profile">
                    <img src="${userData.avatar || 'default-avatar.png'}" alt="Profile">
                    <span>${userData.name}</span>
                </div>
            `;
        }
    }

    // Check auth status on page load
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.isLoggedIn) {
        updateNavbar(userData);
    }
}); 