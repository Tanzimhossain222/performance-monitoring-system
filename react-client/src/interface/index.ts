
export interface CpuData {
  cpuLoad: number;
}

export interface MemData {
  totalMem: number;
  freeMem: number;
  usedMem: number;
  memUseage: number;
}

export interface InfoData {
  cpuModel: string;
  cpuSpeed: number;
  cpuCount: number;
  macAddress: string;
  osType: string;
  upTime: number;
}

export interface PerformanceData extends CpuData, MemData, InfoData {}
