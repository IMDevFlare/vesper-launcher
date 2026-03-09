"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  Map,
  History,
  Image as ImageIcon,
  Search,
  FileText,
  ShieldCheck,
  Scale,
  Gavel,
  Command as CommandIcon,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleExternalOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("vesper:open-cmdk", handleExternalOpen);
    
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("vesper:open-cmdk", handleExternalOpen);
    };
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={setOpen}
      showCloseButton={false}
      className="max-w-[600px] border-brand-accent/20 bg-background/60 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(255,207,168,0.2)]"
    >
      <div className="relative group">
        <CommandInput 
          placeholder="What are you looking for?" 
          className="h-14 border-none focus:ring-0 text-lg placeholder:text-muted-foreground/50"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded border border-brand-accent/20 bg-brand-accent/5 pointer-events-none">
          <CommandIcon className="size-3 text-brand-accent/60" />
          <span className="text-[10px] font-bold text-brand-accent/60">K</span>
        </div>
      </div>
      
      <CommandList className="max-h-[450px] scrollbar-thin scrollbar-thumb-brand-accent/20">
        <CommandEmpty className="py-12 flex flex-col items-center gap-3">
          <Search className="size-8 text-muted-foreground/30 animate-pulse" />
          <p className="text-muted-foreground">No matches found for your search.</p>
        </CommandEmpty>
        
        <CommandGroup heading="Quick Navigation" className="px-2 pt-2">
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <Home className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Home Dashboard</span>
            <CommandShortcut>↵</CommandShortcut>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/roadmap"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <Map className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Project Roadmap</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/changelog"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <History className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Changelog & Updates</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/gallery"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <ImageIcon className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Visual Gallery</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/search"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <Search className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Deep Search</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator className="my-2 bg-brand-accent/10" />
        
        <CommandGroup heading="Legal & Policies" className="px-2 pb-2">
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/legal"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <FileText className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Legal Notice</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/privacy"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <ShieldCheck className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Privacy Policy</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/terms"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <Scale className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Terms of Use</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/tos"))}
            className="group py-3 px-4 rounded-xl aria-selected:bg-brand-accent/10 aria-selected:text-brand-accent transition-all duration-200"
          >
            <Gavel className="mr-3 h-5 w-5 group-aria-selected:text-brand-accent transition-colors" />
            <span className="font-medium">Terms of Service</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-brand-accent/10 bg-brand-accent/5 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-muted border border-border">↑↓</span>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-muted border border-border">Enter</span>
            <span>Select</span>
          </div>
        </div>
        <span>Vesper Shell v1.5.0</span>
      </div>
    </CommandDialog>
  );
}
