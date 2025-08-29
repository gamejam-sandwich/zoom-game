// Upper Screen selectors
const upperScreen = document.querySelector('.upper-screen');
const title = document.querySelector('.title');
const captions = document.querySelector('.captions');
// Lower Screen
const lowerScreen = document.querySelector('.quiz-screen')
const optionsDiv = document.querySelector('.options-div');
const startBtn = document.querySelector('.start-button');
const nextBtn = document.querySelector('.next-button');

// Variables
let index = 0;
let score = 0;

// Image data
//Use JSON file and fetch
//Readable stream
//Big array

startBtn.addEventListener('click', startGame);

function startGame() {
    alert('game start');
}
