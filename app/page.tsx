export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="bg-[#15151e] border border-gray-800 p-8 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.2)] text-center">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Task 1 <span className="text-blue-500">Completed</span> 🚀
        </h1>
        <p className="text-gray-400">
          Dark theme is active. Tailwind CSS is working perfectly!
        </p>
      </div>
    </main>
  );
}
