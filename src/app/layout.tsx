import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeType",
  description: "Typing practice for real algorithm snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-slate-100">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.3em]"
            >
              CodeType
            </Link>
            <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              <Link href="/">Home</Link>
              <a
                href="https://manseungchoi.com"
                target="_blank"
                rel="noreferrer"
                className="group text-xs font-semibold uppercase tracking-[0.3em]"
              >
                <span className="text-slate-300 transition group-hover:text-slate-100">
                  MANSEUNG
                </span>{" "}
                <span className="text-cyan-300">CHOI</span>
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
