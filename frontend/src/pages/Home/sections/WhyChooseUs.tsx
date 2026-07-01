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
    <section className="py-20 px-8 w-full relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-4 text-[#1a0b2e] drop-shadow-sm">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]">Trust</span> Us
          </h2>
          <p className="relative z-10 text-gray-600 text-lg">Your security and trust are our top priorities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-200 hover:bg-white hover:border-[#d97706]/40 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all">
                <feature.icon className="w-8 h-8 drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-bold text-[#1a0b2e] mb-3 group-hover:text-[#d97706] transition-colors">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
