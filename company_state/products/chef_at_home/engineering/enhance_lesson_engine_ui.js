// Enhancements to the Lesson Engine UI

// Function to update user feedback based on lesson progress
function updateUserFeedback(progress) {
    const feedbackElement = document.getElementById('user-feedback');
    if (progress === 'completed') {
        feedbackElement.innerText = 'Great job! You completed the lesson!';
    } else if (progress === 'in_progress') {
        feedbackElement.innerText = 'Keep going! You are doing well!';
    } else {
        feedbackElement.innerText = 'Let’s get started!';
    }
}

// Event listener for lesson completion
document.getElementById('lesson-complete-btn').addEventListener('click', function() {
    updateUserFeedback('completed');
});

// Event listener for lesson in progress
document.getElementById('lesson-start-btn').addEventListener('click', function() {
    updateUserFeedback('in_progress');
});

// Initial feedback setup
updateUserFeedback('initial');