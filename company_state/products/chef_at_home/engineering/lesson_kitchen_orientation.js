// Kitchen Orientation Lesson

class KitchenOrientation {
    constructor() {
        this.tools = ['knife', 'cutting board', 'pot', 'pan'];
        this.safetyTips = ['Always cut away from yourself', 'Keep knives sharp', 'Use a cutting board'];
    }

    displayTools() {
        console.log('Tools needed for this lesson:');
        this.tools.forEach(tool => console.log(tool));
    }

    displaySafetyTips() {
        console.log('Safety Tips:');
        this.safetyTips.forEach(tip => console.log(tip));
    }
}