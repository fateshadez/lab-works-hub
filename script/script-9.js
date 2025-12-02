const playerName = document.querySelector(".player-name");
const playerScore = document.querySelector(".player-score");
const playerNum = document.querySelector(".player-num");
const computerName = document.querySelector(".computer-name");
const computerScore = document.querySelector(".computer-score");
const computerNum = document.querySelector(".computer-num");
const generateRandomNumsButton = document.querySelector(
  ".generate-random-nums"
);
const drawNoti = document.querySelector(".draw-notification");
playerScore.textContent = 0;
computerScore.textContent = 0;
let timeoutId;
let winner;

// Getting player's name
const getPlayerName = () => {
  playerName.textContent = prompt("Enter your name, please!");
  if (playerName.textContent.trim() == "") {
    playerName.textContent = "Guest";
  }
};

const generateRandomNum = () => {
  return Math.floor(Math.random() * 101);
};

const gameOver = (winner) => {
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  playerNum.textContent = "";
  computerNum.textContent = "";
  alert(`${winner} is the winner!`);
};

const checkStatus = () => {
  if (playerScore.textContent == 3) {
    winner = playerName.textContent;
    gameOver(winner);
  } else if (computerScore.textContent == 3) {
    winner = computerName.textContent;
    gameOver(winner);
  }
};

const updateScore = () => {
  if (playerNum.textContent > computerNum.textContent) {
    playerScore.textContent++;
  } else if (playerNum.textContent < computerNum.textContent) {
    computerScore.textContent++;
  } else if (playerNum.textContent == computerNum.textContent) {
    drawNoti.classList.add("draw-notification-show");
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      drawNoti.classList.remove("draw-notification-show");
    }, 3100);
  }
};

setTimeout(() => {
  getPlayerName();
}, 500)
generateRandomNumsButton.addEventListener("click", () => {
  playerNum.textContent = generateRandomNum();
  computerNum.textContent = generateRandomNum();
  updateScore();
  checkStatus();
});
