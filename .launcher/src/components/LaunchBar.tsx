import React from "react";
import { Play, Download, Square } from "lucide-react";
import type { LauncherState } from "@/hooks/useLauncher";
import { cn } from "@/lib/utils";

interface LaunchBarProps {
  state: LauncherState;
  onLaunch: () => void;
  onKill: () => void;
  selectedVersion: string;
}

import { motion } from "framer-motion";

export function LaunchBar({ state, onLaunch, onKill, selectedVersion }: LaunchBarProps) {
  let buttonStyle = "bg-accent text-accent-foreground hover:brightness-110";
  let label = "EXECUTE INITIALIZATION";
  let Icon = Play;
  let action = onLaunch;

  if (state === 'INITIALIZE') {
    buttonStyle = "bg-muted border-border text-zinc-500 cursor-not-allowed";
    label = "VERIFYING MANIFEST...";
    Icon = Download;
    action = () => {};
  } else if (state === 'ACTIVE') {
    buttonStyle = "bg-red-950/30 hover:bg-red-950/50 text-red-500 border-red-900/50";
    label = "KILL PROCESS";
    Icon = Square;
    action = onKill;
  }

  return (
    <div className="w-full relative group">


      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={action}
        className={cn(
          "w-full relative flex items-center justify-between p-1 transition-all duration-300 border rounded-xl overflow-hidden z-10",
          buttonStyle,
          state === 'ACTIVE' ? 'border-red-900/50' : 'border-black/10'
        )}
      >
        <div className="flex items-center gap-6 pl-6 relative z-10 w-full h-14">
          <div className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg border",
            state === 'ACTIVE' ? 'bg-red-950/50 border-red-900/50' : 'bg-black/10 border-black/10'

          )}>
            <Icon className={cn("w-5 h-5", state !== 'ACTIVE' ? 'fill-current' : '')} strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col items-start leading-none">
             <span className="font-mono font-black tracking-[0.2em] text-sm uppercase">{label}</span>
             <span className="text-[10px] opacity-40 font-mono mt-1 tracking-widest">SYS_TARGET_ID: MC_{selectedVersion}</span>
          </div>
          
          <div className="flex-1" />

          {/* Monospaced Version Info */}
          <div className={cn(
            "h-full px-8 flex items-center gap-2 font-mono text-sm tracking-[0.1em] transition-colors border-l",
            state === 'ACTIVE' ? 'border-red-900/50' : 'border-black/10',
            state !== 'ACTIVE' ? 'text-black/60' : 'text-red-500'
          )}>
             <span className="opacity-50 text-[10px]">VER</span>
             <span className="font-bold">v{selectedVersion}</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
