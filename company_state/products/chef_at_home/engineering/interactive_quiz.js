const quizQuestions = [
    {
        question: 'What is the first step in boiling water?',
        options: ['Fill a pot with water', 'Put the pot on the stove', 'Turn on the heat'],
        answer: 'Fill a pot with water'
    },
    {
        question: 'What is the purpose of salting water?',
        options: ['To make it taste better', 'To prevent boiling over', 'To cook faster'],
        answer: 'To make it taste better'
    },
    {
        question: 'How do you know when water is boiling?',
        options: ['It starts to bubble', 'It turns blue', 'It makes a whistling sound'],
        answer: 'It starts to bubble'
    }
];

function startQuiz() {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const userAnswer = prompt(q.question + '\n' + q.options.join('\n'));
        if (userAnswer === q.answer) {
            score++;
            alert('Correct!');
        } else {
            alert('Wrong! The correct answer is: ' + q.answer);
        }
    });
    alert('Your score is: ' + score + '/' + quizQuestions.length);
}

startQuiz();