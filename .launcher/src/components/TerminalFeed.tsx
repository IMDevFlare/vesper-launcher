import React, { useState } from "react";
import { ChevronDown, ChevronRight, Terminal } from "lucide-react";

export function TerminalFeed() {
  const [isOpen, setIsOpen] = useState(false);
  
  const logs = [
    "[INFO] Initializing Vesper core components...",
    "[INFO] Checking local Java runtime (JBR 21.0.3+9-b425.2)...",
    "[WARN] OptiFine detected in mods folder. Recommended: replace with Sodium.",
    "[INFO] Allocating 8192MB RAM. ZGC enabled.",
    "[INFO] Verifying asset index 1.21.json...",
    "[INFO] Ready for launch sequence."
  ];

  return (
    <div className="w-full mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors py-2 text-xs font-mono uppercase tracking-widest"
      >
        {isOpen ? <ChevronDown className="w-4 h-4" strokeWidth={1} /> : <ChevronRight className="w-4 h-4" strokeWidth={1} />}
        <Terminal className="w-4 h-4" strokeWidth={1} />
        Initialize Logic
      </button>

      {isOpen && (
        <div className="bg-[#020202] border border-white/5 rounded-xl p-4 mt-2 font-mono text-xs h-32 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className={`mb-1 ${log.includes('[WARN]') ? 'text-amber-400' : 'text-zinc-400'}`}>
              <span className="text-zinc-600 select-none mr-2">{'>'}</span>
              {log}
            </div>
          ))}
          <div className="animate-pulse text-vesper-glow mt-2">_</div>
        </div>
      )}
    </div>
  );
}
