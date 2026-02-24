import React, { useState } from "react";
import { X, Package, Blocks, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LoaderType } from "@/hooks/useLauncher";

interface CreateInstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  installedVersions: string[];
  onCreate: (name: string, slug: string, version: string, loader: LoaderType) => Promise<void>;
}

export function CreateInstanceModal({ isOpen, onClose, installedVersions, onCreate }: CreateInstanceModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [version, setVersion] = useState(installedVersions[0] || "1.21.11");
  const [loader, setLoader] = useState<LoaderType>("Vanilla");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !version) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onCreate(name, slug, version, loader);
      onClose();
      // Reset form
      setName("");
      setSlug("");
      setVersion(installedVersions[0] || "1.21.11");
      setLoader("Vanilla");
    } catch (err: unknown) {
      setError(String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-background w-full max-w-md relative z-10 flex flex-col rounded-2xl overflow-hidden border border-border"
          >
            <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-white flex gap-3 items-center uppercase">
                <Package className="w-4 h-4 text-accent" strokeWidth={2} />
                INITIALIZE_NEW_INSTANCE
              </h2>
              <button 
                onClick={onClose} 
                className="text-zinc-500 hover:text-white transition-all hover:bg-muted p-1.5 rounded-lg active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-3 bg-red-950/30 border border-red-900/50 text-red-500 text-[10px] font-mono rounded-lg">
                  [ERROR] {error}
                </div>
              )}

              {/* Identity */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-zinc-500 tracking-[0.15em] flex items-center gap-2 uppercase">
                  INSTANCE_IDENTITY
                </label>
                <div className="space-y-2 text-xs font-mono">
                  <input 
                    type="text" 
                    value={name}
                    onChange={handleNameChange}
                    placeholder="E.g. Survival World"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <input 
                    type="text" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="slug (e.g. survival-world)"
                    className="w-full bg-black/40 border border-transparent rounded-lg px-4 py-2 text-zinc-500 focus:outline-none focus:border-white/10 transition-colors"
                  />
                </div>
              </div>

              {/* Version */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-zinc-500 tracking-[0.15em] flex items-center gap-2 uppercase">
                  TARGET_VERSION
                </label>
                <select 
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
                >
                  {installedVersions.length > 0 ? installedVersions.map(v => (
                    <option key={v} value={v}>{v}</option>
                  )) : (
                    <>
                      <option value="1.21.11">1.21.11</option>
                      <option value="1.21">1.21</option>
                      <option value="1.20.4">1.20.4</option>
                      <option value="1.20">1.20</option>
                      <option value="1.19.2">1.19.2</option>
                      <option value="1.19">1.19</option>
                    </>
                  )}
                </select>
              </div>

              {/* Loader Type */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-zinc-500 tracking-[0.15em] flex items-center gap-2 uppercase">
                  EXECUTION_ENVIRONMENT
                </label>
                <div className="flex gap-2 p-1 bg-muted rounded-xl border border-border">
                  {(['Vanilla', 'Fabric', 'NeoForge'] as LoaderType[]).map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setLoader(val)}
                      className={cn(
                        "flex-1 py-3 text-xs font-mono transition-all duration-300 rounded-lg border flex flex-col items-center justify-center gap-2",
                        loader === val 
                          ? 'bg-accent/10 text-accent border border-accent/30' 
                          : 'text-zinc-500 hover:text-white hover:bg-muted/80 border-transparent'
                      )}
                    >
                      {val === 'Vanilla' && <Package className="w-4 h-4" />}
                      {val === 'Fabric' && <Blocks className="w-4 h-4" />}
                      {val === 'NeoForge' && <Cpu className="w-4 h-4" />}
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground hover:brightness-110 disabled:bg-muted disabled:text-zinc-500 px-6 py-4 font-mono font-bold text-sm transition-all duration-300 mt-4 rounded-xl"
              >
                {isSubmitting ? "PROCESSING..." : "COMMIT_INSTANCE"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
