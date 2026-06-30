import { motion } from "framer-motion";
import murganImage from "../../../assets/murgan.jpeg";
import { Users, Award, ShieldCheck } from "lucide-react";

export const AboutAgency = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-3xl blur-2xl opacity-20 transform rotate-6"></div>
            <img 
              src={murganImage} 
              alt="Murugan Lottery Agency" 
              className="relative w-full rounded-3xl shadow-2xl border border-white/10 object-cover max-h-[500px]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">The Most Trusted Lottery Agency</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            Established over a decade ago, Murugan Lottery Agency has been a beacon of hope and trust for thousands of participants. We believe in providing a completely transparent and hassle-free lottery booking experience. 
            From buying genuine tickets to claiming your life-changing prizes, we stand by our customers at every step.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
              <Award className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-neutral-400 text-sm">Years of Service</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
              <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-neutral-400 text-sm">Happy Customers</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-neutral-400 text-sm">Genuine & Secure</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
