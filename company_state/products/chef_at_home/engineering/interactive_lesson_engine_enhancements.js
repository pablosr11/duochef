// Enhancements to the Interactive Lesson Engine based on user feedback

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
            this.displayLesson(this.lessons[this.currentLessonIndex]);
        }
    }

    displayLesson(lesson) {
        console.log(`Starting lesson: ${lesson.title}`);
        // Additional logic to display lesson content
    }

    nextLesson() {
        this.currentLessonIndex++;
        if (this.currentLessonIndex < this.lessons.length) {
            this.displayLesson(this.lessons[this.currentLessonIndex]);
        } else {
            console.log('All lessons completed!');
        }
    }
}

// Example usage
const lessonEngine = new InteractiveLessonEngine();
lessonEngine.addLesson({ title: 'Boiling Water', content: '...' });
lessonEngine.startLesson();