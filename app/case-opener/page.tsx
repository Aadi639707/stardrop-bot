"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// 1. MEGA PRIZE POOL (Exact emojis)
const prizePool = [
  { id: 1, name: "Crystals", icon: "✨", chance: "0.45%", value: 250, rarity: "legendary" },
  { id: 2, name: "Trophy", icon: "🏆", chance: "1.31%", value: 100, rarity: "epic" },
  { id: 3, name: "Diamond", icon: "💎", chance: "1.31%", value: 100, rarity: "epic" },
  { id: 4, name: "Ring", icon: "💍", chance: "1.31%", value: 100, rarity: "epic" },
  { id: 5, name: "Cake", icon: "🎂", chance: "1.44%", value: 50, rarity: "common" },
  { id: 6, name: "Flowers", icon: "💐", chance: "1.44%", value: 50, rarity: "common" },
  { id: 7, name: "Rocket", icon: "🚀", chance: "1.44%", value: 50, rarity: "common" },
  { id: 8, name: "Champagne", icon: "🍾", chance: "1.44%", value: 50, rarity: "common" },
  { id: 9, name: "Rose", icon: "🌹", chance: "34.90%", value: 25, rarity: "common" },
  { id: 10, name: "Gift", icon: "🎁", chance: "34.90%", value: 25, rarity: "common" },
  { id: 11, name: "Heart", icon: "💝", chance: "10.04%", value: 15, rarity: "common" },
  { id: 12, name: "Teddy", icon: "🧸", chance: "10.04%", value: 15, rarity: "common" }
];

const bonusItem = { id: 99, name: "Bonus", icon: "💼", chance: "0.10%", value: 500, rarity: "legendary" };
const demoGift = { id: 100, name: "Demo Gift", icon: "🎁", chance: "100%", value: 0, rarity: "common" };

type BetLevel = 25 | 50;

