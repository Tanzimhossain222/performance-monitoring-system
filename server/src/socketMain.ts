import { Server } from "socket.io";

export const socketMain = (io: Server, pid: number) => {
  io.on("connection", (socket) => {
    const auth = socket.handshake.auth;
    let machineMacA='';

    if (!auth.token) {
      socket.disconnect();
      return;
    }

    const token = auth.token;

    if (token === "1234567890") {
      socket.join("reactClient");
    } else if (token === "239rfaiskdfvq243EGa4q3wefsdad") {
      socket.join("nodeClient");
    }

    socket.on("performanceData", (data) => {
      if (!machineMacA) {
        machineMacA = data.macAddress;
      }
      socket.to("reactClient").emit("performanceData", data);
    });

    socket.on("disconnect", (reason) => {
      socket.to("reactClient").emit("connected_Or_Disconnected", {
        machineMacA: machineMacA,
        isAlive: false,
      });
    });
  });
};

