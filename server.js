const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Un client s\'est connecté.');

    socket.on('message', (data) => {
        console.log('Message reçu :', data);
        // Envoyer le message à tous les clients connectés
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client déconnecté.');
    });
});

server.listen(PORT, () => {
    console.log(`Serveur WebSocket démarré sur le port ${PORT}`);
});
