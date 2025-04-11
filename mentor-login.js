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

        // Simulate mentor login authentication
        if (authenticateMentor(email, password)) {
            // Store mentor data
            const mentorData = {
                id: 'M12345',
                name: 'Dr. John Smith',
                email: email,
                role: 'mentor',
                isLoggedIn: true
            };
            localStorage.setItem('mentorData', JSON.stringify(mentorData));
            
            // Show success message and redirect
            showAlert('Login successful! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                window.location.href = 'mentor-dashboard.html';
            }, 1500);
        } else {
            showAlert('Invalid email or password', 'error');
        }
    });

    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    togglePassword.addEventListener('click', function() {
        const passwordInput = document.querySelector('input[type="password"]');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Simulated authentication function
    function authenticateMentor(email, password) {
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
}); 