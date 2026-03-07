// Test for Waitlist Functionality

const assert = require('assert');
const waitlist = require('./waitlist');

describe('Waitlist Functionality', function() {
    it('should add a user to the waitlist', function() {
        const user = { email: 'test@example.com' };
        const result = waitlist.addUser(user);
        assert.strictEqual(result.success, true);
        assert.strictEqual(waitlist.getUsers().length, 1);
    });

    it('should not add duplicate users', function() {
        const user = { email: 'test@example.com' };
        waitlist.addUser(user);
        const result = waitlist.addUser(user);
        assert.strictEqual(result.success, false);
        assert.strictEqual(waitlist.getUsers().length, 1);
    });

    it('should return the correct user count', function() {
        const user1 = { email: 'user1@example.com' };
        const user2 = { email: 'user2@example.com' };
        waitlist.addUser(user1);
        waitlist.addUser(user2);
        assert.strictEqual(waitlist.getUserCount(), 2);
    });
});