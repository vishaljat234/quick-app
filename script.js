// --- 1. Quiz Data (Questions) ---
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "Python", correct: false },
            { text: "React", correct: true },
            { text: "Bootstrap", correct: false },
            { text: "Sass", correct: false },
        ]
    },
    {
        question: "What is the primary function of CSS?",
        answers: [
            { text: "Managing server-side logic", correct: false },
            { text: "Defining the structure of a webpage", correct: false },
            { text: "Styling the appearance of a webpage", correct: true },
            { text: "Handling user interaction", correct: false },
        ]
    },
    {
        question: "Which symbol is used for comments in single-line JavaScript?",
        answers: [
            { text: "#", correct: false },
            { text: "//", correct: true },
            { text: "", correct: false },
            { text: "/* */", correct: false },
        ]
    }
];

// --- 2. DOM Element Selectors ---
const questionElement = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result-container");
const finalScoreSpan = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

// --- 3. State Variables ---
let currentQuestionIndex = 0;
let score = 0;

// --- 4. Main Functions ---

function startQuiz() {
    // Reset state for a new quiz
    currentQuestionIndex = 0;
    score = 0;
    
    // Show quiz, hide result
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    nextButton.textContent = "Next";

    showQuestion();
}

function showQuestion() {
    // Reset the buttons and hide the 'Next' button
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            // Store the correct answer flag on the button for later checks
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    // Remove all previous answer buttons
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // 1. Check answer and update score
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // 2. Disable all buttons and show the correct answer
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after one is clicked
    });

    // 3. Show the Next button
    nextButton.classList.remove("hidden");
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Move to next question
    } else {
        showScore(); // Quiz is over
    }
}

function showScore() {
    resetState(); // Clear questions/buttons
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    finalScoreSpan.textContent = score + " out of " + questions.length;
}

// --- 5. Event Listeners ---
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        // This handles the case where the user clicks Next/Finish button 
        // after the final question (which is handled by showScore() anyway)
        startQuiz(); 
    }
});

restartButton.addEventListener("click", startQuiz);

// --- 6. Initial Call to Start the Quiz ---
startQuiz();