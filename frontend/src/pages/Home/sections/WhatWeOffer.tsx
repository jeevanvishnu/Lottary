import { motion } from "framer-motion";
import { MessageCircle, Calendar, Trophy, FileCheck, ShieldCheck, Zap, CheckCircle2, Gift, Coins } from "lucide-react";

const offers = [
  { icon: MessageCircle, title: "Book Tickets Online Through WhatsApp" },
  { icon: Calendar, title: "Daily & Bumper Lottery Availability" },
  { icon: Trophy, title: "Live Results & Winner Updates" },
  { icon: FileCheck, title: "Fully Compliant with Government Regulations" },
  { icon: ShieldCheck, title: "Secure Payment Methods" },
  { icon: Zap, title: "Instant Ticket Booking" },
  { icon: CheckCircle2, title: "Winner Verification Support" },
  { icon: Gift, title: "Prize Claim Support", desc: "(Even if not bought from us)" },
  { icon: Coins, title: "Tickets starting from Rs.50" },
];

export const WhatWeOffer = () => {
  return (
    <section className="py-20 px-8 w-full relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#fbbf24]/10 rounded-full blur-3xl z-0"></div>
          <h2 className="relative z-10 text-3xl md:text-5xl font-bold mb-4 text-[#1a0b2e] drop-shadow-sm flex items-center justify-center gap-2">
            <span>
              Sree Senthilvel lottery agency
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]"> Offers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 justify-center">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#fbbf24]/50 hover:shadow-lg hover:shadow-[#fbbf24]/10 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-200 text-[#6d28d9] flex items-center justify-center shadow-sm group-hover:border-[#d97706] group-hover:text-[#d97706] transition-colors">
                <offer.icon className="w-6 h-6 drop-shadow-sm" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-lg font-bold text-[#1a0b2e] leading-snug group-hover:text-[#d97706] transition-colors">
                  {offer.title}
                </h3>
                {offer.desc && (
                  <p className="text-sm text-gray-500 mt-1 font-medium">{offer.desc}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
