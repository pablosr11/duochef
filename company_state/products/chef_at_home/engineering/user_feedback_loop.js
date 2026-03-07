// User Feedback Loop for Lessons

class UserFeedbackLoop {
    constructor() {
        this.feedbackData = [];
    }

    collectFeedback(lessonId, userId, feedback) {
        this.feedbackData.push({ lessonId, userId, feedback });
        this.saveFeedback();
    }

    saveFeedback() {
        // Logic to save feedback to local storage or server
        console.log('Feedback saved:', this.feedbackData);
    }

    getFeedback(lessonId) {
        return this.feedbackData.filter(item => item.lessonId === lessonId);
    }
}

// Example usage:
const feedbackLoop = new UserFeedbackLoop();
feedbackLoop.collectFeedback('lesson1', 'user123', 'Great lesson!');