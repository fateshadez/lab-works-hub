// DOM variables
const playerName = document.querySelector(".player-name");
const playerScore = document.querySelector(".player-score");
const playerCard = document.querySelector(".player-card");
const computerName = document.querySelector(".computer-name");
const computerScore = document.querySelector(".computer-score");
const computerCard = document.querySelector(".computer-card");
const winnerNoti = document.querySelector(".winner-noti");
const generateRandomNumsButton = document.querySelector(
  ".generate-random-nums"
);
const attemptCount = document.querySelector(".attempt-count");
const drawNoti = document.querySelector(".draw-notification");

// Other variables
const maxAttempts = 3;
playerScore.textContent = 0;
computerScore.textContent = 0;
const nums = [2, 3, 4, 6, 7, 8, 9, 10, 11];
let timeoutIdWin;
let timeoutIdUpd;
let winner;
let attempts = 0;
let intermission = false;
const cardMap = {
  2: "jack",
  3: "queen",
  4: "king",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "ace",
};
let playerCardNum;
let computerCardNum;
let playerTotalScore = 0;
let computerTotalScore = 0;
let cardSuits = ["spades", "hearts", "clubs", "diamonds"];
let cardVariants = ["", "2"];

// Get random card suit
const getRandomCardSuit = () => {
  return cardSuits[Math.floor(Math.random() * cardSuits.length)];
};

// Get random card variant for those cards which have it
const getRandomVariant = () => {
  return cardVariants[Math.floor(Math.random() * cardVariants.length)];
};

let randomCardSuit = getRandomCardSuit();
let randomVariant = getRandomVariant();

// Getting player's name
const getPlayerName = () => {
  playerName.textContent = prompt("Enter your name, please!");
  if (playerName.textContent.trim() == "") {
    playerName.textContent = "Guest";
  }
};

const generateRandomNum = () => {
  return nums[Math.floor(Math.random() * nums.length)];
};

const pickACard = (elem, num) => {
  if (num === 2 || num === 3 || num === 4) {
    elem.style.backgroundImage = `url(../imgs/cards/${cardMap[num]}_of_${randomCardSuit}${randomVariant}.png)`;
  } else {
    elem.style.backgroundImage = `url(../imgs/cards/${cardMap[num]}_of_${randomCardSuit}.png)`;
  }
};

// Reset the data for the new round
const resetData = () => {
  playerCardNum = 0;
  computerCardNum = 0;
  playerTotalScore = 0;
  computerTotalScore = 0;
  attempts = 0;
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  attemptCount.textContent = `${attempts} attempts out of ${maxAttempts}`;
};

// Game over message
const gameOver = (winner) => {
  intermission = true;
  if (winner == "Draw!") {
    winnerNoti.textContent = winner;
  } else {
    winnerNoti.textContent = `${winner} is the winner!`;
  }
  winnerNoti.classList.add("show");
  clearTimeout(timeoutIdWin);
  timeoutIdWin = setTimeout(() => {
    winnerNoti.classList.remove("show");
    intermission = false;
    resetData();
  }, 3100);
};

// Main scenarios checks
const updateGameStatus = () => {
 if (attempts === maxAttempts) {
  const playerTotalScore = Number(playerScore.textContent);
  const computerTotalScore = Number(computerScore.textContent);
  if (playerTotalScore > 21 && computerTotalScore <= 21) {
    winner = computerName.textContent;
  } else if (computerTotalScore > 21 && playerTotalScore <= 21) {
    winner = playerName.textContent;
  } else if (playerTotalScore > 21 && computerTotalScore > 21) {
    if (playerTotalScore < computerTotalScore) {
      winner = playerName.textContent;
    } else if (computerTotalScore < playerTotalScore) {
      winner = computerName.textContent;
    } else {
      winner = "Draw!";
    }
  } else if (playerTotalScore <= 21 && computerTotalScore <= 21) {
    if (playerTotalScore > computerTotalScore) {
      winner = playerName.textContent;
    } else if (computerTotalScore > playerTotalScore) {
      winner = computerName.textContent;
    } else {
      winner = "Draw!";
    }
  } 
  gameOver(winner);
  winner = "";
}

};

// Update score
const updateScore = () => {
  playerTotalScore += playerCardNum;
  computerTotalScore += computerCardNum;
  playerScore.textContent = playerTotalScore;
  computerScore.textContent = computerTotalScore;
};

// Update attempts
const updateAttempts = () => {
  attempts++;
  attemptCount.textContent = `${attempts} attempts out of ${maxAttempts}`;
};

// Main game loop
const gameLoop = () => {
  if (!intermission) {
    playerCardNum = generateRandomNum();
    computerCardNum = generateRandomNum();
    pickACard(playerCard, playerCardNum);
    pickACard(computerCard, computerCardNum);
    updateAttempts();
    updateScore();
    updateGameStatus();
  }
};
setTimeout(() => {
  getPlayerName();
}, 500)
generateRandomNumsButton.addEventListener("click", () => {
  gameLoop();
});
