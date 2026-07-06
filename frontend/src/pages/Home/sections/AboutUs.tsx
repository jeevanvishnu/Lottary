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
    <section id="about" className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Text Content */}
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Us</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6 text-[#94B8C8] text-lg leading-relaxed"
          >
            <p>
              We are a Kerala government-authorized agency and we are a wholesale and retailer. We have more than 50,000 customers all over India. Sree Senthilvel lottery agency is one of the leading Kerala lottery agents in Palakkad, providing trusted lottery services since our establishment.
            </p>
            <p>
              As an authorized agency, we sell Kerala State Lottery tickets which is a government lottery founded in 1967 under the Kerala government's lottery department. All Indian people can buy Kerala government lottery tickets through us and win prizes with their luck.
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
              className="bg-[#003344]/40 border border-[#6d28d9]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#003344]/60 hover:border-[#fbbf24]/40 transition-colors duration-300 backdrop-blur-sm group"
            >
              <div className="text-[#fbbf24] mb-4 bg-[#fbbf24]/10 p-4 rounded-full group-hover:bg-[#fbbf24]/20 transition-colors">
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
