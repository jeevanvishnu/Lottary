import { motion } from "framer-motion";
import { Bell, Gift, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const offers = [
  {
    icon: Sparkles,
    type: "New Draw",
    title: "Diwali Mega Bumper Launched!",
    desc: "First prize ₹25 Crores. Get your tickets before they run out.",
    color: "from-amber-400 to-orange-600",
    iconColor: "text-amber-400"
  },
  {
    icon: Gift,
    type: "Update",
    title: "10% Cashback on Netbanking",
    desc: "Use code LUCKY10 for flat 10% cashback on your first 3 tickets.",
    color: "from-pink-500 to-purple-600",
    iconColor: "text-pink-400"
  },
  {
    icon: Clock,
    type: "Deadline Alert",
    title: "Win-Win Draw in 2 Hours",
    desc: "Ticket sales for today's Win-Win draw close in 2 hours. Hurry!",
    color: "from-cyan-400 to-blue-600",
    iconColor: "text-cyan-400"
  }
];

export const OffersNotifications = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Offers & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Updates</span>
          </h2>
          <p className="text-neutral-400 text-lg">Don't miss out on special bonuses and upcoming draws</p>
        </div>
        <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold">
          View All Offers
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="bg-purple-900/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-pink-500/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.color} opacity-10 rounded-bl-[100px] group-hover:scale-110 transition-transform`}></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                <offer.icon className={`w-6 h-6 ${offer.iconColor}`} />
              </div>
              <span className={`bg-gradient-to-r ${offer.color} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                {offer.type}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{offer.title}</h3>
            <p className="text-neutral-400 mb-6 relative z-10">{offer.desc}</p>
            
            <button className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all ${offer.iconColor} relative z-10`}>
              Claim Offer <span className="text-lg">→</span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
