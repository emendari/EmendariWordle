const words = ["gland", "liver", "brain", "veins", "cells", "heart"]; // Add your medical terms here

// Function to get the word of the day based on the current date
function getWordOfTheDay() {
  const startDate = new Date('2023-01-01'); // Starting date for your word list
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return words[daysSinceStart % words.length];
}

const answer = getWordOfTheDay();
let attempts = 0;
let currentGuess = '';
const maxAttempts = 6;
const board = document.getElementById('board');
const message = document.getElementById('message');
const keyboard = document.getElementById('keyboard');

function createBoard() {
  for (let i = 0; i < 30; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    board.appendChild(tile);
  }
}

function handleKeyClick(event) {
  const key = event.target.textContent;
  if (key === 'Enter') {
    checkGuess();
  } else if (key === 'Del') {
    currentGuess = currentGuess.slice(0, -1);
    updateInput();
  } else if (currentGuess.length < 5) {
    currentGuess += key.toLowerCase();
    updateInput();
  }
}

function updateInput() {
  const tiles = document.querySelectorAll('.tile');
  for (let i = 0; i < 5; i++) {
    tiles[(attempts * 5) + i].textContent = currentGuess[i] || '';
  }
}

function checkGuess() {
  if (currentGuess.length !== 5) {
    alert('Please enter a 5-letter word');
    return;
  }
  attempts++;
  updateBoard();
  updateKeyboard();
  if (currentGuess === answer) {
    message.textContent = 'Congratulations! You guessed the word!';
    disableKeyboard();
  } else if (attempts === maxAttempts) {
    message.textContent = `Sorry, you've run out of attempts! The word was ${answer}.`;
    disableKeyboard();
  }
  currentGuess = '';
  updateInput();
}

function updateBoard() {
  const tiles = document.querySelectorAll('.tile');
  for (let i = 0; i < 5; i++) {
    const tile = tiles[((attempts - 1) * 5) + i];
    tile.textContent = currentGuess[i];
    if (currentGuess[i] === answer[i]) {
      tile.classList.add('green');
    } else if (answer.includes(currentGuess[i])) {
      tile.classList.add('yellow');
    } else {
      tile.classList.add('gray');
    }
  }
}

function updateKeyboard() {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    const letter = key.textContent.toLowerCase();
    if (currentGuess.includes(letter)) {
      if (answer.includes(letter)) {
        if (answer.indexOf(letter) === currentGuess.indexOf(letter)) {
          key.classList.remove('yellow', 'gray');
          key.classList.add('green');
        } else {
          if (!key.classList.contains('green')) {
            key.classList.remove('gray');
            key.classList.add('yellow');
          }
        }
      } else {
        key.classList.add('gray');
      }
    }
  });
}

function createKeyboard() {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.addEventListener('click', handleKeyClick);
  });
}

function disableKeyboard() {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.removeEventListener('click', handleKeyClick);
  });
}

createBoard();
createKeyboard();
