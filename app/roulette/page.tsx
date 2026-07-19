"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- GAME CONFIGURATION ---
const COLORS = [
  { id: "red", name: "Red", icon: "🔴", bg: "bg-red-500", border: "border-red-500", shadow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]", mult: 2 },
  { id: "blue", name: "Blue", icon: "🔵", bg: "bg-blue-500", border: "border-blue-500", shadow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]", mult: 2 },
  { id: "yellow", name: "Yellow", icon: "🟡", bg: "bg-yellow-500", border: "border-yellow-500", shadow: "shadow-[0_0_20px_rgba(234,179,8,0.4)]", mult: 2 },
  { id: "purple", name: "Purple", icon: "🟣", bg: "bg-purple-500", border: "border-purple-500", shadow: "shadow-[0_0_20px_rgba(168,85,247,0.6)]", mult: 5 }, 
];

const BOT_NAMES = ["Aman", "Rahul", "Priya", "GamerX", "Vikash", "Neha", "Rohan", "King", "Sniper", "Raj", "ToxicGamer", "Avinash"];
const BOT_BETS = [10, 25, 50, 100, 250];

type GameState = "betting" | "rolling" | "result";

export default function ColorGame() {
  const [balance, setBalance] = useState(2000); 
  const [gameState, setGameState] = useState<GameState>("betting");
  const [timeLeft, setTimeLeft] = useState(15); 
  
  // Player Bets
  const [playerBets, setPlayerBets] = useState<Record<string, number>>({ red: 0, blue: 0, yellow: 0, purple: 0 });
  const [selectedBetAmount, setSelectedBetAmount] = useState(25);
  
  // Fake Live Feed
  const [liveBets, setLiveBets] = useState<any[]>([]);
  const [winningColor, setWinningColor] = useState<any | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Wheel Animation States
  const [stripItems, setStripItems] = useState<any[]>([]);
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState("none");
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  const ITEM_WIDTH = 96; 
  const GAP_WIDTH = 12;
  const TOTAL_ITEM_BLOCK = ITEM_WIDTH + GAP_WIDTH; // 108px

  // --- TIMER LOGIC ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === "betting" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } 
    else if (gameState === "betting" && timeLeft === 0) {
      startRoll();
    }

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // --- FAKE MULTIPLAYER BOT GENERATOR ---
  useEffect(() => {
    let botInterval: NodeJS.Timeout;
    
    if (gameState === "betting") {
      const triggerFakeBet = () => {
        const randomName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const isPurple = randomColor.id === "purple";
        const randomAmount = isPurple 
            ? (Math.random() > 0.8 ? 100 : 10) 
            : BOT_BETS[Math.floor(Math.random() * BOT_BETS.length)];

        const newBet = { id: Date.now(), name: randomName, color: randomColor, amount: randomAmount };
        
        setLiveBets((prev) => {
          const updated = [...prev, newBet];
          return updated.slice(-6); 
        });

        if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;

        const nextDelay = Math.floor(Math.random() * 1200) + 800; 
        botInterval = setTimeout(triggerFakeBet, nextDelay);
      };

      botInterval = setTimeout(triggerFakeBet, 1000);
    } else {
      setLiveBets([]); 
    }

    return () => clearTimeout(botInterval);
  }, [gameState]);

  // --- PLACE BET FUNCTION ---
  const handlePlaceBet = (colorId: string) => {
    if (gameState !== "betting") return;
    if (balance < selectedBetAmount) return alert("Not enough Stars!");

    setBalance((prev) => prev - selectedBetAmount);
    setPlayerBets((prev) => ({
      ...prev,
      [colorId]: prev[colorId] + selectedBetAmount
    }));
  };

  // --- THE RIGGED ROLL ALGORITHM (WITH WHEEL UI) ---
  const startRoll = () => {
    setGameState("rolling");
    
    // 1. Calculate Payouts
    const potentialPayouts = COLORS.map(c => ({
      color: c,
      payout: playerBets[c.id] * c.mult
    }));
    potentialPayouts.sort((a, b) => a.payout - b.payout);

    let finalWinner;
    const rand = Math.random();

    // 70% House Edge
    if (rand < 0.70) {
       const safeOptions = [potentialPayouts[0].color, potentialPayouts[1].color];
       finalWinner = safeOptions[Math.floor(Math.random() * safeOptions.length)];
    } else {
       finalWinner = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    // 2. Generate Strip for the Wheel
    const targetIndex = 50; 
    const generatedStrip = Array.from({ length: 65 }).map((_, i) => {
      if (i === targetIndex) return finalWinner;
      
      // Fill remaining with random colors (Purple rare)
      const r = Math.random();
      if (r < 0.1) return COLORS[3]; // Purple
      if (r < 0.4) return COLORS[0]; // Red
      if (r < 0.7) return COLORS[1]; // Blue
      return COLORS[2]; // Yellow
    });

    setStripItems(generatedStrip);

    // 3. Exact Pixel Math for alignment
    setTimeout(() => {
        if (!wheelContainerRef.current) return;
        const cw = wheelContainerRef.current.clientWidth;
        
        // Start position
        setTransitionStyle("none");
        setSliderTranslate((cw / 2) - (ITEM_WIDTH / 2));

        // Start Animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const exactCenterOfTarget = (targetIndex * TOTAL_ITEM_BLOCK) + (ITEM_WIDTH / 2);
            const offset = Math.floor(Math.random() * 40) - 20; 
            const finalTranslate = (cw / 2) - exactCenterOfTarget + offset;

            setTransitionStyle("transform 5s cubic-bezier(0.1, 0.9, 0.2, 1)");
            setSliderTranslate(finalTranslate);

            // 4. Conclude Roll
            setTimeout(() => {
              setWinningColor(finalWinner);
              setGameState("result");
              
              const winnings = playerBets[finalWinner.id] * finalWinner.mult;
              if (winnings > 0) {
                setBalance(prev => prev + winnings);
              }

              // Reset after 4 seconds
              setTimeout(() => {
                setPlayerBets({ red: 0, blue: 0, yellow: 0, purple: 0 });
                setWinningColor(null);
                setTimeLeft(15);
                setGameState("betting");
              }, 4000);

            }, 5000); // Wheel spins for 5s
          });
        });
    }, 50);
  };

  const totalPlayerBet = Object.values(playerBets).reduce((a, b) => a + b, 0);
  const totalWinnings = winningColor ? playerBets[winningColor.id] * winningColor.mult : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center pb-20 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="w-full flex justify-between items-center p-4 max-w-md mt-2">
        <Link href="/" className="text-white flex items-center gap-2 font-bold bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 active:scale-95 transition">
           <span>← Back</span>
        </Link>
        <div className="flex items-center gap-1 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">
          <span className="text-white font-bold">{balance}</span>
          <span className="text-yellow-500 text-lg">⭐</span>
        </div>
      </div>

      {/* GAME STATUS / TIMER OR WHEEL */}
      <div className="w-full max-w-md px-4 mt-4 text-center min-h-[140px] flex flex-col justify-center">
        
        {/* Betting State */}
        {gameState === "betting" && (
          <div className="bg-[#15151e] border border-gray-800 rounded-2xl py-6 relative overflow-hidden shadow-lg">
             <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-1000" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
             <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Place your bets</p>
             <h1 className={`text-5xl font-black ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</h1>
          </div>
        )}

        {/* Rolling State - THE NEW COLOR WHEEL 🔥 */}
        {gameState === "rolling" && (
          <div className="w-full relative h-32 flex items-center bg-[#0d0d14] border border-gray-800 rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" ref={wheelContainerRef}>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_15px_white]"></div>
            
            <div 
              className="flex items-center absolute left-0 z-10"
              style={{
                transform: `translateX(${sliderTranslate}px)`,
                transition: transitionStyle,
                width: "max-content",
                gap: `${GAP_WIDTH}px`
              }}
            >
              {stripItems.map((c, i) => (
                <div 
                  key={i} 
                  style={{ width: `${ITEM_WIDTH}px`, minWidth: `${ITEM_WIDTH}px` }} 
                  className={`h-24 rounded-xl flex flex-col items-center justify-center border-2 shrink-0 ${c.bg} bg-opacity-20 ${c.border}`}
                >
                  <span className="text-3xl drop-shadow-md">{c.icon}</span>
                  <span className="text-white font-bold text-xs mt-1">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result State */}
        {gameState === "result" && winningColor && (
          <div className={`border rounded-2xl py-6 shadow-xl animate-in zoom-in duration-300 ${totalWinnings > 0 ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
             <p className="text-white text-lg font-bold mb-2">Winning Color</p>
             <div className="flex justify-center items-center gap-2 text-4xl mb-2">
                <span className="drop-shadow-lg">{winningColor.icon}</span> 
                <span className={winningColor.id === 'purple' ? 'text-purple-400 font-black' : 'text-white font-bold'}>{winningColor.name}</span>
             </div>
             {totalWinnings > 0 ? (
                 <p className="text-green-400 font-extrabold text-xl animate-bounce">You Won +{totalWinnings} ⭐!</p>
             ) : (
                 <p className="text-red-400 font-bold">You Lost - Better luck next time!</p>
             )}
          </div>
        )}
      </div>

      {/* FAKE LIVE MULTIPLAYER FEED (Auto Scrolling) */}
      <div className="w-full max-w-md px-4 mt-6">
        <div className="flex justify-between items-center mb-2">
           <span className="text-gray-400 font-bold text-xs uppercase flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             Live Bets (1,248 Online)
           </span>
        </div>
        <div 
          ref={feedRef}
          className="h-28 bg-[#0d0d14] border border-gray-800 rounded-xl p-2 overflow-y-hidden flex flex-col gap-1 relative shadow-inner"
        >
          {liveBets.length === 0 && gameState === "betting" && <p className="text-gray-600 text-xs text-center mt-8">Waiting for bets...</p>}
          {liveBets.map((bet) => (
             <div key={bet.id} className="flex justify-between items-center bg-[#15151e] px-3 py-1.5 rounded-lg animate-in slide-in-from-right-10 duration-300">
               <span className="text-gray-300 text-xs font-bold">{bet.name}</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs">{bet.color.icon}</span>
                  <span className="text-white font-bold text-xs">{bet.amount} ⭐</span>
               </div>
             </div>
          ))}
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0d0d14] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* BET AMOUNT SELECTOR */}
      <div className="w-full max-w-md flex justify-between gap-2 px-4 mt-6">
        {[10, 25, 50, 100].map((amt) => (
          <button 
            key={amt}
            onClick={() => setSelectedBetAmount(amt)}
            disabled={gameState !== "betting"}
            className={`flex-1 py-2 rounded-xl font-bold transition-all border ${
              selectedBetAmount === amt 
              ? 'bg-[#1a233a] border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] text-white' 
              : 'bg-[#15151e] border-gray-800 text-gray-400'
            } disabled:opacity-50`}
          >
            {amt} ⭐
          </button>
        ))}
      </div>

      {/* THE 4 COLOR BETTING BUTTONS */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 px-4 mt-4">
        {COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => handlePlaceBet(color.id)}
            disabled={gameState !== "betting"}
            className={`relative flex flex-col items-center justify-center py-6 rounded-2xl border-2 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${
               playerBets[color.id] > 0 ? 'border-white' : 'border-transparent'
            } ${color.bg} ${color.shadow}`}
          >
            <span className="text-4xl drop-shadow-lg mb-1">{color.icon}</span>
            <span className="text-white font-black drop-shadow-md tracking-wide">{color.name}</span>
            <span className="bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">Win {color.mult}x</span>
            
            {/* Show Player's Bet on this color */}
            {playerBets[color.id] > 0 && (
              <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-in zoom-in">
                {playerBets[color.id]} ⭐
              </div>
            )}
          </button>
        ))}
      </div>

      {/* TOTAL BET INDICATOR */}
      {totalPlayerBet > 0 && gameState === "betting" && (
         <div className="mt-6 text-gray-400 text-sm font-bold animate-in fade-in">
           Total Bet: <span className="text-white">{totalPlayerBet} ⭐</span>
         </div>
      )}

    </div>
  );
}
