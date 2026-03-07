// User Feedback Mechanism

class UserFeedback {
    constructor() {
        this.feedbackList = [];
    }

    collectFeedback(feedback) {
        this.feedbackList.push(feedback);
        this.saveFeedback();
    }

    saveFeedback() {
        // Logic to save feedback to local storage or server
        console.log('Feedback saved:', this.feedbackList);
    }

    displayFeedback() {
        // Logic to display feedback to users
        console.log('User Feedback:', this.feedbackList);
    }
}

// Example usage
const userFeedback = new UserFeedback();
userFeedback.collectFeedback('Great lesson on boiling water!');
userFeedback.displayFeedback();