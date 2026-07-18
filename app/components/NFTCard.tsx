'use client';
import { useState } from 'react';

interface NFTProps {
  image: string;
  price: number;
  name: string;
}

export default function NFTCard({ image, price, name }: NFTProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowPopup(true)}
        className="relative bg-gradient-to-b from-[#2a2a35] to-[#1e1e24] p-3 rounded-2xl border border-gray-700 flex flex-col items-center cursor-pointer hover:scale-[1.02] transition-transform"
      >
        <div className="absolute top-0 right-0 bg-purple-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
          NFT
        </div>
        <div className="w-24 h-24 mb-3 flex items-center justify-center text-5xl">
          {image}
        </div>
        <div className="bg-[#121216] px-4 py-1 rounded-full flex items-center gap-1 shadow-inner">
          <span className="text-blue-400 font-bold text-sm">{price}</span>
          <span className="text-blue-400 text-sm">💎</span>
        </div>
        <p className="text-gray-400 text-xs mt-2 font-medium">{name}</p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1e1e24] border border-gray-700 p-8 rounded-2xl w-full max-w-sm text-center shadow-[0_0_40px_rgba(147,51,234,0.1)]">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-2">Giveaways Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              Exclusive {name} NFT drops and premium giveaways are launching shortly. Stay tuned!
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-gray-600 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
