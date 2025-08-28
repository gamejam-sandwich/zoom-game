// Upper Screen selectors
const upperScreen = document.querySelector('upper-screen');
const title = document.querySelector('.title');
const captions = document.querySelector('.captions');
// Lower Screen
const lowerScreen = document.querySelector('quiz-screen')
const optionsDiv = document.querySelector('options-div');
const startBtn = document.querySelector('start-button');
const nextBtn = document.querySelector('next-button');

startBtn.addEventListener('click', startGame);
function startGame() {
    alert('ui');
    nextBtn.style.display = 'none';
}
