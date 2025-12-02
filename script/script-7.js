// A function for more convenient element creation
const createElement = (tag, parent, className, id, text) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (id) el.id = id;
  if (text) el.textContent = text;
  parent.appendChild(el);
  return el;
};

/* DOM elements */

// Body
const body = document.body;

// Header
const navbar = document.querySelector(".navbar");
body.appendChild(navbar);
const header = createElement("div", body, "row-1");
const buttons = createElement("div", body, "buttons");

// Clear button in case you want to watch the ball rotate :)
const clearAnswerButton = createElement("button", buttons, "clear-answer");
clearAnswerButton.classList.add("clear-answer-light-hover");
clearAnswerButton.textContent = "Clear answer";

// Dark/Light mode button
const colorModeButton = createElement("button", buttons, "color-mode");
colorModeButton.classList.add("fa-moon", "fa-solid");

// Main container
const container = createElement("div", body, "_container");

// Input field
const question = createElement("input", container, "question");
question.placeholder = "Enter your question..";

// Magic ball
const magicBallWrapper = createElement("div", container, "magic-ball-wrapper");
const magicBall = createElement("div", magicBallWrapper, "magic-ball");
magicBall.classList.add("running");

// Hint (Click the ball)
const hint = createElement("p", container, "hint");
hint.textContent = "Click the ball to shake it!";

// Dark mode
let isDarkModeActive = true;
const darkMode = () => {
  if (isDarkModeActive) {
    isDarkModeActive = false;
  } else {
    isDarkModeActive = true;
  }
  if (isDarkModeActive) {
    colorModeButton.classList.remove("fa-sun");
    colorModeButton.classList.add("fa-moon");
  } else {
    colorModeButton.classList.remove("fa-moon");
    colorModeButton.classList.add("fa-sun");
  }
  body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode-w-border");
  colorModeButton.classList.toggle("dark-mode-sun-icon");
  clearAnswerButton.classList.toggle("dark-mode-w-border");
  clearAnswerButton.classList.toggle("clear-answer-light-pseudo");
  clearAnswerButton.classList.toggle("clear-answer-dark-pseudo");
  magicBall.classList.toggle("dark-mode-w-border");
  question.classList.toggle("dark-mode-input");
  hint.classList.toggle("dark-mode-no-bg");
};
darkMode();

// Answers
const answers = [
  "Yes.",
  "No.",
  "Maybe.",
  "This one's up to you.",
  "Sure!",
  "Naahh.",
  "Absolutely! Not.",
];
const randomAnswer = () => {
  return answers[Math.floor(Math.random() * answers.length)];
};

/* Event listeners */
// Toggle dark mode button
colorModeButton.addEventListener("click", () => {
  darkMode();
});

// Clear the ball's contents
clearAnswerButton.addEventListener("click", () => {
  question.value = "";
  magicBall.textContent = "";
  magicBall.classList.add("running");
  magicBall.classList.remove("revert");
});

// Ball interactions
let firstTimeoutId;
let secondTimeoutId;
magicBall.addEventListener("click", () => {
  if (question.value.trim() != "") {
  magicBall.classList.remove("running");
  magicBall.classList.add("revert");
  magicBall.classList.add("shake");
  clearInterval(firstTimeoutId);
  clearInterval(secondTimeoutId);
  firstTimeoutId = setTimeout(() => {
    magicBall.classList.remove("shake");
  }, 3000);
  secondTimeoutId = setTimeout(() => {
    magicBall.textContent = randomAnswer();
  }, 3100);
  magicBall.textContent = "";
} else {
  alert("Enter a question!!!")
}
});