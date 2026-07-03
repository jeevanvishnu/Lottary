import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { handleBuyWhatsApp } from "@/lib/whatsapp";
const tickets = [
  { day: "Monday", name: "Win-Win", time: "3:00 PM", prize: "₹75 Lakhs", price: "₹40" },
  { day: "Tuesday", name: "Sthree Sakthi", time: "3:00 PM", prize: "₹75 Lakhs", price: "₹40" },
  { day: "Wednesday", name: "Fifty Fifty", time: "3:00 PM", prize: "₹1 Crore", price: "₹50" },
  { day: "Thursday", name: "Karunya Plus", time: "3:00 PM", prize: "₹80 Lakhs", price: "₹40" },
  { day: "Friday", name: "Nirmal", time: "3:00 PM", prize: "₹70 Lakhs", price: "₹40" },
  { day: "Saturday", name: "Karunya", time: "3:00 PM", prize: "₹1 Crore", price: "₹50" },
  { day: "Sunday", name: "Akshaya", time: "3:00 PM", prize: "₹70 Lakhs", price: "₹40" },
];

export const FortuneTickets = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Today's Fortune Tickets</h2>
        <p className="text-neutral-400 text-lg">Pick your lucky day and change your destiny</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.day}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:bg-white/10 transition-colors cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 mb-4 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
              {ticket.day.slice(0, 3)}
            </div>
            <h3 className="font-semibold text-lg text-white mb-1">{ticket.day}</h3>
            <p className="text-pink-400 font-medium mb-4 text-sm">{ticket.name}</p>

            <div className="w-full space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Time</span>
                <span className="text-white">{ticket.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Prize</span>
                <span className="text-emerald-400 font-bold">{ticket.prize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Price</span>
                <span className="text-white font-medium">{ticket.price}</span>
              </div>
            </div>

            <Button 
              onClick={() => handleBuyWhatsApp({
                lotteryName: ticket.name,
                lotteryNo: "N/A",
                price: ticket.price.replace('₹', ''),
                date: "Every " + ticket.day,
                time: ticket.time,
                jackpotAmount: ticket.prize.replace('₹', '')
              })}
              className="w-full bg-white text-black hover:bg-neutral-200 rounded-full font-medium shadow-md"
            >
              Buy Now
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
