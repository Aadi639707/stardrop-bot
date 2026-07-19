"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COLORS = [
  { id: "red", hex: "#EF4444", mult: 1, label: "Red 1x" },
  { id: "blue", hex: "#3B82F6", mult: 2, label: "Blue 2x" },
  { id: "yellow", hex: "#EAB308", mult: 2, label: "Yellow 2x" },
  { id: "purple", hex: "#A855F7", mult: 5, label: "Purple 5x" },
];

export default function RoulettePage() {
  const [balance, setBalance] = useState(1000);
  const [rotation, setRotation] = useState(0);
  const [gameState, setGameState] = useState("betting"); // betting, rolling
  const [playerBets, setPlayerBets] = useState({ red: 0, blue: 0, yellow: 0, purple: 0 });
  const [winningColor, setWinningColor] = useState<any>(null);

  const placeBet = (colorId: keyof typeof playerBets, amount: number) => {
    if (gameState !== "betting" || balance < amount) return;
    setBalance((prev) => prev - amount);
    setPlayerBets((prev) => ({ ...prev, [colorId]: prev[colorId] + amount }));
  };

  const startRoll = () => {
    setGameState("rolling");

    // Fair Probability Math
    const rand = Math.random();
    let winner;
    let targetDegree;

    // Red: 50% (0-180deg), Blue: 30% (180-288deg), Yellow: 15% (288-342deg), Purple: 5% (342-360deg)
    if (rand < 0.50) { winner = COLORS[0]; targetDegree = 90; } // Red
    else if (rand < 0.80) { winner = COLORS[1]; targetDegree = 225; } // Blue
    else if (rand < 0.95) { winner = COLORS[2]; targetDegree = 315; } // Yellow
    else { winner = COLORS[3]; targetDegree = 350; } // Purple

    // Spin animation: Full rotations + offset
    const newRotation = rotation + 1440 + targetDegree;
    setRotation(newRotation);

    setTimeout(() => {
      setWinningColor(winner);
      const winnings = playerBets[winner.id as keyof typeof playerBets] * winner.mult;
      if (winnings > 0) setBalance((prev) => prev + winnings);
      
      setTimeout(() => {
        setPlayerBets({ red: 0, blue: 0, yellow: 0, purple: 0 });
        setWinningColor(null);
        setGameState("betting");
      }, 3000);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 font-bold">← Back</Link>
        <div className="bg-[#15151e] px-4 py-2 rounded-xl font-black text-yellow-500">{balance} ⭐</div>
      </div>

      {/* ROUND WHEEL */}
      <div className="flex justify-center mb-10 relative">
        <div 
          className="w-64 h-64 rounded-full border-[8px] border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-[5000ms] ease-out flex items-center justify-center relative overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Conic Gradient for Round look */}
          <div className="w-full h-full" style={{ background: "conic-gradient(#EF4444 0% 50%, #3B82F6 50% 80%, #EAB308 80% 95%, #A855F7 95% 100%)" }}></div>
          <div className="absolute w-4 h-4 bg-white rounded-full border-2 border-black z-10"></div>
        </div>
        {/* Needle */}
        <div className="absolute -top-4 w-6 h-6 bg-white rotate-45 z-20"></div>
      </div>

      {/* BETTING LIST */}
      <div className="space-y-3">
        {COLORS.map((c) => (
          <div key={c.id} className="flex justify-between items-center bg-[#15151e] p-3 rounded-2xl border border-gray-800">
             <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex }}></div>
               <span className="font-bold">{c.label}</span>
             </div>
             <div className="flex gap-2">
               <button onClick={() => placeBet(c.id as keyof typeof playerBets, 10)} className="bg-gray-800 px-4 py-1 rounded-lg text-xs font-bold hover:bg-gray-700">Bet 10</button>
               <span className="font-mono text-yellow-500 font-bold">{playerBets[c.id as keyof typeof playerBets]}</span>
             </div>
          </div>
        ))}
      </div>

      <button 
        onClick={startRoll}
        disabled={gameState === "rolling"}
        className="w-full mt-6 bg-blue-600 py-4 rounded-2xl font-black text-xl hover:bg-blue-500 disabled:bg-gray-800"
      >
        {gameState === "rolling" ? "Spinning..." : "SPIN WHEEL"}
      </button>
    </div>
  );
}
