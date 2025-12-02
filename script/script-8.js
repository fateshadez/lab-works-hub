const createElement = (tag, parent, className, id, text) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (id) el.id = id;
  if (text) el.textContent = text;
  parent.appendChild(el);
  return el;
};

const gridItems = [];
const firstRow = [];
const secondRow = [];
const thirdRow = [];
const imgPool = {
  symbol0: 'url("../assets/imgs/slot-symbol1.png")',
  symbol1: 'url("../assets/imgs/slot-symbol2.png")',
  symbol2: "url('../assets/imgs/slot-symbol3.png')",
  symbol3: "url('../assets/imgs/slot-symbol4.png')",
};

const getRandomSymbol = () => {
  return imgPool[`symbol${Math.floor(Math.random() * 4)}`];
};

const container = document.querySelector(".grid-container");
const username = document.querySelector(".username");
const score = document.querySelector(".score");
const playBtn = document.querySelector(".play-btn");
const endgameMsg = document.querySelector(".game-over");
let temp;

// Create the grid of slots
const fillGrid = () => {
  for (let i = 0; i < 9; i++) {
    gridItems[i] = createElement("div", container, `item-${i}`, null);
    gridItems[i].classList.add("grid-item");

    const row = Math.floor(i / 3);
    const col = i % 3;

    if (row === 0) {
      firstRow[col] = gridItems[i];
    } else if (row === 1) {
      secondRow[col] = gridItems[i];
    } else {
      thirdRow[col] = gridItems[i];
    }
  }
};

// Get the username
const getUsername = () => {
  username.textContent = prompt("Enter your username, please!");
  if (!username.textContent || username.textContent.trim() == "") {
    username.textContent = "Guest";
  }
};

let attempts = 0;
const maxAttempts = 3;


// Keep track of the score
const updateScore = () => {
  attempts++;
  if (attempts <= maxAttempts) {
    score.textContent = `Attempt ${attempts} of ${maxAttempts}`;
  }

  // If attempts have reached the limit, check for win/lose
  if (attempts >= maxAttempts) {
    gameOver();
  }
};

// Roll(?) the slots
const roll = () => {
  for (let col = 0; col < 3; col++) {
    const usedSymbols = new Set();

    let symbol1 = getRandomSymbol();
    usedSymbols.add(symbol1);
    firstRow[col].style.backgroundImage = symbol1;

    let symbol2;
    do {
      symbol2 = getRandomSymbol();
    } while (usedSymbols.has(symbol2));
    usedSymbols.add(symbol2);
    secondRow[col].style.backgroundImage = symbol2;

    let symbol3;
    do {
      symbol3 = getRandomSymbol();
    } while (usedSymbols.has(symbol3));
    usedSymbols.add(symbol3);
    thirdRow[col].style.backgroundImage = symbol3;
  }
};

let areTheValuesSame;
let intermission = false;
let timeoutId;

// Finish the game
const gameOver = () => {
  intermission = true;

  // Check if middle row has all 3 matching symbols → Win
  const value = secondRow[0].style.backgroundImage;
  const isWin = secondRow.every((el) => el.style.backgroundImage === value);

  // Display appropriate message
  if (isWin) {
    endgameMsg.textContent = `Congratulations, ${username.textContent}! You won!`;
  } else {
    endgameMsg.textContent = `You lost, ${username.textContent}! Try again!`;
  }
  endgameMsg.classList.add("show");

  // Reset after 3 seconds
  timeoutId = setTimeout(() => {
    resetData();
    intermission = false;
  }, 3000);
};

// Reset the data in the end
const resetData = () => {
  attempts = 0;
  score.textContent = `Attempt 0 of ${maxAttempts}`;
  endgameMsg.textContent = "";
  endgameMsg.classList.remove("show");
};

let name;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    getUsername();
  }, 500);
  fillGrid();
});

// Main loop
const gameLoop = () => {
  if (!intermission) {
    roll();
    updateScore();
  }
};

playBtn.addEventListener("click", () => {
  gameLoop();
});
