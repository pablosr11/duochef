// Test for Persistence Layer Functionality

const assert = require('assert');
const persistenceLayer = require('./persistenceLayer'); // Assuming this is the module handling persistence

describe('Persistence Layer Tests', function() {
    it('should store and retrieve XP correctly', function() {
        persistenceLayer.setXP(100);
        const xp = persistenceLayer.getXP();
        assert.strictEqual(xp, 100);
    });

    it('should store and retrieve streaks correctly', function() {
        persistenceLayer.setStreak(5);
        const streak = persistenceLayer.getStreak();
        assert.strictEqual(streak, 5);
    });

    it('should store and retrieve unlocked levels correctly', function() {
        persistenceLayer.unlockLevel(1);
        const levels = persistenceLayer.getUnlockedLevels();
        assert.strictEqual(levels.includes(1), true);
    });
});