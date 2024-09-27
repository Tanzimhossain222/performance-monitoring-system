import { io } from "socket.io-client";
const options = {
  auth: {
    token: "1234567890",
  },
};
const socket = io("http://localhost:3000", options);


export default socket;
