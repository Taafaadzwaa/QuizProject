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

// Question sets
const questions = {
  easy: [
    {
      question: "What color is the sky?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Blue",
    },
    {
      question: "How many legs does a spider have?",
      options: ["6", "8", "10", "12"],
      answer: "8",
    },
    {
      question: "What planet do we live on?",
      options: ["Mars", "Earth", "Venus", "Mercury"],
      answer: "Earth",
    },
  ],
  mid: [
    {
      question:
        "Which one of the following is a World Heritage Site in South Africa?",
      options: [
        "Table Mountain",
        "uKhahlamba-Drakensberg Park",
        "Kruger National Park",
        "Kruger National Park",
      ],
      answer: "uKhahlamba-Drakensberg Park",
    },
    {
      question: "Which document is required for international travel?",
      options: [
        "Driver's License",
        "Passport",
        "Identity Card",
        "Voter's Card",
      ],
      answer: "Passport",
    },
    {
      question: "Which province is known for the Kruger National Park?",
      options: ["Gauteng", "Limpopo", "North west", "Mpumalanga"],
      answer: "Mpumalanga",
    },
  ],
  hard: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Einstein", "Newton", "Tesla", "Darwin"],
      answer: "Einstein",
    },
  ],
  advanced: [
    {
      question: "What is the smallest country in the world by land area?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      answer: "Vatican City",
    },
    {
      question: "Which element has the highest melting point?",
      options: ["Tungsten", "Carbon", "Osmium", "Rhenium"],
      answer: "Carbon",
    },
    {
      question: "What is the only mammal capable of true flight?",
      options: ["Flying squirrel", "Bat", "Colugo", "Sugar glider"],
      answer: "Bat",
    },
    {
      question: "Which planet has the most moons in our solar system?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      answer: "Saturn",
    },
    {
      question:
        "Which philosopher coined the phrase 'I think, therefore I am'?",
      options: [
        "Immanuel Kant",
        "Friedrich Nietzsche",
        "René Descartes",
        "Socrates",
      ],
      answer: "René Descartes",
    },
  ],
};


// Start quiz
levels.forEach(btn => {
  btn.addEventListener("click", () => {
    currentLevel = btn.dataset.level;
    currentQuestionIndex = 0;
    score = 0;
    gameContainer.classList.add("hidden");
    
    if (currentLevel === "advanced") {
      // Show ADVANCED quiz section
      document.querySelector(".advanced-quiz").classList.remove("hidden");
      loadAdvancedQuestion(); // 
    } else {
      // Show Quiz for other levels
      quiz.classList.remove("hidden");
      levelTitle.textContent = `${currentLevel.toUpperCase()} LEVEL`;
      loadQuestion();
    }
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
function loadAdvancedQuestion() {
  clearInterval(timer);
  const current = questions[currentLevel][currentQuestionIndex];

  // Update advanced question container
  document.getElementById("advanced-question-container").textContent =
    current.question;

  // Update advanced options container
  const advancedOptionsContainer = document.getElementById(
    "advanced-options-container"
  );
  advancedOptionsContainer.innerHTML = "";

  current.options.forEach((opt) => {
    const div = document.createElement("div");
    div.textContent = opt;
    div.classList.add("advanced-option");
    div.addEventListener("click", () => selectAdvancedAnswer(opt));
    advancedOptionsContainer.appendChild(div);
  });

  // Update progress bar
  const progress =
    (currentQuestionIndex / questions[currentLevel].length) * 100;
  document.getElementById("advanced-progress").style.width = `${progress}%`;

  // Update question counter
  document.getElementById("advanced-question-count").textContent = `Question ${
    currentQuestionIndex + 1
  } of ${questions[currentLevel].length}`;

  // Hide next button initially
  document.getElementById("advanced-next-btn").classList.add("hidden");

  if (!document.getElementById("skip-btn")) {
  const skipBtn = document.createElement("button");
  skipBtn.id = "skip-btn";
  skipBtn.textContent = "Skip Question";
  skipBtn.classList.add("control-btn");
  skipBtn.style.margin = "10px";
  skipBtn.addEventListener("click", () => {
    nextAdvancedQuestion();
  });
  document.querySelector(".quiz-controls").appendChild(skipBtn);
  }
  startTimer();
}

// Countdown timer per question
function startTimer() {
  timeLeft = levelSettings[currentLevel].time;
  const timerDisplay = document.createElement("p");
  timerDisplay.id = "timer";
  
  if (currentLevel === "advanced") {
    document.getElementById("advanced-question-container").appendChild(timerDisplay);
  } else {
    questionContainer.appendChild(timerDisplay);
  }
  
  updateTimerDisplay(timerDisplay);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timerDisplay);
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (currentLevel === "advanced") {
        nextAdvancedQuestion();
      } else {
        nextQuestion();
      }
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
function selectAdvancedAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentLevel][currentQuestionIndex].answer;
  const options = document.querySelectorAll(".advanced-option");

  // Color feedback for correct/incorrect
  options.forEach((option) => {
    if (option.textContent === correct) {
      option.classList.add("correct");
    } else if (option.textContent === selected && selected !== correct) {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none"; // Disable further clicks
  });

  if (selected === correct) score++;

  // Show next button
  document.getElementById("advanced-next-btn").classList.remove("hidden");
}



nextBtn.addEventListener("click", nextQuestion);
// Advanced section navigation
document
  .getElementById("advanced-next-btn")
  .addEventListener("click", nextAdvancedQuestion);
    
  document
    .getElementById("advanced-prev-btn")
    .addEventListener("click", prevAdvancedQuestion);

function nextAdvancedQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentLevel].length) {
    loadAdvancedQuestion();
  } else {
    showAdvancedResult();
  }
}

function prevAdvancedQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadAdvancedQuestion();
  }
}

function showAdvancedResult() {
  document.querySelector(".advanced-quiz").classList.add("hidden");
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

