"use client";

import Link from "next/link";
import React from "react";

// Change log data as a structured JS object instead of markdown
const changelog = [
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
        <div className="w-full max-w-2xl px-6 py-12 mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-brand-accent">Changelog</h1>
          <article className="prose prose-invert prose-headings:text-brand-accent prose-hr:border-border prose-li:marker:text-brand-accent prose-a:text-brand-accent prose-table:text-sm prose-table:border-border max-w-none">
            <p className="mb-6 text-base text-muted-foreground text-center">
              Notable changes are listed here and in our <Link className="underline text-brand-accent hover:text-brand-accent/80" target="_blank" href="https://github.com/IMDevFlare/vesper-website/blob/main/CHANGELOG.md">CHANGELOG.md</Link> on GitHub.<br />
              Both lists are kept up to date, but may sometimes be different.<br />
              We use the format of <Link href="https://keepachangelog.com/en/1.1.0/" className="underline text-brand-accent hover:text-brand-accent/80" target="_blank" rel="noopener noreferrer">Keep a Changelog</Link> to note all changes.
            </p>
            <ul className="space-y-12">
              {changelog.map((entry) => (
                <li key={entry.version} className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1 text-brand-accent">
                    {entry.version}{" "}
                    <span className="ml-2 text-base font-normal text-muted-foreground">
                      — {entry.date}
                    </span>
                  </h2>
                  {entry.changes.map((change) => (
                    <div key={change.type} className="mb-3">
                      <h3 className="text-lg font-semibold mt-4 mb-2">
                        {change.type}
                      </h3>
                      <ul className="list-disc ml-6">
                        {change.items.map((item, idx) => (
                          <li key={idx} className="text-base">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </main>
    </div>
  );
}