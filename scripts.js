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
    
});
