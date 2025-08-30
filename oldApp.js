// Selectors
const boxDiv = document.querySelector('.quiz-area');
const zoomImg = document.querySelector('.zoom-image');
const optionsDiv = document.querySelector('.options');
const startBtn = document.querySelector('.start-button');

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
    zoomImg.src = currentImage.imgSrc;

    optionsDiv.innerHTML = '';
    currentImage.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.innerText = option;
        optionsDiv.appendChild(optionBtn);
        optionBtn.addEventListener('click', selectAnswer);
    })
}

// Animation stuff
const restoreZoom = [
    { scale: 5 },
    { scale: 1 },
];

const zoomTiming = {
    duration: 1000,
    iterations: 1,
}

// Choosing an answer
function selectAnswer(event) {
    const selectedBtn = event.target;
    const answer = imgData[currentIndex].answer;

    const animation = zoomImg.animate(restoreZoom, zoomTiming);
    animation.onfinish = () => {
        zoomImg.style.scale = 1;
        if (selectedBtn.innerText === answer) {
            score++;
        }
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next ->';
        nextBtn.className = 'start';
        navDiv.appendChild(nextBtn);
        nextBtn.addEventListener('click', showNext);
    };
}

function showNext() {
    navDiv.innerHTML = '';
    currentIndex++;
    if (currentIndex < imgData.length) {
        showImage();
    } else {
        showScore();
    }
}

// End of game
function showScore() {
    boxDiv.innerHTML = `
    <h1>Game Finished!</h1>
    <p>Your Score: ${score}/${imgData.length}
    `;
    const restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play again?';
    boxDiv.appendChild(restartBtn);
    restartBtn.addEventListener('click', replay);
}

function replay() {
    score = 0;
    currentIndex = 0;
    location.reload();
}