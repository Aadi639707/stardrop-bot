"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

export default function ProfilePage() {
  const [balance, setBalance] = useState(1000);
  const [copied, setCopied] = useState(false);
  
  // Real Telegram User State
  const [tgUser, setTgUser] = useState<any>(null);
  
  // Fake stats for now (will connect to DB later)
  const [inviteStats] = useState({
    friendsJoined: 0,
    starsEarned: 0
  });

  useEffect(() => {
    // Ye code check karega ki user Telegram ke andar hai ya nahi
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      
      if (tg.initDataUnsafe?.user) {
        setTgUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  // Default data agar browser me test kar rahe ho
  const userName = tgUser?.first_name || "Aadi..!!";
  const userPhoto = tgUser?.photo_url || "https://i.pravatar.cc/150?u=shivuu";
  const userId = tgUser?.id || "123456789";

  const inviteLink = `https://t.me/your_bot_name?start=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24 relative overflow-hidden flex flex-col items-center">
      {/* Telegram SDK Script */}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      {/* HEADER */}
      <div className="w-full flex justify-between items-center p-4 max-w-md mt-2">
        <Link href="/" className="text-white flex items-center gap-2 font-bold bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 active:scale-95 transition">
           <span>← Back</span>
        </Link>
        <div className="flex items-center gap-1 bg-[#15151e] px-4 py-2 rounded-xl border border-gray-800 shadow-md">
          <span className="font-bold">{balance}</span>
          <span className="text-yellow-500 text-lg">⭐</span>
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-4">
        
        {/* PROFILE CARD (Fetches Real Telegram Data) */}
        <div className="bg-[#15151e] border border-gray-800 rounded-3xl p-6 flex flex-col items-center shadow-lg relative overflow-hidden">
           {/* Top Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-10 bg-blue-500/20 blur-2xl"></div>
           
           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-3 shadow-[0_0_20px_rgba(59,130,246,0.4)] relative z-10">
              <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
           </div>
           
           <h2 className="text-2xl font-black text-white relative z-10">{userName}</h2>
           
           {tgUser ? (
             <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-1 rounded mt-1">Verified Telegram User</span>
           ) : (
             <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2 py-1 rounded mt-1">Guest Mode (Web)</span>
           )}
        </div>

        {/* REAL STARS REFERRAL SYSTEM */}
        <div className="mt-6">
           <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-yellow-500 text-lg">👥</span> Invite & Earn
           </h3>
           
           <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-purple-500/50 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.15)]">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-40"></div>
              
              <h4 className="text-2xl font-black text-white drop-shadow-md leading-tight mb-2">
                 Get up to 3 ⭐ <br/>per friend!
              </h4>
              <p className="text-purple-200 text-xs font-medium mb-5">
                 Invite friends to play. When they join, you earn 1 to 3 Real Telegram Stars randomly!
              </p>

              {/* INVITE LINK BOX */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-1 flex items-center justify-between backdrop-blur-sm">
                 <div className="px-3 truncate text-sm font-medium text-gray-300 flex-1 select-all">
                    {inviteLink}
                 </div>
                 <button 
                   onClick={copyToClipboard}
                   className={`px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md ${
                     copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'
                   }`}
                 >
                    {copied ? 'Copied!' : 'Copy'}
                 </button>
              </div>
           </div>
        </div>

        {/* REFERRAL STATS */}
        <div className="mt-4 grid grid-cols-2 gap-3">
           <div className="bg-[#15151e] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-md">
              <span className="text-3xl mb-1">🤝</span>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Friends Joined</p>
              <h3 className="text-2xl font-black text-white mt-1">{inviteStats.friendsJoined}</h3>
           </div>
           
           <div className="bg-[#15151e] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-md">
              <span className="text-3xl mb-1">⭐</span>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Stars Earned</p>
              <h3 className="text-2xl font-black text-yellow-500 mt-1">{inviteStats.starsEarned}</h3>
           </div>
        </div>

      </div>
    </div>
  );
}
