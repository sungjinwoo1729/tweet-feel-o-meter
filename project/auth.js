// Demo credentials
const DEMO_CREDENTIALS = {
    username: 'demo',
    password: 'demo123'
};

// DOM Elements
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        showApp();
    } else {
        showAuth();
    }
}

// Show authentication page
function showAuth() {
    authContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
}

// Show main application
function showApp() {
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
}

// Handle login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        showApp();
    } else {
        alert('Invalid credentials. Please use demo/demo123');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    showAuth();
});

// Initialize auth check
checkAuthStatus();