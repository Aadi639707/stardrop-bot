"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [balance] = useState(1000);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 pb-24 max-w-md mx-auto relative">
      
      {/* TOP HEADER */}
      <div className="flex justify-between items-center mb-8 mt-2">
        <div className="flex items-center gap-3 bg-[#15151e] px-4 py-2 rounded-2xl border border-gray-800 shadow-lg">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
            <img src="https://i.pravatar.cc/150?u=shivuu" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-black text-sm tracking-wide">Aadi..!!</span>
        </div>
        <div className="bg-[#15151e] px-4 py-2 rounded-2xl border border-gray-800 font-black shadow-lg flex items-center gap-1.5">
          {balance} <span className="text-yellow-500 text-lg drop-shadow-md">⭐</span>
        </div>
      </div>

      {/* GAMES LIST SECTION */}
      <div className="w-full">
        <h2 className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
           Live Casino Games
        </h2>
        
        <div className="flex flex-col gap-4">
          
          {/* Game 1: Case Opener */}
          <Link href="/case-opener">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1a233a] to-[#0d1323] border border-blue-500/30 p-6 rounded-3xl flex items-center justify-between shadow-[0_0_20px_rgba(37,99,235,0.15)] active:scale-95 transition-all group hover:border-blue-500/60">
              {/* Glow Effect */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
              
              <div className="z-10">
                <h3 className="text-2xl font-black text-white drop-shadow-md">Case Opener</h3>
                <p className="text-blue-300/70 text-xs font-bold mt-1">Spin the wheel and win big!</p>
                <div className="mt-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[9px] uppercase tracking-wider font-black px-2 py-1 rounded inline-block">
                   HOT 🔥
                </div>
              </div>
              <span className="text-6xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform z-10">🎡</span>
            </div>
          </Link>

          {/* Game 2: Color Prediction */}
          <Link href="/color-game">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2a133a] to-[#160b1e] border border-purple-500/30 p-6 rounded-3xl flex items-center justify-between shadow-[0_0_20px_rgba(147,51,234,0.15)] active:scale-95 transition-all group hover:border-purple-500/60 mt-2">
              {/* Glow Effect */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
              
              <div className="z-10">
                <h3 className="text-2xl font-black text-white drop-shadow-md">Color Game</h3>
                <p className="text-purple-300/70 text-xs font-bold mt-1">Bet on colors, win up to 5x!</p>
                <div className="mt-3 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[9px] uppercase tracking-wider font-black px-2 py-1 rounded inline-block">
                   MULTIPLAYER 🟢
                </div>
              </div>
              <span className="text-6xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform z-10">🔴</span>
            </div>
          </Link>

        </div>
      </div>
      
    </div>
  );
}
