"use strict";
//****************************** */
//All the functions
/******************************* */
const initGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;

  diceEl.classList.add("hidden");

  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;

  btnHoldEl.classList.remove("hidden");
  btnRollEl.classList.remove("hidden");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

const randomDiceRoll = function () {
  const dice = Math.floor(Math.random() * 6) + 1;
  return dice;
};

const displayElement = function (element) {
  element.classList.remove("hidden");
};

const setDiceNum = function (dice, num) {
  dice.src = `dice-imgs/dice-${num}.png`;
};

const changeActivePlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const checkDiceNum = function (diceNum, currentPlayerScore) {
  if (diceNum !== 1) {
    currentScore += diceNum;
    currentPlayerScore.textContent = currentScore;
  } else {
    //switch to next player
    currentScore = 0;
    currentPlayerScore.textContent = currentScore;
    changeActivePlayer();
  }
};

const switchPlayer = function () {
  currentScore = 0;
  changeActivePlayer();
};

const updatePlayerScore = function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

const getCurrentPlayer = function () {
  return document.getElementById(`current--${activePlayer}`);
};

const showTheWinner = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
};

const disableBtns = function () {
  btnHoldEl.classList.add("hidden");
  btnRollEl.classList.add("hidden");
};

//****************************** */
// Selecting elements and variables
//****************************** */
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const currScore0El = document.getElementById("current--0");
const currScore1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//****************************** */
// Game
//****************************** */
initGame();

//****************************** */
// Events
//****************************** */
btnRollEl.addEventListener("click", function () {
  //1. Genarating a random dice roll
  let diceNum = randomDiceRoll();

  //2.set the num in dice and display it
  setDiceNum(diceEl, diceNum);
  displayElement(diceEl);

  //3.check the dice num, upadate the current score and player
  const activePlayerEl = getCurrentPlayer();
  checkDiceNum(diceNum, activePlayerEl);
});

btnHoldEl.addEventListener("click", function () {
  // 1. add current score to active players score
  updatePlayerScore();
  diceEl.classList.toggle("hidden");
  // 2. check if players score is >= 100
  if (scores[activePlayer] >= 10) {
    showTheWinner();
    disableBtns();
  } else {
    switchPlayer();
  }
});

btnNewEl.addEventListener("click", initGame);
