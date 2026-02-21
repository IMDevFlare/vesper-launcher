"use client";

import { motion } from "framer-motion";
import { CommandLineIcon } from "@heroicons/react/24/outline";

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CommandLineIcon className="w-6 h-6 text-accent" />
          <span className="font-mono font-semibold tracking-tight text-foreground">
            Vesper.init()
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#system" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Requirements
          </a>
          <button className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:ring-2 hover:ring-accent/50 hover:bg-foreground/90 transition-all">
            Download for Windows
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
