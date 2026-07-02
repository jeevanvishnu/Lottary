import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/Logo.png";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldAlert,
  Loader2,
  LogOut,
  Users,
  Ticket,
  TrendingUp,
  Award,
  PlusCircle,
  RefreshCw,
  CheckCircle,
  FileSpreadsheet,
  Menu,
  X,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminUser {
  id: string;
  email: string;
}

export const AdminLogin = () => {
  // Login Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auth State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Dashboard Stats States (for mock interactivity)
  const [stats, setStats] = useState({
    activePlayers: 1240,
    ticketsSold: 4850,
    revenue: 97000,
    activeDraws: 3
  });
  const [refreshing, setRefreshing] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [activeView, setActiveView] = useState<'add-lottery' | 'update-result'>('add-lottery');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  // Check if admin is already logged in on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    if (savedAdmin) {
      try {
        setAdminUser(JSON.parse(savedAdmin));
      } catch (e) {
        localStorage.removeItem("adminUser");
      }
    }
  }, []);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form validations
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      // Successful login
      const loggedInUser = {
        id: data.admin.id || data.admin._id,
        email: data.admin.email
      };

      localStorage.setItem("adminUser", JSON.stringify(loggedInUser));
      setAdminUser(loggedInUser);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to connect to the backend server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setAdminUser(null);
    setActionMessage("");
  };

  const triggerStatRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setStats(prev => ({
        activePlayers: prev.activePlayers + Math.floor(Math.random() * 15) - 5,
        ticketsSold: prev.ticketsSold + Math.floor(Math.random() * 20),
        revenue: prev.revenue + Math.floor(Math.random() * 400),
        activeDraws: prev.activeDraws
      }));
      setRefreshing(false);
      showTemporaryMessage("Dashboard statistics updated in real-time.");
    }, 800);
  };

  const showTemporaryMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => {
      setActionMessage("");
    }, 4000);
  };

  // ── DASHBOARD SUB-VIEW ──
  if (adminUser) {
    return (
      <div className="min-h-screen bg-[#070114] text-white flex relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/5 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none z-0" />

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#12072b]/95 border-r border-white/5 backdrop-blur-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveView('add-lottery')}>
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                <img src={Logo} alt="Logo" className="w-8 h-8 object-contain relative z-10" />
              </div>
              <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-[#fbbf24]">Admin Panel</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 py-6 px-4 flex flex-col gap-2">
            <button
              onClick={() => { setActiveView('add-lottery'); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${activeView === 'add-lottery' ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/20 shadow-[0_0_15px_rgba(251,191,36,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
            >
              <PlusCircle size={18} className={activeView === 'add-lottery' ? 'text-[#fbbf24]' : ''} />
              <span className="font-medium">Lottery</span>
            </button>
            <button
              onClick={() => { setActiveView('update-result'); setIsSidebarOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${activeView === 'update-result' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
            >
              <FileSpreadsheet size={18} className={activeView === 'update-result' ? 'text-emerald-400' : ''} />
              <span className="font-medium">Update Result</span>
            </button>
          </div>

          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex flex-col mb-4 px-2">
              <span className="text-sm font-medium text-gray-200 truncate">{adminUser.email}</span>
              <span className="text-xs text-[#d8b4fe]/70 font-semibold uppercase tracking-wider mt-1">Administrator</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full rounded-xl border-red-500/40 text-red-400 hover:bg-red-500/20 hover:text-red-300 py-2.5 text-sm font-bold transition-all flex items-center justify-center gap-2 bg-transparent"
            >
              <LogOut size={16} />
              Secure Logout
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative z-10 h-screen overflow-y-auto overflow-x-hidden">
          {/* Top Header Bar */}
          <div className="sticky top-0 z-30 bg-[#070114]/80 backdrop-blur-xl border-b border-white/5 p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 transition-colors"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Secure Session</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center text-xs text-gray-500 font-medium">
              <Lock size={12} className="mr-1" /> End-to-end encrypted
            </div>
          </div>

          <div className="p-4 md:p-8 flex-1 w-full h-full flex flex-col">
            {/* Action Feedback Area */}
            <div className="h-14 mb-2">
              <AnimatePresence>
                {actionMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-3 flex items-center gap-3 text-sm max-w-lg shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
                  >
                    <CheckCircle size={18} className="shrink-0" />
                    <span className="font-medium">{actionMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── VIEWS ── */}



            {/* View: Add Lottery */}
            {activeView === 'add-lottery' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[#2d1b4e]/20 to-[#12072b]/80 border border-[#fbbf24]/20 rounded-3xl p-6 md:p-10 flex flex-col gap-8 backdrop-blur-xl shadow-2xl w-full flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 relative z-10">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] mb-2">Lotteries</h3>
                    <p className="text-sm text-gray-400">View and manage all your active and past lottery draws</p>
                  </div>
                  <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-[#fbbf24] text-[#1a0b2e] border-none rounded-xl font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    <PlusCircle size={16} className="mr-2" /> Add New Lottery
                  </Button>
                </div>

                <div className="relative z-10 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                        <th className="py-4 px-4 font-bold">Image</th>
                        <th className="py-4 px-4 font-bold">Lottery No</th>
                        <th className="py-4 px-4 font-bold">Date</th>
                        <th className="py-4 px-4 font-bold">Time</th>
                        <th className="py-4 px-4 font-bold">Price</th>
                        <th className="py-4 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { id: 1, image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&q=80', lotterNo: 'W-864', date: '12 Oct 2026', time: '03:00 PM', price: 40 },
                        { id: 2, image: 'https://images.unsplash.com/photo-1628127335607-06c88820c78a?w=100&q=80', lotterNo: 'AK-645', date: '11 Oct 2026', time: '03:00 PM', price: 50 },
                        { id: 3, image: 'https://images.unsplash.com/photo-1606550732810-73f1d8c1c4f5?w=100&q=80', lotterNo: 'KN-515', date: '13 Oct 2026', time: '03:00 PM', price: 40 },
                      ].map((lottery) => (
                        <tr key={lottery.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">
                            <img src={lottery.image} alt={lottery.lotterNo} className="w-12 h-12 rounded-lg object-cover border border-white/10 shadow-sm" />
                          </td>
                          <td className="py-4 px-4 font-bold text-white whitespace-nowrap">{lottery.lotterNo}</td>
                          <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{lottery.date}</td>
                          <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{lottery.time}</td>
                          <td className="py-4 px-4 text-emerald-400 font-semibold">₹{lottery.price}</td>
                          <td className="py-4 px-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="Edit">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                               </button>
                               <button className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors" title="Delete">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 mt-auto gap-4">
                  <span className="text-xs text-gray-400 font-medium">Showing 1 to 3 of 12 entries</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled>Prev</button>
                    <button className="px-3 py-2 rounded-lg bg-[#fbbf24] text-[#1a0b2e] border-none text-xs font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]">1</button>
                    <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white text-xs font-bold transition-all">2</button>
                    <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white text-xs font-bold transition-all">3</button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white text-xs font-bold transition-all">Next</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View: Update Result */}
            {activeView === 'update-result' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[#121c21]/80 to-[#0d161a]/90 border border-emerald-500/30 rounded-3xl p-6 md:p-10 flex flex-col gap-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(16,185,129,0.1)] w-full flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 relative z-10">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-2">Results</h3>
                    <p className="text-sm text-gray-400">Manage published results for completed lottery draws</p>
                  </div>
                  <Button onClick={() => setIsResultModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#071310] border-none rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <PlusCircle size={16} className="mr-2" /> Add New Result
                  </Button>
                </div>

                <div className="relative z-10 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                        <th className="py-4 px-4 font-bold">Image</th>
                        <th className="py-4 px-4 font-bold">Date</th>
                        <th className="py-4 px-4 font-bold">Lottery Name</th>
                        <th className="py-4 px-4 font-bold">Status</th>
                        <th className="py-4 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { id: 1, image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&q=80', date: '11 Oct 2026', title: 'Akshaya AK-645', status: 'Published' },
                        { id: 2, image: 'https://images.unsplash.com/photo-1628127335607-06c88820c78a?w=100&q=80', date: '10 Oct 2026', title: 'Win-Win W-863', status: 'Published' },
                      ].map((result) => (
                        <tr key={result.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">
                            <img src={result.image} alt={result.title} className="w-12 h-12 rounded-lg object-cover border border-emerald-500/20 shadow-sm" />
                          </td>
                          <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{result.date}</td>
                          <td className="py-4 px-4 font-bold text-white whitespace-nowrap">{result.title}</td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {result.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right flex justify-end gap-2">
                             <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-teal-400 transition-colors" title="Edit">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                             </button>
                             <button className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors" title="Delete">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 mt-auto gap-4">
                  <span className="text-xs text-gray-400 font-medium">Showing 1 to 2 of 2 entries</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled>Prev</button>
                    <button className="px-3 py-2 rounded-lg bg-emerald-500 text-[#071310] border-none text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]">1</button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled>Next</button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Add Lottery Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-gradient-to-br from-[#1a0b2e] to-[#070114] border border-[#fbbf24]/30 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl w-full max-w-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#fbbf24]">Add New Lottery</h3>
                  </div>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => {
                  e.preventDefault();
                  setIsAddModalOpen(false);
                  showTemporaryMessage("Success: New lottery draw has been added.");
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Draw Title</label>
                      <input type="text" required placeholder="e.g. Win-Win W-864" className="bg-[#000000]/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Ticket Price (₹)</label>
                      <input type="number" required placeholder="e.g. 40" min="1" className="bg-[#000000]/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Schedule (Date & Time)</label>
                      <input type="datetime-local" required className="bg-[#000000]/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Jackpot Amount (₹)</label>
                      <input type="number" required placeholder="e.g. 7500000" min="1" className="bg-[#000000]/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all" />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Upload Image</label>
                      <input type="file" accept="image/*" className="bg-[#000000]/30 border border-white/10 rounded-xl px-4 py-2.5 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fbbf24]/20 file:text-[#fbbf24] hover:file:bg-[#fbbf24]/30 cursor-pointer focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all" />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)} className="rounded-xl border-white/10 text-gray-300 hover:bg-white/5 bg-transparent">Cancel</Button>
                    <Button type="submit" className="rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-[#fbbf24] border-none text-[#1a0b2e] font-bold shadow-[0_4px_20px_rgba(251,191,36,0.3)]">
                      <PlusCircle size={18} className="mr-2" /> Create Lottery
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Result Modal */}
        <AnimatePresence>
          {isResultModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-gradient-to-br from-[#121c21] to-[#0d161a] border border-emerald-500/30 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl w-full max-w-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Publish Draw Results</h3>
                  </div>
                  <button onClick={() => setIsResultModalOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => {
                  e.preventDefault();
                  setIsResultModalOpen(false);
                  showTemporaryMessage("Success: Results for the draw have been officially published.");
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Upload Image</label>
                      <input type="file" accept="image/*" required className="bg-[#0a1114]/80 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-emerald-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30 cursor-pointer focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Date</label>
                      <input type="date" required className="bg-[#0a1114]/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Lottery Name</label>
                      <input type="text" required placeholder="e.g. Win-Win W-864" className="bg-[#0a1114]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Status</label>
                      <select required className="bg-[#0a1114]/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all appearance-none cursor-pointer">
                        <option value="Published">Published</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsResultModalOpen(false)} className="rounded-xl border-white/10 text-gray-300 hover:bg-white/5 bg-transparent">Cancel</Button>
                    <Button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-none text-[#071310] font-bold shadow-[0_4px_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle size={18} className="mr-2" /> Publish Results
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // ── SECURE LOGIN FORM VIEW ──
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#070114]">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#fbbf24]/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none z-0" />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-b from-[#2d1b4e]/30 to-[#12072b]/80 border border-purple-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">

          {/* Card Border Glow */}
          <div className="absolute inset-0 border border-purple-500/10 pointer-events-none rounded-3xl" />

          {/* Logo & Heading */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 rounded-full" />
              <img
                src={Logo}
                alt="Sri Senthil Vel Lottery Logo"
                className="h-20 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Admin Gateway
            </h2>
            <p className="text-sm text-[#d8b4fe]/70 mt-1.5">
              Secure access for lottery operators
            </p>
          </div>

          {/* Validation Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3.5 flex items-center gap-3 text-sm"
              >
                <ShieldAlert size={18} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/80 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full bg-[#003344]/20 border border-[#6d28d9]/40 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all placeholder:text-[#94B8C8]/40 cursor-text"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/80 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#003344]/20 border border-[#6d28d9]/40 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all placeholder:text-[#94B8C8]/40 cursor-text"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/80 hover:text-white cursor-pointer transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-[#fbbf24] text-[#1a0b2e] rounded-xl text-base font-bold shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all active:scale-[0.98] cursor-pointer mt-2 border-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                <>
                  Authenticate Access
                  <ArrowRight size={18} className="transition-transform group-hover/button:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Security Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-[#d8b4fe]/50 border-t border-white/5 pt-4 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Encrypted connection securely monitored.</span>
          </div>

        </div>
      </motion.div>
    </main>
  );
};

// Helper SVG component (required for arrow animation in button hover)
const ArrowRight = ({ className, size }: { className?: string; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
