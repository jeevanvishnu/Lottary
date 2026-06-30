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
import feather01 from "@/assets/feather01.png";
import feather02 from "@/assets/feather02.png";
import { FallingFeathers } from "@/components/FallingFeathers";

export const Home = () => {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <div id="home" className="relative w-full min-h-[100svh] lg:min-h-[90vh] flex flex-col lg:flex-row items-center overflow-hidden bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
        <FallingFeathers />

        {/* Decorative Static Feathers (Tablet & Mobile background) */}
        <div className="lg:hidden absolute top-[10%] left-[-8%] w-36 h-36 opacity-20 blur-[0.5px] rotate-[45deg] pointer-events-none z-10">
          <img src={feather01} alt="decorative feather" className="w-full h-full object-contain mix-blend-screen" />
        </div>
        <div className="lg:hidden absolute top-[25%] right-[-6%] w-44 h-44 opacity-15 blur-[1px] rotate-[-25deg] pointer-events-none z-10">
          <img src={feather02} alt="decorative feather" className="w-full h-full object-contain mix-blend-screen" />
        </div>

        {/* Background Glow Blobs for Tablet & Mobile */}
        <div className="lg:hidden absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="lg:hidden absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[85vw] h-[30vh] bg-gradient-to-t from-[#6d28d9]/10 via-[#d97706]/10 to-transparent rounded-full blur-[80px] pointer-events-none z-0" />



        {/* Background Image Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[90%] lg:w-[75%] h-[130%] z-0 pointer-events-none"
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
              alt="Lord Murugan"
              className="w-full h-full object-contain md:object-right lg:object-center opacity-95 mix-blend-screen"
            />
          </div>
        </motion.div>

        {/* Fading overlays */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0118] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0118] to-transparent z-10 pointer-events-none" />
        <div className="hidden lg:block absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#0a0118] to-transparent z-10 pointer-events-none" />

        {/* ── TEXT & BUTTONS ── */}
        <main className="relative z-20 flex-1 flex flex-col justify-start lg:justify-center px-6 sm:px-8 max-w-7xl w-full mx-auto h-full pt-24 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 px-4 sm:px-0 mt-4 lg:mt-0"
          >
            {/* Decorative pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#6d28d9]/30 border border-[#a78bfa]/40 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
              <span className="text-[#d8b4fe] text-sm font-semibold tracking-wide">Kerala Official Lottery</span>
            </motion.div>

            <h1 className="font-bold leading-[1.1] tracking-tight mb-3 text-white drop-shadow-2xl">
              <span className="block text-[2rem] sm:text-5xl lg:text-[4rem] leading-tight">Today's Ticket,</span>
              <span className="block text-[2rem] sm:text-5xl lg:text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#FCEABB] leading-tight pb-1">Tomorrow's Dream</span>
              <span className="block text-lg sm:text-3xl lg:text-4xl text-[#d8b4fe] mt-1">with Kerala Lottery</span>
            </h1>

            <p className="text-xs sm:text-lg text-gray-300 mb-6 max-w-sm mx-auto lg:mx-0 leading-relaxed font-medium">
              Play today's draw, check live results, and win big securely.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] rounded-full px-8 py-5 text-base font-bold shadow-[0_0_25px_rgba(251,191,36,0.45)] cursor-pointer border-none transition-all hover:scale-105 active:scale-95"
                onClick={() => document.getElementById('lottery-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🎟️ Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-8 py-5 text-base border-2 border-[#6d28d9] text-[#d8b4fe] hover:bg-[#6d28d9]/40 hover:text-white font-bold backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(109,40,217,0.25)] transition-all hover:scale-105 active:scale-95 bg-[#0a0118]/40 flex items-center justify-center gap-2"
                onClick={() => window.location.href = 'tel:9345478572'}
              >
                <Phone className="w-4 h-4" />
                93454 78572
              </Button>
            </div>
          </motion.div>
        </main>

        {/* ── MOBILE IMAGE: Murugan centered in lower half (Non-overlapping Stack) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="lg:hidden relative w-full h-[40vh] mt-auto pointer-events-none z-10"
        >
          <div
            className="w-full h-full"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0) 100%)',
            }}
          >
            <img
              src={heroImg}
              alt="Lord Murugan"
              className="w-full h-full object-contain object-bottom opacity-95 mix-blend-screen"
              style={{ filter: 'drop-shadow(0 0 25px rgba(109,40,217,0.4))' }}
            />
          </div>
        </motion.div>
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
