document.addEventListener('DOMContentLoaded', function () {
    // Toggle password visibility
    document.getElementById('toggle-password').addEventListener('click', function () {
        var passwordField = document.getElementById('password-field');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });

    function toggleForm(type) {
        var studentForm = document.getElementById("student-form");
        var visitorForm = document.getElementById("visitor-form");
        var submitButton = document.getElementById("btn-submit");

        if (type === 'student') {
            studentForm.classList.remove("hidden");
            visitorForm.classList.add("hidden");
            submitButton.style.display = 'block';
        } else if (type === 'visitor') {
            visitorForm.classList.remove("hidden");
            studentForm.classList.add("hidden");
            submitButton.style.display = 'block';
        }
    }
    
});
