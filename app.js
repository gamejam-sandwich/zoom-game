/*// Selectors
const questionDiv = document.querySelector('.question');
const optionsDiv = document.querySelector('.options');
const startBtn = document.querySelector('.start');
const quizDiv = document.querySelector('.quiz');

// Variables
let currentIndex = 0;
let score = 0;
const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Madrid', 'Rome', 'Berlin'],
        answer: 'Paris'
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Mars', 'Saturn', 'Jupiter', 'Earth'],
        answer: 'Jupiter'
    },
    {
        question: 'Which month is National Ice Cream Month?',
        options: ['January', 'July', 'September', 'August'],
        answer: 'July'
    },
    {
        question: 'How many legs do lobster have?',
        options: ['10', '4', '8', '12'],
        answer: '10'
    },
];

startBtn.addEventListener('click', showQuestion);

// Functions
function showQuestion() {
    startBtn.style.display = 'none';
    const currentQuestion = quizData[currentIndex];
    questionDiv.innerText = currentQuestion.question;

    optionsDiv.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.innerText = option;
        optionsDiv.appendChild(optionBtn);
        optionBtn.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const answer = quizData[currentIndex].answer;

    if (selectedBtn.innerText === answer) {
        score++;
    }

    currentIndex++;

    if (currentIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizDiv.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${quizData.length}
    `;
    const restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play again?';
    quizDiv.appendChild(restartBtn);
    restartBtn.addEventListener('click', replay);
}

function replay() {
    score = 0;
    currentIndex = 0;
    location.reload();
}
*/

// Selectors
const boxDiv = document.querySelector('.quiz-area');
const imageDiv = document.querySelector('.the-object');
const zoomImg = document.querySelector('.zoom-image');
const optionsDiv = document.querySelector('.options');
const startBtn = document.querySelector('.start');

// Variables
let currentIndex = 0;
let score = 0;
const imgData = [
    {
        imgSrc: 'images/steve.jpg',
        options: ['Sky', 'Ocean', 'Hedgehog', 'Jello'],
        answer: 'Hedgehog',
    },
    {
        imgSrc: 'images/dog.jpg',
        options: ['Q-Tip', 'Pillow', 'Dog', 'Rug'],
        answer: 'Dog',
    },
    {
        imgSrc: 'images/kermit.jpg',
        options: ['Frog', 'Sock', 'T-Shirt', 'Grass'],
        answer: 'Frog',
    }
];

startBtn.addEventListener('click', showImage);

// Functions
function showImage() {
    startBtn.style.display = 'none';
    zoomImg.style.scale = 5;
    const currentImage = imgData[currentIndex];
    zoomImg.innerHTML = currentImage.imgSrc;

    currentImage.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.innerText = option;
        boxDiv.appendChild(optionBtn);
        optionBtn.addEventListener('click', selectAnswer);
    })
}

// Animation stuff
const restoreZoom = [
    { scale: 5 },
    { scale: 1 },
];

const zoomTiming = {
    duration: 2000,
    iterations: 1,
}

// Choosing an answer
function selectAnswer(event) {
    const selectedBtn = event.target;
    const answer = imgData[currentIndex].answer;

    const animation = zoomImg.animate(restoreZoom, zoomTiming);
    animation.onfinish = () => {
        zoomImg.style.scale = 1;
    };

    if (selectedBtn.innerText === answer) {
        score++;
    }

    currentIndex++;
    if (currentIndex < imgData.length) {
        showImage();
    } else {
        showScore();
    }
}

// End of game
function showScore() {
    gameDiv.innerHTML = `
    <h1>Game Finished!</h1>
    <p>Your Score: ${score}/${imgData.length}
    `;
    const restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play again?';
    gameDiv.appendChild(restartBtn);
    restartBtn.addEventListener('click', replay);
}

function replay() {
    score = 0;
    currentIndex = 0;
    location.reload();
}
