// Selecting elements
const levelButtons = document.querySelectorAll('.level-btn');
const homeContainer = document.querySelector('.game-container');
const quizContainer = document.querySelector('.quiz');
const resultContainer = document.querySelector('.result');
const levelTitle = document.getElementById('level-title');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const homeBtn = document.getElementById('home-btn');

let currentLevel = '';
let currentQuestionIndex = 0;
let score = 0;

// === EASY QUESTIONS ===
const easyQuestions = [
  {
    q: "What color is a ripe banana?",
    options: ["Green", "Yellow", "Red", "Purple"],
    answer: "Yellow"
  },
  {
    q: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    answer: "8"
  },
  {
    q: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Cheetah"],
    answer: "Lion"
  },
  {
    q: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    q: "Which planet do we live on?",
    options: ["Mars", "Venus", "Earth", "Jupiter"],
    answer: "Earth"
  }
];

// easy level side 
levelButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentLevel = btn.dataset.level;
    if (currentLevel === 'easy') {
      startQuiz(easyQuestions, 'Easy Level ');
    }
  });
});

//startong the quiz
function startQuiz(questions, title) {
  homeContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  levelTitle.textContent = title;
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion(questions);
}


function loadQuestion(questions) {
  nextBtn.classList.add('hidden');
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.q;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach(optionText => {
    const option = document.createElement('div');
    option.classList.add('option');
    option.textContent = optionText;
    option.addEventListener('click', () => selectAnswer(option, currentQuestion.answer, questions));
    optionsContainer.appendChild(option);
  });
}

//options
function selectAnswer(selectedOption, correctAnswer, questions) {
  const allOptions = document.querySelectorAll('.option');
  allOptions.forEach(opt => (opt.style.pointerEvents = 'none'));

  if (selectedOption.textContent === correctAnswer) {
    selectedOption.classList.add('correct');
    score++;
  } else {
    selectedOption.classList.add('wrong');
    allOptions.forEach(opt => {
      if (opt.textContent === correctAnswer) opt.classList.add('correct');
    });
  }

  nextBtn.classList.remove('hidden');
  nextBtn.onclick = () => nextQuestion(questions);
}

//next questions
function nextQuestion(questions) {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(questions);
  } else {
    showResult();
  }
}

//the displaying of the answer
function showResult() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreDisplay.textContent = `You scored ${score} out of 5!`;
}

homeBtn.addEventListener('click', () => {
  resultContainer.classList.add('hidden');
  homeContainer.classList.remove('hidden');
});
