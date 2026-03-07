// Waitlist Functionality for ChefAtHome

const waitlist = [];

function addToWaitlist(email) {
    if (!email || !validateEmail(email)) {
        throw new Error('Invalid email address');
    }
    waitlist.push(email);
    saveWaitlist();
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function saveWaitlist() {
    // Logic to save waitlist to local storage or database
    localStorage.setItem('waitlist', JSON.stringify(waitlist));
}

function getWaitlist() {
    return JSON.parse(localStorage.getItem('waitlist')) || [];
}

// Example usage:
// addToWaitlist('user@example.com');
