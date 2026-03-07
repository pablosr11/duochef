/**
 * ChefAtHome Lesson Engine
 *
 * This module handles the core logic for interactive cooking lessons.
 * It manages lesson steps, user interactions, timers, and progress.
 */

class LessonEngine {
  constructor(lessonData, persistenceService) {
    this.lessonData = lessonData;
    this.persistenceService = persistenceService;
    this.currentStepIndex = 0;
    this.timers = {};
    this.lessonState = 'not_started'; // not_started, in_progress, completed, failed
  }

  /**
   * Starts the lesson.
   */
  startLesson() {
    this.lessonState = 'in_progress';
    this.currentStepIndex = 0;
    console.log('Lesson started!');
    this.displayCurrentStep();
  }

  /**
   * Displays the current step of the lesson.
   */
  displayCurrentStep() {
    if (this.currentStepIndex < this.lessonData.steps.length) {
      const currentStep = this.lessonData.steps[this.currentStepIndex];
      console.log(`Step ${this.currentStepIndex + 1}: ${currentStep.instruction}`);
      // In a real app, this would update the UI

      if (currentStep.timer) {
        this.startTimer(currentStep.timer);
      }
    } else {
      this.completeLesson();
    }
  }

  /**
   * Handles a user's 'Got it' confirmation for the current step.
   */
  confirmStep() {
    if (this.lessonState === 'in_progress' && this.currentStepIndex < this.lessonData.steps.length) {
      const currentStep = this.lessonData.steps[this.currentStepIndex];
      if (currentStep.check) {
        // Perform check, e.g., user input validation, timer completion
        console.log('Checking step...');
        // For simplicity, assuming checks pass if timer is done or user confirms
        if (this.timers[currentStep.timer?.id]?.finished) {
          this.moveToNextStep();
        } else {
          console.log('Please wait for the timer or complete the required action.');
        }
      } else {
        this.moveToNextStep();
      }
    }
  }

  /**
   * Moves to the next step in the lesson.
   */
  moveToNextStep() {
    this.currentStepIndex++;
    this.displayCurrentStep();
  }

  /**
   * Starts a timer for a specific step.
   * @param {object} timerConfig - Configuration for the timer.
   */
  startTimer(timerConfig) {
    console.log(`Starting timer: ${timerConfig.duration} seconds.`);
    this.timers[timerConfig.id] = {
      duration: timerConfig.duration,
      remaining: timerConfig.duration,
      interval: setInterval(() => {
        this.timers[timerConfig.id].remaining--;
        console.log(`Timer ${timerConfig.id}: ${this.timers[timerConfig.id].remaining}s remaining`);
        if (this.timers[timerConfig.id].remaining <= 0) {
          clearInterval(this.timers[timerConfig.id].interval);
          this.timers[timerConfig.id].finished = true;
          console.log(`Timer ${timerConfig.id} finished!`);
          // Potentially trigger a check or next step automatically if applicable
        }
      }, 1000),
      finished: false
    };
  }

  /**
   * Completes the lesson.
   */
  completeLesson() {
    this.lessonState = 'completed';
    console.log('Lesson completed!');
    // Award XP, update progress, etc.
    this.persistenceService.addXP(this.lessonData.xp);
    this.persistenceService.markLessonComplete(this.lessonData.id);
  }

  /**
   * Fails the lesson (e.g., due to safety violation or repeated errors).
   */
  failLesson() {
    this.lessonState = 'failed';
    console.log('Lesson failed.');
    // Handle lesson failure, e.g., retry prompt
  }

  // Add methods for handling errors, user input, etc.
}

export default LessonEngine;
