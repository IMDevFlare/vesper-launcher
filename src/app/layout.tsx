import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono as FontMono, Geist as FontSans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

// const fontSans = localFont({
//   src: [
//     {
//       path: "./fonts/satoshi.woff2",
//       style: "normal",
//       weight: "400",
//     },
//     {
//       path: "./fonts/satoshi-italic.woff2",
//       style: "italic",
//       weight: "400",
//     },
//   ],
//   variable: "--font-v-sans",
//   display: "swap",
// });

const fontSans = FontSans({
  variable: "--font-v-sans",
  subsets: ["latin"],
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
    // apple: "/apple-touch-icon.png"
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
  // openGraph: {
  //   title: "Vesper Launcher",
  //   description: "Experience Minecraft with enhanced performance and customization using Vesper Launcher.",
  //   url: "https://launcher.devflare.de",
  //   siteName: "Vesper Launcher",
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1901,
  //       height: 943,
  //       alt: "Vesper Launcher Preview"
  //     }
  //   ],
  //   locale: "en_US",
  //   type: "website"
  // },
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
          <main>{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
