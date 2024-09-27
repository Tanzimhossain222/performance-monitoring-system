import os from "os";
import io from "socket.io-client";

const options = {
  auth: {
    token: "239rfaiskdfvq243EGa4q3wefsdad",
  },
};

const socket = io("http://127.0.0.1:3000", options);

socket.on("connect", () => {
  const nI = os.networkInterfaces();
  let macAddress = "";

  for (let key in nI) {
    if (nI[key] && nI[key].length > 0) {
      const isInternetFacing = !nI[key][0].internal;
      if (isInternetFacing && nI[key][0].mac) {
        macAddress = nI[key][0].mac + Math.floor(Math.random() * 1000000);
        break;
      }
    }
  }

  const perDataInterval = setInterval(async () => {
    const perfData = (await performanceLoadData()) as any;
    perfData.macAddress = macAddress;
    socket.emit("performanceData", perfData);
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(perDataInterval);
  });
});

const cpuAverage = () => {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      if (type === "idle") {
        idleMs += cpu.times[type];
      }
      totalMs += cpu.times[type as keyof typeof cpu.times];
    }
  }

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () =>
  new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentOfCpuUsed = 100 - (idleDiff / totalDiff) * 100;
      resolve(percentOfCpuUsed);
    }, 1000);
  });

const performanceLoadData = () => {
  return new Promise((resolve, reject) => {
    getCpuLoad()
      .then((cpuLoad) => {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const memUseage = Math.round((usedMem / totalMem) * 100) / 100;
        const osType = os.type();
        const upTime = os.uptime();
        const cpuModel = os.cpus()[0].model;
        const cpuSpeed = os.cpus()[0].speed;
        const cpuCount = os.cpus().length;

        resolve({
          cpuLoad,
          totalMem,
          freeMem,
          usedMem,
          memUseage,
          osType,
          upTime,
          cpuModel,
          cpuSpeed,
          cpuCount,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
