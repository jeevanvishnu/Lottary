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
import heroImg from "@/assets/hero-img.png";

export const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-[130%] md:w-[90%] lg:w-[75%] h-[130%] z-0 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(ellipse 65% 55% at 75% 50%, black 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 75% 50%, black 40%, transparent 75%)',
          }}
        >
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full h-full object-contain object-right lg:object-center opacity-95"
          />
        </motion.div>

        {/* Fading overlays for the hero section boundaries */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a0b2e] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a0b2e] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a0b2e] to-transparent z-10 pointer-events-none" />

        <main className="relative z-20 flex-1 flex items-center px-8 max-w-7xl w-full mx-auto h-full py-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mt-12 lg:mt-0"
          >
            <h1 className="font-bold leading-[1.1] tracking-tight mb-6 text-white drop-shadow-xl">
              <span className="block text-4xl md:text-5xl lg:text-[4rem] mb-2">Today's Ticket,</span>
              <span className="block text-4xl md:text-5xl lg:text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#FCEABB] mb-4">Tomorrow's Dream</span>
              <span className="block text-2xl md:text-3xl lg:text-4xl text-[#d8b4fe]">with Kerala Lottery</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-md leading-relaxed drop-shadow-md font-medium">
              Play today's draw, check live results, and win big securely.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] rounded-full px-8 py-6 text-base font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer border-none transition-all hover:scale-105">
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base border-2 border-[#6d28d9] text-[#d8b4fe] hover:bg-[#6d28d9]/40 hover:text-white font-bold backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(109,40,217,0.2)] transition-all hover:scale-105">
                Check Results
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
