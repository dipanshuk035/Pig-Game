"use strict";
const diceEl = document.querySelector(".dice");
let activePlayer = 0,
  deactivePlayer = 1;
diceEl.classList.add("hidden");

document.querySelector(".change-Names").addEventListener("click", function () {
  document.querySelector(".players-Information").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
  document.querySelector(".close-btn").classList.remove("hidden");
});

let player1Name, player2Name;
function playersName() {
  document.querySelector("#name--0").textContent = player1Name;
  document.querySelector("#name--1").textContent = player2Name;
}
function playersInformationClose() {
  document.querySelector(".players-Information").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
}
document.querySelector(".close-btn").addEventListener("click", function () {
  playersInformationClose();
});
document.querySelector("#submit").addEventListener("click", function () {
  player1Name = document.querySelector("#player1-Name").value || "Player1";
  player2Name = document.querySelector("#player2-Name").value || "Player2";
  playersInformationClose();
  playersName();
});

const switchPlyer = function () {
  document
    .querySelector(`.player--${deactivePlayer}`)
    .classList.add("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  let swap = activePlayer;
  activePlayer = deactivePlayer;
  deactivePlayer = swap;
};

let currentScore = 0,
  totalScore = 0;
function rollingDice() {
  if (totalScore >= 100) {
    return;
  } else {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNumber}.png`;
    if (randomNumber == 1) {
      switchPlyer();
    } else {
      currentScore = Number(
        document.querySelector(`#current--${activePlayer}`).textContent
      );
      currentScore += randomNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
}

function holdingDice() {
  totalScore = Number(
    document.querySelector(`#score--${activePlayer}`).textContent
  );
  if (totalScore >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    return;
  } else {
    totalScore += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScore;
    if (totalScore >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document.querySelector(`#name--${activePlayer}`).textContent = "WINNER";
      return;
    }
    switchPlyer();
  }
  currentScore = 0;
}
document.querySelector(".btn--roll").addEventListener("click", rollingDice);

document.querySelector(".btn--hold").addEventListener("click", holdingDice);

document.querySelector(".btn--new").addEventListener("click", function () {
  playersName();
  currentScore = 0;
  totalScore = 0;
  document.querySelector("#current--0").textContent = currentScore;
  document.querySelector("#current--1").textContent = currentScore;
  document.querySelector("#score--0").textContent = totalScore;
  document.querySelector("#score--1").textContent = totalScore;
  diceEl.classList.add("hidden");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  if (activePlayer == 1) switchPlyer();
});

document.addEventListener("keydown", function (pressedKey) {
  if (
    pressedKey.key == "ArrowUp" ||
    pressedKey.key == "ArrowDown" ||
    pressedKey.key == "ArrowLeft" ||
    pressedKey.key == "ArrowRight"
  ) {
    rollingDice();
  } else if (pressedKey.key == "Enter") {
    holdingDice();
  }
});
