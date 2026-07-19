"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [houseEdge, setHouseEdge] = useState(70);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Join Telegram Channel", reward: 50, link: "https://t.me/yourchannel", status: "Active" },
    { id: 2, name: "Follow on X (Twitter)", reward: 25, link: "https://x.com/yourpage", status: "Active" },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskReward, setNewTaskReward] = useState("");

  const handleAddTask = () => {
    if (!newTaskName || !newTaskReward) return alert("Pehle task ki details daal bhai!");
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      reward: parseInt(newTaskReward),
      link: "https://...",
      status: "Active"
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    setNewTaskReward("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-10">
      
      {/* ADMIN HEADER */}
      <div className="bg-[#0a0a0f] border-b border-gray-800 p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <span className="text-3xl">🛡️</span>
             <div>
               <h1 className="text-xl font-black text-red-500 uppercase tracking-widest">Admin Control Center</h1>
               <p className="text-gray-500 text-xs font-bold">Manage Economy & Game Settings</p>
             </div>
          </div>
          <Link href="/">
             <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-bold border border-gray-600 transition-colors">
               Exit to App
             </button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="md:col-span-1 flex flex-col gap-2">
           <button 
             onClick={() => setActiveTab("dashboard")}
             className={`p-3 rounded-xl font-bold text-left transition-all ${activeTab === 'dashboard' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-[#15151e] text-gray-400 border border-gray-800 hover:bg-gray-800'}`}
           >
             📊 Live Stats
           </button>
           <button 
             onClick={() => setActiveTab("tasks")}
             className={`p-3 rounded-xl font-bold text-left transition-all ${activeTab === 'tasks' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-[#15151e] text-gray-400 border border-gray-800 hover:bg-gray-800'}`}
           >
             📋 Task Manager
           </button>
           <button 
             onClick={() => setActiveTab("games")}
             className={`p-3 rounded-xl font-bold text-left transition-all ${activeTab === 'games' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-[#15151e] text-gray-400 border border-gray-800 hover:bg-gray-800'}`}
           >
             ⚙️ Game Control (Rigging)
           </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="md:col-span-3">
          
          {/* TAB 1: LIVE STATS */}
          {activeTab === "dashboard" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
               <h2 className="text-2xl font-black mb-4">Platform Overview</h2>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#15151e] border border-gray-800 p-6 rounded-2xl">
                     <p className="text-gray-500 text-sm font-bold">Total Users</p>
                     <p className="text-3xl font-black text-white mt-1">1,248</p>
                  </div>
                  <div className="bg-[#15151e] border border-gray-800 p-6 rounded-2xl">
                     <p className="text-gray-500 text-sm font-bold">Total Stars Wagered</p>
                     <p className="text-3xl font-black text-yellow-500 mt-1">452,800 ⭐</p>
                  </div>
                  <div className="bg-[#15151e] border border-gray-800 p-6 rounded-2xl">
                     <p className="text-gray-500 text-sm font-bold">House Profit</p>
                     <p className="text-3xl font-black text-green-500 mt-1">+145,200 ⭐</p>
                  </div>
                  <div className="bg-[#15151e] border border-gray-800 p-6 rounded-2xl">
                     <p className="text-gray-500 text-sm font-bold">Tasks Completed</p>
                     <p className="text-3xl font-black text-blue-400 mt-1">3,492</p>
                  </div>
               </div>
            </div>
          )}

          {/* TAB 2: TASK MANAGER */}
          {activeTab === "tasks" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <h2 className="text-2xl font-black">Task Manager</h2>
               
               {/* Add New Task Form */}
               <div className="bg-[#15151e] border border-gray-800 p-5 rounded-2xl">
                  <h3 className="text-gray-400 font-bold mb-3 text-sm">Create New Task</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                     <input 
                       type="text" 
                       placeholder="Task Name (e.g. Join TG)" 
                       className="flex-1 bg-[#0a0a0f] border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500"
                       value={newTaskName}
                       onChange={(e) => setNewTaskName(e.target.value)}
                     />
                     <input 
                       type="number" 
                       placeholder="Reward ⭐" 
                       className="w-full sm:w-32 bg-[#0a0a0f] border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-yellow-500"
                       value={newTaskReward}
                       onChange={(e) => setNewTaskReward(e.target.value)}
                     />
                     <button 
                       onClick={handleAddTask}
                       className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-xl transition-colors"
                     >
                       Add Task
                     </button>
                  </div>
               </div>

               {/* Active Tasks List */}
               <div className="bg-[#15151e] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="bg-gray-900/50 px-5 py-3 border-b border-gray-800 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                     <div className="col-span-6">Task Name</div>
                     <div className="col-span-3 text-center">Reward</div>
                     <div className="col-span-3 text-right">Action</div>
                  </div>
                  
                  <div className="divide-y divide-gray-800">
                     {tasks.map(task => (
                        <div key={task.id} className="px-5 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-800/30 transition-colors">
                           <div className="col-span-6 font-bold text-sm text-gray-200">
                             {task.name}
                             <span className="block text-[10px] text-green-500 mt-1">{task.status}</span>
                           </div>
                           <div className="col-span-3 text-center font-black text-yellow-500">
                              {task.reward} ⭐
                           </div>
                           <div className="col-span-3 text-right">
                              <button 
                                onClick={() => handleDeleteTask(task.id)}
                                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                              >
                                Delete
                              </button>
                           </div>
                        </div>
                     ))}
                     {tasks.length === 0 && (
                        <div className="p-6 text-center text-gray-500 text-sm font-bold">No active tasks found.</div>
                     )}
                  </div>
               </div>
            </div>
          )}

          {/* TAB 3: GAME SETTINGS (THE RIGGING) */}
          {activeTab === "games" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <h2 className="text-2xl font-black">Game Control</h2>
               
               <div className="bg-[#15151e] border border-red-900/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.05)]">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-red-500 text-xl">⚠️</span>
                     <h3 className="text-white font-bold text-lg">House Edge Controller</h3>
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-6">
                    Adjust the algorithm's win rate. High house edge means players lose more often. Do not set to 100% or players will stop playing.
                  </p>

                  <div className="flex flex-col gap-4">
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-green-500">Player Win (Fair)</span>
                        <span className="text-red-500">House Win (Rigged)</span>
                     </div>
                     
                     <input 
                       type="range" 
                       min="50" 
                       max="95" 
                       value={houseEdge} 
                       onChange={(e) => setHouseEdge(parseInt(e.target.value))}
                       className="w-full accent-red-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                     />
                     
                     <div className="text-center mt-2">
                        <span className="text-3xl font-black text-white">{houseEdge}%</span>
                        <span className="block text-gray-400 text-xs mt-1 uppercase tracking-widest font-bold">Current House Edge</span>
                     </div>

                     <button className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl transition-all shadow-lg active:scale-95">
                        Save Algorithm Settings
                     </button>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
          }
              
