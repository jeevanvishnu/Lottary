import { Button } from "@/components/ui/button";
import { LotteryList } from "./sections/LotteryList";
import { HowItWorks } from "./sections/HowItWorks";
import { LatestResults } from "./sections/LatestResults";
import { WhyChooseUs } from "./sections/WhyChooseUs";
import { BumperTickets } from "./sections/BumperTickets";
import { PrizeComparison } from "./sections/PrizeComparison";
import { AboutUs } from "./sections/AboutUs";
import { FaqSection } from "./sections/FaqSection";
import { Footer } from "./sections/Footer";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import heroImg from "@/assets/hero-img.png";
import { FallingFeathers } from "@/components/FallingFeathers";

export const Home = () => {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <div id="home" className="relative w-full min-h-[100svh] md:min-h-[90vh] flex flex-col md:flex-row items-center overflow-hidden bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
        <FallingFeathers />
        {/* Background Image Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute right-0 bottom-0 md:top-1/2 md:-translate-y-1/2 w-[120%] sm:w-[90%] md:w-[90%] lg:w-[75%] h-[60%] sm:h-[70%] md:h-[130%] z-0 pointer-events-none translate-x-[10%] md:translate-x-0"
        >
          <div 
            className="w-full h-full"
            style={{
              maskImage: 'radial-gradient(ellipse 75% 70% at 65% 50%, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 65% 50%, black 40%, transparent 80%)',
            }}
          >
            <img
              src={heroImg}
              alt="Hero Illustration"
              className="w-full h-full object-contain md:object-right lg:object-center opacity-70 md:opacity-95"
            />
          </div>
        </motion.div>

        {/* Fading overlays for the hero section boundaries */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0118] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0118] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#0a0118] to-transparent z-10 pointer-events-none" />

        <main className="relative z-20 flex-1 flex flex-col justify-start md:justify-center px-6 sm:px-8 max-w-7xl w-full mx-auto h-full pt-28 pb-10 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center md:text-left mt-0 lg:mt-0"
          >
            <h1 className="font-bold leading-[1.15] tracking-tight mb-6 text-white drop-shadow-2xl">
              <span className="block text-[2.75rem] sm:text-5xl lg:text-[4rem] mb-2 leading-tight">Today's Ticket,</span>
              <span className="block text-[2.75rem] sm:text-5xl lg:text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#FCEABB] mb-4 leading-tight pb-2">Tomorrow's Dream</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#d8b4fe]">with Kerala Lottery</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed drop-shadow-md font-medium">
              Play today's draw, check live results, and win big securely.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer border-none transition-all hover:scale-105"
                onClick={() => document.getElementById('lottery-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Buy Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-2 border-[#6d28d9] text-[#d8b4fe] hover:bg-[#6d28d9]/40 hover:text-white font-bold backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(109,40,217,0.2)] transition-all hover:scale-105 bg-[#0a0118]/50 md:bg-transparent flex items-center justify-center gap-2"
                onClick={() => window.location.href = 'tel:9345478572'}
              >
                <Phone className="w-5 h-5" />
                93454 78572
              </Button>
            </div>
          </motion.div>
        </main>
      </div>

      <LotteryList />
      <LatestResults />
      <HowItWorks />
      <BumperTickets />
      <PrizeComparison />
      <AboutUs />
      <WhyChooseUs />
      <FaqSection />
      <Footer />
    </div>
  );
};
