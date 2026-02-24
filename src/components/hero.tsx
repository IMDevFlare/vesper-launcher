"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, ArrowDownTrayIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 backdrop-blur-sm mb-8"
      >
        <CheckCircleIcon className="w-4 h-4 text-accent" />
        <span className="text-xs font-mono font-medium tracking-wide text-muted-foreground uppercase">
          Minecraft 1.21 Ready
        </span>
      </motion.div>

      {/* Yellow information box indicating script status */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex items-center gap-2 px-4 py-2 rounded-md border border-yellow-400 bg-yellow-100 text-yellow-800 mb-6"
        role="alert"
      >
        {/* If not using Hero Icons v2.0+, you might not have ExclamationTriangleIcon.
            If unavailable, replace with <span>!</span> or another icon. */}
        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
        <span className="font-mono text-sm font-medium">
          The install script is <span className="font-bold">not working yet</span>, as the launcher is still in development.
        </span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold text-center tracking-tight text-foreground max-w-4xl"
      >
        Designed for <span className="text-accent italic">Performance</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
      >
        A sleek, highly optimized Minecraft launcher built for power users. 
        Forget bloated UIs. Just raw speed and modularity.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex items-center justify-center gap-4"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-foreground text-background shadow-lg border-2 border-transparent hover:border-accent/40 font-mono text-sm relative overflow-hidden group transition-all cursor-pointer">
          <ArrowDownTrayIcon className="w-5 h-5 text-background" />
          <span className="relative z-10 font-mono font-semibold">curl -sSfL https://vesper.devflare.de/install | sh</span>
        </div>
      </motion.div>
    </section>
  );
}
