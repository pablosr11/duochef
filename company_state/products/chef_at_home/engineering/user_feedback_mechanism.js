// User Feedback Mechanism

class UserFeedback {
    constructor() {
        this.feedbackData = [];
    }

    collectFeedback(userId, feedback) {
        this.feedbackData.push({ userId, feedback });
        console.log('Feedback collected:', { userId, feedback });
    }

    getFeedback() {
        return this.feedbackData;
    }
}

// Example usage
const feedbackSystem = new UserFeedback();
feedbackSystem.collectFeedback('user123', 'Great lesson on boiling water!');
console.log(feedbackSystem.getFeedback());