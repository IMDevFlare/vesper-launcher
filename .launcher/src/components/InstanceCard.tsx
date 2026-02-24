import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import type { Instance } from '@/hooks/useLauncher';
import { Package, Blocks, Cpu } from 'lucide-react';

interface InstanceCardProps {
  instances: Instance[];
  selectedVersion: string;
  onSelect: (version: string) => void;
}

export function InstanceCard({ instances, selectedVersion, onSelect }: InstanceCardProps) {
  return (
    <div className="w-full flex-1 flex flex-col">
      <h3 className="text-zinc-500 font-mono text-[10px] mb-6 tracking-[0.2em] flex items-center gap-2 uppercase">
        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        Installed Instances
      </h3>
      <div className="grid grid-cols-1 gap-3 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {instances.map((instance) => {
          const isSelected = selectedVersion === instance.version;
          return (
            <motion.div
              key={instance.id}
              onClick={() => onSelect(instance.id)}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "p-4 flex flex-col gap-4 transition-all duration-300 cursor-pointer border rounded-xl relative overflow-hidden group",
                isSelected 
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/20' 
                  : 'border-border hover:border-zinc-600 bg-muted/40 hover:bg-muted/80'
              )}
            >
              {isSelected && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute top-0 left-0 w-1 h-full bg-accent" 
                />
              )}
              
              <div className="flex justify-between items-start">
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300",
                  isSelected 
                    ? 'text-accent border-accent/30 bg-accent/10' 
                    : 'bg-background text-zinc-500 border-border group-hover:border-zinc-700'
                )}>
                  {instance.loader === 'Vanilla' && <Package className="w-5 h-5" />}
                  {instance.loader === 'Fabric' && <Blocks className="w-5 h-5" />}
                  {instance.loader === 'NeoForge' && <Cpu className="w-5 h-5" />}
                </div>
                <div className="text-[9px] text-zinc-500 font-mono text-right uppercase leading-tight tracking-wider">
                  STAT_LAST_RUN<br/>
                  <span className={cn("text-[10px] font-bold", isSelected ? 'text-accent/80' : 'text-zinc-400')}>
                    {instance.last_played ? new Date(instance.last_played * 1000).toLocaleDateString() : 'NEVER'}
                  </span>
                </div>
              </div>

              <div>
                <div className="font-mono font-bold text-white text-sm tracking-tight">{instance.name}</div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-[0.1em]">{instance.version} • {instance.loader}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
