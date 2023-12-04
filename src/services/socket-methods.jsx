import { connectSocket } from "./socket-utils";

let socketInstance;

const getSocketInstance = async () => {
  if (!socketInstance || !socketInstance.connected) {
    const { socket } = await connectSocket();
    socketInstance = socket;
  }
  return socketInstance;
};

export const getNotificationCount = async (event, callback) => {
  try {
    const socket = await getSocketInstance();
    socket.on(event, (data) => callback(data));
  } catch (error) {
    console.error("Error listening for data:", error);
  }
};
