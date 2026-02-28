"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

const INSTALL_SCRIPT = "curl -sSfL https://vesper.devflare.de/install | sh";

export function Hero() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_SCRIPT);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch (e) {
      setCopyState("error");
      toast.error("Failed to copy install script to clipboard.");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  }

  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh]" id="hero">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-brand-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 backdrop-blur-sm mb-8"
      >
        <CheckCircleIcon className="w-4 h-4 text-brand-accent" />
        <span className="text-xs font-mono font-medium tracking-wide text-muted-foreground uppercase">
          Minecraft 1.21 Ready
        </span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex items-center gap-2 px-4 py-2 rounded-md border border-yellow-400 bg-yellow-100 text-yellow-800 mb-6"
        role="alert"
      >
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
        Designed for <span className="text-brand-accent italic">Performance</span>
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
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-3 font-mono relative overflow-hidden transition-all px-6 py-3 text-sm rounded-lg border-2 border-transparent ${copyState === "copied"
            ? "bg-green-600 border-green-700 text-background"
            : copyState === "error"
              ? "bg-destructive border-destructive text-background"
              : "bg-foreground text-background hover:border-brand-accent/40"
            }`}
          aria-label={copyState === "copied" ? "Copied!" : "Copy install script"}
          disabled={copyState === "copied"}
        >
          {copyState === "copied" ? (
            <CheckCircleIcon className="w-5 h-5" />
          ) : copyState === "error" ? (
            <XCircleIcon className="w-5 h-5" />
          ) : (
            <ArrowDownTrayIcon className="w-5 h-5" />
          )}
          <span className="relative z-10 font-mono font-semibold">
            {INSTALL_SCRIPT}
          </span>
        </button>
      </motion.div>
    </section>
  );
}