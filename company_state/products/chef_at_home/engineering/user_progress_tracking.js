// User Progress Tracking Functionality

class UserProgress {
    constructor() {
        this.xp = 0;
        this.streak = 0;
        this.level = 0;
        this.unlockedLevels = [];
    }

    addXP(amount) {
        this.xp += amount;
        this.checkLevelUp();
    }

    checkLevelUp() {
        // Logic to check if user has enough XP to level up
        if (this.xp >= this.getXPForNextLevel()) {
            this.level++;
            this.unlockedLevels.push(this.level);
        }
    }

    getXPForNextLevel() {
        // Example logic for XP needed for next level
        return (this.level + 1) * 100;
    }

    incrementStreak() {
        this.streak++;
    }

    resetStreak() {
        this.streak = 0;
    }
}

// Example usage:
const userProgress = new UserProgress();
userProgress.addXP(50);
userProgress.incrementStreak();
console.log(userProgress);