import React from "react";
import { Settings2, X, Cpu, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  ram: string;
  setRam: (ram: string) => void;
}

export function SettingsOverlay({ isOpen, onClose, ram, setRam }: SettingsOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-background w-full max-w-md relative z-10 flex flex-col rounded-2xl overflow-hidden border border-border"
          >
            <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-white flex gap-3 items-center uppercase">
                <Settings2 className="w-4 h-4 text-accent" strokeWidth={2} />
                ENGINE_CONFIGURATION
              </h2>
              <button 
                onClick={onClose} 
                className="text-zinc-500 hover:text-white transition-all hover:bg-white/10 p-1.5 rounded-lg active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* RAM Allocation */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-zinc-500 tracking-[0.15em] flex items-center gap-2 uppercase">
                  <Cpu className="w-3.5 h-3.5 text-accent/60" strokeWidth={2} /> 
                  VIRTUAL_MEMORY_LIMIT
                </label>
                <div className="flex gap-2 p-1 bg-muted rounded-xl border border-border">
                  {['2G', '4G', '8G'].map(val => (
                    <button
                      key={val}
                      onClick={() => setRam(val)}
                      className={cn(
                        "flex-1 py-3 text-xs font-mono transition-all duration-300 rounded-lg border",
                        ram === val 
                          ? 'bg-accent/10 text-accent border border-accent/30' 
                          : 'text-zinc-500 hover:text-white hover:bg-muted/80 border-transparent'
                      )}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest pl-1">Target: {ram} Allocation</p>
              </div>

              {/* Java Executable */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-zinc-500 tracking-[0.15em] flex items-center gap-2 uppercase">
                  <FolderOpen className="w-3.5 h-3.5 text-accent/60" strokeWidth={2} /> 
                  EXECUTION_ENVIRONMENT
                </label>
                <div className="border border-border bg-muted/50 rounded-xl px-5 py-4 flex items-center justify-between text-zinc-400 text-xs font-mono group hover:border-accent/40 hover:text-zinc-300 transition-all cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-white/80 font-bold uppercase tracking-tight">System Default</span>
                    <span className="text-[9px] text-zinc-600 mt-1">AUTO_DETECT_JAVA_PATH</span>
                  </div>
                  <FolderOpen className="w-4 h-4 text-accent/40 group-hover:text-accent transition-all" />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/10">
              <div className="flex justify-between items-center px-2">
                <p className="text-[9px] text-zinc-600 font-mono tracking-widest">VESPER.INIT() v0.1.0-BETA</p>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                  <span className="text-[8px] text-zinc-600 font-mono uppercase">sys_ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
