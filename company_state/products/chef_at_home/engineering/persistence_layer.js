// Persistence Layer for User Progress

class PersistenceLayer {
    constructor() {
        this.storageKey = 'chefAtHomeUserProgress';
    }

    saveProgress(progress) {
        localStorage.setItem(this.storageKey, JSON.stringify(progress));
    }

    loadProgress() {
        const progress = localStorage.getItem(this.storageKey);
        return progress ? JSON.parse(progress) : {};
    }
}