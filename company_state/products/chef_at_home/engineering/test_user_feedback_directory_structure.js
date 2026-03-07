const feedbackDir = require('./user_feedback_directory_structure');
const fs = require('fs');
const path = require('path');

describe('User Feedback Directory Structure', () => {
    it('should create user feedback directory', () => {
        expect(fs.existsSync(feedbackDir)).toBe(true);
    });

    it('should be a directory', () => {
        const stats = fs.statSync(feedbackDir);
        expect(stats.isDirectory()).toBe(true);
    });
});