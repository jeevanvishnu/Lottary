import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultManagerProps {
  showTemporaryMessage: (msg: string) => void;
}

export const ResultManager: React.FC<ResultManagerProps> = ({ showTemporaryMessage }) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#121c21]/80 to-[#0d161a]/90 border border-emerald-500/30 rounded-3xl p-6 md:p-10 flex flex-col gap-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(16,185,129,0.1)] w-full flex-1 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 relative z-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-2">
              Results
            </h3>
            <p className="text-sm text-gray-400">Manage published results for completed lottery draws</p>
          </div>
          <Button
            onClick={() => setIsResultModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#071310] border-none rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
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
    </>
  );
};
