"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// 1. DYNAMIC PRIZE POOLS (Bet badalne par ye list change hogi)
const prizeLibrary = {
  25: [
    { id: 1, name: "Teddy", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Teddy%20bear/3D/teddy_bear_3d.png", chance: "50%", value: 15, rarity: "common" },
    { id: 2, name: "Gift", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wrapped%20present/3D/wrapped_present_3d.png", chance: "50%", value: 25, rarity: "epic" }
  ],
  50: [
    { id: 3, name: "Rocket", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png", chance: "25%", value: 50, rarity: "epic" },
    { id: 4, name: "Cake", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Birthday%20cake/3D/birthday_cake_3d.png", chance: "25%", value: 50, rarity: "common" },
    { id: 5, name: "Flowers", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bouquet/3D/bouquet_3d.png", chance: "25%", value: 50, rarity: "common" },
    { id: 6, name: "Champagne", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bottle%20with%20popping%20cork/3D/bottle_with_popping_cork_3d.png", chance: "25%", value: 50, rarity: "common" }
  ],
  100: [
    { id: 7, name: "Trophy", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png", chance: "33%", value: 100, rarity: "epic" },
    { id: 8, name: "Ring", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ring/3D/ring_3d.png", chance: "33%", value: 100, rarity: "epic" },
    { id: 9, name: "Diamond", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Gem%20stone/3D/gem_stone_3d.png", chance: "34%", value: 100, rarity: "legendary" }
  ],
  250: [
    { id: 10, name: "Crystals", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Milky%20way/3D/milky_way_3d.png", chance: "100%", value: 250, rarity: "legendary" }
  ]
};

const bonusItem = { id: 99, name: "Bonus", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Briefcase/3D/briefcase_3d.png", chance: "0.10%", value: 500, rarity: "legendary" };
const demoGift = { id: 100, name: "Demo Gift", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wrapped%20present/3D/wrapped_present_3d.png", chance: "100%", value: 0, rarity: "common" };

type BetLevel = 25 | 50 | 100 | 250;

export default function CaseOpener() {
  const [balance, setBalance] = useState(0);
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
  
  // Get current active prize pool based on selected bet
  const currentPool = prizeLibrary[betAmount];

  // Jab bet amount change ho, toh purani list ko naye items se replace karo
  useEffect(() => {
    if (isRolling) return;
    const initial = Array.from({ length: 15 }).map(() => currentPool[Math.floor(Math.random() * currentPool.length)]);
    initial[2] = bonusItem;
    setStripItems(initial);
    setSliderTranslate(0);
    setTransitionStyle("none");
    setWinningItem(null);
  }, [betAmount]);

  const startRoll = () => {
    if (isRolling) return;
    if (!isDemo && balance < betAmount) return alert("Not enough Diamonds!");

    if (!isDemo) setBalance(prev => prev - betAmount);
    
    setIsRolling(true);
    setShowPopup(false);
    setWinningItem(null);
    setTransitionStyle("none");
    setSliderTranslate(0); 

    // Rigging Logic: Always pick from current active pool
    const riggedWinner = isDemo ? demoGift : currentPool[Math.floor(Math.random() * currentPool.length)];

    const targetIndex = 65; 
    const generateStrip = Array.from({ length: 80 }).map((_, i) => {
      if (i === targetIndex) return riggedWinner;
      return Math.random() > 0.9 ? bonusItem : currentPool[Math.floor(Math.random() * currentPool.length)];
    });

    setStripItems(generateStrip);

    setTimeout(() => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = 128; // w-28 (112px) + gap-4 (16px)
      
      const exactScroll = (targetIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
      const randomOffset = Math.floor(Math.random() * 60) - 30; 
      
      setTransitionStyle("transform 6s cubic-bezier(0.1, 0.9, 0.2, 1)");
      setSliderTranslate(-(exactScroll + randomOffset));

      setTimeout(() => {
        setIsRolling(false);
        setWinningItem(riggedWinner);
        if (isDemo) {
           setShowPopup(true);
        } else {
           setBalance(prev => prev + riggedWinner.value);
        }
      }, 6000);
    }, 50);
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
            <span className="text-blue-500 text-lg">💎</span>
          </div>
        </div>
      </div>

      {/* Bet Selectors (NOW FULLY DYNAMIC) */}
      <div className="w-full max-w-md flex justify-between px-4 mt-6">
        {([25, 50, 100, 250] as BetLevel[]).map((amt) => (
          <button 
            key={amt}
            onClick={() => setBetAmount(amt)}
            disabled={isRolling}
            className={`flex items-center gap-1 px-4 py-3 rounded-xl font-bold transition-all border ${
              betAmount === amt 
              ? 'bg-[#1a233a] border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white' 
              : 'bg-[#15151e] border-gray-800 text-gray-400'
            }`}
          >
            {amt} <span className="text-blue-500">💎</span>
          </button>
        ))}
      </div>

      {/* CS:GO Style Rolling Slider */}
      <div className="w-full max-w-md mt-6 relative h-44 flex items-center bg-[#0d0d14] border-y border-gray-800" ref={containerRef}>
        <div className="absolute left-1/2 -translate-x-1/2 w-16 h-full bg-blue-500/10 blur-xl z-0"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-500 z-20 shadow-[0_0_15px_rgba(59,130,246,1)]"></div>

        <div 
          className="flex items-center gap-4 absolute left-0 z-10"
          style={{
            transform: `translateX(${sliderTranslate}px)`,
            transition: transitionStyle,
            width: "max-content",
            paddingLeft: "50vw",
          }}
        >
          {stripItems.map((item, idx) => (
            <div key={idx} className={`w-28 h-36 rounded-2xl flex flex-col items-center justify-center border-2 shrink-0 relative overflow-hidden bg-[#15151e] ${
              item.name === "Bonus" ? 'border-yellow-500 shadow-[inset_0_0_20px_rgba(234,179,8,0.2)]' : 'border-gray-800'
            }`}>
              <img src={item.img} alt={item.name} className="w-20 h-20 object-contain drop-shadow-2xl z-10" />
              {item.name === "Bonus" && <span className="text-yellow-500 font-bold text-sm absolute bottom-2 tracking-widest z-10">BONUS</span>}
              
              {item.name !== "Bonus" && item.name !== "Demo Gift" && (
                <div className="absolute bottom-2 bg-[#0a0a0f]/80 px-3 py-1 rounded-full flex items-center gap-1 border border-gray-700/50">
                   <span className="text-white text-xs font-bold">{item.value}</span>
                   <span className="text-blue-500 text-[10px]">💎</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls Area */}
      <div className="w-full max-w-md px-4 mt-8 flex gap-4 items-center">
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

      {/* Grid of Winning Possibilities (NOW DYNAMIC) */}
      <div className="w-full max-w-md px-4 mt-10">
        <p className="text-center text-gray-400 font-medium mb-4">You can win...</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currentPool.map((prize) => (
            <div key={prize.id} className="bg-[#15151e] border border-gray-800 rounded-2xl p-2 flex flex-col items-center relative overflow-hidden">
              {prize.rarity === 'legendary' && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-bold px-4 py-1 rotate-45 translate-x-3 translate-y-1 shadow-md uppercase tracking-wider">Crystals</div>
              )}
              <img src={prize.img} alt={prize.name} className="w-16 h-16 object-contain drop-shadow-lg mt-2" />
              <span className="text-gray-500 text-[10px] mt-2 font-bold">✨ {prize.chance}</span>
              <div className="bg-[#0a0a0f] border border-gray-700 w-full text-center mt-1 py-1 rounded flex justify-center items-center gap-1">
                <span className="text-white font-bold text-xs">{prize.value}</span>
                <span className="text-blue-500 text-[10px]">💎</span>
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
            <img src={demoGift.img} alt="Gift" className="w-32 h-32 object-contain my-6 drop-shadow-[0_0_30px_rgba(255,0,0,0.3)] animate-pulse" />
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
