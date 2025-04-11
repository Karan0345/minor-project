// IQ Test Questions
const questions = [
    {
        type: 'sequence',
        question: 'What number comes next in the sequence: 2, 6, 12, 20, 30, ?',
        options: ['42', '40', '38', '44'],
        correct: 0,
        explanation: 'The difference between consecutive numbers increases by 2 each time: 4, 6, 8, 10, 12',
        category: 'numerical'
    },
    {
        type: 'pattern',
        question: 'If * # $ % represents 4 7 2 9, what is # $ * %?',
        options: ['7 2 4 9', '9 2 7 4', '7 4 2 9', '4 9 7 2'],
        correct: 0,
        explanation: 'Each symbol represents a specific number throughout the pattern',
        category: 'logical'
    },
    {
        type: 'verbal',
        question: 'BOOK is to READER as MOVIE is to:',
        options: ['Director', 'Actor', 'Viewer', 'Screen'],
        correct: 2,
        explanation: 'The relationship is between the medium and its consumer',
        category: 'verbal'
    },
    {
        type: 'spatial',
        question: 'Which shape would complete the pattern?',
        image: 'spatial-q1.png', // You'll need to add these images
        options: ['Triangle', 'Square', 'Circle', 'Pentagon'],
        correct: 1,
        explanation: 'The pattern alternates between shapes with straight and curved lines',
        category: 'spatial'
    },
    // Add more questions here...
];

// Test state
let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let timeRemaining = 45 * 60; // 45 minutes in seconds
let timer;

// Initialize the test
document.addEventListener('DOMContentLoaded', () => {
    initializeTest();
    startTimer();
    updateQuestionDots();
});

function initializeTest() {
    document.getElementById('total-questions').textContent = questions.length;
    createQuestionDots();
    showQuestion(0);
}

function createQuestionDots() {
    const dotsContainer = document.getElementById('question-dots');
    for (let i = 0; i < questions.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => jumpToQuestion(i);
        dotsContainer.appendChild(dot);
    }
}

function showQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('question-container');
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('progress-indicator').style.width = 
        `${((index + 1) / questions.length) * 100}%`;
    
    // Create question HTML
    let questionHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            ${question.image ? `
                <div class="image-question">
                    <img src="${question.image}" alt="Question ${index + 1}">
                </div>
            ` : ''}
        </div>
        <div class="options">
    `;
    
    // Add options
    question.options.forEach((option, i) => {
        questionHTML += `
            <label class="option ${answers[index] === i ? 'selected' : ''}">
                <input type="radio" name="q${index}" value="${i}"
                    ${answers[index] === i ? 'checked' : ''}
                    onchange="selectAnswer(${i})">
                ${option}
            </label>
        `;
    });
    
    questionHTML += '</div>';
    container.innerHTML = questionHTML;
    
    // Update navigation buttons
    updateNavigation();
}

function selectAnswer(optionIndex) {
    answers[currentQuestionIndex] = optionIndex;
    updateQuestionDots();
    
    // Update option styling
    document.querySelectorAll('.option').forEach((option, i) => {
        option.classList.toggle('selected', i === optionIndex);
    });
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-test');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function updateQuestionDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentQuestionIndex);
        dot.classList.toggle('answered', answers[i] !== null);
    });
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateQuestionDots();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateQuestionDots();
    }
}

function jumpToQuestion(index) {
    currentQuestionIndex = index;
    showQuestion(index);
    updateQuestionDots();
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('time-remaining').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function confirmSubmit() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.add('show');
}

function hideModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('show');
}

function submitTest() {
    clearInterval(timer);
    
    // Calculate scores
    const results = calculateResults();
    showResults(results);
}

function calculateResults() {
    let totalCorrect = 0;
    const categoryScores = {};
    
    questions.forEach((question, index) => {
        if (answers[index] === question.correct) {
            totalCorrect++;
            categoryScores[question.category] = (categoryScores[question.category] || 0) + 1;
        }
    });
    
    const percentageScore = Math.round((totalCorrect / questions.length) * 100);
    
    // Calculate IQ score (simplified version)
    const iqScore = Math.round(85 + (percentageScore / 100) * 30);
    
    return {
        totalCorrect,
        totalQuestions: questions.length,
        percentageScore,
        iqScore,
        categoryScores
    };
}

function showResults(results) {
    const container = document.querySelector('.test-container');
    
    container.innerHTML = `
        <div class="results-container">
            <h1>Test Results</h1>
            
            <div class="score-circle">
                ${results.iqScore}
            </div>
            
            <div class="score-details">
                <h3>Your IQ Score: ${results.iqScore}</h3>
                <p>You answered ${results.totalCorrect} out of ${results.totalQuestions} questions correctly.</p>
                <p>Percentage Score: ${results.percentageScore}%</p>
                
                <div class="category-scores">
                    ${Object.entries(results.categoryScores).map(([category, score]) => `
                        <div class="category-score">
                            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            <p>${Math.round((score / results.totalQuestions) * 100)}%</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button class="nav-btn" onclick="window.location.href='assessments.html'">
                Back to Assessments
            </button>
        </div>
    `;
}
