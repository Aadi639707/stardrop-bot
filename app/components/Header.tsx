'use client';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className="flex items-center space-x-3 p-4 bg-[#1e1e24] rounded-xl shadow-lg border border-gray-800">
      <img 
        src={user?.photo_url || 'https://telegram.org/img/t_logo.png'} 
        alt="DP" 
        className="w-12 h-12 rounded-full border-2 border-blue-500"
      />
      <div>
        <h2 className="text-white font-bold text-lg">{user ? user.first_name : 'Guest User'}</h2>
        <p className="text-gray-400 text-sm">ID: {user ? user.id : 'Connecting...'}</p>
      </div>
      <div className="ml-auto">
        <span className="text-blue-400 font-bold">0 💎</span>
      </div>
    </div>
  );
}
