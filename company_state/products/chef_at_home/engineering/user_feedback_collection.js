// User Feedback Collection Module

class UserFeedbackCollection {
    constructor() {
        this.feedback = [];
    }

    collectFeedback(userId, feedbackText) {
        const feedbackEntry = { userId, feedbackText, timestamp: new Date() };
        this.feedback.push(feedbackEntry);
        this.saveFeedback();
    }

    saveFeedback() {
        // Logic to save feedback to local storage or database
        console.log('Feedback saved:', this.feedback);
    }
}

// Example usage:
const feedbackCollection = new UserFeedbackCollection();
feedbackCollection.collectFeedback('user123', 'I love the cooking lessons!');