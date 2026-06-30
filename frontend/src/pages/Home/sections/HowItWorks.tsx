import { motion } from "framer-motion";
import { Search, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Search, title: "Choose Ticket", desc: "Select your lucky numbers and preferred ticket type from our catalog." },
  { icon: CreditCard, title: "Pay Securely", desc: "Complete your purchase securely via UPI, cards, or net banking." },
  { icon: CheckCircle2, title: "Receive Confirmation", desc: "Get an instant confirmation and digital copy of your ticket." },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-8 w-full relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#fbbf24]/10 rounded-full blur-3xl z-0"></div>
          <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-4 text-[#1a0b2e] drop-shadow-sm">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]">Works</span>
          </h2>
          <p className="relative z-10 text-gray-600 text-lg">Your journey to winning is just 3 simple steps away</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Decorative line connecting steps */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-gray-200 via-[#fbbf24]/60 to-gray-200 z-0 shadow-sm" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center text-center relative z-10 group"
          >
            <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 text-[#1a0b2e] flex items-center justify-center mb-6 shadow-sm relative group-hover:border-[#d97706] group-hover:shadow-md transition-all cursor-pointer">
              <step.icon className="w-10 h-10 text-[#6d28d9] group-hover:text-[#d97706] transition-colors drop-shadow-sm" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#fbbf24] text-[#1a0b2e] font-bold flex items-center justify-center text-sm border-2 border-white shadow-md">
                {index + 1}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#1a0b2e] mb-3 group-hover:text-[#d97706] transition-colors">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed max-w-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};
