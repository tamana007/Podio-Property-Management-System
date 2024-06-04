import express from 'express';
import next from 'next';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

interface Message {
  type: 'register' | 'newComment';
  userId?: string;
  comment?: Comment;
  mentionedUserIds?: string[];
}

interface Comment {
  id: number;
  text: string;
  userId: string;
}

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  const wss = new WebSocketServer({ server: httpServer });

  const users: { [key: string]: WebSocket } = {}; // { userId: ws }

  wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    ws.on('message', (message: string) => {
      const parsedMessage: Message = JSON.parse(message);
      if (parsedMessage.type === 'register' && parsedMessage.userId) {
        users[parsedMessage.userId] = ws;
      } else if (parsedMessage.type === 'newComment' && parsedMessage.comment && parsedMessage.mentionedUserIds) {
        const { comment, mentionedUserIds } = parsedMessage;
        mentionedUserIds.forEach((userId) => {
          const userSocket = users[userId];
          if (userSocket && userSocket.readyState === WebSocket.OPEN) {
            userSocket.send(JSON.stringify({
              type: 'notification',
              message: `You were mentioned in a comment: ${comment.text}`,
              link: `/comments/${comment.id}`,
            }));
          }
        });
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      // Remove user from users object
      for (const [userId, userSocket] of Object.entries(users)) {
        if (userSocket === ws) {
          delete users[userId];
          break;
        }
      }
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
