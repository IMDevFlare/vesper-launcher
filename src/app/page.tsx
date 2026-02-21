"use client";

import { Navigation } from "../components/navigation";
import { Hero } from "../components/hero";
import { FeatureCards } from "../components/feature_cards";
import { SystemRequirements } from "../components/SystemRequirements";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-accent/30 selection:text-accent">
      {/* Subtle Dot Grid Background */}
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div 
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />
      
      {/* Vesper Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <Navigation />
      
      <main className="flex-1 w-full pt-16">
        <Hero />
        <FeatureCards />
        <SystemRequirements />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50 bg-muted/10 backdrop-blur-sm mt-10">
        <div className="max-w-7xl mx-auto px-6 font-mono flex items-center justify-between">
          <p>© {new Date().getFullYear()} Vesper.init()</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
            <span>Auth Services Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
