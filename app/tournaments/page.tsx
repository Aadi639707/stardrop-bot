"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function TournamentsPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, mins: 35, secs: 59 });

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24 relative overflow-hidden flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full flex justify-between items-center p-4 max-w-md mt-2">
        <Link href="/" className="text-white flex items-center gap-2 font-bold bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 active:scale-95 transition">
           <span>← Back</span>
        </Link>
        <div className="flex items-center gap-1 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 shadow-md">
          <span className="font-bold">1000</span>
          <span className="text-yellow-500 text-lg">⭐</span>
        </div>
      </div>

      <div className="w-full max-w-md">
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

             {/* TIMER */}
             <div className="mt-6 flex gap-3">
               {[
                 { val: timeLeft.days, label: "Days" },
                 { val: timeLeft.hours, label: "Hrs" },
                 { val: timeLeft.mins, label: "Mins" },
                 { val: timeLeft.secs, label: "Secs" }
               ].map((t, i) => (
                 <div key={i} className="flex flex-col items-center bg-black/40 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-16">
                   <span className={`font-bold text-lg ${t.label === 'Secs' ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                     {String(t.val).padStart(2, '0')}
                   </span>
                   <span className="text-gray-400 text-[10px] uppercase font-bold">{t.label}</span>
                 </div>
               ))}
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

        {/* LEADERBOARD */}
        <div className="px-4 mt-8 mb-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="text-yellow-500">🏆</span> Top Players
          </h3>
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
    </div>
  );
             }
