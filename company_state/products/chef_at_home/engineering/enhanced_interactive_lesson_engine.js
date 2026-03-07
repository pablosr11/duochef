// Enhanced Interactive Lesson Engine

class InteractiveLessonEngine {
    constructor() {
        this.lessons = [];
        this.currentLessonIndex = 0;
    }

    addLesson(lesson) {
        this.lessons.push(lesson);
    }

    startLesson() {
        if (this.lessons.length > 0) {
            this.currentLessonIndex = 0;
            this.runLesson(this.lessons[this.currentLessonIndex]);
        }
    }

    runLesson(lesson) {
        console.log(`Starting lesson: ${lesson.title}`);
        // Logic to run the lesson
    }

    nextLesson() {
        if (this.currentLessonIndex < this.lessons.length - 1) {
            this.currentLessonIndex++;
            this.runLesson(this.lessons[this.currentLessonIndex]);
        } else {
            console.log('All lessons completed!');
        }
    }
}

// Example usage
const lessonEngine = new InteractiveLessonEngine();
lessonEngine.addLesson({ title: 'Boiling Water' });
lessonEngine.startLesson();