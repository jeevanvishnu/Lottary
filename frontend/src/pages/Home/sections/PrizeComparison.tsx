import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export const PrizeComparison = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Regular vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300">Bumper Lottery</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#94B8C8] max-w-2xl mx-auto text-lg"
        >
          Understand the differences in prize structures and choose your path to wealth.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
        {/* Regular Lottery Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 bg-[#003344]/40 border border-[#005F73]/30 rounded-3xl p-8 backdrop-blur-sm"
        >
          <div className="mb-8 border-b border-[#005F73]/30 pb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Regular Lottery</h3>
            <p className="text-[#94B8C8]">Daily & Weekly Draws</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-white">₹30-₹50</span>
              <span className="text-[#94B8C8] ml-2">/ ticket</span>
            </div>
          </div>

          <ul className="space-y-4">
            {[
              { text: "Frequent draws (Daily/Weekly)", included: true },
              { text: "First Prize up to ₹1 Crore", included: true },
              { text: "Higher chance for smaller prizes", included: true },
              { text: "Massive Jackpot Prizes", included: false },
              { text: "Special festive themes", included: false },
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                {feature.included ? (
                  <div className="rounded-full bg-[#005F73]/30 p-1">
                    <Check className="w-4 h-4 text-[#007A94]" />
                  </div>
                ) : (
                  <div className="rounded-full bg-[#001F2D]/60 p-1">
                    <X className="w-4 h-4 text-[#94B8C8]/40" />
                  </div>
                )}
                <span className={feature.included ? "text-white/90" : "text-[#94B8C8]/50"}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bumper Lottery Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 bg-gradient-to-br from-[#D4A017]/10 to-[#005F73]/10 border border-[#D4A017]/40 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-[#001F2D] text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>

          <div className="mb-8 border-b border-[#D4A017]/20 pb-8 relative z-10">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300 mb-2">Bumper Lottery</h3>
            <p className="text-[#94B8C8]">6 Times a Year</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-white">₹250-₹500</span>
              <span className="text-[#94B8C8] ml-2">/ ticket</span>
            </div>
          </div>

          <ul className="space-y-4 relative z-10">
            {[
              { text: "Massive Jackpots (₹10-25 Crores)", included: true },
              { text: "Special festive draws", included: true },
              { text: "Highest prize pools", included: true },
              { text: "Huge secondary prizes", included: true },
              { text: "Life-changing rewards", included: true },
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="rounded-full bg-[#D4A017]/20 p-1">
                  <Check className="w-4 h-4 text-[#D4A017]" />
                </div>
                <span className="text-white/90 font-medium">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Decorative blur */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D4A017]/15 rounded-full blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
};
