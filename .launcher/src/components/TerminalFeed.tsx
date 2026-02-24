import React, { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalFeedProps {
  logs: string[];
}

export function TerminalFeed({ logs }: TerminalFeedProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="w-full h-full flex flex-col min-h-[200px]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest">
          <Terminal className="w-4 h-4" strokeWidth={1.5} />
          SYS_OUT / LOGS
        </div>
        {logs.length > 0 && (
          <span className="text-[10px] text-accent font-mono animate-pulse">Running...</span>
        )}
      </div>

      <div className="bg-[#080808] border border-border flex-1 p-4 font-mono text-[11px] overflow-y-auto scrollbar-hide flex flex-col scanline relative rounded-xl group/terminal">
        
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "mb-1.5 flex gap-3",
                log.includes('[ERROR]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-amber-400' : 'text-zinc-400'
              )}
            >
              <span className="text-accent/40 select-none font-bold">[{i.toString().padStart(3, '0')}]</span>
              <span className="flex-1 leading-relaxed">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="animate-pulse text-accent mt-2 leading-none flex items-center gap-2">
           <span className="w-1.5 h-3 bg-accent" />
           <span className="text-[10px] opacity-30 tracking-[0.3em]">AWAITING_INPUT...</span>
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
