document.addEventListener('DOMContentLoaded', () => {
    const formTitle = document.getElementById('formTitle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginMessage = document.getElementById('loginMessage');
    const signupMessage = document.getElementById('signupMessage');

    // Initialize or load users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Function to clear error messages
    function clearMessages() {
        loginMessage.textContent = "";
        signupMessage.textContent = "";
    }

    // Show Signup Form
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        formTitle.innerText = "Sign Up";
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        clearMessages();
    });

    // Show Login Form
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        formTitle.innerText = "Login";
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
        clearMessages();
    });

    // Sign Up Handler
    signupBtn.addEventListener('click', () => {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('signupPhone').value;

        // Validate password match
        if (password !== confirmPassword) {
            signupMessage.textContent = "Passwords do not match.";
            return;
        }

        // Check if user already exists
        const userExists = users.some(user => user.email === email || user.username === username);

        if (userExists) {
            signupMessage.textContent = "User already exists with this email or username.";
            return;
        }

        // Store new user
        const newUser = { name, email, username, password, phone };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to registration success page
        window.location.href = "registration_success.html";
    });

    // Login Handler
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Find user in stored users
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            loginMessage.textContent = "Invalid credentials. Please try again.";
            return;
        }

        // Redirect to login success page
        window.location.href = "login_success.html";
    });
});
