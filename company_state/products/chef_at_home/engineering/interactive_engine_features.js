// Interactive Engine Features Implementation

class InteractiveEngine {
    constructor() {
        this.lessons = [];
        this.currentLesson = null;
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
            this.currentLesson.complete();
            this.currentLesson = null;
        }
    }
}

// Example Lesson Class
class Lesson {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.completed = false;
    }

    start() {
        console.log(`Starting lesson: ${this.title}`);
    }

    complete() {
        this.completed = true;
        console.log(`Completed lesson: ${this.title}`);
    }
}

// Example usage
const engine = new InteractiveEngine();
const lesson1 = new Lesson(1, 'Boiling Water');
engine.addLesson(lesson1);
engine.startLesson(1);