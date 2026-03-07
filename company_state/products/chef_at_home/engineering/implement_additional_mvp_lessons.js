// Implement Additional MVP Lessons

class AdditionalMVPLessons {
    constructor() {
        this.lessons = [];
    }

    addLesson(lesson) {
        this.lessons.push(lesson);
    }

    startLessons() {
        this.lessons.forEach(lesson => {
            console.log(`Starting lesson: ${lesson.title}`);
            lesson.start();
        });
    }
}

// Example lessons
const boilingPasta = {
    title: 'Boiling Pasta',
    start: () => console.log('Lesson on boiling pasta started!')
};

const choppingVegetables = {
    title: 'Chopping Vegetables',
    start: () => console.log('Lesson on chopping vegetables started!')
};

const additionalLessons = new AdditionalMVPLessons();
additionalLessons.addLesson(boilingPasta);
additionalLessons.addLesson(choppingVegetables);
additionalLessons.startLessons();