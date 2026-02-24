"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpenIcon, 
  CommandLineIcon, 
  WrenchScrewdriverIcon, 
  PaintBrushIcon,
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Getting Started", href: "/docs/getting-started", icon: BookOpenIcon },
  { name: "API Reference", href: "/docs/api", icon: CommandLineIcon },
  { name: "Optimization", href: "/docs/performance-optimization", icon: WrenchScrewdriverIcon },
  { name: "Theming", href: "/docs/custom-themes", icon: PaintBrushIcon },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <nav className="sticky top-24 space-y-1">
        <div className="px-3 pb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Documentation
          </h2>
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all
                ${isActive 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5 shrink-0 transition-colors
                  ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}
                `}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
              {isActive && <ChevronRightIcon className="ml-2 h-4 w-4 text-accent" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
