import { useEffect, useState } from "react";
import { PerformanceData } from "../../interface/index";
import socket from "../../lib/Socket";
import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";
import "./Widget.css";

const Widget = ({ data }: { data: PerformanceData }) => {
  const [isAlive, setIsAlive] = useState(true);

  const {
    macAddress,
    osType,
    upTime,
    cpuModel,
    cpuSpeed,
    cpuCount,
    cpuLoad,
    totalMem,
    freeMem,
    usedMem,
    memUseage,
  } = data;

  const cpuData = {
    cpuLoad,
  };

  const memData = {
    totalMem,
    freeMem,
    usedMem,
    memUseage,
  };

  const infoData = {
    cpuModel,
    cpuSpeed,
    cpuCount,
    macAddress,
    osType,
    upTime,
  };

  useEffect(() => {
    socket.on("connected_Or_Disconnected", ({ machineMacA, isAlive }) => {
      if (machineMacA === macAddress) {
        setIsAlive(isAlive);
      }
    });

    return () => {
      socket.off("connected_Or_Disconnected");
    };
  }, [macAddress]);

  const notAlive = !isAlive ? <div className="not-alive">Not Alive</div> : <></>;

  return (
    <div className="container">
      <div className="widget row justify-content-evenly">
        {notAlive}
        <Cpu cpuData={cpuData} />
        <Mem memData={memData} />
        <Info infoData={infoData} />
      </div>
    </div>
  );
};

export default Widget;

