import Header from './components/Header';
import SpinWheel from './components/SpinWheel';
import NFTCard from './components/NFTCard';

export default function Home() {
  return (
    <main className="min-h-screen p-4 pb-24 max-w-md mx-auto">
      {/* Dynamic Profile */}
      <Header />

      {/* The Rigged Roulette Wheel */}
      <SpinWheel />

      {/* Giveaways Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Active Giveaways</h2>
          <span className="text-sm text-blue-500 font-bold">History</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <NFTCard image="🗽" price={470} name="Statue of Liberty" />
          <NFTCard image="🚀" price={50} name="Space Rocket" />
          <NFTCard image="👟" price={570} name="Crypto Kicks" />
          <NFTCard image="🎁" price={25} name="Mystery Box" />
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#1a1a24] border-t border-gray-800 px-6 py-3 flex justify-between items-center rounded-t-3xl z-40">
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-500">
          <span className="text-xl mb-1">🏆</span>
          <span className="text-[10px] font-bold">Tourneys</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-500">
          <span className="text-xl mb-1">🎟️</span>
          <span className="text-[10px] font-bold">Giveaways</span>
        </button>
        <button className="flex flex-col items-center text-blue-500 relative -top-3">
          <div className="bg-blue-600 p-4 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <span className="text-2xl text-white">🎲</span>
          </div>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-500">
          <span className="text-xl mb-1">📋</span>
          <span className="text-[10px] font-bold">Tasks</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-blue-500">
          <span className="text-xl mb-1">👤</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    </main>
  );
}
