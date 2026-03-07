const fs = require('fs');
const path = require('path');

const feedbackDir = path.join(__dirname, 'user_feedback');

if (!fs.existsSync(feedbackDir)) {
    fs.mkdirSync(feedbackDir);
    console.log('User feedback directory created.');
} else {
    console.log('User feedback directory already exists.');
}