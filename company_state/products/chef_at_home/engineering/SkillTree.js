class SkillTree {
  constructor(levels) {
    this.levels = levels;
    this.currentLevel = 0;
    this.completedMilestones = {};
  }

  unlockLevel(levelId) {
    // Logic to unlock a new level
    console.log(`Level ${levelId} unlocked!`);
    // Update internal state or trigger UI changes
  }

  completeMilestone(levelId, milestoneId) {
    if (!this.completedMilestones[levelId]) {
      this.completedMilestones[levelId] = new Set();
    }
    this.completedMilestones[levelId].add(milestoneId);
    console.log(`Milestone ${milestoneId} in Level ${levelId} completed.`);
    // Check if all milestones for a level are complete to unlock the next level
    if (this.isLevelComplete(levelId)) {
      const nextLevelIndex = this.levels.findIndex(l => l.id === levelId) + 1;
      if (nextLevelIndex < this.levels.length) {
        this.unlockLevel(this.levels[nextLevelIndex].id);
      }
    }
  }

  isMilestoneCompleted(levelId, milestoneId) {
    return this.completedMilestones[levelId]?.has(milestoneId) || false;
  }

  isLevelComplete(levelId) {
    const level = this.levels.find(l => l.id === levelId);
    if (!level) return false;
    const completedCount = this.completedMilestones[levelId]?.size || 0;
    return completedCount === level.milestones.length;
  }

  isGateLocked(nextLevelId) {
    // Logic to determine if the gate to the next level is locked
    // This could be based on completing all milestones of the current level
    const currentLevelIndex = this.levels.findIndex(l => l.id === this.currentLevel);
    if (currentLevelIndex === -1) return true; // Should not happen if currentLevel is set

    const levelBeforeNext = this.levels[currentLevelIndex];
    return !this.isLevelComplete(levelBeforeNext.id);
  }

  // Method to render the skill tree visually (placeholder)
  render() {
    console.log('Rendering Skill Tree...');
    // This would involve DOM manipulation or a rendering library
    this.levels.forEach(level => {
      console.log(`Level: ${level.title} (ID: ${level.id})`);
      level.milestones.forEach(milestone => {
        const status = this.isMilestoneCompleted(level.id, milestone.id) ? 'Completed' : 'Locked';
        console.log(`  - ${milestone.title} [${status}]`);
      });
      // Indicate gates between levels
      const gateStatus = this.isGateLocked(level.id) ? 'Locked' : 'Open';
      if (this.levels.indexOf(level) < this.levels.length - 1) {
         console.log(`  Gate to next level: [${gateStatus}]`);
      }
    });
  }
}

// Example Usage (for demonstration purposes):
/*
const exampleLevels = [
  {
    id: 'level_0',
    title: 'Kitchen Basics',
    milestones: [{ id: 'm0_1', title: 'Safety First' }, { id: 'm0_2', title: 'Tool Identification' }]
  },
  {
    id: 'level_1',
    title: 'Boiling Water Techniques',
    milestones: [{ id: 'm1_1', title: 'Boil Water' }, { id: 'm1_2', title: 'Salting Water' }]
  }
];

const skillTree = new SkillTree(exampleLevels);
skillTree.currentLevel = 'level_0';

skillTree.completeMilestone('level_0', 'm0_1');
skillTree.completeMilestone('level_0', 'm0_2');
skillTree.render();
*/
