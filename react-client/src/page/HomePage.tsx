import { useEffect, useState } from "react";
import Widget from "../components/performanceData/Widget";
import { PerformanceData } from "../interface";
import socket from "../lib/Socket";

const HomePage = () => {
  const [performanceData, setPerformanceData] = useState<
    Record<string, PerformanceData>
  >({});
  const perfMachineData = {} as any;

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(perfMachineData);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [perfMachineData]);

  useEffect(() => {
    socket.on("performanceData", (data: PerformanceData) => {
      perfMachineData[data.macAddress] = data;
    });

    return () => {
      socket.off("performanceData");
    };
  }, [perfMachineData]);

  const widgetData = Object.values(performanceData).map((data, i) => {
    return <Widget key={`widget-${data.macAddress}-${i}`} data={data} />;
  });

  return <div className="container">{widgetData}</div>;
};

export default HomePage;

