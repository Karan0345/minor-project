// WebSocket connection
let ws;
let currentUserId = 'user_' + Math.random().toString(36).substr(2, 9);
let selectedMentorId = null;

// Sample mentor data
const mentors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Career Counseling",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        availability: ["video", "chat"],
        rating: 4.9,
        experience: "10+ years"
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        specialty: "Technical Skills",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        availability: ["video"],
        rating: 4.8,
        experience: "8 years"
    },
    {
        id: 3,
        name: "Emma Williams",
        specialty: "Soft Skills",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        availability: ["chat", "video"],
        rating: 4.7,
        experience: "5 years"
    }
];

// Initialize WebSocket connection
function initializeWebSocket() {
    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
        console.log('Connected to server');
        // Register as user
        ws.send(JSON.stringify({
            type: 'register',
            role: 'user',
            userId: currentUserId
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        // Attempt to reconnect after 3 seconds
        setTimeout(initializeWebSocket, 3000);
    };
}

// Handle incoming WebSocket messages
function handleWebSocketMessage(data) {
    switch(data.type) {
        case 'chat':
            appendMessage(data.message, false);
            break;
        case 'status':
            updateMentorStatus(data.userId, data.status);
            break;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadMentors();
    initializeThemeToggle();
    initializeWebSocket();
    setupVideoCall();
});

// Load mentors into their respective sections
function loadMentors() {
    const videoMentors = mentors.filter(mentor => mentor.availability.includes('video'));
    const chatMentors = mentors.filter(mentor => mentor.availability.includes('chat'));
    
    document.getElementById('video-mentors').innerHTML = videoMentors
        .map(mentor => createMentorCard(mentor))
        .join('');
    
    document.getElementById('chat-mentors').innerHTML = chatMentors
        .map(mentor => createMentorCard(mentor))
        .join('');
        
    // Populate the mentor select dropdown
    const mentorSelect = document.getElementById('mentor-select');
    if (mentorSelect) {
        mentorSelect.innerHTML = `
            <option value="">Select a mentor</option>
            ${mentors.map(mentor => `
                <option value="${mentor.id}">${mentor.name} - ${mentor.specialty}</option>
            `).join('')}
        `;
    }
}

// Create HTML for mentor card
function createMentorCard(mentor) {
    return `
        <div class="mentor-card" data-mentor-id="${mentor.id}" onclick="selectMentor(${mentor.id})">
            <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-avatar">
            <div class="mentor-name">${mentor.name}</div>
            <div class="mentor-specialty">${mentor.specialty}</div>
            <div class="mentor-rating">
                <i class="fas fa-star"></i> ${mentor.rating}
            </div>
            <div class="mentor-experience">${mentor.experience}</div>
        </div>
    `;
}

// Select a mentor for chat or video
function selectMentor(mentorId) {
    selectedMentorId = mentorId;
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) return;

    // Update UI to show selected mentor
    document.querySelectorAll('.mentor-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-mentor-id="${mentorId}"]`).classList.add('selected');
}

// Show schedule modal
function showScheduleModal(type) {
    if (!selectedMentorId) {
        alert('Please select a mentor first');
        return;
    }

    const modal = document.getElementById('schedule-modal');
    modal.classList.add('show');
    
    // Set minimum date to today
    const dateInput = document.getElementById('session-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Video call functionality
let localStream;
let peerConnection;
const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

async function setupVideoCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.srcObject = localStream;
        }
    } catch (err) {
        console.error('Error accessing media devices:', err);
    }
}

async function startVideoCall() {
    if (!selectedMentorId) {
        alert('Please select a mentor first');
        return;
    }

    const videoModal = document.getElementById('video-modal');
    videoModal.classList.add('show');

    // Initialize WebRTC
    peerConnection = new RTCPeerConnection(configuration);
    
    // Add local stream
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle incoming video stream
    peerConnection.ontrack = (event) => {
        const remoteVideo = document.getElementById('remote-video');
        if (remoteVideo.srcObject !== event.streams[0]) {
            remoteVideo.srcObject = event.streams[0];
        }
    };

    // Create and send offer
    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        // Send offer to server (would be implemented in a real system)
        console.log('Sending offer to mentor:', offer);
    } catch (err) {
        console.error('Error creating offer:', err);
    }
}

// Start chat session
function startChatSession() {
    if (!selectedMentorId) {
        alert('Please select a mentor first');
        return;
    }

    const modal = document.getElementById('chat-modal');
    modal.classList.add('show');
    
    const mentor = mentors.find(m => m.id === selectedMentorId);
    if (mentor) {
        document.getElementById('chat-mentor-avatar').src = mentor.avatar;
        document.getElementById('chat-mentor-name').textContent = mentor.name;
    }
    
    // Clear previous messages
    document.getElementById('chat-messages').innerHTML = `
        <div class="message received">
            Hello! I'm ${mentor.name}. How can I assist you today?
        </div>
    `;
}

// Send chat message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message && ws && ws.readyState === WebSocket.OPEN) {
        // Send message through WebSocket
        ws.send(JSON.stringify({
            type: 'chat',
            message: message,
            senderId: currentUserId,
            recipientId: selectedMentorId,
            toMentor: true
        }));
        
        // Add message to chat
        appendMessage(message, true);
        
        // Clear input
        input.value = '';
    }
}

// Append message to chat
function appendMessage(message, isSent) {
    const messages = document.getElementById('chat-messages');
    messages.innerHTML += `
        <div class="message ${isSent ? 'sent' : 'received'}">
            ${message}
        </div>
    `;
    messages.scrollTop = messages.scrollHeight;
}

// Hide any modal
function hideModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
    
    // Stop video streams if video modal is closed
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
        peerConnection.close();
    }
}

// Handle scheduling form submission
document.getElementById('schedule-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mentorId = selectedMentorId;
    const date = document.getElementById('session-date').value;
    const time = document.getElementById('session-time').value;
    const topic = document.getElementById('session-topic').value;
    
    // Here you would typically send this data to your backend
    console.log('Scheduling session:', { mentorId, date, time, topic });
    
    // Show success message
    alert('Session scheduled successfully! You will receive a confirmation email shortly.');
    hideModal();
});

// Initialize theme toggle
function initializeThemeToggle() {
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
}

// Add enter key support for chat
document.getElementById('chat-input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