export default function CaseOpener() {
  const [balance, setBalance] = useState(1000); 
  const [betAmount, setBetAmount] = useState<BetLevel>(25);
  const [isDemo, setIsDemo] = useState(true);
  
  // Animation States
  const [isRolling, setIsRolling] = useState(false);
  const [stripItems, setStripItems] = useState<any[]>([]);
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState("none");
  const [showPopup, setShowPopup] = useState(false);
  const [winningItem, setWinningItem] = useState<any | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const spinCount = useRef(0);
  
  // Hardcoded pixel values for 100% accuracy across all devices
  const ITEM_WIDTH = 112; 
  const GAP_WIDTH = 16;
  const TOTAL_ITEM_BLOCK = ITEM_WIDTH + GAP_WIDTH; // 128px
  
  useEffect(() => {
    if (isRolling) return;
    const initial = Array.from({ length: 15 }).map(() => prizePool[Math.floor(Math.random() * prizePool.length)]);
    initial[2] = bonusItem;
    setStripItems(initial);
    
    // Visually center the first item on page load
    if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        setSliderTranslate((cw / 2) - (ITEM_WIDTH / 2));
    }
    setTransitionStyle("none");
    setWinningItem(null);
  }, []);

  const startRoll = () => {
    if (isRolling) return;
    if (!isDemo && balance < betAmount) return alert("Not enough Stars!");
    if (!containerRef.current) return;

    if (!isDemo) setBalance(prev => prev - betAmount);
    
    setIsRolling(true);
    setShowPopup(false);
    setWinningItem(null);

    // WIN/LOSE ALGORITHM
    let riggedWinner: any;
    if (isDemo) {
      riggedWinner = demoGift; 
    } else {
      spinCount.current += 1;
      const cycle = spinCount.current % 5; 

      if (cycle === 1) {
        const evens = prizePool.filter(p => p.value === betAmount);
        riggedWinner = evens[Math.floor(Math.random() * evens.length)] || prizePool[9]; 
      } 
      else if (cycle === 2) {
        const wins = prizePool.filter(p => p.value > betAmount && p.value <= betAmount * 4);
        riggedWinner = wins[Math.floor(Math.random() * wins.length)] || prizePool[1]; 
      } 
      else if (cycle === 3 || cycle === 4) {
        const losses = prizePool.filter(p => p.value < betAmount);
        riggedWinner = losses[Math.floor(Math.random() * losses.length)] || prizePool[11]; 
      } 
      else {
        const evens = prizePool.filter(p => p.value >= betAmount && p.value <= betAmount * 2);
        riggedWinner = evens[Math.floor(Math.random() * evens.length)] || prizePool[4]; 
      }
    }

    if (!riggedWinner) {
        riggedWinner = prizePool[11];
    }

    const targetIndex = 65; 
    const generateStrip = Array.from({ length: 80 }).map((_, i) => {
      if (i === targetIndex) return riggedWinner;
      return Math.random() > 0.95 ? bonusItem : prizePool[Math.floor(Math.random() * prizePool.length)];
    });

    setStripItems(generateStrip);

    const cw = containerRef.current.clientWidth;
    
    // STEP 1: Instantly snap to the start invisibly
    setTransitionStyle("none");
    setSliderTranslate((cw / 2) - (ITEM_WIDTH / 2));

    // STEP 2: Use double RequestAnimationFrame to force browser reflow
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Exact Math: (Target Index * Total Block) + Half of item width
        const exactCenterOfTarget = (targetIndex * TOTAL_ITEM_BLOCK) + (ITEM_WIDTH / 2);
        
        // Final position = Center of container minus exact center of target
        const offset = Math.floor(Math.random() * 40) - 20; 
        const finalTranslate = (cw / 2) - exactCenterOfTarget + offset;

        setTransitionStyle("transform 6s cubic-bezier(0.1, 0.9, 0.2, 1)");
        setSliderTranslate(finalTranslate);

        setTimeout(() => {
          setIsRolling(false);
          setWinningItem(riggedWinner);
          
          if (isDemo) {
             setShowPopup(true);
          } else if (riggedWinner) {
             setBalance(prev => prev + riggedWinner.value);
          }
        }, 6000);
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center pb-24 relative overflow-hidden">
      
      {/* Top Header */}
      <div className="w-full flex justify-between items-center p-4 max-w-md mt-2">
        <Link href="/" className="text-white flex items-center gap-2 font-bold bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 active:scale-95 transition">
           <span>← Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600">
              <img src="https://i.pravatar.cc/150?u=shivuu" alt="User" />
            </div>
            <span className="text-white font-bold text-sm">- Aadi..!!</span>
          </div>
          <div className="flex items-center gap-1 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">
            <span className="text-white font-bold">{balance}</span>
            <span className="text-yellow-500 text-lg">⭐</span>
          </div>
        </div>
      </div>

      {/* Bet Selectors */}
      <div className="w-full max-w-md flex gap-4 px-4 mt-6">
        {([25, 50] as BetLevel[]).map((amt) => (
          <button 
            key={amt}
            onClick={() => {
              if(!isRolling) {
                setBetAmount(amt);
                setWinningItem(null); 
              }
            }}
            disabled={isRolling}
            className={`flex-1 flex justify-center items-center gap-1 px-4 py-3 rounded-xl font-bold transition-all border ${
              betAmount === amt 
              ? 'bg-[#1a233a] border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white' 
              : 'bg-[#15151e] border-gray-800 text-gray-400'
            }`}
          >
            {amt} <span className="text-yellow-500">⭐</span>
          </button>
        ))}
      </div>

      {/* CS:GO Style Rolling Slider - FIXED CSS LOGIC */}
      <div className="w-full max-w-md mt-6 relative h-44 flex items-center bg-[#0d0d14] border-y border-gray-800 overflow-hidden" ref={containerRef}>
        <div className="absolute left-1/2 -translate-x-1/2 w-16 h-full bg-blue-500/10 blur-xl z-0"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-500 z-20 shadow-[0_0_15px_rgba(59,130,246,1)]"></div>

        {/* Removed paddingLeft logic completely, using explicit absolute positioning */}
        <div 
          className="flex items-center absolute left-0 z-10"
          style={{
            transform: `translateX(${sliderTranslate}px)`,
            transition: transitionStyle,
            width: "max-content",
            gap: `${GAP_WIDTH}px` // Explicit 16px gap
          }}
        >
          {stripItems.map((item, idx) => (
            <div 
              key={idx} 
              style={{ width: `${ITEM_WIDTH}px`, minWidth: `${ITEM_WIDTH}px` }} 
              className={`h-36 rounded-2xl flex flex-col items-center justify-center border-2 shrink-0 relative overflow-hidden bg-[#15151e] ${
                item.name === "Bonus" ? 'border-yellow-500 shadow-[inset_0_0_20px_rgba(234,179,8,0.2)]' : 'border-gray-800'
              }`}
            >
              <span className="text-6xl drop-shadow-2xl z-10 select-none">{item.icon}</span>

              {item.name === "Bonus" && <span className="text-yellow-500 font-bold text-sm absolute bottom-2 tracking-widest z-10">BONUS</span>}
              
              {item.name !== "Bonus" && item.name !== "Demo Gift" && (
                <div className="absolute bottom-2 bg-[#0a0a0f]/80 px-3 py-1 rounded-full flex items-center gap-1 border border-gray-700/50">
                   <span className="text-white text-xs font-bold">{item.value}</span>
                   <span className="text-yellow-500 text-[10px]">⭐</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Winning Announcement Text */}
      <div className="h-8 mt-4 flex items-center justify-center w-full max-w-md">
        {winningItem && !isDemo && !isRolling && (
           <span className="text-green-400 font-bold text-lg animate-bounce">
             You won {winningItem.name}! (+{winningItem.value} ⭐)
           </span>
        )}
      </div>

      {/* Controls Area (Play & Demo Switch) */}
      <div className="w-full max-w-md px-4 mt-2 flex gap-4 items-center">
        <button 
          onClick={startRoll}
          disabled={isRolling}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-black font-extrabold text-xl py-4 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 transition-all disabled:opacity-50"
        >
          {isRolling ? "Rolling..." : `I'm lucky, Go! ${isDemo ? 'FREE' : betAmount}`}
        </button>

        <div className="flex flex-col items-center justify-center">
           <span className="text-gray-400 text-xs font-bold mb-1 uppercase">Demo</span>
           <div 
             onClick={() => !isRolling && setIsDemo(!isDemo)}
             className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isDemo ? 'bg-blue-500' : 'bg-gray-700'}`}
           >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${isDemo ? 'translate-x-7' : 'translate-x-0'}`}></div>
           </div>
        </div>
      </div>

      {/* Grid of Winning Possibilities */}
      <div className="w-full max-w-md px-4 mt-10">
        <p className="text-center text-gray-400 font-medium mb-4">You can win...</p>
        <div className="grid grid-cols-4 gap-3">
          {prizePool.map((prize) => (
            <div key={prize.id} className="bg-[#15151e] border border-gray-800 rounded-2xl p-2 flex flex-col items-center relative overflow-hidden">
              
              {prize.rarity === 'legendary' && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[7px] font-bold px-4 py-1 rotate-45 translate-x-3 translate-y-1 shadow-md uppercase tracking-wider">Crystals</div>
              )}
              
              <span className="text-4xl drop-shadow-lg mt-2 select-none">{prize.icon}</span>

              <span className="text-gray-500 text-[9px] mt-2 font-bold text-center w-full truncate">✨ {prize.chance}</span>
              <div className="bg-[#0a0a0f] border border-gray-700 w-full text-center mt-1 py-1 rounded flex justify-center items-center gap-1">
                <span className="text-white font-bold text-xs">{prize.value}</span>
                <span className="text-yellow-500 text-[10px]">⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎁 DEMO POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15151e] w-full max-w-sm rounded-3xl p-6 border border-gray-800 flex flex-col items-center relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h2 className="text-white text-2xl font-bold mt-2">Demo gift</h2>
            
            <span className="text-8xl drop-shadow-[0_0_30px_rgba(255,0,0,0.3)] animate-pulse my-4 select-none">{demoGift.icon}</span>

            <p className="text-gray-400 text-center font-medium mb-8">Demo mode is for testing chances.</p>
            
            <button 
              onClick={() => {
                setIsDemo(false);
                setShowPopup(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-3 rounded-2xl transition-colors"
            >
              Disable demo mode
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
