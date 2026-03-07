class UserOnboarding {
    constructor() {
        this.steps = [
            {
                title: "Welcome to ChefAtHome!",
                description: "Let's get you started on your cooking journey.",
                action: this.showNextStep.bind(this)
            },
            {
                title: "Explore the App",
                description: "Discover interactive lessons designed for beginners.",
                action: this.showNextStep.bind(this)
            },
            {
                title: "Track Your Progress",
                description: "Keep track of your XP, streaks, and unlocked levels.",
                action: this.showNextStep.bind(this)
            },
            {
                title: "Start Cooking!",
                description: "Begin your first lesson and enjoy cooking.",
                action: this.finishOnboarding.bind(this)
            }
        ];
        this.currentStep = 0;
        this.showCurrentStep();
    }

    showCurrentStep() {
        const step = this.steps[this.currentStep];
        console.log(step.title);
        console.log(step.description);
        // Here you could implement UI elements to show the step in the app
    }

    showNextStep() {
        this.currentStep++;
        if (this.currentStep < this.steps.length) {
            this.showCurrentStep();
        } else {
            this.finishOnboarding();
        }
    }

    finishOnboarding() {
        console.log("Onboarding complete! Enjoy your cooking journey.");
        // Here you could implement logic to hide the onboarding UI
    }
}

// Example usage
const onboarding = new UserOnboarding();