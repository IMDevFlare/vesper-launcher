import React from "react";
import { Zap, Activity } from "lucide-react";

export function HardwareMonitor() {
  return (
    <div className="flex gap-6 items-center bg-surface px-6 py-3 rounded-xl border border-white/5">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-vesper-glow" strokeWidth={1.5} />
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-mono leading-none tracking-widest">RAM ALLOC</span>
          <span className="text-sm text-white font-bold leading-none mt-1">8.0 GB</span>
        </div>
      </div>
      
      <div className="w-px h-8 bg-white/10" />
      
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-mono leading-none tracking-widest">CPU THREADS</span>
          <span className="text-sm text-white font-bold leading-none mt-1">12 Total</span>
        </div>
      </div>
    </div>
  );
}
