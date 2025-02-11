const emotionPatterns = {
    happy: ['happy', 'excited', 'wonderful', 'great', 'amazing', 'joy', '😊', 'glad', 'delighted'],
    angry: ['angry', 'mad', 'furious', 'hate', 'terrible', '😠', '😡', 'rage', 'annoyed'],
    sad: ['sad', 'depressed', 'hurt', 'crying', 'disappointed', '😢', '😭', 'unhappy', 'miserable'],
    scared: ['scared', 'afraid', 'worried', 'anxious', 'terrified', '😨', '😰', 'fear', 'nervous'],
    love: ['love', 'adore', 'cherish', 'heart', '❤️', '🥰', 'loving', 'affection', 'fond'],
    surprise: ['wow', 'omg', 'unexpected', 'shocked', 'amazed', '😲', '😮', 'surprising', 'unbelievable']
};

export function analyzeEmotions(text) {
    const words = text.toLowerCase().split(/\s+/);
    const scores = {
        happy: 0,
        angry: 0,
        sad: 0,
        scared: 0,
        love: 0,
        surprise: 0
    };

    words.forEach(word => {
        Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
            if (patterns.some(pattern => word.includes(pattern))) {
                scores[emotion] += 1;
            }
        });
    });

    // Convert counts to percentages
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    Object.keys(scores).forEach(key => {
        scores[key] = (scores[key] / total) * 100;
    });

    return scores;
}