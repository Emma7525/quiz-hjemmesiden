const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "F. Scott Fitzgerald", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Which element does the chemical symbol 'O' represent?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Oxygen", correct: true },
            { text: "Silver", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('question-number').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
    showQuestion(currentQuestionIndex);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progress + '%';
}

function showQuestion(questionIndex) {
    const questionContainer = document.getElementById('question-container');
    const questionNumber = document.getElementById('question-number');
    questionContainer.innerHTML = '';
    questionNumber.textContent = `Question ${questionIndex + 1}/${quizQuestions.length}`;

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = quizQuestions[questionIndex].question;
    questionContainer.appendChild(questionElement);

    const answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-container');

    quizQuestions[questionIndex].answers.forEach(answer => {
        const answerElement = document.createElement('button');
        answerElement.classList.add('answer');
        answerElement.textContent = answer.text;
        answerElement.onclick = () => selectAnswer(answerElement, answer.correct);
        answerContainer.appendChild(answerElement);
    });

    questionContainer.appendChild(answerContainer);
    document.getElementById('next-button').style.display = 'none';
}

function selectAnswer(element, isCorrect) {
    const question = quizQuestions[currentQuestionIndex];
    const answerElements = document.querySelectorAll('.answer');

    if (isCorrect) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('wrong');
        answerElements.forEach(button => {
            const answerText = button.textContent;
            const correctAnswer = question.answers.find(answer => answer.correct && answer.text === answerText);
            if (correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    answerElements.forEach(button => {
        button.onclick = null;
    });

    document.getElementById('next-button').style.display = 'block';
    updateProgressBar();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.style.display = 'none';

    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.textContent = `You scored ${score} out of ${quizQuestions.length}`;

    document.getElementById('next-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('progress-bar').style.width = '0%';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').style.display = 'block';
});
