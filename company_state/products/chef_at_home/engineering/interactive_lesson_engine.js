// Interactive Lesson Engine for ChefAtHome

class InteractiveLessonEngine {
    constructor() {
        this.currentStep = 0;
        this.steps = [];
        this.isCompleted = false;
    }

    loadLesson(steps) {
        this.steps = steps;
        this.currentStep = 0;
        this.isCompleted = false;
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
        } else {
            this.isCompleted = true;
        }
    }

    getCurrentStep() {
        return this.steps[this.currentStep];
    }

    isLessonCompleted() {
        return this.isCompleted;
    }
}

module.exports = InteractiveLessonEngine;