import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { LearnAuthProvider } from "@/lib/learn/AuthContext";
import Navbar from "@/components/Navbar";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeType",
  description: "Typing practice for real algorithm snippets.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <LearnAuthProvider>
          <Navbar />
          {children}
        </LearnAuthProvider>
      </body>
    </html>
  );
}
