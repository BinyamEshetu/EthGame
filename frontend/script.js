// frontend/script.js
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from backend
async function fetchQuestions() {
  const response = await fetch('/api/questions');
  const data = await response.json();
  questions = data;
  displayQuestion();
}

// Display the current question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  const questionContainer = document.getElementById('question-container');
  const choicesContainer = document.getElementById('choices-container');
  const nextButton = document.getElementById('next-btn');

  questionContainer.textContent = question.question;
  choicesContainer.innerHTML = '';

  question.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.onclick = () => checkAnswer(choice);
    choicesContainer.appendChild(button);
  });

  nextButton.style.display = 'none';
}

// Check the player's answer
function checkAnswer(selectedChoice) {
  const question = questions[currentQuestionIndex];
  const resultContainer = document.getElementById('result-container');

  if (selectedChoice === question.answer) {
    score++;
    resultContainer.textContent = 'Correct!';
  } else {
    resultContainer.textContent = `Wrong! The correct answer is ${question.answer}`;
  }

  document.getElementById('next-btn').style.display = 'inline-block';
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    document.getElementById('result-container').textContent = '';
  } else {
    document.getElementById('result-container').textContent = `Game Over! Your score: ${score}/${questions.length}`;
    document.getElementById('next-btn').style.display = 'none';
  }
}

// Start the game when the page loads
window.onload = fetchQuestions;

// Event listener for the "Next Question" button
document.getElementById('next-btn').onclick = nextQuestion;
