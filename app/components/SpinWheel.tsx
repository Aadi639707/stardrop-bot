'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedBet, setSelectedBet] = useState<number | null>(null);

  const bets = [
    { multiplier: '2x', color: 'bg-red-500', shadow: 'shadow-red-500/50' },
    { multiplier: '3x', color: 'bg-orange-400', shadow: 'shadow-orange-400/50' },
    { multiplier: '5x', color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
    { multiplier: '50x', color: 'bg-purple-600', shadow: 'shadow-purple-600/50' },
  ];

  const handleSpin = async () => {
    if (isSpinning || selectedBet === null) return;
    
    setIsSpinning(true);
    
    // Simulate API call to your "Max Profit Algorithm"
    const mockResultIndex = 0; // Red wins
    
    // Calculate rotation: 5 full spins (1800 deg) + offset
    const spinDegrees = 1800 + (mockResultIndex * 90);
    setRotation(rotation + spinDegrees);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000); // 4 sec animation duration
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-[#16161e] rounded-2xl border border-gray-800 shadow-xl mt-6">
      <h3 className="text-xl font-bold text-gray-200 mb-6">Mini-Game: Roulette</h3>
      
      <div className="relative w-64 h-64 mb-8 flex justify-center items-center">
        <div className="absolute z-10 w-8 h-8 rounded-full border-4 border-gray-700 bg-gray-900 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
        <div className="absolute z-10 top-0 w-1 h-6 bg-white shadow-[0_0_10px_#fff]"></div>
        
        <motion.div 
          className="w-full h-full rounded-full border-4 border-[#252532] shadow-2xl overflow-hidden relative"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.15, 0.9, 0.2, 1] }}
          style={{ background: 'conic-gradient(#ef4444 0 90deg, #fb923c 90deg 180deg, #3b82f6 180deg 270deg, #9333ea 270deg 360deg)' }}
        />
      </div>

      <div className="w-full flex justify-between gap-2 mb-6">
        {bets.map((bet, index) => (
          <button
            key={index}
            onClick={() => !isSpinning && setSelectedBet(index)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${
              selectedBet === index 
                ? `border-white ${bet.shadow} scale-105` 
                : `border-transparent ${bet.color} opacity-70`
            }`}
          >
            {bet.multiplier}
          </button>
        ))}
      </div>

      <button 
        onClick={handleSpin}
        disabled={isSpinning || selectedBet === null}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.4)]"
      >
        {isSpinning ? 'Rolling...' : 'Place Bet & Spin'}
      </button>
    </div>
  );
}
