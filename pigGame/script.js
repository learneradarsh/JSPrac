'use strict';

const playerOneScorePlaceholder = document.querySelector('#score--0');
const playerTwoScorePlaceholder = document.querySelector('#score--1');
const playerOneCurrentScorePlaceholder = document.querySelector('#current--0');
const playerTwoCurrentScorePlaceholder = document.querySelector('#current--1');
const playerOneSection = document.querySelector('.player--0');
const playerTwoSection = document.querySelector('.player--1');
const imageSrcList = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];

const playerOneScore = {
  finalScore: 0,
  currentScore: 0,
};

const playerTwoScore = {
  finalScore: 0,
  currentScore: 0,
};

startNewGame();

function updatePlayerOneScore() {
  playerOneScore.finalScore += playerOneScore.currentScore;
  playerOneScore.currentScore = 0;
  playerOneScorePlaceholder.textContent = playerOneScore.finalScore;
  playerOneCurrentScorePlaceholder.textContent = playerOneScore.currentScore;
}

function updatePlayerTwoScore() {
  playerTwoScore.finalScore += playerTwoScore.currentScore;
  playerTwoScore.currentScore = 0;
  playerTwoScorePlaceholder.textContent = playerTwoScore.finalScore;
  playerTwoCurrentScorePlaceholder.textContent = playerTwoScore.currentScore;
}

function togglePlayer() {
  if (playerOneSection.classList.contains('player--active')) {
    playerTwoSection.classList.add('player--active');
    playerOneSection.classList.remove('player--active');
  } else {
    playerOneSection.classList.add('player--active');
    playerTwoSection.classList.remove('player--active');
  }
}

function startNewGame() {
  playerOneScore.finalScore = 0;
  playerOneScore.currentScore = 0;
  playerTwoScore.finalScore = 0;
  playerTwoScore.currentScore = 0;
  playerOneCurrentScorePlaceholder.textContent = playerOneScore.currentScore;
  playerTwoCurrentScorePlaceholder.textContent = playerTwoScore.currentScore;
  playerOneScorePlaceholder.textContent = playerOneScore.finalScore;
  playerTwoScorePlaceholder.textContent = playerTwoScore.finalScore;
}

function hasDiceReturnedOne(item) {
  return imageSrcList.indexOf(item) === 0;
}

function rollTheDice() {
  const randomIndex = Math.trunc(Math.random() * 6);
  document.querySelector('.dice').src = `${imageSrcList[randomIndex]}`;
  if (hasDiceReturnedOne(imageSrcList[randomIndex])) {
    hold();
  }
  if (playerOneSection.classList.contains('player--active')) {
    playerOneScore.currentScore++;
    playerOneCurrentScorePlaceholder.textContent = playerOneScore.currentScore;
  } else {
    playerTwoScore.currentScore++;
    playerTwoCurrentScorePlaceholder.textContent = playerTwoScore.currentScore;
  }
}

function hold() {
  if (playerOneSection.classList.contains('player--active')) {
    updatePlayerOneScore();
  } else {
    updatePlayerTwoScore();
  }
  togglePlayer();
}

document.querySelector('.btn--roll').addEventListener('click', rollTheDice);
document.querySelector('.btn--new').addEventListener('click', startNewGame);
document.querySelector('.btn--hold').addEventListener('click', hold);
