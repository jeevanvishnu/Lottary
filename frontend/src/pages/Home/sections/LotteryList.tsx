import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const LotteryList = () => {
  const [lotteries, setLotteries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/lotteries?limit=8");
        const data = await response.json();
        if (response.ok) {
          setLotteries(data.lotteries);
        }
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-50 border border-gray-200 rounded-t-2xl overflow-hidden flex flex-col hover:bg-white hover:shadow-2xl transition-all shadow-xl group relative h-full"
    >
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden relative bg-gray-200 flex items-center justify-center">
        {card.image ? (
          <img
            src={card.image}
            alt={card.lotteryName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-gray-400 font-medium">No Image</span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 relative z-20">
        
        {/* Lottery Name */}
        <h3 className="text-2xl font-bold text-[#1a0b2e] leading-tight mb-3">{card.lotteryName}</h3>
        
        {/* Date */}
        <p className="text-gray-600 font-medium text-sm mb-1">
          Date: <span className="font-bold text-green-600">{card.date}</span>
        </p>

        {/* Time */}
        <p className="text-gray-600 font-medium text-sm mb-1">
          Time: <span className="font-bold text-red-600">{card.time}</span>
        </p>

        {/* Price */}
        <div className="mb-4 mt-4 flex justify-between items-end">
          <div>
            <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Ticket Price</p>
            <p className="text-3xl font-black text-[#d97706]">₹{card.price}</p>
          </div>
          <div className="text-right">
             <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Winning Price</p>
             <p className="text-xl font-black text-green-600">₹{card.jackpotAmount}</p>
          </div>
        </div>

        <Button className="w-full mt-auto bg-[#fbbf24] text-[#1a0b2e] rounded-xl py-6 font-bold text-base shadow-none hover:bg-[#EAB308] border-none transition-colors">
          Buy Now
        </Button>
      </div>
    </motion.div>
  );

  return (
    <section id="lottery-list" className="py-20 px-8 w-full relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a0b2e] drop-shadow-sm">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]">Lotteries</span>
          </h2>
          <p className="text-gray-600 text-lg">Choose your ticket and stand a chance to win the jackpot!</p>
        </div>

        {loading ? (
           <div className="flex justify-center items-center py-12">
             <Loader2 className="animate-spin text-[#d97706]" size={48} />
           </div>
        ) : lotteries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lotteries.map((card, index) => renderCard(card, index))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No lotteries available at the moment. Please check back later!
          </div>
        )}
      </div>
    </section>
  );
};
