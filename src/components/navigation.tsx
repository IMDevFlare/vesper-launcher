"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Navigation() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch("https://api.github.com/repos/itzzjustmateo/iml/releases/latest");
      const data = await res.json();
      const exeAsset = data.assets?.find((a: { name: string; browser_download_url: string }) => a.name.endsWith(".exe"));
      if (exeAsset) {
        window.location.href = exeAsset.browser_download_url;
      } else {
        window.open("https://github.com/itzzjustmateo/iml/releases/latest", "_blank");
      }
    } catch {
      window.open("https://github.com/itzzjustmateo/iml/releases/latest", "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <CommandLineIcon className="w-6 h-6 text-accent" />
            <span className="font-mono font-semibold tracking-tight text-foreground">
              Vesper.init()
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#system" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Requirements
          </a>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:ring-2 hover:ring-accent/50 hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              "Download for Windows"
            )}
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
