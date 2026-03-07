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
        // Logic to display feedback to the user
        return this.feedbackList;
    }
}

const feedbackSystem = new UserFeedback();

// Example usage
feedbackSystem.collectFeedback('This lesson was very helpful!');
feedbackSystem.collectFeedback('I would like more recipes.');
console.log(feedbackSystem.displayFeedback());