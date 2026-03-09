import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono as FontMono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/command-palette";

const fontSans = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/satoshi-italic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-v-sans",
  display: "swap",
});

const fontMono = FontMono({
  variable: "--font-v-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vesper Launcher",
    template: "%s | Vesper Launcher"
  },
  description: "Vesper Launcher is a sleek, modern, and high-utility Minecraft client designed for performance, customization, and an enhanced gameplay experience.",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.ico", type: "image/x-icon" }
    ],
  },
  keywords: [
    "Minecraft",
    "Vesper Launcher",
    "Minecraft Client",
    "High-Utility",
    "Modern",
    "Launcher",
    "Custom Minecraft"
  ],
  authors: [
    { name: "DevFlare", url: "https://devflare.de" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <SpeedInsights />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <CommandPalette />
          <main>{children}</main>
          <Toaster richColors />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
