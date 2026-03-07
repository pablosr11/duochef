// Refinements to the Interactive Lesson Engine based on user feedback

class InteractiveLessonEngine {
    constructor() {
        this.lessons = [];
        this.currentLesson = null;
        this.userProgress = {};
    }

    addLesson(lesson) {
        this.lessons.push(lesson);
    }

    startLesson(lessonId) {
        this.currentLesson = this.lessons.find(lesson => lesson.id === lessonId);
        if (this.currentLesson) {
            this.currentLesson.start();
        }
    }

    completeLesson() {
        if (this.currentLesson) {
            this.userProgress[this.currentLesson.id] = true;
            this.currentLesson = null;
        }
    }

    getProgress() {
        return this.userProgress;
    }
}

// Example lesson
const boilingWaterLesson = {
    id: 'boiling_water',
    title: 'Boiling Water',
    start: function() {
        console.log('Lesson started: ' + this.title);
        // Lesson logic here
    }
};

const lessonEngine = new InteractiveLessonEngine();
lessonEngine.addLesson(boilingWaterLesson);
lessonEngine.startLesson('boiling_water');

// Exporting for testing
module.exports = InteractiveLessonEngine;