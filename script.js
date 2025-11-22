// Select important elements
const holes = document.querySelectorAll(".hole");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const messageEl = document.getElementById("message");

let score = 0;
let timeLeft = 30;
let gameInterval = null;
let timerInterval = null;
let currentMoleIndex = null;
let gameActive = false;

// Start game when button is clicked
startBtn.addEventListener("click", startGame);

// Add click listeners to each hole
holes.forEach((hole, index) => {
  hole.addEventListener("click", () => {
    if (!gameActive) return; // ignore clicks if game not running

    if (index === currentMoleIndex) {
      score++;
      scoreEl.textContent = score;
      // Remove mole immediately after hit
      clearMole();
    }
  });
});

function startGame() {
  if (gameActive) return; // don't start again if already running

  // Reset values
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  messageEl.textContent = "";
  clearMole();

  gameActive = true;
  startBtn.disabled = true;
  startBtn.textContent = "Game in progress...";

  // Start showing moles
  gameInterval = setInterval(showRandomMole, 800);

  // Start countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false;
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  clearMole();

  startBtn.disabled = false;
  startBtn.textContent = "Play Again";

  messageEl.textContent = `Time's up! Your final score is ${score}.`;
}

function showRandomMole() {
  // Remove current mole (if any)
  clearMole();

  // Pick a random hole index
  const randomIndex = Math.floor(Math.random() * holes.length);
  const randomHole = holes[randomIndex];

  // Add mole class
  randomHole.classList.add("mole");
  currentMoleIndex = randomIndex;
}

function clearMole() {
  if (currentMoleIndex !== null) {
    holes[currentMoleIndex].classList.remove("mole");
    currentMoleIndex = null;
  }
}
