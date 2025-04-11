// Sample questions for IQ test
const iqQuestions = [
    {
        question: "What comes next in the sequence: 2, 4, 8, 16, ...?",
        options: ["24", "32", "30", "28"],
        correct: 1
    },
    // Add more IQ questions here
];

// Sample questions for personality test
const personalityQuestions = [
    {
        question: "In a group setting, I tend to:",
        options: [
            "Initiate conversations and engage with others",
            "Listen and observe before participating",
            "Prefer one-on-one interactions",
            "Feel energized by social interactions"
        ],
        type: "E/I" // Extraversion/Introversion
    },
    // Add more personality questions here
];

let currentTest = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let answers = [];

function startAssessment(type) {
    currentTest = type;
    currentQuestions = type === 'iq' ? iqQuestions : personalityQuestions;
    currentQuestionIndex = 0;
    answers = [];
    
    // Create the assessment interface
    const container = document.querySelector('.assessments-container');
    container.innerHTML = `
        <div class="assessment-interface">
            <h2>${type === 'iq' ? 'IQ Assessment' : 'Personality Assessment'}</h2>
            <div class="progress-bar">
                <div class="progress" style="width: 0%"></div>
            </div>
            <div id="question-container"></div>
            <div class="assessment-navigation">
                <button onclick="previousQuestion()" id="prev-btn" disabled>Previous</button>
                <button onclick="nextQuestion()" id="next-btn">Next</button>
            </div>
        </div>
    `;
    
    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    
    // Display question and options
    container.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</h3>
            <p>${question.question}</p>
        </div>
        <div class="options">
            ${question.options.map((option, index) => `
                <label class="option">
                    <input type="radio" name="answer" value="${index}"
                        ${answers[currentQuestionIndex] === index ? 'checked' : ''}>
                    <span>${option}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').textContent = 
        currentQuestionIndex === currentQuestions.length - 1 ? 'Finish' : 'Next';
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    answers[currentQuestionIndex] = parseInt(selectedAnswer.value);
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        finishAssessment();
    }
}

function finishAssessment() {
    const container = document.querySelector('.assessments-container');
    let result = '';
    
    if (currentTest === 'iq') {
        // Calculate IQ score (simplified)
        const correctAnswers = answers.filter((answer, index) => 
            answer === currentQuestions[index].correct
        ).length;
        const score = Math.round((correctAnswers / currentQuestions.length) * 100);
        
        result = `
            <div class="assessment-result">
                <h2>IQ Assessment Results</h2>
                <div class="score">Your Score: ${score}</div>
                <p>You answered ${correctAnswers} out of ${currentQuestions.length} questions correctly.</p>
            </div>
        `;
    } else {
        // Calculate personality type (simplified)
        result = `
            <div class="assessment-result">
                <h2>Personality Assessment Results</h2>
                <p>Based on your answers, your personality profile will be analyzed and a detailed report will be generated.</p>
                <div class="personality-traits">
                    <h3>Key Traits:</h3>
                    <ul>
                        <li>Analytical Thinking</li>
                        <li>Problem Solving</li>
                        <li>Communication Style</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        ${result}
        <div class="assessment-actions">
            <button onclick="window.location.href='assessments.html'" class="start-btn">
                Back to Assessments
                <i class="fas fa-arrow-left"></i>
            </button>
        </div>
    `;
}

// Initialize theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', 
                document.body.classList.contains('dark-theme') ? 'dark' : 'light'
            );
        });

        // Set initial theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
});
