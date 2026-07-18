import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StarDrop | Premium Mini App",
  description: "Play, win, and earn Telegram Stars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0d0d12] text-white overflow-x-hidden select-none`}>
        {children}
      </body>
    </html>
  );
}
