import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "../components/BottomNav";

export const metadata: Metadata = {
  title: "Crypto Mini App",
  description: "Premium Telegram Mini App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white min-h-screen font-sans antialiased">
        {/* Main Content Area (padding bottom so content doesn't hide behind nav) */}
        <div className="pb-28">
          {children}
        </div>
        
        {/* Persistent Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}
