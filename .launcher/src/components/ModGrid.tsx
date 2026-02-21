import React from "react";
import { Package, Blocks, Cpu } from "lucide-react";

export function ModGrid() {
  const integrations = [
    {
      name: "Modrinth",
      status: "Optimized",
      icon: <Package className="w-5 h-5 text-vesper-glow" strokeWidth={1} />,
    },
    {
      name: "CurseForge",
      status: "Available",
      icon: <Blocks className="w-5 h-5 text-orange-400" strokeWidth={1} />,
    },
    {
      name: "Quilt",
      status: "Native",
      icon: <Cpu className="w-5 h-5 text-purple-400" strokeWidth={1} />,
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-zinc-500 font-mono text-xs mb-3 tracking-widest uppercase">Native Integrations</h3>
      <div className="grid grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div key={item.name} className="bg-surface rounded-2xl p-4 flex flex-col gap-3 hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10 cursor-pointer">
            <div className="bg-black/40 w-10 h-10 rounded-xl flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{item.name}</div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
