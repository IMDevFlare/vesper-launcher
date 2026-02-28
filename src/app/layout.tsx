import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist as FontSans, JetBrains_Mono as FontMono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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
});

const fontMono = FontMono({
  variable: "--font-v-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vesper Launcher",
  description: "Sleek and modern high-utility minecraft client",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
