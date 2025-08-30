// Food data
import foods from "./foodList.js";

// Upper Screen selectors
const upperScreen = document.querySelector('.upper-screen');
const title = document.querySelector('.title');
const captions = document.querySelector('.captions');
const imagePrompt = document.querySelector('.image-prompt');

// Lower Screen
const lowerScreen = document.querySelector('.lower-screen');
const optionsDiv = document.querySelector('.options-div');
const startBtn = document.querySelector('.start-button');
const nextBtn = document.querySelector('.next-button');

// Variables
let score = 0;
let prompts = [];

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', setImage);
nextBtn.style.display = 'none';

// Functions
function startGame() {
    // Generate list of 5 random food items
    let i = 0;
    while (i < 5) {
        // Pick 5 random numbers from 57 total options
        let randomNumber = Math.floor(Math.random() * 58);
        let randomPrompt = `images/foods/item_Food${foods[randomNumber][0]}.png`;
        prompts.push(randomPrompt);
        i++;
    }
    setImage();
    startBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

function setImage() {
    // Once all 5 have been shown, game ends
    if (prompts.length == 0) {
        showScore();
        return;
    }
    // Set imagePrompt to first image option
    imagePrompt.src = prompts[0];
    // Remove prompt from array
    prompts.shift();
}

function showScore() {
    // Show score on upper screen
    upperScreen.innerHTML = `yahoo${score}`;
    // Replay button on lower screen
    nextBtn.style.display = 'none';
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
