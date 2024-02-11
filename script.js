const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the capital of INdia?",
        options: ["Paris", "London", "Delhi", "Rome"],
        answer: "Delhi"
    },
    {
        question: "What is the capital of pakistan?",
        options: ["Paris", "Islamabad", "Berlin", "Rome"],
        answer: "Islamabad"
    },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
let timer; // Timer variable

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const startButton = document.getElementById('start-btn');
const submitButton = document.getElementById('submit-btn');
const timerDisplay = document.getElementById('time');

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    submitButton.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
    loadQuestion();
}

function updateTimer() {
    const timeDisplay = document.getElementById('time');
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 1 ? '0' + seconds : seconds;
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (timeLeft === 0) {
        clearInterval(timer);
        finishQuiz();
    } else {
        timeLeft--;
    }
}

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', selectOption);
        optionsElement.appendChild(button);
    });
}

function selectOption(e) {
    const selectedOption = e.target.innerText;
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    clearInterval(timer);
    document.getElementById('question-container').style.display = 'none';
    submitButton.style.display = 'none';
    resultElement.style.display = 'block';
    resultElement.innerText = `You scored ${score}/${quizData.length}`;
}

let timeLeft = 60; // 10 minutes in seconds
