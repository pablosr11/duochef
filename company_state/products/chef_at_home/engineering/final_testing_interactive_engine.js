// Final Testing for Interactive Engine

// This script conducts final tests to ensure the interactive engine is fully functional before the MVP launch.

function runFinalTests() {
    // Test cases for the interactive engine
    console.log('Running final tests for the interactive engine...');

    // Test 1: Check if the engine initializes correctly
    const engine = new InteractiveEngine();
    console.assert(engine.isInitialized() === true, 'Engine should be initialized.');

    // Test 2: Check if user progress is tracked correctly
    engine.startLesson(1);
    engine.completeStep(1);
    console.assert(engine.getUserProgress() === 1, 'User progress should be 1 after completing step 1.');

    // Test 3: Check if the skill tree navigation works
    const skillTree = engine.getSkillTree();
    console.assert(skillTree.length > 0, 'Skill tree should contain lessons.');

    console.log('Final tests completed.');
}

runFinalTests();