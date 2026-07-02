import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Lock, UserCheck, Phone, MapPin } from "lucide-react";

const features = [
  { icon: CheckCircle2, title: "Authorized Seller", desc: "We are an officially recognized and licensed lottery retailer with verified credentials." },
  { icon: ShieldCheck, title: "Genuine Tickets", desc: "100% authentic paper tickets scanned and sent directly to you with clear serial numbers." },
  { icon: Lock, title: "Secure Transactions", desc: "Your payments are protected with bank-grade encryption and standard gateways." },
  { icon: UserCheck, title: "Transparent Details", desc: "Clear seller identification, contact information, and physical address provided for full trust." },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 px-8 w-full relative z-10 bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <h2 className="relative z-10 text-3xl md:text-5xl font-bold mb-4 text-[#1a0b2e] drop-shadow-sm">
            Why Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]">Sri Senthil Vel Lottery</span>
          </h2>
          <p className="relative z-10 text-gray-600 text-lg max-w-2xl mx-auto">Your security and trust are our top priorities. We guarantee transparency in every ticket you buy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-200 hover:bg-white hover:border-[#d97706]/40 transition-all group shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all">
                <feature.icon className="w-8 h-8 drop-shadow-sm" />
              </div>
              <h3 className="text-xl font-bold text-[#1a0b2e] mb-3 group-hover:text-[#d97706] transition-colors">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-10 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#d97706]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-[#d97706]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a0b2e] mb-2">Need Help or Verification?</h3>
              <p className="text-gray-600">Contact our official support team for any queries regarding tickets or results.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
              <a href="tel:9345478572" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 hover:border-[#d97706]/40 transition-all group flex-1 shadow-sm hover:shadow-md">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#d97706]/10 text-[#d97706] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Call Us Now</p>
                  <p className="text-[#1a0b2e] font-bold text-lg whitespace-nowrap">+91 93454 78572</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 transition-all group flex-1 shadow-sm cursor-default">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#d97706]/10 text-[#d97706] flex items-center justify-center transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Our Location</p>
                  <p className="text-[#1a0b2e] font-bold text-sm">Ernakulam, Kerala</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
