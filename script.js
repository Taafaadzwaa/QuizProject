const levels = document.querySelectorAll(".level-btn");
const gameContainer = document.querySelector(".game-container");
const quiz = document.querySelector(".quiz");
const result = document.querySelector(".result");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const homeBtn = document.getElementById("home-btn");
const levelTitle = document.getElementById("level-title");

let currentLevel = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 0;

// Difficulty-based settings
const levelSettings = {
  easy: { time: 20 },
  mid: { time: 15 },
  hard: { time: 10 },
  advanced: { time: 8 }
};

// Example question sets
const questions = {
  easy: [
    { question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: "Blue" },
    { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
    { question: "What planet do we live on?", options: ["Mars", "Earth", "Venus", "Mercury"], answer: "Earth" }
  ],
  mid: [
    { question: "Which one of the following is a World Heritage Site in South Africa?", options: ["Table Mountain", "uKhahlamba-Drakensberg Park", "Kruger National Park", "Kruger National Park"], answer: "uKhahlamba-Drakensburg Park" },
    { question: "Which document is required for international travel?", options: ["Driver's License", "Passport", "Identity Card", "Voter's Card"], answer: "Passport" },
    { question: "Which province is known for the Kruger National Park?", options: ["Gauteng", "Limpopo", "North west", "Mpumalanga"], answer: "Mpumalanga" }
    { question: "Which international airport is located in Johannesburg?", options: ["O.R. Tambo International Airport", "King Shaka International Airport", "Lanseria Regional Airport", "Cape Town International Airport"], answer: "O.R. Tambo International Airport" }
    { question: "What does the abbreviation SAA stand for?", options: ["South African Airlines", "South African Airways", "Southern African Airlines", "South African Aviation "], answer: "South African Airways" }
  ],
  hard: [
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "Who developed the theory of relativity?", options: ["Einstein", "Newton", "Tesla", "Darwin"], answer: "Einstein" }
  ],
  advanced: [
    { question: "What is the chemical symbol for gold?", options: ["Gd", "Ag", "Au", "Go"], answer: "Au" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000 km/s"], answer: "300,000 km/s" }
  ]
};

// Start quiz
levels.forEach(btn => {
  btn.addEventListener("click", () => {
    currentLevel = btn.dataset.level;
    currentQuestionIndex = 0;
    score = 0;
    gameContainer.classList.add("hidden");
    quiz.classList.remove("hidden");
    levelTitle.textContent = `${currentLevel.toUpperCase()} LEVEL`;
    loadQuestion();
  });
});

// Load a question
function loadQuestion() {
  clearInterval(timer);
  const current = questions[currentLevel][currentQuestionIndex];
  questionContainer.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach(opt => {
    const button = document.createElement("button");
    button.textContent = opt;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(opt));
    optionsContainer.appendChild(button);
  });

  nextBtn.classList.add("hidden");
  startTimer();
}

// Countdown timer per question
function startTimer() {
  timeLeft = levelSettings[currentLevel].time;
  const timerDisplay = document.createElement("p");
  timerDisplay.id = "timer";
  questionContainer.appendChild(timerDisplay);
  updateTimerDisplay(timerDisplay);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timerDisplay);
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); // Move on if time runs out
    }
  }, 1000);
}

function updateTimerDisplay(el) {
  el.textContent = `⏱ Time left: ${timeLeft}s`;
}

function selectAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentLevel][currentQuestionIndex].answer;
  if (selected === correct) score++;
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentLevel].length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  const total = questions[currentLevel].length;
  scoreDisplay.innerHTML = `You scored <strong>${score}</strong> / ${total}`;

  // Save to leaderboard
  setTimeout(() => {
    const name = prompt("Enter your name for the leaderboard:");
    if (name) saveHighScore(name, score, currentLevel);
    displayLeaderboard();
  }, 500);
}

// Save to localStorage
function saveHighScore(name, score, level) {
  const leaderboardKey = "quizLeaderboard";
  const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
  leaderboard.push({ name, score, level });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
}

// Show leaderboard
function displayLeaderboard() {
  const leaderboardKey = "quizLeaderboard";
  const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];

  const leaderboardDiv = document.createElement("div");
  leaderboardDiv.innerHTML = `
    <h3>🏆 Leaderboard</h3>
    <ol>
      ${leaderboard.slice(0, 5).map(item => `<li>${item.name} - ${item.score} (${item.level})</li>`).join("")}
    </ol>
  `;
  result.appendChild(leaderboardDiv);
}

homeBtn.addEventListener("click", () => {
  result.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  result.querySelector("div")?.remove(); // remove leaderboard div
});

