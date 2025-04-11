// Personality Test Questions
const questions = [
    {
        question: "I enjoy being the center of attention",
        category: "mind",
        direction: "extrovert"
    },
    {
        question: "I prefer practical, hands-on activities",
        category: "energy",
        direction: "practical"
    },
    {
        question: "I make decisions based on logic rather than feelings",
        category: "nature",
        direction: "logical"
    },
    {
        question: "I like to plan things carefully rather than be spontaneous",
        category: "tactics",
        direction: "structured"
    },
    {
        question: "I get energized by social interactions",
        category: "mind",
        direction: "extrovert"
    },
    {
        question: "I enjoy thinking about abstract concepts",
        category: "energy",
        direction: "intuitive"
    },
    {
        question: "I consider others' feelings when making decisions",
        category: "nature",
        direction: "emotional"
    },
    {
        question: "I prefer to keep my options open",
        category: "tactics",
        direction: "flexible"
    },
    // Add more questions for each category...
];

// Career recommendations based on personality types
const careerRecommendations = {
    "INTJ": ["Strategic Planner", "Systems Architect", "Investment Banker", "Scientific Researcher"],
    "INTP": ["Software Developer", "Data Scientist", "Research Scientist", "Systems Analyst"],
    "ENTJ": ["Executive", "Management Consultant", "Business Strategist", "Corporate Lawyer"],
    "ENTP": ["Entrepreneur", "Innovation Consultant", "Creative Director", "Business Development"],
    "INFJ": ["Counselor", "HR Development", "Content Strategist", "Non-profit Director"],
    "INFP": ["Writer", "Psychologist", "UX Designer", "Art Director"],
    "ENFJ": ["Training Manager", "PR Specialist", "Marketing Director", "Education Consultant"],
    "ENFP": ["Creative Consultant", "Journalist", "Product Manager", "Life Coach"],
    "ISTJ": ["Project Manager", "Financial Analyst", "Quality Assurance", "Business Administrator"],
    "ISFJ": ["Healthcare Professional", "Social Worker", "Executive Assistant", "Customer Service Manager"],
    "ESTJ": ["Operations Manager", "Sales Director", "Legal Administrator", "Police Officer"],
    "ESFJ": ["Sales Manager", "Event Planner", "Healthcare Administrator", "Teacher"],
    "ISTP": ["Technical Specialist", "Engineer", "Forensic Analyst", "Emergency Response"],
    "ISFP": ["Graphic Designer", "Fashion Designer", "Physical Therapist", "Chef"],
    "ESTP": ["Sales Representative", "Marketing Manager", "Real Estate Agent", "Sports Coach"],
    "ESFP": ["Event Coordinator", "Travel Agent", "Performance Artist", "Public Relations"]
};

// Test state
let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);
let timeRemaining = 30 * 60; // 30 minutes in seconds
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
    
    container.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
        </div>
    `;
    
    // Reset radio buttons
    document.querySelectorAll('input[name="current-answer"]').forEach(input => {
        input.checked = answers[index] === parseInt(input.value);
    });
    
    updateNavigation();
}

function selectAnswer(value) {
    answers[currentQuestionIndex] = parseInt(value);
    updateQuestionDots();
}

// Add event listeners to radio buttons
document.querySelectorAll('input[name="current-answer"]').forEach(input => {
    input.addEventListener('change', (e) => {
        selectAnswer(e.target.value);
    });
});

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
    const results = calculateResults();
    showResults(results);
}

function calculateResults() {
    const traits = {
        mind: { extrovert: 0, total: 0 },
        energy: { intuitive: 0, total: 0 },
        nature: { emotional: 0, total: 0 },
        tactics: { structured: 0, total: 0 }
    };
    
    questions.forEach((question, index) => {
        const answer = answers[index];
        if (answer !== null) {
            traits[question.category].total++;
            if (question.direction === 'extrovert' || 
                question.direction === 'intuitive' || 
                question.direction === 'emotional' || 
                question.direction === 'structured') {
                traits[question.category][question.direction] += answer;
            } else {
                traits[question.category][question.direction] += (6 - answer);
            }
        }
    });
    
    // Calculate percentages for each trait
    const results = {
        mind: (traits.mind.extrovert / (traits.mind.total * 5)) * 100,
        energy: (traits.energy.intuitive / (traits.energy.total * 5)) * 100,
        nature: (traits.nature.emotional / (traits.nature.total * 5)) * 100,
        tactics: (traits.tactics.structured / (traits.tactics.total * 5)) * 100
    };
    
    // Determine personality type
    const type = [
        results.mind > 50 ? 'E' : 'I',
        results.energy > 50 ? 'N' : 'S',
        results.nature > 50 ? 'F' : 'T',
        results.tactics > 50 ? 'J' : 'P'
    ].join('');
    
    return {
        percentages: results,
        type: type,
        careers: careerRecommendations[type] || []
    };
}

function showResults(results) {
    const resultsModal = document.getElementById('results-modal');
    
    // Update trait indicators
    Object.entries(results.percentages).forEach(([trait, percentage]) => {
        const indicator = document.getElementById(`${trait}-indicator`);
        if (indicator) {
            indicator.style.width = `${percentage}%`;
        }
    });
    
    // Update career recommendations
    const careerList = document.getElementById('career-paths');
    careerList.innerHTML = results.careers.map(career => `
        <li>
            <i class="fas fa-star"></i>
            ${career}
        </li>
    `).join('');
    
    resultsModal.classList.add('show');
}

function closeResults() {
    const resultsModal = document.getElementById('results-modal');
    resultsModal.classList.remove('show');
    window.location.href = 'assessments.html';
}
