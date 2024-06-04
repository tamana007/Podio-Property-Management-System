// utils/socket.ts
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

export default socket;
