"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// --- GAME CONSTANTS ---
const COLORS = [
  { id: "red", hex: "#EF4444", mult: 2, label: "Red 2x" },
  { id: "blue", hex: "#3B82F6", mult: 2, label: "Blue 2x" },
  { id: "yellow", hex: "#EAB308", mult: 2, label: "Yellow 2x" },
  { id: "purple", hex: "#A855F7", mult: 5, label: "Purple 5x" },
];

const ITEM_WIDTH = 80; 
const TOTAL_ITEM_BLOCK = 80; 

export default function RoulettePage() {
  // --- STATES ---
  const [balance, setBalance] = useState(1000);
  const [gameState, setGameState] = useState("betting"); // betting, rolling, result
  const [timeLeft, setTimeLeft] = useState(15);
  const [playerBets, setPlayerBets] = useState({ red: 0, blue: 0, yellow: 0, purple: 0 });
  const [winningColor, setWinningColor] = useState<any>(null);
  
  // Wheel animation states
  const [stripItems, setStripItems] = useState<any[]>([]);
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState("none");
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // --- INITIAL STRIP LOAD ---
  useEffect(() => {
    // Initial random strip to show on page load
    const initialStrip = Array.from({ length: 30 }).map(() => {
      const r = Math.random();
      if (r < 0.1) return COLORS[3];
      if (r < 0.4) return COLORS[0];
      if (r < 0.7) return COLORS[1];
      return COLORS[2];
    });
    setStripItems(initialStrip);
  }, []);

  // --- TIMER LOGIC ---
  useEffect(() => {
    let timer: any;
    if (gameState === "betting" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (gameState === "betting" && timeLeft === 0) {
      startRoll();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // --- PLACING BETS ---
  const placeBet = (colorId: keyof typeof playerBets, amount: number) => {
    if (gameState !== "betting") return;
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      setPlayerBets((prev) => ({ ...prev, [colorId]: prev[colorId] + amount }));
    } else {
      alert("Not enough balance!");
    }
  };

  // --- 100% FAIR ROLL ALGORITHM (KISMAT KA KHEL) ---
  const startRoll = () => {
    setGameState("rolling");
    
    // 1. Pure Random Winner Selection (Fair Probability)
    let finalWinner;
    const rand = Math.random();

    if (rand < 0.30) {
       finalWinner = COLORS[0]; // Red (30%)
    } else if (rand < 0.60) {
       finalWinner = COLORS[1]; // Blue (30%)
    } else if (rand < 0.90) {
       finalWinner = COLORS[2]; // Yellow (30%)
    } else {
       finalWinner = COLORS[3]; // Purple (10%)
    }

    // 2. Generate Strip for the Wheel
    const targetIndex = 50; 
    const generatedStrip = Array.from({ length: 65 }).map((_, i) => {
      if (i === targetIndex) return finalWinner;
      
      // Random fill for other blocks based on same probability
      const r = Math.random();
      if (r < 0.1) return COLORS[3];
      if (r < 0.4) return COLORS[0];
      if (r < 0.7) return COLORS[1];
      return COLORS[2];
    });

    setStripItems(generatedStrip);

    // 3. Exact Pixel Math for animation
    setTimeout(() => {
        if (!wheelContainerRef.current) return;
        const cw = wheelContainerRef.current.clientWidth;
        
        // Reset slider position
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
              
              // Calculate winnings
              const userBetOnWinner = playerBets[finalWinner.id as keyof typeof playerBets];
              const winnings = userBetOnWinner * finalWinner.mult;
              
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col p-4 max-w-md mx-auto relative overflow-hidden pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 mt-2">
        <Link href="/" className="bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 font-bold active:scale-95 transition shadow-lg text-sm flex items-center gap-2 text-gray-300">
          ← Back
        </Link>
        <div className="bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 font-black flex items-center gap-1.5 shadow-lg">
          {balance} <span className="text-yellow-500 text-lg">⭐</span>
        </div>
      </div>

      <h1 className="text-2xl font-black text-center mb-6">Color Game 🔴</h1>

      {/* GAME STATE HEADER */}
      <div className="text-center mb-6 h-12 flex flex-col justify-center items-center">
        {gameState === "betting" && (
          <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">
            Rolling in <span className="text-red-500 text-xl font-black ml-1">{timeLeft}s</span>
          </p>
        )}
        {gameState === "rolling" && (
          <p className="text-blue-400 font-black text-xl animate-pulse uppercase tracking-wider">
            Wheel is rolling!
          </p>
        )}
        {gameState === "result" && winningColor && (
          <div className="animate-in fade-in zoom-in-50 duration-300">
             <p className={`font-black text-3xl uppercase tracking-wider drop-shadow-lg`} style={{ color: winningColor.hex }}>
               {winningColor.label.split(' ')[0]} Won!
             </p>
          </div>
        )}
      </div>

      {/* WHEEL UI */}
      <div className="w-full h-24 bg-[#15151e] border-2 border-gray-800 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.8)] mb-8 flex items-center rounded-2xl" ref={wheelContainerRef}>
        {/* Center Line Marker */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-white z-20 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
        
        {/* Moving Strip */}
        <div 
          className="flex h-16 absolute left-0 will-change-transform"
          style={{
            transform: `translateX(${sliderTranslate}px)`,
            transition: transitionStyle,
          }}
        >
          {stripItems.map((item, i) => (
            <div 
              key={i}
              className="w-[76px] h-full mx-[2px] rounded-lg shadow-inner flex items-center justify-center opacity-90 border border-white/20"
              style={{ backgroundColor: item.hex }}
            >
              <span className="font-black text-white/60 text-xl drop-shadow-md">{item.mult}x</span>
            </div>
          ))}
        </div>
      </div>

      {/* BETTING CONTROLS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {COLORS.map((color) => (
          <div key={color.id} className="flex flex-col gap-2">
            <button
              onClick={() => placeBet(color.id as keyof typeof playerBets, 10)}
              disabled={gameState !== "betting"}
              className="p-4 rounded-3xl flex flex-col items-center justify-center border-t-2 border-l-2 border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 transition disabled:opacity-50 disabled:active:scale-100 relative overflow-hidden group"
              style={{ backgroundColor: color.hex }}
            >
              <span className="font-black text-white text-xl drop-shadow-md">{color.label}</span>
              <span className="bg-black/30 px-2 py-1 rounded-md text-white/90 text-[10px] font-bold mt-2 border border-white/10 uppercase tracking-widest">
                Bet 10 ⭐
              </span>
            </button>
            <div className="bg-[#15151e] border border-gray-800 py-2 rounded-xl text-center font-bold text-sm shadow-inner">
              <span className="text-gray-500 text-xs uppercase">Your Bet:</span> <span className="text-white ml-1">{playerBets[color.id as keyof typeof playerBets]}</span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
      }
