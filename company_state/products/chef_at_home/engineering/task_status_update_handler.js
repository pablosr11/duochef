// Task Status Update Handler

class TaskStatusUpdateHandler {
    constructor() {
        this.tasks = {};
    }

    updateTaskStatus(taskId, status) {
        if (!this.tasks[taskId]) {
            throw new Error('Task not found');
        }
        this.tasks[taskId].status = status;
        return this.tasks[taskId];
    }

    addTask(taskId, task) {
        this.tasks[taskId] = task;
    }
}

// Example usage:
const handler = new TaskStatusUpdateHandler();
handler.addTask(1, { id: 1, status: 'todo' });
handler.updateTaskStatus(1, 'in_progress');
console.log(handler.tasks);