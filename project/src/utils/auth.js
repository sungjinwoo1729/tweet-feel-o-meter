const DEMO_CREDENTIALS = {
    username: 'demo',
    password: 'demo123'
};

export function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateUIVisibility(isLoggedIn);
    return isLoggedIn;
}

function updateUIVisibility(isLoggedIn) {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    
    if (isLoggedIn) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
    } else {
        authContainer.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }
}

export function handleLogin(username, password) {
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        updateUIVisibility(true);
        return true;
    }
    return false;
}

export function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    updateUIVisibility(false);
}