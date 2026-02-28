"use client";

import { motion } from "framer-motion";
import { CpuChipIcon, CheckBadgeIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

const requirements = [
  {
    category: "Java Runtime",
    specs: "Java 17 or 21 (Latest Recommended)",
    icon: CpuChipIcon,
  },
  {
    category: "Operating System",
    specs: "Windows 10/11 (64-bit)",
    icon: ComputerDesktopIcon,
  },
  {
    category: "Integrations",
    specs: "Discord for RPC and Modloader presence",
    icon: CheckBadgeIcon,
  }
];

export function SystemRequirements() {
  return (
    <section id="system" className="max-w-7xl mx-auto px-6 py-20 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-mono font-bold text-foreground mb-4">
          System <span className="text-brand-accent">Requirements</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Vesper is optimized for high-performance devices, ensuring minimal overhead while maintaining maximum compatibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {requirements.map((req, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-xl bg-muted/20 border border-border flex flex-col items-center text-center group hover:border-brand-accent/30 transition-colors"
          >
            <req.icon className="w-10 h-10 text-brand-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-mono font-bold text-foreground mb-2">{req.category}</h3>
            <p className="text-sm text-muted-foreground font-medium">{req.specs}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
