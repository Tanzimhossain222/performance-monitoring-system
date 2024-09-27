import { useEffect, useRef } from "react";
import { CpuData } from "../../interface";
import drawCircle from "../../utils/canvasLoadAnimation";
 
const Cpu = ({ cpuData }: { cpuData: CpuData }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasEl.current) {
      drawCircle(canvasEl.current, cpuData.cpuLoad);
    }
  }, [cpuData.cpuLoad]);

  return (
    <div className="cpu col-3">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasEl} className="" width="200" height="200"></canvas>
        <div className="cpu-text">{cpuData.cpuLoad.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default Cpu;
