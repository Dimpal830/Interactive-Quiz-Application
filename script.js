// ---------- Quiz data ----------
const questions = [
  { q: "Which language is known as the base of many modern languages like C++ and Java?",
    options: ["Python", "C", "HTML", "SQL"], answer: 1 },
  { q: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"], answer: 0 },
  { q: "Which symbol is used for single-line comments in Python?",
    options: ["//", "/* */", "#", "--"], answer: 2 },
  { q: "What is the output of 2 + 3 * 4?",
    options: ["20", "14", "24", "10"], answer: 1 },
  { q: "Which data structure works on the Last In, First Out (LIFO) principle?",
    options: ["Queue", "Array", "Stack", "Tree"], answer: 2 },
  { q: "Which keyword is used to define a function in Python?",
    options: ["func", "define", "function", "def"], answer: 3 },
  { q: "What does CSS control on a web page?",
    options: ["Database queries", "Styling and layout", "Server logic", "File storage"], answer: 1 },
  { q: "Which of these is NOT a programming language?",
    options: ["Java", "Ruby", "Git", "Swift"], answer: 2 },
  { q: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: 1 },
  { q: "Which tool is used to track changes in code and share it on GitHub?",
    options: ["Git", "Excel", "Photoshop", "Notepad"], answer: 0 }
];

// ---------- Elements ----------
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const barFill = document.getElementById("bar-fill");
const resultText = document.getElementById("result-text");
const resultMessage = document.getElementById("result-message");

let current = 0;
let score = 0;

// ---------- Functions ----------
function showScreen(screen) {
  [startScreen, questionScreen, resultScreen].forEach(s => s.hidden = true);
  screen.hidden = false;
}

function startQuiz() {
  current = 0;
  score = 0;
  showScreen(questionScreen);
  showQuestion();
}

function showQuestion() {
  const item = questions[current];
  questionText.textContent = item.q;
  progressText.textContent = "Question " + (current + 1) + " of " + questions.length;
  scoreText.textContent = "Score: " + score;
  barFill.style.width = (current / questions.length * 100) + "%";
  feedback.textContent = "";
  nextBtn.hidden = true;
  optionsBox.innerHTML = "";

  item.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(index) {
  const correctIndex = questions[current].answer;
  const buttons = optionsBox.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === index && index !== correctIndex) btn.classList.add("wrong");
  });

  if (index === correctIndex) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = "Not quite. The correct answer is: " + questions[current].options[correctIndex];
  }
  scoreText.textContent = "Score: " + score;
  nextBtn.textContent = current === questions.length - 1 ? "See result" : "Next question";
  nextBtn.hidden = false;
  nextBtn.focus();
}

function nextStep() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  barFill.style.width = "100%";
  showScreen(resultScreen);
  const percent = Math.round(score / questions.length * 100);
  resultText.textContent = "You scored " + score + " out of " + questions.length + " (" + percent + "%).";
  if (percent >= 80) resultMessage.textContent = "Excellent work!";
  else if (percent >= 50) resultMessage.textContent = "Good effort. Try again to improve your score.";
  else resultMessage.textContent = "Keep practising and try again.";
}

// ---------- Events ----------
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextStep);
