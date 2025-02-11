import { analyzeEmotions, analyzeSentiment } from './utils/analysis.js';
import { initializeChatbot } from './chatbot.js';
import { checkAuthStatus, handleLogin, handleLogout } from './utils/auth.js';

// DOM Elements
const tweetInput = document.getElementById('tweet-input');
const analyzeButton = document.getElementById('analyze-btn');
const charCount = document.getElementById('char-count');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Update character count
function updateCharCount() {
    const remainingChars = 280 - tweetInput.value.length;
    charCount.textContent = remainingChars;
    
    if (remainingChars < 20) {
        charCount.style.color = '#e0245e';
    } else {
        charCount.style.color = '#8899a6';
    }
}

// Update UI with analysis results
function updateAnalysisUI(emotions, sentiments) {
    // Update sentiment indicators
    document.getElementById('positive-level').style.width = `${sentiments.positive}%`;
    document.getElementById('negative-level').style.width = `${sentiments.negative}%`;
    document.getElementById('neutral-level').style.width = `${sentiments.neutral}%`;

    // Update emotion cards
    Object.entries(emotions).forEach(([emotion, score]) => {
        const card = document.getElementById(emotion);
        if (card) {
            card.querySelector('.emotion-score').textContent = `${Math.round(score)}%`;
            card.style.opacity = 0.3 + (score / 100) * 0.7;
        }
    });

    // Add animation effect
    const elements = document.querySelectorAll('.emotion-card, .progress');
    elements.forEach(element => {
        element.style.transition = 'all 0.5s ease-in-out';
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize authentication
function initializeAuth() {
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (handleLogin(username, password)) {
            loginForm.reset();
        } else {
            alert('Invalid credentials. Please use demo/demo123');
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', handleLogout);

    // Check initial auth status
    checkAuthStatus();
}

// Initialize the application
function initialize() {
    // Initialize authentication
    initializeAuth();
    
    // Initialize chatbot
    initializeChatbot();

    // Add event listeners
    tweetInput.addEventListener('input', updateCharCount);
    analyzeButton.addEventListener('click', () => {
        const tweet = tweetInput.value.trim().toLowerCase();
        if (tweet) {
            const emotions = analyzeEmotions(tweet);
            const sentiments = analyzeSentiment(tweet);
            updateAnalysisUI(emotions, sentiments);
        }
    });

    // Initial character count
    updateCharCount();
}

// Start the application
initialize();