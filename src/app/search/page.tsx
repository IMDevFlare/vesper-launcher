"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, ArrowRight, Sparkles } from "lucide-react";

export default function SearchPage() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
      {/* Background elements */}
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />
      
      <main className="flex-1 w-full flex flex-col items-center justify-center -mt-20">
        <div className="w-full max-w-4xl px-6 py-12 mx-auto space-y-12">
          
          {/* Hero Section */}
          <div className="text-center relative">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2">
              <span>Search</span>
              <span className="relative inline-block mt-4 md:mt-0">
                {/* Floating "everything" */}
                <motion.span 
                  className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-medium text-brand-accent italic whitespace-nowrap"
                  initial={{ opacity: 0, y: 10, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: -2 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  everything
                </motion.span>
                
                {/* "any" with strikethrough */}
                <span className="relative">
                  any
                  <svg 
                    className="absolute inset-0 -left-2 -right-2 top-1/2 -translate-y-1/2 w-[calc(100%+16px)] h-12 pointer-events-none"
                    viewBox="0 0 100 24"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M2,12 C20,8 40,16 60,10 C80,4 98,14 98,12"
                      fill="transparent"
                      strokeWidth="3"
                      stroke="currentColor"
                      className="text-brand-accent/60"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
             <div className="absolute -inset-1 bg-linear-to-r from-brand-accent/20 via-brand-accent/40 to-brand-accent/20 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
             <div className="relative flex items-center">
                <SearchIcon className="absolute left-6 h-6 w-6 text-muted-foreground group-hover:text-brand-accent transition-colors duration-300" />
                <Input
                  autoFocus
                  readOnly
                  placeholder="Search documentation, news, or guides..."
                  className="h-20 w-full pl-16 pr-20 text-xl md:text-2xl bg-background/80 backdrop-blur-xl border-brand-accent/20 rounded-2xl focus-visible:ring-brand-accent/30 focus-visible:border-brand-accent transition-all duration-300 shadow-2xl cursor-pointer"
                  onClick={() => window.dispatchEvent(new CustomEvent("vesper:open-cmdk"))}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute right-6 flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded hidden md:inline-block border border-border">
                        ENTER
                    </span>
                    <button className="p-2 rounded-lg bg-brand-accent text-brand-accent-foreground hover:opacity-90 transition-opacity">
                        <ArrowRight className="h-6 w-6" />
                    </button>
                </div>
             </div>
          </div>

          {/* Quick links / Categories */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
             <span>Popular:</span>
             <button className="hover:text-brand-accent transition-colors underline decoration-brand-accent/20">Installation</button>
             <button className="hover:text-brand-accent transition-colors underline decoration-brand-accent/20">API Reference</button>
             <button className="hover:text-brand-accent transition-colors underline decoration-brand-accent/20">Custom Themes</button>
             <button className="hover:text-brand-accent transition-colors underline decoration-brand-accent/20">Plugin Dev</button>
          </div>
        </div>
      </main>

      {/* Decorative floating icon */}
      <motion.div 
        className="fixed bottom-12 right-12 text-brand-accent/20 pointer-events-none"
        animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
        }}
        transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
        }}
      >
        <Sparkles size={120} />
      </motion.div>
    </div>
  );
}
