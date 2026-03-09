"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { CommandLineIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Search, Image as ImageIcon, History, Map, Home, Command as CommandIcon } from "lucide-react";
import Link from "next/link";
import DownloadModal from "./download_modal";

function GitHubIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <title>GitHub</title>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.021c0 4.427 2.867 8.184 6.839 9.504.5.093.682-.217.682-.482
        0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608
        1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.339-2.22-.253-4.555-1.113-4.555-4.951
        0-1.093.39-1.987 1.029-2.686-.103-.254-.447-1.272.098-2.651 0 0 .84-.27 2.75 1.025A9.564 9.564 0
        0 1 12 6.844a9.6 9.6 0 0 1 2.504.338c1.909-1.296 2.747-1.025 2.747-1.025.547 1.379.203 2.397.1 2.651.64.699
        1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012
        2.417-.012 2.747 0 .267.18.579.688.481A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Changelog", href: "/changelog", icon: History },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Search", href: "/search", icon: Search },
];

const menuVariants: Variants = {
  closed: { opacity: 0, y: -20, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenDownloadModal = () => {
    setDownloadModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("vesper:open-cmdk"));
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-white/5"
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 z-60 group">
            <div className="p-2 rounded-xl bg-brand-accent/10 group-hover:bg-brand-accent/20 transition-colors">
              <CommandLineIcon className="w-6 h-6 text-brand-accent" />
            </div>
            <span className="font-mono font-bold tracking-tight text-foreground text-lg italic">Vesper.init()</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                    isActive 
                      ? "text-brand-accent bg-brand-accent/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="h-4 w-px bg-white/10 mx-4" />
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenSearch}
                className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all duration-200"
              >
                <Search className="size-4" />
                <span>Search...</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-bold">
                  <span className="text-[8px] opacity-60">⌘</span>
                  <span>K</span>
                </div>
              </button>

              <button
                onClick={handleOpenDownloadModal}
                className="px-6 py-2 bg-brand-accent text-background text-sm font-bold rounded-full hover:shadow-[0_0_20px_-5px_var(--brand-accent)] active:scale-95 transition-all duration-200"
              >
                Download
              </button>
              
              <a
                href="https://github.com/IMDevFlare/vesper-website"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                aria-label="Open GitHub repository"
              >
                <GitHubIcon className="w-6 h-6" />
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-60 p-2 rounded-xl bg-white/5 active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden"
              />
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-24 left-6 right-6 p-6 bg-card border border-white/10 rounded-3xl z-50 md:hidden shadow-3xl"
              >
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleOpenSearch}
                    className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-colors mb-4 text-left"
                  >
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Search className="size-5" />
                      <span className="font-medium">Global Search</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-muted-foreground/60 border border-white/5">
                      <CommandIcon className="size-3" />
                      <span>K</span>
                    </div>
                  </button>

                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.name} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-colors ${
                            isActive 
                              ? "bg-brand-accent/10 text-brand-accent" 
                              : "text-foreground hover:bg-white/5"
                          }`}
                        >
                          <link.icon className={`size-6 ${isActive ? "text-brand-accent" : "text-brand-accent/60"}`} />
                          <span className="text-lg font-semibold">{link.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div variants={itemVariants} className="pt-4 flex flex-col gap-3">
                    <button
                      onClick={handleOpenDownloadModal}
                      className="w-full p-5 bg-brand-accent text-background rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
                    >
                      Download Client
                    </button>
                    <a
                      href="https://github.com/IMDevFlare/vesper-website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-4 rounded-2xl bg-white/5 text-muted-foreground flex items-center justify-center gap-3 font-medium transition-colors"
                    >
                      <GitHubIcon className="w-5 h-5" />
                      View on GitHub
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      <DownloadModal open={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
