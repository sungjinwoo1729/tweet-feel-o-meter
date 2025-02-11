// Emotion patterns and keywords for Twitter analysis
const emotionPatterns = {
    joy: ['happy', 'excited', 'wonderful', 'great', 'amazing', 'love', '❤️', '😊', '🥰'],
    anger: ['angry', 'mad', 'furious', 'hate', 'terrible', '😠', '😡', '🤬'],
    sadness: ['sad', 'depressed', 'hurt', 'crying', 'disappointed', '😢', '😭', '💔'],
    fear: ['scared', 'afraid', 'worried', 'anxious', 'terrified', '😨', '😰', '😱']
};

// Sentiment keywords
const sentimentPatterns = {
    positive: ['good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful', 'beautiful'],
    negative: ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'poor'],
    neutral: ['okay', 'fine', 'normal', 'average', 'neutral', 'moderate']
};

// DOM elements
const tweetInput = document.getElementById('tweet-input');
const analyzeButton = document.getElementById('analyze-btn');
const charCount = document.getElementById('char-count');

// Sentiment indicators
const positiveLevel = document.getElementById('positive-level');
const negativeLevel = document.getElementById('negative-level');
const neutralLevel = document.getElementById('neutral-level');

// Event listeners
tweetInput.addEventListener('input', updateCharCount);
analyzeButton.addEventListener('click', analyzeTweet);

function updateCharCount() {
    const remainingChars = 280 - tweetInput.value.length;
    charCount.textContent = remainingChars;
    
    if (remainingChars < 20) {
        charCount.style.color = '#e0245e';
    } else {
        charCount.style.color = '#8899a6';
    }
}

function analyzeTweet() {
    const tweet = tweetInput.value.toLowerCase();
    if (!tweet.trim()) return;

    // Analyze emotions
    const emotionScores = analyzeEmotions(tweet);
    updateEmotionCards(emotionScores);

    // Analyze sentiment
    const sentimentScores = analyzeSentiment(tweet);
    updateSentimentIndicators(sentimentScores);

    // Add animation effect
    addAnalysisAnimation();
}

function analyzeEmotions(tweet) {
    const scores = {
        joy: 0,
        anger: 0,
        sadness: 0,
        fear: 0
    };

    // Calculate emotion scores
    Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
        const matches = patterns.filter(pattern => tweet.includes(pattern));
        scores[emotion] = (matches.length / patterns.length) * 100;
    });

    return scores;
}

function analyzeSentiment(tweet) {
    const scores = {
        positive: 0,
        negative: 0,
        neutral: 0
    };

    // Calculate sentiment scores
    Object.entries(sentimentPatterns).forEach(([sentiment, patterns]) => {
        const matches = patterns.filter(pattern => tweet.includes(pattern));
        scores[sentiment] = (matches.length / patterns.length) * 100;
    });

    // Normalize scores
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    Object.keys(scores).forEach(key => {
        scores[key] = (scores[key] / total) * 100;
    });

    return scores;
}

function updateEmotionCards(scores) {
    Object.entries(scores).forEach(([emotion, score]) => {
        const card = document.getElementById(emotion);
        if (card) {
            card.querySelector('.emotion-score').textContent = `${Math.round(score)}%`;
            card.style.opacity = 0.3 + (score / 100) * 0.7;
        }
    });
}

function updateSentimentIndicators(scores) {
    positiveLevel.style.width = `${scores.positive}%`;
    negativeLevel.style.width = `${scores.negative}%`;
    neutralLevel.style.width = `${scores.neutral}%`;
}

function addAnalysisAnimation() {
    const elements = document.querySelectorAll('.emotion-card, .progress');
    elements.forEach(element => {
        element.style.transition = 'all 0.5s ease-in-out';
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize with empty analysis
analyzeTweet();