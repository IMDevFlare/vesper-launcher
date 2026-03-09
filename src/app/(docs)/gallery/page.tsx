"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Sparkles } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Vesper Dashboard",
    category: "Interface",
    image: "/gallery/ui-1.png",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Code Precision",
    category: "Development",
    image: "/gallery/ui-2.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Brand Vision",
    category: "Branding",
    image: "/gallery/brand.png",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    title: "Performance First",
    category: "Stats",
    content: "Vesper is designed for ultimate performance and low latency in every interaction.",
    className: "md:col-span-1 md:row-span-1 bg-brand-accent/5 flex flex-col justify-center p-6 border-brand-accent/20",
    isText: true,
  },
  {
    id: 5,
    title: "Anti-Gravity Tech",
    category: "Core",
    content: "Floating UI elements and smooth transitions define the Vesper experience.",
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-background to-brand-accent/10 p-6 border-brand-accent/20",
    isText: true,
  },
];

export default function GalleryPage() {
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
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full pt-16 flex flex-col items-center">
        <div className="w-full max-w-6xl px-6 py-12 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-accent animate-in fade-in slide-in-from-top-4 duration-1000">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              A visual journey through Vesper&apos;s design system, interfaces, and core philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                className={`relative group rounded-3xl overflow-hidden border border-brand-accent/10 shadow-lg ${item.className}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {item.isText ? (
                  <div className="h-full w-full flex flex-col justify-end p-8 relative overflow-hidden">
                     <div className="absolute top-6 left-6">
                        <Badge variant="outline" className="text-brand-accent border-brand-accent/30 bg-brand-accent/5">
                            {item.category}
                        </Badge>
                     </div>
                     <div className="space-y-2 mt-auto">
                        <h2 className="text-2xl font-bold text-brand-accent">{item.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                     </div>
                     {/* Decorative element */}
                     <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles size={120} className="text-brand-accent" />
                     </div>
                  </div>
                ) : (
                  <>
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                        <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Badge className="bg-brand-accent text-black font-semibold mb-2">
                            {item.category}
                          </Badge>
                          <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                        </div>
                        <motion.button
                          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Maximize2 size={20} />
                        </motion.button>
                      </div>
                    </div>
                    {/* Border glow on hover */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-accent/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <p className="text-muted-foreground">
                More screens and brand assets coming soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
