import React from "react";
import { Zap, Activity } from "lucide-react";

export function HardwareMonitor() {
  return (
    <div className="flex gap-6 items-center glass px-6 rounded-lg h-10 border border-white/5">
      <div className="flex items-center gap-2.5 group">
        <Activity className="w-3.5 h-3.5 text-accent animate-pulse" strokeWidth={2} />
        <div className="flex flex-col justify-center">
          <span className="text-[8px] text-zinc-500 font-mono leading-none tracking-[0.2em] mb-1">MEM_USAGE</span>
          <span className="text-[10px] font-mono text-white font-bold leading-none">8.0GB_ACTIVE</span>
        </div>
      </div>
      
      <div className="w-px h-4 bg-white/10" />
      
      <div className="flex items-center gap-2.5 group">
        <Zap className="w-3.5 h-3.5 text-accent group-hover:drop-shadow-[0_0_8px_rgba(209,145,60,0.5)] transition-all" strokeWidth={2} />
        <div className="flex flex-col justify-center">
          <span className="text-[8px] text-zinc-500 font-mono leading-none tracking-[0.2em] mb-1">CPU_LOAD</span>
          <span className="text-[10px] font-mono text-white font-bold leading-none">12T_OPTIMIZED</span>
        </div>
      </div>
    </div>
  );
}
