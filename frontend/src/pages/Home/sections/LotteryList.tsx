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
    className="bg-[#022838] border border-[#6d28d9]/30 rounded-2xl overflow-hidden flex flex-col hover:bg-[#03344a] transition-all shadow-xl group relative"
  >
    {/* Image Section */}
    <div className="w-full h-48 overflow-hidden relative">
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-3 left-4 z-20">
        <span className="bg-[#fbbf24] text-[#1a0b2e] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          {card.drawDate}
        </span>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col flex-1 relative z-20">
      <h3 className="text-xl font-bold text-white mb-6">{card.name}</h3>

      <div className="mb-6">
        <p className="text-[#94B8C8] text-[11px] font-semibold uppercase tracking-wider mb-1">Ticket Price</p>
        <p className="text-3xl font-black text-[#fbbf24]">{card.price}</p>
      </div>

      <Button className="w-full mt-auto bg-[#fbbf24] text-[#1a0b2e] rounded-xl py-6 font-bold text-base shadow-none hover:bg-[#EAB308] border-none transition-colors">
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
          Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Lotteries</span>
        </h2>
        <p className="text-[#94B8C8] text-lg">Choose your ticket and stand a chance to win the jackpot!</p>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#fbbf24] pl-4">Today's Draws</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {firstSectionCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#6d28d9] pl-4">Upcoming Draws</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondSectionCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  );
};
