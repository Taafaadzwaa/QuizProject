const levels = document.querySelectorAll(".level-btn"); 
const homeScreen = document.querySelector(".home-screen");
const quizContainer = document.querySelector(".quiz");
const resultContainer = document.querySelector(".result");
const levelTitle = document.getElementById("level-title");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const homeBtn = document.getElementById("home-btn");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let currentLevel = "";
let currentQuestions = [];

// Example questions for the quiz
const quizData = {
  easy: [
    { question: "What color is a ripe banana?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Yellow" },
    { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
    { question: "What planet do we live on?", options: ["Mars", "Earth", "Jupiter", "Venus"], answer: "Earth" },
    { question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Lion", "Elephant", "Cheetah"], answer: "Lion" },
    { question: "What is the capital of France?" , options : ["London", "Berlin", "Paris", "Madrid"], answer: "Paris"}
  ],
  mid: [
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "London", "Paris", "Rome"],
      answer: "Paris",
    },
    { question: "How many countries are in the world", options: ["100", "200", "195", "80"], answer: "195" },
    { question: "How many colours does the South African flag have", options: ["8", "6", "12", "9"], answer: "6" },
    { question: "Which airport is located in the Eastern Cape", options: ["King Shaka International Airport", "Lanseria Regional Airport", "Chief Dawid Stuurman International Airport", "O.R. Tambo International Airport"], answer: "Chief Dawid Stuurman International Airport" },
    { question: "Which document is required for international travel", options: ["Identity Document", "Passport", "Driver's License", "Banking Card"], answer: "Passport" },
    { question: "What is the currency of Botswana", options: ["Pula", "Rand", "Euro", "Dollar"], answer: "Pula" },
  ],
  hard: [
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Tesla", "Einstein", "Bohr"],
      answer: "Einstein",
    },
  ],
  advanced: [
    {
      question: "Which country has the most time zones in the world?",
      options: ["United States", "Russia", "France", "China"],
      answer: "France",
    },
    {
      question: "Which element has the highest melting point?",
      options: ["Tungsten", "Carbon", "Osmium", "Titanium"],
      answer: "Carbon",
    },
    {
      question:
        "What is the most spoken language in the world by native speakers?",
      options: ["English", "Spanish", "Hindi", "Mandarin Chinese"],
      answer: "Mandarin Chinese",
    },
    {
      question: "Which blood type is known as the universal donor?",
      options: ["A+", "O-", "AB+", "B-"],
      answer: "O-",
    },
    {
      question: "Which country invented tea?",
      options: ["India", "Japan", "China", "England"],
      answer: "China",
    },
  ],
};

// Start level
levels.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLevel = btn.dataset.level;
    currentQuestions = quizData[currentLevel];
    currentQuestionIndex = 0;
    score = 0;
    homeScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    levelTitle.textContent = `${currentLevel.toUpperCase()} Level`;
    showQuestion();
  });
});

function showQuestion() {
  const questionData = currentQuestions[currentQuestionIndex];
  questionContainer.textContent = questionData.question;

  optionsContainer.innerHTML = "";
  questionData.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(button, questionData.answer));
    optionsContainer.appendChild(button);
  });

  updateButtons();
}

function selectAnswer(selectedBtn, correctAnswer) {
  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn && btn.textContent !== correctAnswer) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }
}

function updateButtons() {
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent = currentQuestionIndex === currentQuestions.length - 1 ? "Finish" : "Next";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
});

function showResults() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreDisplay.textContent = `${score} / ${currentQuestions.length}`;
}

homeBtn.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  homeScreen.classList.remove("hidden");
});

