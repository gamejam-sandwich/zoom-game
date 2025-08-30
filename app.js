// Food data
import foods from "./foodList.js";

// Upper Screen selectors
const upperScreen = document.querySelector('.upper-screen');
const captions = document.querySelector('.captions');
const imagePrompt = document.querySelector('.image-prompt');

// Lower Screen
const lowerScreen = document.querySelector('.lower-screen');
const optionsDiv = document.querySelector('.options-div');
const startBtn = document.querySelector('.start-button');
const nextBtn = document.querySelector('.next-button');

// Variables
let score = 0;
let answerIndex = 0;
let randomNumber = Math.floor(Math.random() * 58);
let answers = [];
let prompts = [];


startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', setImage);
nextBtn.style.display = 'none';

// Functions
function startGame() {
    // Generate list of 5 random food items
    while (prompts.length < 5) {
        // Pick 5 random numbers from 57 total options
        let randomPrompt = `images/foods/item_Food${foods[randomNumber][0]}.png`;
        // Regenerate if duplicates present
        while (prompts.includes(randomPrompt)) {
            randomNumber = Math.floor(Math.random() * 58);
            randomPrompt = `images/foods/item_Food${foods[randomNumber][0]}.png`;
        }
        prompts.push(randomPrompt);
        answers.push(randomNumber);
    }
    setImage();
    startBtn.style.display = 'none';
}

function setImage() {
    nextBtn.style.display = 'none';
    captions.innerText = 'What is this object?';
    imagePrompt.style.scale = 5;

    // Once all 5 have been shown, game ends
    if (prompts.length == 0) {
        showScore();
        return;
    }
    // Set imagePrompt to first image option
    imagePrompt.src = prompts[0];
    // Remove used prompt from array
    prompts.shift();

    // Generating 2 random options (predetermined option is the answer)
    optionsDiv.innerHTML = '';
    optionsDiv.className = 'options-div';

    let optionsArray = [answers[0]];
    answerIndex = answers[0];
    answers.shift();
    for (let i = 0; i < 2; i++) {
        // Again, regen if dupes present
        while (optionsArray.includes(randomNumber)) {
            randomNumber = Math.floor(Math.random() * 58);
        }
        optionsArray.push(randomNumber);
        shuffle(optionsArray);
    }

    // Create 3 buttons with values from optionsArray
    for (let i = 0; i < optionsArray.length; i++) {
        const optionBtn = document.createElement('button');
        let randomOption = foods[optionsArray[i]][1];
        optionBtn.innerText = randomOption;
        optionBtn.className = 'option-button';
        optionsDiv.appendChild(optionBtn);
        optionBtn.addEventListener('click', checkAnswer);
    }
}

/* Randomize the order of the array,
*  ensuring the answer option does not
*  remain in the same location
*/
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Animations
const restoreZoom = [
    { scale: 5 },
    { scale: 1 }
];

const zoomTiming = {
    duration: 1000,
    iterations: 1
}

// Verify if selected option is correct
function checkAnswer(event) {
    const selectedOption = event.target;
    let answer = foods[answerIndex][1];
    // Prevent user from spamming answer buttons
    optionsDiv.className = 'disabled-btns';

    // Zoom out to reveal answer, update score
    const animation = imagePrompt.animate(restoreZoom, zoomTiming);
    animation.onfinish = () => {
        imagePrompt.style.scale = 1;
        if (selectedOption.innerText === answer) {
            captions.innerText = 'Correct!';
            score++;
        }
        else {
            captions.innerText = `Womp womp. It was ${answer}.`;
        }
        nextBtn.style.display = 'block';
    };
}

function showScore() {
    // Show score on upper screen
    upperScreen.innerHTML = `yahoo${score}`;
    // Replay button on lower screen
    nextBtn.style.display = 'none';
    optionsDiv.innerHTML = '';

    const replayBtn = document.createElement('button');
    replayBtn.innerText = 'Play again?';
    replayBtn.className = 'start-button';
    lowerScreen.appendChild(replayBtn);
    replayBtn.addEventListener('click', resetGame);
}

function resetGame() {
    score = 0;
    location.reload();
}
