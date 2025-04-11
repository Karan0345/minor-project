document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mentorApplicationForm');
    const fileInput = document.getElementById('cv');
    const fileLabel = document.querySelector('.file-label span');

    // Handle file input change
    fileInput.addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name || 'Choose File';
        fileLabel.textContent = fileName;
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get selected expertise areas
        const expertise = Array.from(document.querySelectorAll('input[name="expertise"]:checked'))
            .map(input => input.value);

        // Create FormData object
        const formData = new FormData(form);
        formData.append('expertise', JSON.stringify(expertise));

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Submitting...</span>
        `;
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showAlert('Application submitted successfully! We will review your application and get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            fileLabel.textContent = 'Choose File';
            
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.querySelector('.apply-content').insertBefore(alertDiv, form);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }
}); 