import React from "react";
import { Package, Blocks, Cpu } from "lucide-react";

export function ModGrid() {
  const integrations = [
    {
      name: "Modrinth",
      status: "Optimized",
      icon: <Package className="w-5 h-5 text-accent" strokeWidth={1.5} />,
    },
    {
      name: "CurseForge",
      status: "Available",
      icon: <Blocks className="w-5 h-5 text-accent/80" strokeWidth={1.5} />,
    },
    {
      name: "Quilt",
      status: "Native",
      icon: <Cpu className="w-5 h-5 text-accent/60" strokeWidth={1.5} />,
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-zinc-500 font-mono text-[10px] mb-4 tracking-[0.2em] flex items-center gap-2 uppercase">
        <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-50" />
        Native Integrations
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div key={item.name} className="glass rounded-xl p-4 flex flex-col gap-4 hover:bg-white/[0.05] transition-all duration-300 border border-white/5 hover:border-accent/20 cursor-pointer group">
            <div className="bg-black/40 w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-accent/20 transition-all">
              {item.icon}
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight">{item.name}</div>
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5 tracking-wider uppercase">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
