document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const clearChat = document.querySelector('.clear-chat');
    const suggestionChips = document.querySelectorAll('.chip');

    // Sample responses for demo
    const aiResponses = {
        'career paths': `Based on your interests and skills, here are some recommended career paths:
            1. Software Development
            2. Data Science
            3. UX/UI Design
            4. Product Management
            
            Would you like to explore any of these paths in detail?`,
        'skills analysis': `I've analyzed your profile and here are key skills to develop:
            1. Technical Skills: Python, Data Analysis, Cloud Computing
            2. Soft Skills: Communication, Leadership, Problem Solving
            3. Industry Knowledge: AI/ML, Digital Transformation
            
            Which area would you like to focus on?`,
        'industry trends': `Here are the current industry trends:
            1. AI and Machine Learning integration across sectors
            2. Remote and hybrid work models
            3. Digital transformation initiatives
            4. Emphasis on data-driven decision making
            
            Would you like more details about any of these trends?`
    };

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<i class="fas fa-${isUser ? 'user' : 'robot'}"></i>`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle user message
    function handleUserMessage(message) {
        addMessage(message, true);
        
        // Simulate AI thinking
        setTimeout(() => {
            let response = 'I understand you\'re asking about ';
            
            // Check for keywords and provide relevant responses
            if (message.toLowerCase().includes('career')) {
                response = aiResponses['career paths'];
            } else if (message.toLowerCase().includes('skill')) {
                response = aiResponses['skills analysis'];
            } else if (message.toLowerCase().includes('trend')) {
                response = aiResponses['industry trends'];
            } else {
                response += message + '. Let me help you with that. What specific aspects would you like to know more about?';
            }
            
            addMessage(response);
        }, 1000);
    }

    // Send message event
    sendButton?.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            handleUserMessage(message);
            userInput.value = '';
        }
    });

    // Enter key event
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                handleUserMessage(message);
                userInput.value = '';
            }
        }
    });

    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.dataset.query;
            handleUserMessage(query);
        });
    });

    // Clear chat
    clearChat?.addEventListener('click', () => {
        // Keep only the welcome message
        while (chatMessages.children.length > 1) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on system preference
    document.documentElement.setAttribute('data-theme', 
        prefersDarkScheme.matches ? 'dark' : 'light'
    );

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle?.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu?.classList.toggle('active');
    });
});
