import { checkAuthStatus, handleLogin, handleLogout } from './utils/auth.js';
import { analyzeEmotions } from './utils/analysis.js';
import { generateBotResponse, addChatMessage } from './utils/chatbot.js';

// DOM Elements
const tweetInput = document.getElementById('tweet-input');
const analyzeButton = document.getElementById('analyze-btn');
const charCount = document.getElementById('char-count');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

function updateCharCount() {
    const remainingChars = 280 - tweetInput.value.length;
    charCount.textContent = remainingChars;
    charCount.style.color = remainingChars < 20 ? '#e0245e' : '#8899a6';
}

function updateEmotionUI(emotions) {
    Object.entries(emotions).forEach(([emotion, score]) => {
        const card = document.getElementById(emotion);
        if (card) {
            card.querySelector('.emotion-score').textContent = `${Math.round(score)}%`;
            card.style.opacity = 0.3 + (score / 100) * 0.7;
            
            // Add a glow effect for strong emotions
            if (score > 50) {
                card.style.boxShadow = '0 0 15px rgba(29, 161, 242, 0.5)';
            } else {
                card.style.boxShadow = 'none';
            }
        }
    });
}

function handleAnalysis() {
    const tweet = tweetInput.value.trim();
    if (!tweet) return;

    const emotions = analyzeEmotions(tweet);
    updateEmotionUI(emotions);
    addChatMessage(tweet, false);
    
    setTimeout(() => {
        const response = generateBotResponse(emotions);
        addChatMessage(response, true);
    }, 1000);
}

function initializeEventListeners() {
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

    logoutBtn.addEventListener('click', handleLogout);
    tweetInput.addEventListener('input', updateCharCount);
    analyzeButton.addEventListener('click', handleAnalysis);
}

// Initialize the application
function initialize() {
    checkAuthStatus();
    initializeEventListeners();
    updateCharCount();
}

// Start the application
initialize();