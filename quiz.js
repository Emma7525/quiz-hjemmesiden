const quizQuestions = [
    {
        question: "Hvad er den gennemsnitlige alder, hvor unge i Danmark første gang prøver at drikke alkohol?",
        answers: [
            { text: "12 år", correct: false },
            { text: "17 år", correct: false },
            { text: "14 år", correct: true },
            { text: "18 år", correct: false }
        ]
    },
    {
        question: "Hvor mange unge føler sig presset til at drikke ca.",
        answers: [
            { text: "54%", correct: true },
            { text: "20%", correct: false },
            { text: "86%", correct: false },
            { text: "37%", correct: false }
        ]
    },
    {
        question: "Hvor mange unge drikker alkohol på ugentlig base ca?",
        answers: [
            { text: "40%", correct: false },
            { text: "25%", correct: true },
            { text: "5%", correct: false },
            { text: "32%", correct: false }
        ]
    },
    {
        question: "Hvor mange unge dør hver månede grundet alkohol?",
        answers: [
            { text: "Ingen", correct: false },
            { text: "1", correct: true },
            { text: "4", correct: false },
            { text: "2", correct: false }
        ]
    },
    {
        question: "Hvilken procentdel af danske unge har prøvet at være fulde inden de fylder 16 år?",
        answers: [
            { text: "20%", correct: false },
            { text: "8%", correct: false },
            { text: "50%", correct: true },
            { text: "75%", correct: false }
        ]
    },
    {
        question: "hvor mange unge vil have drik kultur hvor det okay at sige nej?",
        answers: [
            { text: "34%", correct: false },
            { text: "15%", correct: false },
            { text: "88%", correct: true },
            { text: "56%", correct: false }
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
