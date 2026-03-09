"use client";

import { AlertCircle, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Change log data as a structured JS object instead of markdown
const changelog = [
  {
    version: "1.5.0",
    date: "2026-03-09",
    changes: [
      {
        type: "Added",
        items: [
          "Implemented a brand-new Gallery page with a responsive Bento Grid layout and smooth hover effects.",
          "Introduced a global Command Palette (Cmd+K / Ctrl+K) for instant site-wide navigation.",
          "Created a dedicated Search page with a high-contrast search bar and a custom hand-drawn title animation.",
          "Integrated the Satoshi font family for a more premium and modern typography feel.",
        ],
      },
      {
        type: "Improved",
        items: [
          "Refactored the Changelog page with a structured timeline design and categorized badges.",
          "Enhanced global layout and typography across all pages.",
        ],
      },
    ],
  },
  {
    version: "1.4.0",
    date: "2026-06-28",
    changes: [
      {
        type: "Added",
        items: [
          "Introduced DownloadModal for easy, direct downloads of desktop client builds for Windows (.exe), Mac (.dmg), Debian/Ubuntu (.deb), Fedora/RedHat (.rpm), and Linux Universal (.AppImage). The modal fetches the latest GitHub release via the Releases API and adapts to available files.",
          "Platform-specific SVG icons for each OS/platform appear on download buttons.",
        ],
      },
      {
        type: "Improved",
        items: [
          "Added a GitHub button to the navbar for quick access to the website's repository.",
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-06-28",
    changes: [
      {
        type: "Added",
        items: [
          "Added legal pages: Legal Notice, Privacy Policy, Terms of Use, and Terms of Service.",
          'Merged the "Minecraft 1.21 Ready" badge into the "Install script is not working yet" alert.',
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-06-28",
    changes: [
      {
        type: "Added",
        items: [
          "Added click-to-copy functionality for the install script (feature not yet fully working).",
        ],
      },
      {
        type: "Removed",
        items: [
          "Removed documentation page.",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-06-24",
    changes: [
      {
        type: "Added",
        items: [
          "Added documentation page.",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-02-21",
    changes: [
      {
        type: "Added",
        items: [
          "Initial homepage.",
        ],
      },
    ],
  },
];

const typeStyles: Record<string, string> = {
  Added: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20",
  Improved: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
  Removed: "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20",
  Fixed: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
      {/* Subtle Dot Grid Background */}
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />

      {/* Vesper Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full pt-16 flex flex-col items-center">
        <div className="w-full max-w-3xl px-6 py-12 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-accent animate-in fade-in slide-in-from-top-4 duration-1000">
              Changelog
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Follow the evolution of Vesper. Notable changes are listed here and in our{" "}
              <Link
                className="text-brand-accent hover:underline decoration-brand-accent/30 transition-all"
                target="_blank"
                href="https://github.com/IMDevFlare/vesper-website/blob/main/CHANGELOG.md"
              >
                CHANGELOG.md
              </Link>{" "}
              on GitHub.
            </p>
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm max-w-lg mx-auto">
              <AlertCircle className="size-4 shrink-0" />
              <span>This is the website changelog. Launcher updates coming soon in private beta.</span>
            </div>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-brand-accent/50 before:via-brand-accent/20 before:to-transparent">
            {changelog.map((entry) => (
              <div key={entry.version} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-accent/30 bg-background text-brand-accent shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-xs font-bold">{entry.version.split('.')[0]}</span>
                </div>

                {/* Content */}
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border-brand-accent/10 bg-background/50 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-2xl font-bold text-brand-accent">
                        v{entry.version}
                      </CardTitle>
                      <Badge variant="outline" className="text-muted-foreground border-muted-foreground/20 flex gap-1 items-center">
                        <Calendar className="size-3" />
                        {entry.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {entry.changes.map((change) => (
                      <div key={change.type} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={typeStyles[change.type] || "bg-muted text-muted-foreground"}
                          >
                            {change.type}
                          </Badge>
                        </div>
                        <ul className="space-y-2">
                          {change.items.map((item, idx) => (
                            <li key={idx} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                              <span className="text-brand-accent mt-1.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
