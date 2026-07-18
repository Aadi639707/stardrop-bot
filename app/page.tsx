"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Dummy balance for now
  const [balance, setBalance] = useState("0.10");

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 flex flex-col items-center pb-24">
      
      {/* Top Bar (Matching your screenshot style but in Dark Premium Theme) */}
      <div className="w-full max-w-md bg-gradient-to-r from-yellow-600/20 to-yellow-400/10 border border-yellow-500/30 rounded-2xl p-3 flex justify-between items-center mb-6 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden border-2 border-yellow-500/50">
            {/* Avatar placeholder */}
            <img src="https://i.pravatar.cc/150?u=shivuu" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-extrabold text-sm tracking-wide">Shivuu_Ka_Aadi</span>
        </div>
        <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-gray-700/50">
          <span className="text-yellow-500 text-lg">⭐</span>
          <span className="text-white font-bold">{balance}</span>
        </div>
      </div>

      {/* Game Banners List */}
      <div className="w-full max-w-md flex flex-col gap-5">
        
        {/* Game 1: The Ring Roulette (Screenshot 2) */}
        <Link href="/roulette">
          <div className="w-full h-44 rounded-3xl bg-gradient-to-br from-[#1e1e2d] to-[#15151e] border-2 border-indigo-500/30 flex flex-col justify-end p-5 relative overflow-hidden shadow-lg transition-transform active:scale-95 group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h2 className="text-3xl font-black text-white drop-shadow-md z-10 italic">Ring Roulette</h2>
            <div className="flex justify-between items-center mt-1 z-10">
              <p className="text-indigo-300 text-sm font-medium">Multiplayer Live Spin</p>
              <div className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">
                Play Now
              </div>
            </div>
          </div>
        </Link>

        {/* Game 2: NFT Case Opener (Screenshot 3) */}
        <Link href="/case-opener">
          <div className="w-full h-44 rounded-3xl bg-gradient-to-br from-[#1e1e2d] to-[#15151e] border-2 border-cyan-500/30 flex flex-col justify-end p-5 relative overflow-hidden shadow-lg transition-transform active:scale-95 group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h2 className="text-3xl font-black text-white drop-shadow-md z-10 italic">NFT Unboxing</h2>
            <div className="flex justify-between items-center mt-1 z-10">
              <p className="text-cyan-300 text-sm font-medium">Single Player Drops</p>
              <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30">
                Open Cases
              </div>
            </div>
          </div>
        </Link>

        {/* Coming Soon Placeholder for Future Games */}
         <div className="w-full h-24 rounded-3xl bg-[#15151e]/50 border-2 border-dashed border-gray-700 flex items-center justify-center relative overflow-hidden">
            <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">More Games Soon</p>
         </div>

      </div>
    </div>
  );
}
