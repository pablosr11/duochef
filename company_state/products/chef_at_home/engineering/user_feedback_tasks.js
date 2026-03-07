// User Feedback Tasks Implementation

class UserFeedbackTasks {
    constructor() {
        this.tasks = [];
    }

    createTask(description) {
        const newTask = { id: this.tasks.length + 1, description, completed: false };
        this.tasks.push(newTask);
        this.saveTasks();
    }

    saveTasks() {
        // Logic to save tasks data to local storage or server
        console.log('Tasks saved:', this.tasks);
    }

    getTasks() {
        return this.tasks;
    }

    completeTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            this.saveTasks();
        }
    }
}

const userFeedbackTasks = new UserFeedbackTasks();

// Example usage
userFeedbackTasks.createTask('Gather user feedback on app functionality.');
userFeedbackTasks.createTask('Analyze feedback for improvements.');
