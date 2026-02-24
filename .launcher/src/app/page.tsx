"use client";
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { LaunchBar } from '@/components/LaunchBar';
import { InstanceCard } from '@/components/InstanceCard';
import { HardwareMonitor } from '@/components/HardwareMonitor';
import { SettingsOverlay } from '@/components/SettingsOverlay';
import { CreateInstanceModal } from '@/components/CreateInstanceModal';
import { useLauncher } from '@/hooks/useLauncher';
import { Settings, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const launcher = useLauncher();

  if (!launcher.playerName) {
    return (
      <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bento-panel p-12 flex flex-col items-center justify-center max-w-md w-full relative z-10"
        >
          <div className="mb-8 relative">
             <h1 className="text-4xl font-bold tracking-tight text-white font-mono uppercase relative">
               Vesper<span className="text-accent">.init()</span>
             </h1>
          </div>
          
          <p className="text-zinc-500 text-sm mb-10 text-center leading-relaxed font-mono">
            SYS_AUTH_REQUIRED. Please authenticate via Microsoft to sync your profile and access the Vesper environment.
          </p>
          
          <button 
            onClick={launcher.authenticate}
            className="w-full bg-accent text-accent-foreground hover:brightness-110 px-6 py-4 font-mono font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            EXECUTE AUTH LOGIC
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden p-6 flex flex-col gap-6 bg-background selection:bg-accent/30 selection:text-accent">
      {/* Header Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center glass p-4 rounded-xl"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
            Vesper<span className="text-accent">.init()</span>
          </h1>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
            <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Auth Online</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <HardwareMonitor />
          
          <div className="flex items-center gap-3">
                <Image 
                  src={`https://minotar.net/helm/${launcher.playerName}/40.png`} 
                  alt="Player" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-lg grayscale hover:grayscale-0 transition-all border border-border" 
                  style={{ imageRendering: 'pixelated' }} 
                />
             <span className="text-white font-mono text-sm uppercase tracking-tight">{launcher.playerName}</span>
          </div>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-zinc-500 hover:text-white transition-all bento-panel p-2.5 rounded-lg hover:bg-muted hover:scale-110 active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Main Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-12 gap-6 min-h-0 relative z-10"
      >
        {/* Left Column (Instances) */}
        <motion.div variants={itemVariants} className="col-span-4 flex flex-col gap-6">
          <div className="flex-1 bento-panel p-6 rounded-2xl flex flex-col relative">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] flex items-center gap-2 uppercase">
                 <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                 Installed Instances
               </h3>
               <button 
                 onClick={() => setIsCreateOpen(true)}
                 className="text-zinc-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
               >
                 <Plus className="w-4 h-4" />
               </button>
             </div>
             {launcher.instances.length === 0 ? (
               <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 font-mono text-xs text-center px-4">
                 No instances found. <br /> Click the + button to create one.
               </div>
             ) : (
               <InstanceCard 
                 instances={launcher.instances} 
                 selectedVersion={launcher.selectedInstanceId || ''} 
                 onSelect={launcher.setSelectedInstanceId} 
               />
             )}
          </div>
        </motion.div>

        {/* Right Column (Details / Launch) */}
        <motion.div variants={itemVariants} className="col-span-8 flex flex-col gap-6">
          <div className="flex-1 bento-panel p-8 relative flex flex-col justify-center rounded-2xl">
            {launcher.selectedInstanceId && launcher.instances.find(i => i.id === launcher.selectedInstanceId) ? (() => {
               const activeInstance = launcher.instances.find(i => i.id === launcher.selectedInstanceId)!;
               return (
                 <div className="flex flex-col h-full space-y-8">
                   <div className="flex justify-between items-start">
                     <div>
                       <h2 className="text-3xl font-bold font-mono text-white mb-2">{activeInstance.name}</h2>
                       <p className="text-accent text-sm font-mono tracking-widest">{activeInstance.version} • {activeInstance.loader}</p>
                     </div>
                     <button 
                       onClick={() => {
                         if (confirm("Are you sure you want to delete this instance?")) {
                           launcher.deleteInstance(activeInstance.slug);
                         }
                       }}
                       className="text-red-500/50 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all border border-transparent hover:border-red-900/50"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                   
                   <div className="flex-1 font-mono text-zinc-500 text-xs flex flex-col justify-end space-y-2">
                     <p>DIR: <span className="text-zinc-400">./vesper/instances/{activeInstance.slug}</span></p>
                     <p>LAST PLAYED: <span className="text-zinc-400">{activeInstance.last_played ? new Date(activeInstance.last_played * 1000).toLocaleString() : 'NEVER'}</span></p>
                     <p>TIME PLAYED: <span className="text-zinc-400">{activeInstance.time_played} SECONDS</span></p>
                   </div>
                 </div>
               );
            })() : (
              <div className="flex-1 flex items-center justify-center font-mono text-zinc-500 uppercase tracking-widest text-sm">
                 AWAITING_SELECTION...
              </div>
            )}
          </div>
          
          <div className="bento-panel p-4 rounded-xl">
            <LaunchBar 
               state={launcher.state}
               onLaunch={launcher.handleLaunch}
               onKill={launcher.killProcess}
               selectedVersion={launcher.instances.find(i => i.id === launcher.selectedInstanceId)?.version || 'NO_VERSION'}
            />
          </div>
        </motion.div>
      </motion.div>

      <SettingsOverlay 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        ram={launcher.ram}
        setRam={launcher.setRam}
      />

      <CreateInstanceModal 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        installedVersions={launcher.installedVersions}
        onCreate={launcher.createInstance}
      />
    </main>
  );
}
