import { motion } from "framer-motion";
import { Search, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Search, title: "Choose Ticket", desc: "Select your lucky numbers and preferred ticket type from our catalog." },
  { icon: CreditCard, title: "Pay Securely", desc: "Complete your purchase securely via UPI, cards, or net banking." },
  { icon: CheckCircle2, title: "Receive Confirmation", desc: "Get an instant confirmation and digital copy of your ticket." },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10 bg-[#003344]/20 rounded-3xl border-y border-[#005F73]/20 my-10 shadow-[inset_0_0_50px_rgba(0,95,115,0.05)]">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4A017]/10 rounded-full blur-3xl z-0"></div>
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300">Works</span>
        </h2>
        <p className="relative z-10 text-[#94B8C8] text-lg">Your journey to winning is just 3 simple steps away</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Decorative line connecting steps */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#005F73]/20 via-[#D4A017]/60 to-[#005F73]/20 z-0 shadow-[0_0_10px_rgba(212,160,23,0.4)]" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center text-center relative z-10 group"
          >
            <div className="w-24 h-24 rounded-full bg-[#003344]/70 backdrop-blur-md border border-[#005F73]/40 text-white flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,95,115,0.2)] relative group-hover:border-[#D4A017] group-hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] transition-all cursor-pointer">
              <step.icon className="w-10 h-10 text-[#005F73] group-hover:text-[#D4A017] transition-colors drop-shadow-[0_0_10px_currentColor]" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D4A017] text-[#001F2D] font-bold flex items-center justify-center text-sm border-2 border-[#001F2D] shadow-[0_0_10px_rgba(212,160,23,0.8)]">
                {index + 1}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4A017] transition-colors">{step.title}</h3>
            <p className="text-[#94B8C8] leading-relaxed max-w-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
