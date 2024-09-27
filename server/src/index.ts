import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import cluster from "cluster";
import http from "http";
import os from "os";
import { Server } from "socket.io";
import { socketMain } from "./socketMain";

const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`isPrimary ${process.pid} is running`);

  const httpServer = http.createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(3000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:8080",
      credentials: true,
    },
  });

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  // Socket main is Our function to handle socket events
  socketMain(io, process.pid);
}
