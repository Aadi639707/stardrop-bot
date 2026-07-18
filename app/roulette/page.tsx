"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RingRoulette() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null);
  
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState(5); // Dummy center countdown

  // 🌚 THE SECRET ALGORITHM (Lowest Liability)
  const calculateRiggedResult = (userBetMultiplier: number | null, userBetAmount: number) => {
    // Dummy pool of other players' bets (You can connect this to DB later)
    const fakePool = {
      2: Math.floor(Math.random() * 500) + 100, // Red
      3: Math.floor(Math.random() * 300) + 50,  // Orange
      5: Math.floor(Math.random() * 100) + 20,  // Blue
      50: Math.floor(Math.random() * 10),       // Purple
    };

    let liabilities = { 2: 0, 3: 0, 5: 0, 50: 0 };

    // Calculate how much the house has to pay out for EACH color
    Object.keys(liabilities).forEach((m) => {
      const multiplier = parseInt(m);
      let totalBetOnThisColor = fakePool[multiplier as keyof typeof fakePool];
      
      // Add real user's bet to the calculation
      if (userBetMultiplier === multiplier) {
        totalBetOnThisColor += userBetAmount;
      }
      
      liabilities[multiplier as keyof typeof liabilities] = totalBetOnThisColor * multiplier;
    });

    // Find the multiplier with the MINIMUM liability (Max Profit for House)
    const riggedMultiplier = Object.keys(liabilities).reduce((a, b) => 
      liabilities[parseInt(a) as keyof typeof liabilities] < liabilities[parseInt(b) as keyof typeof liabilities] ? a : b
    );

    return parseInt(riggedMultiplier);
  };

  const handleSpin = () => {
    if (isSpinning || !selectedMultiplier) return;
    if (balance < betAmount) return alert("Not enough Stars!");

    setBalance(prev => prev - betAmount);
    setIsSpinning(true);
    setCountdown(0); // Clear countdown text during spin

    // 1. Calculate rigged result
    const winningMultiplier = calculateRiggedResult(selectedMultiplier, betAmount);
    
    // 2. Map Multipliers to CSS Degrees on the wheel
    // X2 (Red): 0-180deg | X3 (Orange): 180-288deg | X5 (Blue): 288-342deg | X50 (Purple): 342-360deg
    const angleMap = {
      2: { min: 20, max: 160 },
      3: { min: 200, max: 268 },
      5: { min: 308, max: 322 },
      50: { min: 350, max: 355 }
    };

    const targetRange = angleMap[winningMultiplier as keyof typeof angleMap];
    const randomAngleInsideTarget = Math.floor(Math.random() * (targetRange.max - targetRange.min + 1)) + targetRange.min;

    // Pointer is at the bottom (180 deg offset)
    const pointerOffset = 180; 
    const finalStopAngle = 360 - randomAngleInsideTarget + pointerOffset;

    // Add 5 full spins (1800 degrees) + final angle
    const newRotation = rotation + 1800 + finalStopAngle - (rotation % 360);
    setRotation(newRotation);

    // Stop after 4 seconds and award prize if user somehow won (rare!)
    setTimeout(() => {
      setIsSpinning(false);
      setCountdown(5); // Reset dummy countdown
      if (winningMultiplier === selectedMultiplier) {
        setBalance(prev => prev + (betAmount * winningMultiplier));
      }
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center pb-20">
      
      {/* Top Header */}
      <div className="w-full flex justify-between items-center p-5 max-w-md">
        <Link href="/" className="text-white flex items-center gap-2 font-bold bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 active:scale-95 transition">
           <span>← Back</span>
        </Link>
        <div className="flex items-center gap-2 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">
          <span className="text-yellow-500">⭐</span>
          <span className="text-white font-bold">{balance}</span>
        </div>
      </div>

      {/* Ring Roulette Section */}
      <div className="relative w-72 h-72 mt-6 flex justify-center items-center">
        {/* The Colored Donut Wheel */}
        <div
          className="w-full h-full rounded-full absolute shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4s cubic-bezier(0.15, 0.85, 0.2, 1)",
            background: "conic-gradient(#ef4444 0deg 180deg, #f97316 180deg 288deg, #3b82f6 288deg 342deg, #a855f7 342deg 360deg)"
          }}
        ></div>

        {/* Center Black Hole (Creates the Ring/Donut effect) */}
        <div className="w-56 h-56 bg-[#0a0a0f] rounded-full absolute z-10 flex flex-col items-center justify-center shadow-inner">
           {isSpinning ? (
             <span className="text-2xl font-black text-gray-400 animate-pulse italic">Spinning..</span>
           ) : (
             <>
               <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Starts in</span>
               <span className="text-5xl font-black text-white">{countdown}</span>
             </>
           )}
        </div>

        {/* Bottom Pointer (^) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-white z-20 drop-shadow-[0_-5px_10px_rgba(255,255,255,0.6)] pointer-events-none"></div>
      </div>

      {/* Betting UI (Screenshot 2 Match) */}
      <div className="w-full max-w-md mt-16 px-6">
        <p className="text-gray-400 font-medium text-sm mb-2">Bet Amount:</p>
        <div className="w-full bg-[#15151e] border border-gray-800 rounded-2xl p-4 flex justify-between items-center text-white text-xl font-bold">
            <button onClick={() => setBetAmount(prev => Math.max(10, prev - 10))} className="text-gray-500 hover:text-white px-2">-</button>
            <span>{betAmount}</span>
            <button onClick={() => setBetAmount(prev => prev + 10)} className="text-gray-500 hover:text-white px-2">+</button>
        </div>

        <p className="text-gray-400 font-medium text-sm mt-6 mb-3">Choose Color:</p>
        <div className="flex justify-between items-center gap-2">
           <BetCircle multiplier={50} colorClass="border-purple-500 text-purple-400" selected={selectedMultiplier === 50} onClick={() => setSelectedMultiplier(50)} />
           <BetCircle multiplier={5} colorClass="border-blue-500 text-blue-400" selected={selectedMultiplier === 5} onClick={() => setSelectedMultiplier(5)} />
           <BetCircle multiplier={3} colorClass="border-orange-500 text-orange-400" selected={selectedMultiplier === 3} onClick={() => setSelectedMultiplier(3)} />
           <BetCircle multiplier={2} colorClass="border-red-500 text-red-400" selected={selectedMultiplier === 2} onClick={() => setSelectedMultiplier(2)} />
        </div>

        <button 
          onClick={handleSpin}
          disabled={isSpinning || !selectedMultiplier}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-extrabold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95"
        >
          {selectedMultiplier ? `Place ${betAmount} ⭐ Bet` : "Select a Color First"}
        </button>
      </div>
    </div>
  );
}

// Reusable Circle Button Component
function BetCircle({ multiplier, colorClass, selected, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`w-16 h-16 rounded-full border-[3px] flex items-center justify-center font-black text-xl cursor-pointer transition-all active:scale-90
      ${selected ? `${colorClass} shadow-[0_0_15px_currentColor] scale-110 bg-[#15151e]` : `border-gray-800 text-gray-600 hover:border-gray-600`}`}
    >
      X{multiplier}
    </div>
  );
}
