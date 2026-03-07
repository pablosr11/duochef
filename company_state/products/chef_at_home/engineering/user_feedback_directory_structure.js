// Directory structure for user feedback files
const fs = require('fs');

const feedbackDirectory = './user_feedback';

if (!fs.existsSync(feedbackDirectory)){ 
    fs.mkdirSync(feedbackDirectory);
}

console.log('User feedback directory created successfully.');