import { motion } from "framer-motion";
import { Shield, Trophy, Users, Heart } from "lucide-react";

export const AboutUs = () => {
  const stats = [
    { icon: <Trophy className="w-8 h-8" />, value: "₹500Cr+", label: "Prizes Distributed" },
    { icon: <Users className="w-8 h-8" />, value: "2M+", label: "Happy Winners" },
    { icon: <Shield className="w-8 h-8" />, value: "100%", label: "Secure & Transparent" },
    { icon: <Heart className="w-8 h-8" />, value: "55 Yrs", label: "of Trust (Since 1967)" },
  ];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Text Content */}
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300">Kerala Lottery</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6 text-[#94B8C8] text-lg leading-relaxed"
          >
            <p>
              Established in 1967, the Kerala State Lottery Department was the first of its kind in India. What started as an innovative idea to provide employment and supplement government finance has grown into a phenomenon that touches millions of lives.
            </p>
            <p>
              Every ticket you purchase not only gives you a chance to change your life but also contributes significantly to various welfare schemes, healthcare initiatives, and infrastructure development across the state.
            </p>
            <p className="font-semibold text-white border-l-4 border-[#D4A017] pl-4 py-1">
              "We don't just create millionaires; we build a better society."
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 w-full grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-[#003344]/40 border border-[#005F73]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#003344]/60 hover:border-[#D4A017]/40 transition-colors duration-300 backdrop-blur-sm group"
            >
              <div className="text-[#D4A017] mb-4 bg-[#D4A017]/10 p-4 rounded-full group-hover:bg-[#D4A017]/20 transition-colors">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-extrabold text-white mb-2">{stat.value}</h4>
              <p className="text-[#94B8C8] font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
