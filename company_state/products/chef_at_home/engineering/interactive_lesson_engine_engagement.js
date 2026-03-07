// Interactive Lesson Engine Engagement Features

class LessonEngagement {
    constructor() {
        this.badges = [];
        this.progressRewards = [];
    }

    unlockBadge(badge) {
        this.badges.push(badge);
        console.log(`Badge unlocked: ${badge}`);
    }

    addProgressReward(reward) {
        this.progressRewards.push(reward);
        console.log(`Progress reward added: ${reward}`);
    }

    getBadges() {
        return this.badges;
    }

    getProgressRewards() {
        return this.progressRewards;
    }
}

// Example usage
const engagement = new LessonEngagement();
engagement.unlockBadge('First Lesson Completed');
engagement.addProgressReward('10 XP');
console.log(engagement.getBadges());
console.log(engagement.getProgressRewards());