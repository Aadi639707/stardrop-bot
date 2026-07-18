"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- GAME CONFIGURATION ---
const COLORS = [
  { id: "red", name: "Red", icon: "🔴", bg: "bg-red-500", shadow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]", mult: 2 },
  { id: "blue", name: "Blue", icon: "🔵", bg: "bg-blue-500", shadow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]", mult: 2 },
  { id: "yellow", name: "Yellow", icon: "🟡", bg: "bg-yellow-500", shadow: "shadow-[0_0_20px_rgba(234,179,8,0.5)]", mult: 2 },
  { id: "purple", name: "Purple", icon: "🟣", bg: "bg-purple-500", shadow: "shadow-[0_0_20px_rgba(168,85,247,0.8)]", mult: 5 }, // Jackpot Color
];

const BOT_NAMES = ["Aman", "Rahul", "Priya", "GamerX", "Vikash", "Neha", "Rohan", "King", "Sniper", "Raj", "ToxicGamer", "Avinash"];
const BOT_BETS = [15, 25, 50, 100, 250];

type GameState = "betting" | "rolling" | "result";

export default function ColorGame() {
  const [balance, setBalance] = useState(2000); // Demo Balance
  const [gameState, setGameState] = useState<GameState>("betting");
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds to bet
  
  // Player's Bets: { red: 50, blue: 0, yellow: 0, purple: 0 }
  const [playerBets, setPlayerBets] = useState<Record<string, number>>({ red: 0, blue: 0, yellow: 0, purple: 0 });
  const [selectedBetAmount, setSelectedBetAmount] = useState(25);
  
  // Fake Multiplayer Live Feed
  const [liveBets, setLiveBets] = useState<any[]>([]);
  const [winningColor, setWinningColor] = useState<any | null>(null);
  
  // Ref for the live feed container to auto-scroll
  const feedRef = useRef<HTMLDivElement>(null);

  // --- GAME LOOP & TIMER ---
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
      // Generate a fake bet every 0.8 to 2 seconds
      const triggerFakeBet = () => {
        const randomName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        // Purple pe log kam bet karte hain, to realistic banane ke liye rare karo
        const isPurple = randomColor.id === "purple";
        const randomAmount = isPurple 
            ? (Math.random() > 0.8 ? 100 : 25) 
            : BOT_BETS[Math.floor(Math.random() * BOT_BETS.length)];

        const newBet = { id: Date.now(), name: randomName, color: randomColor, amount: randomAmount };
        
        setLiveBets((prev) => {
          const updated = [...prev, newBet];
          return updated.slice(-6); // Keep only last 6 bets to fit screen
        });

        // Auto-scroll feed
        if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;

        const nextDelay = Math.floor(Math.random() * 1200) + 800; // 0.8s to 2s
        botInterval = setTimeout(triggerFakeBet, nextDelay);
      };

      botInterval = setTimeout(triggerFakeBet, 1000);
    } else {
      setLiveBets([]); // Clear feed when rolling
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

  // --- THE RIGGED ROLL ALGORITHM ---
  const startRoll = () => {
    setGameState("rolling");
    
    // CASINO OWNER LOGIC 🧠 (Minimize payouts)
    // 1. Calculate how much player will win on each color
    const potentialPayouts = COLORS.map(c => ({
      color: c,
      payout: playerBets[c.id] * c.mult
    }));

    // 2. Sort from lowest payout to highest payout (We want to pick lowest payout usually)
    potentialPayouts.sort((a, b) => a.payout - b.payout);

    let finalWinner;
    const rand = Math.random();

    // 70% of the time, pick the color that costs the house the LEAST money (or 0 money).
    if (rand < 0.70) {
       // Pick from the top 2 lowest payouts (usually colors player didn't bet on)
       const safeOptions = [potentialPayouts[0].color, potentialPayouts[1].color];
       finalWinner = safeOptions[Math.floor(Math.random() * safeOptions.length)];
    } 
    // 30% of the time, pick randomly so player wins sometimes and stays hooked
    else {
       finalWinner = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    setWinningColor(finalWinner);

    // Simulate wheel spin delay
    setTimeout(() => {
      setGameState("result");
      
      // Give payout if player won
      const winnings = playerBets[finalWinner.id] * finalWinner.mult;
      if (winnings > 0) {
        setBalance(prev => prev + winnings);
      }

      // Reset for next round after 5 seconds
      setTimeout(() => {
        setPlayerBets({ red: 0, blue: 0, yellow: 0, purple: 0 });
        setWinningColor(null);
        setTimeLeft(15);
        setGameState("betting");
      }, 5000);

    }, 3000); // 3 seconds rolling animation
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

      {/* GAME STATUS / TIMER */}
      <div className="w-full max-w-md px-4 mt-4 text-center">
        {gameState === "betting" && (
          <div className="bg-[#15151e] border border-gray-800 rounded-2xl py-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-1000" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
             <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Place your bets</p>
             <h1 className={`text-5xl font-black ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</h1>
          </div>
        )}

        {gameState === "rolling" && (
          <div className="bg-[#15151e] border border-gray-800 rounded-2xl py-8 flex flex-col items-center">
             <p className="text-yellow-500 text-xl font-bold animate-pulse">Drawing Winner...</p>
          </div>
        )}

        {gameState === "result" && winningColor && (
          <div className={`border rounded-2xl py-6 animate-in zoom-in ${totalWinnings > 0 ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
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

      {/* FAKE LIVE MULTIPLAYER FEED */}
      <div className="w-full max-w-md px-4 mt-6">
        <div className="flex justify-between items-center mb-2">
           <span className="text-gray-400 font-bold text-xs uppercase flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             Live Bets (1,248 Online)
           </span>
        </div>
        <div 
          ref={feedRef}
          className="h-28 bg-[#0d0d14] border border-gray-800 rounded-xl p-2 overflow-y-hidden flex flex-col gap-1 relative"
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
          
          {/* Overlay to fade out older bets */}
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
