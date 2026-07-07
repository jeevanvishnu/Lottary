import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppBanner = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-gradient-to-r from-teal-600 to-[#0A8784] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-teal-400/20"
      >
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-teal-800/30 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Book Instantly Through <br className="hidden md:block" /> WhatsApp
          </h2>
          <p className="text-teal-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Skip the queue. Message us now to select your numbers and get your digital ticket copy in seconds.
          </p>
          <Button size="lg" asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg rounded-full px-10 py-6 font-semibold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105">
            <a href="https://wa.me/916379024854" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-6 h-6 mr-3" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
