document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.register-form');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
        const terms = this.querySelector('input[type="checkbox"]').checked;
        
        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }

        if (!terms) {
            showAlert('Please accept the terms and conditions', 'error');
            return;
        }

        // Simulate registration
        const userData = {
            id: Date.now().toString(),
            name: name,
            email: email,
            phone: phone,
            isLoggedIn: true
        };

        // Store user data
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message
        showAlert('Registration successful! Redirecting...', 'success');
        
        // Redirect to dashboard after delay
        setTimeout(() => {
            window.location.href = 'student-dashboard.html';
        }, 2000);
    });

    // Password visibility toggle
    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Phone number validation
    const phoneInput = document.querySelector('input[type="tel"]');
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const registerBox = document.querySelector('.register-box');
        registerBox.insertBefore(alertDiv, registerBox.firstChild);
        
        setTimeout(() => alertDiv.remove(), 3000);
    }
}); 