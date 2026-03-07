// Lesson Flow Logic for ChefAtHome

class LessonFlow {
    constructor(steps) {
        this.steps = steps;
        this.currentStepIndex = 0;
    }

    start() {
        this.showCurrentStep();
    }

    showCurrentStep() {
        const step = this.steps[this.currentStepIndex];
        console.log(`Step ${this.currentStepIndex + 1}: ${step.description}`);
        // Implement UI logic to display the current step
        this.setupNextStep(step);
    }

    setupNextStep(step) {
        if (step.duration) {
            setTimeout(() => {
                this.currentStepIndex++;
                if (this.currentStepIndex < this.steps.length) {
                    this.showCurrentStep();
                } else {
                    this.completeLesson();
                }
            }, step.duration);
        } else {
            this.completeLesson();
        }
    }

    completeLesson() {
        console.log('Lesson completed!');
        // Logic to handle lesson completion
    }
}

// Example usage
const steps = [
    { description: 'Welcome to the cooking lesson!', duration: 2000 },
    { description: 'Let's start with kitchen safety.', duration: 5000 },
    { description: 'Now, we will learn about basic knife skills.', duration: 3000 }
];

const lessonFlow = new LessonFlow(steps);
lessonFlow.start();