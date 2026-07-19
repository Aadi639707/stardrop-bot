"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [balance] = useState(1000);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600">
            <img src="https://i.pravatar.cc/150?u=shivuu" alt="User" />
          </div>
          <span className="font-bold text-sm">Aadi..!!</span>
        </div>
        <div className="bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 font-bold">
          {balance} ⭐
        </div>
      </div>

      {/* DASHBOARD GAMES HUB */}
      <div className="px-4 mt-6">
        <h2 className="text-xl font-black mb-4">Casino Games 🎲</h2>
        
        <div className="grid gap-4">
          {/* Game 1: Case Opener */}
          <Link href="/case-opener">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-500/30 p-6 rounded-3xl flex items-center justify-between shadow-lg active:scale-95 transition-transform">
              <div>
                <h3 className="text-xl font-bold">Case Opener</h3>
                <p className="text-blue-300 text-xs">Spin the wheel and win big!</p>
              </div>
              <span className="text-5xl">🎡</span>
            </div>
          </Link>

          {/* Game 2: Color Prediction */}
          <Link href="/color-game">
            <div className="bg-gradient-to-r from-purple-900 to-purple-800 border border-purple-500/30 p-6 rounded-3xl flex items-center justify-between shadow-lg active:scale-95 transition-transform">
              <div>
                <h3 className="text-xl font-bold">Color Prediction</h3>
                <p className="text-purple-300 text-xs">Bet on colors, win up to 5x!</p>
              </div>
              <span className="text-5xl">🔴</span>
            </div>
          </Link>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0d0d14]/90 backdrop-blur-md border-t border-gray-800 pb-2 pt-2 z-50">
        <div className="flex justify-around items-center h-16">
          <Link href="/tourneys" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🏆</span>
            <span className="text-[10px] font-bold">Tourneys</span>
          </Link>
          <Link href="/giveaways" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🎁</span>
            <span className="text-[10px] font-bold">Giveaways</span>
          </Link>
          <div className="bg-blue-600 p-3 rounded-full -mt-8 border-4 border-[#0a0a0f]">
             <span className="text-2xl">🎲</span>
          </div>
          <Link href="/tasks" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">📋</span>
            <span className="text-[10px] font-bold">Tasks</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
