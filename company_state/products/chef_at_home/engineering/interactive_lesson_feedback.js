// Interactive Lesson Feedback Mechanism

class LessonFeedback {
    constructor() {
        this.feedbackData = [];
    }

    collectFeedback(lessonId, rating, comments) {
        const feedback = {
            lessonId: lessonId,
            rating: rating,
            comments: comments,
            timestamp: new Date().toISOString()
        };
        this.feedbackData.push(feedback);
        this.saveFeedback();
    }

    saveFeedback() {
        // Logic to save feedback to local storage or server
        localStorage.setItem('lessonFeedback', JSON.stringify(this.feedbackData));
    }

    getFeedback() {
        return JSON.parse(localStorage.getItem('lessonFeedback')) || [];
    }
}

// Example usage:
const feedback = new LessonFeedback();
feedback.collectFeedback('lesson_1', 5, 'Great lesson! Very helpful.');