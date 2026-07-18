"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#15151e]/90 backdrop-blur-lg border-t border-gray-800 pb-4 pt-2 px-4 rounded-t-3xl">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto">
        
        {/* Tournaments */}
        <Link href="/tournaments" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/tournaments' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-400'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
           <span className="text-[10px] font-medium">Tourneys</span>
        </Link>
        
        {/* Giveaways */}
        <Link href="/giveaways" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/giveaways' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-400'}`}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
           <span className="text-[10px] font-medium">Giveaways</span>
        </Link>

        {/* Center Play Button (Floating & Glowing - FIXED) */}
        <Link href="/" className="relative -top-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center justify-center border-4 border-[#0a0a0f] transition-transform hover:scale-105 active:scale-95">
            {/* Premium 3D-like Dice Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <rect x="3" y="3" width="18" height="18" rx="4" strokeLinecap="round" strokeLinejoin="round" />
               <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
               <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
               <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </Link>

        {/* Tasks */}
        <Link href="/tasks" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/tasks' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          <span className="text-[10px] font-medium">Tasks</span>
        </Link>

        {/* Profile */}
        <Link href="/profile" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/profile' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
