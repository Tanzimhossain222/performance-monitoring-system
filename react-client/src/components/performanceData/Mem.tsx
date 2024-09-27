import { useEffect, useRef } from "react";
import { MemData } from "../../interface";
import drawCircle from "../../utils/canvasLoadAnimation";

const Mem = ({ memData }: { memData: MemData }) => {
  console.log(memData);

  const memRef = useRef<HTMLCanvasElement>(null);

  const totalMemInGB = Math.floor((memData.totalMem / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((memData.freeMem / 1073741824) * 100) / 100;
  let memUseage = Math.floor(memData.memUseage * 100 * 100) / 100;

  //if memUseage is floating point number, then 2 decimal places
  if (memUseage % 1 !== 0) {
    memUseage = parseFloat(memUseage.toFixed(2));
  }

  useEffect(() => {
    if (memRef.current) {
      drawCircle(memRef.current, memUseage);
    }
  }, [memUseage]);

  return (
    <div className="mem col-3">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas ref={memRef} width="200" height="200"></canvas>
        <div className="mem-text">{memUseage}%</div>
      </div>
      <div>Total Memory: {totalMemInGB} GB</div>
      <div>Free Memory: {freeMemInGB} GB</div>
    </div>
  );
};

export default Mem;

