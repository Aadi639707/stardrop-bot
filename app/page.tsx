"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Fake Leaderboard Data for Tourneys
const leaderboardData = [
  { rank: 1, name: "King", points: "124,500", prize: "25,000", avatar: "👑" },
  { rank: 2, name: "ToxicGamer", points: "98,200", prize: "10,000", avatar: "💀" },
  { rank: 3, name: "Priya", points: "85,400", prize: "5,000", avatar: "👧" },
  { rank: 4, name: "Rahul", points: "72,100", prize: "2,500", avatar: "👦" },
  { rank: 5, name: "Aman", points: "65,300", prize: "1,000", avatar: "🧔" },
  { rank: 6, name: "Sniper", points: "61,000", prize: "500", avatar: "🎯" },
  { rank: 7, name: "Neha", points: "58,900", prize: "500", avatar: "👩" },
  { rank: 8, name: "GamerX", points: "54,200", prize: "500", avatar: "🎮" },
  { rank: 9, name: "Vikash", points: "49,100", prize: "250", avatar: "😎" },
  { rank: 10, name: "Raj", points: "45,000", prize: "250", avatar: "🔥" },
];

export default function Home() {
  // Yahan hum state manage kar rahe hain ki kaunsa page dikhana hai
  const [activeTab, setActiveTab] = useState("tourneys"); 
  const [balance, setBalance] = useState(1000);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, mins: 35, secs: 59 });

  // Fake Countdown Timer for Tourneys
  useEffect(() => {
    if (activeTab !== "tourneys") return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans pb-24 relative overflow-hidden flex flex-col items-center">

      {/* TOP HEADER (Common for all tabs) */}
      <div className="w-full flex justify-between items-center p-4 max-w-md mt-2">
        <div className="flex items-center gap-2 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 shadow-md">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600">
            <img src="https://i.pravatar.cc/150?u=shivuu" alt="User" />
          </div>
          <span className="font-bold text-sm">Aadi..!!</span>
        </div>
        <div className="flex items-center gap-1 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 shadow-md">
          <span className="font-bold">{balance}</span>
          <span className="text-yellow-500 text-lg">⭐</span>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA (Yeh tab ke hisaab se badlega) --- */}
      <div className="w-full max-w-md flex-1 overflow-y-auto pb-6 scrollbar-hide">

        {/* TAB 1: TOURNEYS (The VIP Code) */}
        {activeTab === "tourneys" && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {/* TOURNAMENT BANNER */}
            <div className="px-4 mt-2">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/50 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[60px] opacity-40"></div>
                 <span className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Active Tournament</span>
                 <h1 className="text-3xl font-black text-white mt-3 italic drop-shadow-lg">WEEKEND FORTUNE</h1>
                 <div className="flex items-center gap-2 mt-4">
                   <span className="text-gray-300 font-medium text-sm">Prize Pool:</span>
                   <span className="text-yellow-400 font-black text-xl">50,000 ⭐</span>
                 </div>
                 <div className="mt-6 flex gap-3">
                   <div className="flex flex-col items-center bg-black/40 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-16">
                     <span className="text-white font-bold text-lg">{timeLeft.days}</span>
                     <span className="text-gray-400 text-[10px] uppercase font-bold">Days</span>
                   </div>
                   <div className="flex flex-col items-center bg-black/40 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-16">
                     <span className="text-white font-bold text-lg">{timeLeft.hours.toString().padStart(2, '0')}</span>
                     <span className="text-gray-400 text-[10px] uppercase font-bold">Hrs</span>
                   </div>
                   <div className="flex flex-col items-center bg-black/40 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-16">
                     <span className="text-white font-bold text-lg">{timeLeft.mins.toString().padStart(2, '0')}</span>
                     <span className="text-gray-400 text-[10px] uppercase font-bold">Mins</span>
                   </div>
                   <div className="flex flex-col items-center bg-black/40 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-16">
                     <span className="text-red-400 font-bold text-lg animate-pulse">{timeLeft.secs.toString().padStart(2, '0')}</span>
                     <span className="text-gray-400 text-[10px] uppercase font-bold">Secs</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* USER RANKING FOMO */}
            <div className="px-4 mt-6">
              <div className="bg-[#15151e] border border-gray-700 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
                       <img src="https://i.pravatar.cc/150?u=shivuu" alt="User" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Aadi..!!</p>
                      <p className="text-gray-400 text-xs font-medium mt-0.5">Points: <span className="text-cyan-400">1,250</span></p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-gray-400 text-xs uppercase font-bold mb-1">Your Rank</p>
                    <h2 className="text-white font-black text-2xl">#142</h2>
                 </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2 font-medium">Earn 1 point for every 1 ⭐ wagered in any game.</p>
            </div>

            {/* LEADERBOARD LIST */}
            <div className="px-4 mt-8 mb-4">
              <div className="flex justify-between items-end mb-4">
                 <h3 className="text-white font-bold text-lg flex items-center gap-2">
                   <span className="text-yellow-500">🏆</span> Top Players
                 </h3>
                 <span className="text-gray-500 text-xs font-bold">Prizes</span>
              </div>

              <div className="flex flex-col gap-2">
                {leaderboardData.map((player) => {
                  let bgClass = "bg-[#15151e]";
                  let borderClass = "border-gray-800";
                  let rankColor = "text-gray-400";
                  
                  if (player.rank === 1) { bgClass = "bg-yellow-500/10"; borderClass = "border-yellow-500/50"; rankColor = "text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"; }
                  if (player.rank === 2) { bgClass = "bg-gray-300/10"; borderClass = "border-gray-400/50"; rankColor = "text-gray-300"; }
                  if (player.rank === 3) { bgClass = "bg-amber-700/10"; borderClass = "border-amber-700/50"; rankColor = "text-amber-600"; }

                  return (
                    <div key={player.rank} className={`${bgClass} border ${borderClass} rounded-xl p-3 flex items-center justify-between transition-all hover:scale-[1.02]`}>
                       <div className="flex items-center gap-3">
                          <div className={`w-8 text-center font-black text-lg ${rankColor}`}>#{player.rank}</div>
                          <div className="w-10 h-10 bg-[#0a0a0f] rounded-full border border-gray-700 flex items-center justify-center text-xl shadow-inner">
                             {player.avatar}
                          </div>
                          <div>
                             <p className={`font-bold text-sm ${player.rank <= 3 ? 'text-white' : 'text-gray-300'}`}>{player.name}</p>
                             <p className="text-gray-500 text-[10px] font-bold mt-0.5">{player.points} PTS</p>
                          </div>
                       </div>
                       <div className="bg-[#0a0a0f] border border-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-1">
                          <span className="text-white font-bold text-sm">{player.prize}</span>
                          <span className="text-yellow-500 text-xs">⭐</span>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GAMES (Center Dice Button par click karne se khulega) */}
        {activeTab === "games" && (
          <div className="flex flex-col gap-4 px-4 mt-8 animate-in fade-in zoom-in-95 duration-300">
             <h2 className="text-2xl font-black text-center mb-6">Casino Games 🎲</h2>
             
             <Link href="/case-opener">
               <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-500/30 p-6 rounded-3xl flex items-center justify-between shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-95 transition-transform">
                  <div>
                     <h3 className="text-xl font-bold text-white">Case Opener</h3>
                     <p className="text-blue-300 text-xs mt-1">Spin the wheel and win big!</p>
                  </div>
                  <span className="text-5xl drop-shadow-lg">🎡</span>
               </div>
             </Link>

             <Link href="/color-game">
               <div className="bg-gradient-to-r from-purple-900 to-purple-800 border border-purple-500/30 p-6 rounded-3xl flex items-center justify-between shadow-[0_0_20px_rgba(147,51,234,0.2)] active:scale-95 transition-transform mt-2">
                  <div>
                     <h3 className="text-xl font-bold text-white">Color Prediction</h3>
                     <p className="text-purple-300 text-xs mt-1">Bet on colors, win up to 5x!</p>
                  </div>
                  <span className="text-5xl drop-shadow-lg">🔴</span>
               </div>
             </Link>
          </div>
        )}

        {/* TAB 3: GIVEAWAYS */}
        {activeTab === "giveaways" && (
          <div className="flex flex-col items-center justify-center h-full px-4 animate-in fade-in zoom-in-95 mt-20">
             <span className="text-7xl mb-4 drop-shadow-2xl">🎁</span>
             <h2 className="text-2xl font-bold text-white">Giveaways</h2>
             <p className="text-gray-400 mt-2 text-center text-sm">Join daily drops and earn free stars! Coming soon.</p>
          </div>
        )}

        {/* TAB 4: TASKS */}
        {activeTab === "tasks" && (
          <div className="flex flex-col items-center justify-center h-full px-4 animate-in fade-in zoom-in-95 mt-20">
             <span className="text-7xl mb-4 drop-shadow-2xl">📋</span>
             <h2 className="text-2xl font-bold text-white">Earn Stars</h2>
             <p className="text-gray-400 mt-2 text-center text-sm">Complete social tasks to get free balance. Coming soon.</p>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === "profile" && (
          <div className="flex flex-col items-center justify-center h-full px-4 animate-in fade-in zoom-in-95 mt-16">
             <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <img src="https://i.pravatar.cc/150?u=shivuu" alt="User" className="w-full h-full object-cover" />
             </div>
             <h2 className="text-3xl font-black text-white">Aadi..!!</h2>
             <p className="text-gray-400 mt-2 font-medium bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800">Total Balance: <span className="text-white">{balance} ⭐</span></p>
          </div>
        )}

      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0d0d14]/90 backdrop-blur-md border-t border-gray-800 rounded-t-3xl pb-safe z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 px-2 relative">
          
          {/* Tourneys Button */}
          <button onClick={() => setActiveTab("tourneys")} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === "tourneys" ? "text-blue-500" : "text-gray-500 hover:text-gray-300"}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span className="text-[10px] font-bold">Tourneys</span>
          </button>

          {/* Giveaways Button */}
          <button onClick={() => setActiveTab("giveaways")} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === "giveaways" ? "text-blue-500" : "text-gray-500 hover:text-gray-300"}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            <span className="text-[10px] font-bold">Giveaways</span>
          </button>

          {/* Center Dice (Games Tab) */}
          <button onClick={() => setActiveTab("games")} className="relative -top-5 flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-4 border-[#0a0a0f] shadow-[0_0_20px_rgba(37,99,235,0.8)] active:scale-95 transition-transform">
             <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
          </button>

          {/* Tasks Button */}
          <button onClick={() => setActiveTab("tasks")} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === "tasks" ? "text-blue-500" : "text-gray-500 hover:text-gray-300"}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            <span className="text-[10px] font-bold">Tasks</span>
          </button>

          {/* Profile Button */}
          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === "profile" ? "text-blue-500" : "text-gray-500 hover:text-gray-300"}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="text-[10px] font-bold">Profile</span>
          </button>

        </div>
      </div>

    </div>
  );
}
