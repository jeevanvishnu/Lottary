import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { q: "How do I buy a lottery ticket online?", a: "Choose your preferred ticket from the 'Available Lotteries' section, click 'Buy Ticket Now', and complete your secure payment. You will receive an instant digital copy of your official ticket." },
  { q: "Where can I check the daily draw results?", a: "You can find all results in our 'Latest Results' section. We publish the winning numbers immediately after the official 3:00 PM draw. You can also download the official PDF result." },
  { q: "Is it safe to pay online?", a: "Absolutely. We use bank-grade encryption and standard UPI/Card payment gateways to ensure your transactions are 100% secure and protected." },
  { q: "What happens if I win the jackpot?", a: "For small prizes, the amount is directly credited to your bank account. For major prizes (like the bumper or ₹75 Lakhs), we assist you in submitting the original physical ticket to the State Lottery Directorate." },
  { q: "Are these official Kerala Lottery tickets?", a: "Yes, we are an authorized seller. Every digital ticket you receive has a verifiable serial number corresponding to a physical paper ticket kept securely in our vault." },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-8 max-w-3xl mx-auto w-full relative z-10">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#fbbf24]/08 rounded-full blur-3xl z-0"></div>
        <div className="inline-flex items-center justify-center p-3 bg-[#003344]/60 rounded-2xl mb-4 border border-[#fbbf24]/30 text-[#fbbf24] relative z-10 shadow-[0_0_15px_rgba(212,160,23,0.2)]">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
          Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Questions?</span>
        </h2>
        <p className="relative z-10 text-[#94B8C8] text-lg">Everything you need to know about buying tickets and checking results</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-[#6d28d9]/30 bg-[#003344]/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:border-[#fbbf24]/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-[#003344]/50 transition-colors group"
            >
              <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-[#fbbf24]" : "text-white group-hover:text-[#fbbf24]/80"}`}>{faq.q}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? "bg-[#fbbf24]/20 text-[#fbbf24]" : "bg-[#6d28d9]/30 text-[#007A94] group-hover:bg-[#fbbf24]/10"}`}>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-5 text-[#94B8C8] leading-relaxed font-medium"
                >
                  <p>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
