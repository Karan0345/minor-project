const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store active connections
const clients = new Map();
const mentors = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        switch(data.type) {
            case 'register':
                // Register user or mentor
                if (data.role === 'mentor') {
                    mentors.set(data.userId, ws);
                } else {
                    clients.set(data.userId, ws);
                }
                ws.userId = data.userId;
                ws.role = data.role;
                break;

            case 'chat':
                // Handle chat messages
                const target = data.toMentor ? mentors.get(data.recipientId) : clients.get(data.recipientId);
                if (target) {
                    target.send(JSON.stringify({
                        type: 'chat',
                        message: data.message,
                        senderId: data.senderId,
                        timestamp: new Date().toISOString()
                    }));
                }
                break;

            case 'status':
                // Update online status
                const statusUpdate = JSON.stringify({
                    type: 'status',
                    userId: data.userId,
                    status: data.status
                });
                broadcast(statusUpdate);
                break;
        }
    });

    ws.on('close', () => {
        if (ws.role === 'mentor') {
            mentors.delete(ws.userId);
        } else {
            clients.delete(ws.userId);
        }
        
        // Broadcast offline status
        broadcast(JSON.stringify({
            type: 'status',
            userId: ws.userId,
            status: 'offline'
        }));
    });
});

function broadcast(message) {
    [...clients.values(), ...mentors.values()].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
