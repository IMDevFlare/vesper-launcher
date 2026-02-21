import React from 'react';
import { LaunchBar } from '@/components/LaunchBar';
import { ModGrid } from '@/components/ModGrid';
import { TerminalFeed } from '@/components/TerminalFeed';
import { HardwareMonitor } from '@/components/HardwareMonitor';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col p-[2px] vesper-halo bg-vesper-charcoal rounded-xl overflow-hidden relative">
      {/* Vesper Glow Background Blur Layer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-vesper-glow/40 shadow-[0_0_80px_20px_rgba(16,185,129,0.2)]" />
      
      {/* Content wrapper */}
      <div className="flex-1 flex flex-col p-8 rounded-xl bg-vesper-black/80 backdrop-blur-3xl z-10 w-full relative h-full">
        {/* Top Header */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Vesper.<span className="text-gradient">init()</span>
            </h1>
            <p className="text-zinc-400 text-sm">Lightweight performance engine.</p>
          </div>
          <HardwareMonitor />
        </header>

        {/* Main Interface Grid */}
        <div className="flex-1 flex flex-col justify-end max-w-2xl mx-auto w-full mb-10">
          <ModGrid />
        </div>

        {/* Bottom Launch Area */}
        <div className="mt-auto max-w-2xl mx-auto w-full">
          <LaunchBar />
          <TerminalFeed />
        </div>
      </div>
    </main>
  );
}
