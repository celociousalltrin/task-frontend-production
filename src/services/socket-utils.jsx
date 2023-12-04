import { io } from "socket.io-client";

let socketInstance;

export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    if (socketInstance && socketInstance.connected) {
      // Reusing the existing socket
      resolve({ socket: socketInstance });
    } else {
      const socket = io(import.meta.env.VITE_REACT_APP_SOCKET_SERVER_URL);

      // Handle the 'connect' event
      socket.on("connect", () => {
        socketInstance = socket; // Store the socket instance
        resolve({ socket });
      });

      // Handle the 'connect_error' event
      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        reject(err);
      });
    }
  });
};

export const disconnectSocket = () => {
  if (socketInstance && socketInstance.connected) {
    socketInstance.disconnect();
  } else {
    console.log("No active socket to disconnect");
  }
};
