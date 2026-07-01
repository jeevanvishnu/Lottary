import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import img1 from "@/assets/lottery01.jpg";
import img2 from "@/assets/lottery02.jpg";
import img3 from "@/assets/lottery03.jpg";

const firstSectionCards = [
  { id: 1, name: "Mega Jackpot", price: "₹100", image: img1, drawDate: "Today, 8:00 PM", code: "MJ-7281" },
  { id: 2, name: "Lucky Strike", price: "₹50", image: img2, drawDate: "Today, 4:00 PM", code: "LS-9342" },
  { id: 3, name: "Weekend Bumper", price: "₹200", image: img3, drawDate: "Today, 5:00 PM", code: "WB-2849" },
  { id: 4, name: "Daily Win", price: "₹40", image: img1, drawDate: "Today, 9:00 PM", code: "DW-1053" },
];

const secondSectionCards = [
  { id: 5, name: "Super Lotto", price: "₹150", image: img2, drawDate: "Tomorrow, 8:00 PM", code: "SL-4492" },
  { id: 6, name: "Fortune 500", price: "₹500", image: img3, drawDate: "Next Week, 4:00 PM", code: "FT-5001" },
  { id: 7, name: "Golden Ticket", price: "₹250", image: img1, drawDate: "Sunday, 5:00 PM", code: "GT-7777" },
  { id: 8, name: "Quick Pick", price: "₹20", image: img2, drawDate: "Tomorrow, 9:00 PM", code: "QP-1234" },
];

const renderCard = (card: any, index: number) => (
  <motion.div
    key={card.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-gray-50 border border-gray-200 rounded-t-2xl overflow-hidden flex flex-col hover:bg-white hover:shadow-2xl transition-all shadow-xl group relative"
  >
    {/* Image Section */}
    <div className="w-full h-48 overflow-hidden relative">
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col flex-1 relative z-20">
      
      {/* Lottery Name */}
      <h3 className="text-2xl font-bold text-[#1a0b2e] leading-tight mb-3">{card.name}</h3>
      
      {/* Date */}
      <p className="text-gray-600 font-medium text-sm mb-1">
        Date: <span className="font-bold text-green-600">{card.drawDate.split(", ")[0]}</span>
      </p>

      {/* Time */}
      <p className="text-gray-600 font-medium text-sm mb-1">
        Time: <span className="font-bold text-red-600">{card.drawDate.split(", ")[1] || card.drawDate}</span>
      </p>

      {/* Lottery No */}
      <p className="text-gray-600 font-medium text-sm mb-5">
        Lottery No: <span className="font-bold text-[#d97706]">#{card.code}</span>
      </p>

      {/* Price */}
      <div className="mb-6">
        <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-1">Ticket Price</p>
        <p className="text-3xl font-black text-[#d97706]">{card.price}</p>
      </div>

      <Button className="w-full mt-auto bg-[#fbbf24] text-[#1a0b2e] rounded-xl py-6 font-bold text-base shadow-none hover:bg-[#EAB308] border-none transition-colors">
        Buy Now
      </Button>
    </div>
  </motion.div>
);

export const LotteryList = () => {
  return (
    <section id="lottery-list" className="py-20 px-8 w-full relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a0b2e] drop-shadow-sm">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]">Lotteries</span>
          </h2>
          <p className="text-gray-600 text-lg">Choose your ticket and stand a chance to win the jackpot!</p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#1a0b2e] mb-6 border-l-4 border-[#d97706] pl-4">Today's Draws</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstSectionCards.map((card, index) => renderCard(card, index))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#1a0b2e] mb-6 border-l-4 border-[#6d28d9] pl-4">Upcoming Draws</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondSectionCards.map((card, index) => renderCard(card, index))}
          </div>
        </div>
      </div>
    </section>
  );
};
