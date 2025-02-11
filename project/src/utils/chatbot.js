const botResponses = {
    joy: [
        "I'm glad you're feeling positive! Keep spreading that joy!",
        "Your happiness is contagious! What made your day special?",
        "That's wonderful! It's great to see you in such high spirits!"
    ],
    anger: [
        "I understand you're feeling frustrated. Would you like to talk about it?",
        "It's okay to feel angry sometimes. Take deep breaths and let's work through this.",
        "I hear your frustration. What do you think triggered these feelings?"
    ],
    sadness: [
        "I'm here for you. It's okay to not be okay sometimes.",
        "Would you like to talk about what's making you feel down?",
        "Remember that difficult times are temporary. How can I help?"
    ],
    fear: [
        "It's brave of you to share your fears. Let's face them together.",
        "Take a deep breath. You're not alone in this.",
        "What's causing you to feel anxious? Let's break it down together."
    ],
    neutral: [
        "How are you feeling about this situation?",
        "Would you like to explore these thoughts further?",
        "I'm here to listen if you want to share more."
    ]
};

export function generateBotResponse(emotions) {
    const dominantEmotion = Object.entries(emotions)
        .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    const responses = botResponses[dominantEmotion] || botResponses.neutral;
    return responses[Math.floor(Math.random() * responses.length)];
}

export function addChatMessage(message, isBot = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}