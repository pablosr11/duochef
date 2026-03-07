// Implement Additional MVP Lessons

class AdditionalMVPLessons {
    constructor() {
        this.lessons = [];
    }

    addLesson(lesson) {
        this.lessons.push(lesson);
    }

    getLessons() {
        return this.lessons;
    }
}

// Example lessons
const additionalLessons = new AdditionalMVPLessons();
additionalLessons.addLesson({id: 3, title: 'Chopping Vegetables', content: 'Learn how to chop vegetables safely and efficiently.'});
additionalLessons.addLesson({id: 4, title: 'Boiling Pasta', content: 'Master the art of boiling pasta perfectly.'});
additionalLessons.addLesson({id: 5, title: 'Basic Seasoning', content: 'Understand the basics of seasoning your dishes.'});

console.log(additionalLessons.getLessons());