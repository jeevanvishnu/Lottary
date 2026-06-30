import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import img1 from "@/assets/lottery01.jpg";
import img2 from "@/assets/lottery02.jpg";
import img3 from "@/assets/lottery03.jpg";

const firstSectionCards = [
  { id: 1, name: "Mega Jackpot", price: "₹100", image: img1, drawDate: "Today, 8:00 PM" },
  { id: 2, name: "Lucky Strike", price: "₹50", image: img2, drawDate: "Today, 4:00 PM" },
  { id: 3, name: "Weekend Bumper", price: "₹200", image: img3, drawDate: "Today, 5:00 PM" },
  { id: 4, name: "Daily Win", price: "₹40", image: img1, drawDate: "Today, 9:00 PM" },
];

const secondSectionCards = [
  { id: 5, name: "Super Lotto", price: "₹150", image: img2, drawDate: "Tomorrow, 8:00 PM" },
  { id: 6, name: "Fortune 500", price: "₹500", image: img3, drawDate: "Next Week, 4:00 PM" },
  { id: 7, name: "Golden Ticket", price: "₹250", image: img1, drawDate: "Sunday, 5:00 PM" },
  { id: 8, name: "Quick Pick", price: "₹20", image: img2, drawDate: "Tomorrow, 9:00 PM" },
];

const renderCard = (card: any, index: number) => (
  <motion.div
    key={card.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-purple-900/40 backdrop-blur-md border border-pink-500/30 rounded-2xl overflow-hidden flex flex-col hover:bg-purple-900/60 transition-all shadow-[0_0_30px_rgba(236,72,153,0.15)] group relative"
  >
    {/* Image Section */}
    <div className="w-full h-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent z-10"></div>
      <img 
        src={card.image} 
        alt={card.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute bottom-4 left-4 z-20">
        <span className="bg-pink-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-pink-400/50">
          {card.drawDate}
        </span>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col flex-1 relative z-20">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none"></div>
      
      <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
      
      <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/10 mb-6">
        <div>
          <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Ticket Price</p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{card.price}</p>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-5 font-bold text-md shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] border-none cursor-pointer">
        Buy Now
      </Button>
    </div>
  </motion.div>
);

export const LotteryList = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
          Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">Lotteries</span>
        </h2>
        <p className="text-neutral-400 text-lg">Choose your ticket and stand a chance to win the jackpot!</p>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-pink-500 pl-4">Today's Draws</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {firstSectionCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Upcoming Draws</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondSectionCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  );
};
