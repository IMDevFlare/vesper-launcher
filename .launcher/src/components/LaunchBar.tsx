import React from "react";
import { Play } from "lucide-react";

export function LaunchBar() {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* Main Launch Button */}
      <button className="flex-1 group relative flex items-center justify-between bg-vesper-glow/10 hover:bg-vesper-glow/20 border border-vesper-glow/50 text-vesper-glow rounded-xl px-6 py-4 overflow-hidden transition-all duration-300">
        <div className="absolute inset-0 bg-linear-to-r from-vesper-glow/0 via-vesper-glow/5 to-vesper-glow/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="flex items-center gap-4">
          <Play className="w-6 h-6 fill-current" strokeWidth={1} />
          <span className="font-bold tracking-widest text-lg">LAUNCH INITIALIZATION</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono opacity-60">
          <span>--system-ready</span>
        </div>
      </button>

      {/* Version Selector */}
      <div className="bg-surface rounded-xl px-4 py-4 flex flex-col justify-center items-center min-w-[120px] cursor-pointer hover:bg-white/5 transition-colors">
        <span className="text-xs text-zinc-400 font-mono mb-1">TARGET_VER</span>
        <span className="font-bold text-white tracking-wide text-lg">1.21.x</span>
      </div>
    </div>
  );
}
