import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Eye, X, Ticket, Trophy } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

const COLORS = [
  "from-[#fbbf24] to-amber-500",
  "from-[#fbbf24] to-[#d97706]",
  "from-[#fbbf24] to-[#FCEABB]",
  "from-[#fbbf24] to-amber-400",
  "from-[#fbbf24] to-amber-300",
  "from-[#fbbf24] to-[#FFD700]",
];

export const BumperTickets = () => {
  const [bumperTickets, setBumperTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  useEffect(() => {
    const fetchBumpers = async () => {
      try {
        const response = await axiosInstance.get("/admin/lotteries?limit=100");
        const all = response.data.lotteries || [];
        const bumpers = all.filter((l: any) => l.type === 'bumper');
        setBumperTickets(bumpers);
      } catch (error) {
        console.error("Error fetching bumper lotteries:", error);
      }
    };
    fetchBumpers();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedTicket) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [selectedTicket]);

  return (
    <section className={`bg-[#191032] py-12 md:py-20 w-full relative ${selectedTicket ? 'z-[100]' : 'z-10'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
      <div className="text-center mb-10 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white"
        >
          Kerala <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Bumper Tickets</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#94B8C8] max-w-2xl mx-auto text-base md:text-lg px-2"
        >
          Participate in the most awaited draws of the year. Massive jackpots await!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {bumperTickets.length === 0 ? (
          <div className="col-span-full text-center py-16 text-white/50">
            <Trophy className="mx-auto mb-4 opacity-30" size={48} />
            <p className="text-lg font-medium">No bumper lotteries available at the moment.</p>
          </div>
        ) : bumperTickets.map((ticket, index) => {
          const color = COLORS[index % COLORS.length];
          return (
          <motion.div
            key={ticket._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#fbbf24]/50 transition-all duration-500 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(251,191,36,0.2)] hover:-translate-y-2"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-30 pointer-events-none" />
            
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color} z-20`} />

            <div className="relative h-48 md:h-56 w-full overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#003344] via-black/20 to-transparent z-10 opacity-80" />
              <img
                src={ticket.image}
                alt={ticket.lotteryName}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110"
              />

            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col relative z-20 bg-gradient-to-b from-[#003344]/50 to-transparent">
              <div className="mb-4">
                <span className="text-[10px] md:text-xs font-extrabold text-[#fbbf24] uppercase tracking-wider block mb-1">Lottery No: {ticket.lotteryNo}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#fbbf24] transition-colors line-clamp-2">{ticket.lotteryName}</h3>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                   <div className="flex items-center gap-1.5 text-white/80 text-[10px] md:text-[11px] font-medium bg-white/5 px-2.5 py-1.5 rounded-md border border-white/10">
                     <Calendar size={14} className="text-[#fbbf24]" />
                     {ticket.date}
                   </div>
                   <div className="flex items-center gap-1.5 text-white/80 text-[10px] md:text-[11px] font-medium bg-white/5 px-2.5 py-1.5 rounded-md border border-white/10">
                     <Clock size={14} className="text-[#fbbf24]" />
                     {ticket.time}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="flex flex-col gap-1 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-1.5 text-white/50 mb-0.5">
                      <Ticket size={12} className="text-[#fbbf24]" />
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Ticket Price</span>
                    </div>
                    <p className="text-base md:text-lg font-black text-white">₹ {ticket.price}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-1.5 text-white/50 mb-0.5">
                      <Trophy size={12} className="text-[#fbbf24]" />
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">First Prize</span>
                    </div>
                    <p className={`text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${color}`}>₹ {ticket.jackpotAmount}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10 flex gap-3 w-full group-hover:border-white/20 transition-colors duration-300">
                  <button 
                    onClick={() => setSelectedTicket(ticket)}
                    className="flex-1 relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold h-10 md:h-12 px-3 md:px-4 text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button className="flex-[1.5] relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold h-10 md:h-12 px-4 md:px-6 text-xs md:text-sm uppercase tracking-wider hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                    Buy Now
                  </button>
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>

      {/* Full View Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-slate-50 flex-shrink-0 flex items-center justify-center p-6">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fbbf24] to-amber-500 z-20`} />
                {selectedTicket.image ? (
                  <img 
                    src={selectedTicket.image} 
                    alt={selectedTicket.lotteryName} 
                    className="w-full h-full object-contain drop-shadow-md rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate-400 font-medium flex flex-col items-center gap-2">
                       <Ticket className="opacity-50" size={48} />
                       No Image Available
                    </span>
                  </div>
                )}
              </div>

              {/* Modal Details */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-black rounded-full uppercase tracking-wider mb-4 border border-amber-200">
                    Lottery No: {selectedTicket.lotteryNo}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
                    {selectedTicket.lotteryName}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-700 text-sm font-bold bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                      <Calendar size={18} className="text-amber-500" />
                      {selectedTicket.date}
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-sm font-bold bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                      <Clock size={18} className="text-amber-500" />
                      {selectedTicket.time}
                    </div>
                  </div>

                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    Participate in the most awaited draws of the year. Don't miss your chance to win the massive bumper jackpot! Secure your ticket today.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-10 mt-auto">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-amber-50 border border-amber-100 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-600/90">
                      <Ticket size={22} />
                      <span className="text-sm font-black uppercase tracking-wide">Ticket Price</span>
                    </div>
                    <span className="text-2xl font-black text-amber-600">₹ {selectedTicket.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
                    <div className="flex items-center gap-2 text-emerald-600/90">
                      <Trophy size={22} />
                      <span className="text-sm font-black uppercase tracking-wide">First Prize</span>
                    </div>
                    <span className="text-2xl font-black text-emerald-600">₹ {selectedTicket.jackpotAmount}</span>
                  </div>
                </div>

                <button className={`w-full relative overflow-hidden group/btn bg-gradient-to-r from-[#fbbf24] to-amber-500 text-black rounded-2xl py-6 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 border-none transition-all duration-300 flex items-center justify-center gap-2`}>
                  Buy Ticket Now
                  <Ticket size={22} className="group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};
