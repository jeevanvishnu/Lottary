import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, Ticket, Trophy, Eye, X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

export const LotteryList = () => {
  const [lotteries, setLotteries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLottery, setSelectedLottery] = useState<any | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedLottery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [selectedLottery]);

  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        const response = await axiosInstance.get("/admin/lotteries");
        const data = response.data;
        setLotteries(data.lotteries);
      } catch (error) {
        console.error("Error fetching lotteries:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLotteries();
  }, []);

  const renderCard = (card: any, index: number) => (
    <motion.div
      key={card._id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative h-full bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 flex flex-col"
    >
      {/* Decorative gradient background behind card that shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden z-10 bg-white p-3 pb-0">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative shadow-sm ring-1 ring-black/5 bg-slate-50 p-2">
          {card.image ? (
            <img
              src={card.image}
              alt={card.lotteryName}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 font-medium flex flex-col items-center gap-2">
                 <Ticket className="opacity-50" size={32} />
                 No Image
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-transparent transition-colors duration-500">
        
        {/* Lottery Name & No */}
        <div className="mb-4 flex flex-col gap-1">
          <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">Lottery No: {card.lotteryNo}</span>
          <h3 className="text-[1.35rem] font-extrabold text-slate-800 leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-rose-600 transition-all duration-300">{card.lotteryName}</h3>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-3 mb-5">
           <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-bold bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm">
             <Calendar size={14} className="text-orange-500" />
             {card.date}
           </div>
           <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-bold bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm">
             <Clock size={14} className="text-rose-500" />
             {card.time}
           </div>
        </div>

        {/* Prices Section */}
        <div className="grid grid-cols-2 gap-2 mb-6 mt-auto">
          {/* Ticket Price */}
          <div className="flex flex-col gap-0.5 p-2.5 rounded-2xl bg-orange-50/80 border border-orange-100/50 group-hover:bg-white/80 transition-colors shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 text-orange-600/70 mb-1">
              <Ticket size={12} className="shrink-0" />
              <span className="text-[9px] font-black uppercase tracking-wide whitespace-nowrap">Ticket Price</span>
            </div>
            <p className="text-lg font-black text-orange-600 whitespace-nowrap overflow-hidden text-ellipsis">₹{card.price}</p>
          </div>
          
          {/* Winning Price */}
          <div className="flex flex-col gap-0.5 p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-100/50 group-hover:bg-white/80 transition-colors shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 text-emerald-600/70 mb-1">
              <Trophy size={12} className="shrink-0" />
              <span className="text-[9px] font-black uppercase tracking-wide whitespace-nowrap">Winning Price</span>
            </div>
            <p className="text-lg font-black text-emerald-600 mt-auto leading-none whitespace-nowrap overflow-hidden text-ellipsis">₹{card.jackpotAmount}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => setSelectedLottery(card)}
            variant="outline" 
            className="flex-1 rounded-2xl py-6 font-bold text-base border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-colors bg-white hover:-translate-y-0.5 duration-300"
          >
            <span className="flex items-center justify-center gap-1.5">
              <Eye size={18} />
              View
            </span>
          </Button>
          <Button className="flex-[1.5] relative overflow-hidden group/btn bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl py-6 font-bold text-base shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/40 border-none transition-all duration-300 hover:-translate-y-0.5">
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              Buy 
              <Ticket size={18} className="group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="lottery-list" className={`py-24 px-8 w-full relative bg-slate-50 overflow-hidden ${selectedLottery ? 'z-[100]' : 'z-10'}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-rose-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 border border-orange-200/50 text-orange-600 font-semibold text-sm mb-6"
          >
            <Trophy size={16} />
            <span>Play & Win</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-800 tracking-tight">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Lotteries</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Choose your lucky ticket and stand a chance to win the life-changing jackpot!
          </p>
        </div>

        {loading ? (
           <div className="flex justify-center items-center py-20">
             <Loader2 className="animate-spin text-orange-500" size={48} />
           </div>
        ) : lotteries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lotteries.map((card, index) => renderCard(card, index))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Ticket className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium">No lotteries available at the moment.</p>
            <p className="text-sm">Please check back later!</p>
          </div>
        )}
      </div>

      {/* Full View Modal */}
      <AnimatePresence>
        {selectedLottery && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLottery(null)}
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
                onClick={() => setSelectedLottery(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-slate-50 flex-shrink-0 flex items-center justify-center p-6">
                {selectedLottery.image ? (
                  <img 
                    src={selectedLottery.image} 
                    alt={selectedLottery.lotteryName} 
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
                  <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black rounded-full uppercase tracking-wider mb-4 border border-orange-200">
                    Lottery No: {selectedLottery.lotteryNo}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
                    {selectedLottery.lotteryName}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-700 text-sm font-bold bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                      <Calendar size={18} className="text-orange-500" />
                      {selectedLottery.date}
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 text-sm font-bold bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                      <Clock size={18} className="text-rose-500" />
                      {selectedLottery.time}
                    </div>
                  </div>

                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    Don't miss your chance to win big! Purchase your ticket before the draw date and secure your opportunity for the life-changing jackpot.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-10 mt-auto">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-orange-50 border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-2 text-orange-600/90">
                      <Ticket size={22} />
                      <span className="text-sm font-black uppercase tracking-wide">Ticket Price</span>
                    </div>
                    <span className="text-2xl font-black text-orange-600">₹{selectedLottery.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
                    <div className="flex items-center gap-2 text-emerald-600/90">
                      <Trophy size={22} />
                      <span className="text-sm font-black uppercase tracking-wide">Winning Price</span>
                    </div>
                    <span className="text-2xl font-black text-emerald-600">₹{selectedLottery.jackpotAmount}</span>
                  </div>
                </div>

                <Button className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl py-7 font-bold text-lg shadow-xl hover:shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 border-none transition-all duration-300 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Buy Ticket Now
                    <Ticket size={22} className="group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
