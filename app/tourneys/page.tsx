"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4">
      <Link href="/" className="inline-block bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 mb-4">← Back</Link>
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/50 rounded-3xl p-6 shadow-xl">
         <h1 className="text-3xl font-black text-white italic">WEEKEND FORTUNE</h1>
         <p className="text-yellow-400 font-bold mt-2">Prize Pool: 50,000 ⭐</p>
         <div className="mt-6 text-center text-red-400 font-black text-2xl animate-pulse">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
         </div>
      </div>
      <h2 className="text-white font-bold mt-8 mb-4">🏆 Top Players</h2>
      <div className="bg-[#15151e] border border-gray-800 rounded-2xl p-4 text-center text-gray-500">
         Leaderboard Loading... (Make sure this file is app/tourneys/page.tsx)
      </div>
    </div>
  );
}
