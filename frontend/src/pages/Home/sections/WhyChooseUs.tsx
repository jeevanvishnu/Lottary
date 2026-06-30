import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Lock, UserCheck } from "lucide-react";

const features = [
  { icon: CheckCircle2, title: "Authorized Seller", desc: "We are an officially recognized and licensed lottery retailer with verified credentials." },
  { icon: ShieldCheck, title: "Genuine Tickets", desc: "100% authentic paper tickets scanned and sent directly to you with clear serial numbers." },
  { icon: Lock, title: "Secure Transactions", desc: "Your payments are protected with bank-grade encryption and standard gateways." },
  { icon: UserCheck, title: "Transparent Details", desc: "Clear seller identification, contact information, and physical address provided for full trust." },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16 relative">
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
          Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Trust</span> Us
        </h2>
        <p className="relative z-10 text-[#94B8C8] text-lg">Your security and trust are our top priorities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-3xl bg-[#003344]/30 backdrop-blur-md border border-[#6d28d9]/25 hover:bg-[#003344]/50 hover:border-[#fbbf24]/40 transition-all group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fbbf24]/20 to-[#d97706]/20 border border-[#fbbf24]/30 text-[#fbbf24] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,160,23,0.4)] transition-all">
              <feature.icon className="w-8 h-8 drop-shadow-[0_0_8px_currentColor]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#fbbf24] transition-colors">{feature.title}</h3>
            <p className="text-[#94B8C8] leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
