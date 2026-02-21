"use client";
import React, { useState } from 'react';
import { LaunchBar } from '@/components/LaunchBar';
import { InstanceCard } from '@/components/InstanceCard';
import { TerminalFeed } from '@/components/TerminalFeed';
import { HardwareMonitor } from '@/components/HardwareMonitor';
import { SettingsOverlay } from '@/components/SettingsOverlay';
import { useLauncher } from '@/hooks/useLauncher';
import { Package, Blocks, Cpu, Settings } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const launcher = useLauncher();

  const instances = launcher.installedVersions.length > 0
    ? launcher.installedVersions.slice(0, 4).map(ver => ({
        version: ver,
        loader: "Local",
        lastPlayed: "UNKNOWN",
        icon: <Package className="w-5 h-5" />
      }))
    : [
        { version: "1.21.1", loader: "Fabric", lastPlayed: "2H AGO", icon: <Package className="w-5 h-5" /> },
        { version: "1.20.4", loader: "Forge", lastPlayed: "5D AGO", icon: <Blocks className="w-5 h-5" /> },
        { version: "1.19.2", loader: "Quilt", lastPlayed: "2W AGO", icon: <Cpu className="w-5 h-5" /> }
      ];

  if (!launcher.playerName) {
    return (
      <main className="min-h-screen w-full flex flex-col p-[2px] vesper-halo bg-vesper-charcoal rounded-xl overflow-hidden relative select-none items-center justify-center">
        <div className="absolute top-0 left-0 right-0 h-1 bg-vesper-glow/40 shadow-[0_0_80px_20px_rgba(209,145,60,0.2)]" />
        
        <div className="flex flex-col items-center justify-center p-14 rounded-2xl bg-vesper-charcoal/90 backdrop-blur-3xl z-10 border border-gray-800 shadow-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4 flex items-center gap-3">
            Vesper.<span className="text-gradient">init()</span>
          </h1>
          <p className="text-zinc-400 text-base mb-10 text-center max-w-sm leading-relaxed">
            Welcome back. Please authenticate with your Microsoft account to load your instances and synchronize your profile.
          </p>
          
          <button 
            onClick={launcher.authenticate}
            className="bg-white text-black hover:bg-zinc-200 px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-transparent shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Authenticate
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col p-[2px] vesper-halo bg-vesper-charcoal rounded-xl overflow-hidden relative select-none">
      <div className="absolute top-0 left-0 right-0 h-1 bg-vesper-glow/40 shadow-[0_0_80px_20px_rgba(16,185,129,0.2)]" />
      
      <div className="flex-1 flex flex-col p-8 rounded-xl bg-vesper-black/80 backdrop-blur-3xl z-10 w-full relative h-full">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-3">
              Vesper.<span className="text-gradient">init()</span>
            </h1>
            <p className="text-zinc-400 text-sm">Lightweight <span className="text-gradient font-bold">Performance</span> engine.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <HardwareMonitor />
            
            <div className="flex items-center gap-3 bg-zinc-900 border border-vesper-copper-end rounded-xl p-1.5 shadow-[0_0_15px_rgba(209,145,60,0.3)]">
               <Image src={`https://minotar.net/helm/${launcher.playerName}/40.png`} alt="Player" className="w-8 h-8 rounded-lg pixelated" style={{ imageRendering: 'pixelated' }} width={40} height={40}/>
               <span className="text-white font-bold text-sm pr-3">{launcher.playerName}</span>
            </div>

            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-zinc-500 hover:text-white transition-colors border border-gray-800 hover:border-white/20 p-3 rounded-xl bg-surface"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-end max-w-2xl mx-auto w-full mb-10">
          <InstanceCard 
            instances={instances} 
            selectedVersion={launcher.selectedVersion} 
            onSelect={launcher.setSelectedVersion} 
          />
        </div>

        <div className="mt-auto max-w-2xl mx-auto w-full">
          <LaunchBar 
             state={launcher.state}
             onLaunch={launcher.handleLaunch}
             onKill={launcher.killProcess}
             selectedVersion={launcher.selectedVersion}
          />
          <TerminalFeed logs={launcher.logs} />
        </div>
      </div>

      <SettingsOverlay 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        ram={launcher.ram}
        setRam={launcher.setRam}
      />
    </main>
  );
}
