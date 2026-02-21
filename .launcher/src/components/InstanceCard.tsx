import React from 'react';

interface Instance {
  version: string;
  loader: string;
  lastPlayed: string;
  icon: React.ReactNode;
}

interface InstanceCardProps {
  instances: Instance[];
  selectedVersion: string;
  onSelect: (version: string) => void;
}

export function InstanceCard({ instances, selectedVersion, onSelect }: InstanceCardProps) {
  return (
    <div className="w-full">
      <h3 className="text-zinc-500 font-mono text-xs mb-3 tracking-widest uppercase">Installed Instances</h3>
      <div className="grid grid-cols-2 gap-4">
        {instances.map((instance) => {
          const isSelected = selectedVersion === instance.version;
          return (
            <div
              key={instance.version}
              onClick={() => onSelect(instance.version)}
              className={`bg-surface rounded-2xl p-4 flex flex-col gap-3 transition-colors cursor-pointer ${
                isSelected 
                  ? 'border-vesper-copper-end bg-white/5 shadow-[0_0_20px_rgba(209,145,60,0.15)]' 
                  : 'hover:border-white/10 hover:bg-white/5 border border-gray-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${isSelected ? 'text-vesper-copper-end' : 'bg-black/40 text-white'}`}>
                  {instance.icon}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono text-right">
                  LAST PLAYED<br/>
                  <span className="text-zinc-300">{instance.lastPlayed}</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Minecraft {instance.version}</div>
                <div className="text-xs text-zinc-500 font-mono mt-0.5">{instance.loader}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
