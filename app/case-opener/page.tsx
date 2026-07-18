"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// Dummy Prize Pool Data
const prizePool = [
  { id: 1, name: "Trophy", icon: "🏆", chance: "1.31%", value: 100, rarity: "epic" },
  { id: 2, name: "Diamond", icon: "💎", chance: "1.31%", value: 100, rarity: "epic" },
  { id: 3, name: "Ring", icon: "💍", chance: "1.31%", value: 100, rarity: "epic" },
  { id: 4, name: "Crystals", icon: "💎", chance: "0.45%", value: 250, rarity: "legendary" },
  { id: 5, name: "Cake", icon: "🎂", chance: "1.44%", value: 50, rarity: "common" },
  { id: 6, name: "Flowers", icon: "💐", chance: "1.44%", value: 50, rarity: "common" },
  { id: 7, name: "Rocket", icon: "🚀", chance: "1.44%", value: 50, rarity: "common" },
  { id: 8, name: "Champagne", icon: "🍾", chance: "1.44%", value: 50, rarity: "common" },
];

export default function CaseOpener() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(25);
  const [isRolling, setIsRolling] = useState(false);
  
  // Slider State
  const [stripItems, setStripItems] = useState<any[]>([]);
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [winningItem, setWinningItem] = useState<any | null>(null);

  const startUnboxing = () => {
    if (isRolling) return;
    if (balance < betAmount) return alert("Not enough Stars!");

    setBalance(prev => prev - betAmount);
    setIsRolling(true);
    setWinningItem(null);
    setSliderTranslate(0); // Reset position

    // 🌚 THE SECRET ALGORITHM (Force Low-Tier Win)
    // We strictly select a 'common' item (value: 50) to ensure the house always wins big bets, 
    // or gives a small psychological win if the bet is 25.
    const commonItems = prizePool.filter(p => p.rarity === "common");
    const riggedWinner = commonItems[Math.floor(Math.random() * commonItems.length)];

    // Generate a long strip of 60 items for the rolling animation
    const generateStrip = Array.from({ length: 60 }).map((_, i) => {
      // The 50th item will be our rigged winner
      if (i === 50) return riggedWinner;
      // Everything else is random eye-candy
      return prizePool[Math.floor(Math.random() * prizePool.length)];
    });

    setStripItems(generateStrip);

    // Trigger animation after a tiny delay to allow DOM to render the strip
    setTimeout(() => {
      // Calculate scroll distance: 50th item * itemWidth (approx 100px) + offset to center it
      // Added a slight random offset so it doesn't land perfectly in the center every time
      const randomOffset = Math.floor(Math.random() * 40) - 20;
      const targetScroll = -(50 * 100) + 120 + randomOffset; 
      
      setSliderTranslate(targetScroll);

      // Animation takes 5 seconds
      setTimeout(() => {
        setIsRolling(false);
        setWinningItem(riggedWinner);
        setBalance(prev => prev + riggedWinner.value); // Give the rigged payout
      }, 5000);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center pb-20">
      
      {/* Top Header */}
      <div className="w-full flex justify-between items-center p-5 max-w-md">
        <Link href="/" className="text-white flex items-center gap-2 font-bold bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 active:scale-95 transition">
           <span>← Back</span>
        </Link>
        <div className="flex items-center gap-2 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">
          <span className="text-blue-400">💎</span>
          <span className="text-white font-bold">{balance}</span>
        </div>
      </div>

      {/* Bet Amount Selectors */}
      <div className="w-full max-w-md flex justify-between px-5 mt-4">
        {[25, 50, 100, 250].map((amt) => (
          <button 
            key={amt}
            onClick={() => setBetAmount(amt)}
            disabled={isRolling}
            className={`px-4 py-2 rounded-xl font-bold transition-all border-2 ${
              betAmount === amt 
              ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
              : 'bg-[#15151e] border-gray-800 text-gray-500'
            }`}
          >
            {amt} 💎
          </button>
        ))}
      </div>

      {/* The Unboxing Slider Container (CS:GO Style) */}
      <div className="w-full max-w-md mt-8 relative overflow-hidden bg-[#15151e] border-y-2 border-gray-800 h-40 flex items-center shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        
        {/* Center Target Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-500 z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>

        {/* The Rolling Strip */}
        <div 
          className="flex items-center gap-2 px-1/2 absolute left-0"
          style={{
            transform: `translateX(${sliderTranslate}px)`,
            transition: isRolling ? "transform 5s cubic-bezier(0.1, 0.9, 0.2, 1)" : "none",
            width: "max-content"
          }}
        >
          {stripItems.length > 0 ? (
            stripItems.map((item, idx) => (
              <div key={idx} className={`w-24 h-28 rounded-lg flex flex-col items-center justify-center border-2 shrink-0 ${
                item.rarity === 'legendary' ? 'bg-purple-900/20 border-purple-500' :
                item.rarity === 'epic' ? 'bg-blue-900/20 border-blue-500' :
                'bg-gray-800/30 border-gray-700'
              }`}>
                <span className="text-4xl drop-shadow-md">{item.icon}</span>
              </div>
            ))
          ) : (
            // Default View before rolling
            <div className="w-full flex justify-center w-screen absolute left-0">
               <div className="w-32 h-32 bg-gradient-to-br from-yellow-600 to-yellow-900 rounded-2xl flex items-center justify-center border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  <span className="text-5xl">💼</span>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Winning Announcement */}
      <div className="h-10 mt-4 flex items-center justify-center">
        {winningItem && !isRolling && (
           <span className="text-green-400 font-bold text-lg animate-bounce">
             You won {winningItem.name}! (+{winningItem.value} 💎)
           </span>
        )}
      </div>

      {/* Play Action Button */}
      <div className="w-full max-w-md px-5 mt-2">
        <button 
          onClick={startUnboxing}
          disabled={isRolling}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-extrabold text-xl py-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all disabled:opacity-50"
        >
          {isRolling ? "Opening..." : `I'm lucky, Go! ${betAmount} 💎`}
        </button>
      </div>

      {/* Possible Prizes Grid */}
      <div className="w-full max-w-md px-5 mt-8">
        <p className="text-center text-gray-400 font-medium mb-4">You can win...</p>
        <div className="grid grid-cols-4 gap-3">
          {prizePool.map((prize) => (
            <div key={prize.id} className="bg-[#15151e] border border-gray-800 rounded-xl p-2 flex flex-col items-center relative overflow-hidden">
              {prize.rarity === 'legendary' && (
                <div className="absolute -top-3 -left-3 bg-blue-500 text-white text-[9px] font-bold px-4 py-1 rotate-[-45deg] z-10 shadow-md">CRYSTALS</div>
              )}
              <span className="text-3xl mt-2 drop-shadow-md">{prize.icon}</span>
              <span className="text-gray-500 text-[10px] mt-1 font-bold">✨ {prize.chance}</span>
              <div className="bg-[#0a0a0f] border border-gray-700 w-full text-center mt-1 py-0.5 rounded text-blue-400 font-bold text-xs">
                {prize.value} 💎
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
