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


export const Home = () => {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <div id="home" className="relative w-full min-h-[100svh] lg:min-h-[90vh] flex flex-col lg:flex-row items-center overflow-hidden bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">

        {/* Decorative Static Feathers (Tablet & Mobile background) */}
        <div className="lg:hidden absolute top-[10%] left-[-8%] w-36 h-36 opacity-20 blur-[0.5px] rotate-[45deg] pointer-events-none z-10">
          <img src={feather01} alt="decorative feather" className="w-full h-full object-contain mix-blend-screen" />
        </div>
        <div className="lg:hidden absolute top-[25%] right-[-6%] w-44 h-44 opacity-15 blur-[1px] rotate-[-25deg] pointer-events-none z-10">
          <img src={feather02} alt="decorative feather" className="w-full h-full object-contain mix-blend-screen" />
        </div>

        {/* Background Glow Blobs for Tablet & Mobile */}
        <div className="lg:hidden absolute top-[15%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="lg:hidden absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90vw] h-[40vh] bg-gradient-to-t from-[#6d28d9]/15 via-[#d97706]/15 to-transparent rounded-full blur-[80px] pointer-events-none z-0" />

        {/* ── MOBILE IMAGE: Beautifully integrated at the bottom ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="lg:hidden absolute bottom-0 left-0 w-full h-[45vh] z-0 pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              maskImage: 'radial-gradient(ellipse at bottom, black 40%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at bottom, black 40%, transparent 75%)',
            }}
          >
            <img
              src={heroImg}
              alt="Lord Murugan"
              className="w-full h-full object-contain object-bottom opacity-80 mix-blend-screen"
              style={{ filter: 'drop-shadow(0 0 35px rgba(109,40,217,0.5))' }}
            />
          </div>
        </motion.div>

        {/* Background Image Container for Desktop */}
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
        <main className="relative z-20 flex-1 flex flex-col justify-start pt-[8vh] pb-[45vh] lg:justify-center lg:py-0 px-6 sm:px-8 max-w-7xl w-full mx-auto h-full min-h-[100svh] lg:min-h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 px-2 sm:px-0"
          >
            {/* Decorative pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#6d28d9]/20 border border-[#a78bfa]/30 rounded-full px-5 py-2 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(109,40,217,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <span className="text-[#e9d5ff] text-xs sm:text-sm font-bold tracking-wider uppercase">Kerala Official Lottery</span>
            </motion.div>

            <h1 className="font-extrabold leading-[1.15] tracking-tight mb-4 text-white drop-shadow-2xl flex flex-col gap-1">
              <span className="text-[2.5rem] sm:text-6xl lg:text-[4rem] leading-none">Today's Ticket,</span>
              <span className="text-[2.5rem] sm:text-6xl lg:text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#fffbeb] leading-none pb-2 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">Tomorrow's Dream</span>
              <span className="text-xl sm:text-3xl lg:text-4xl text-[#d8b4fe] mt-2 font-medium">with Kerala Lottery</span>
            </h1>

            <p className="text-sm sm:text-lg text-gray-300/90 mb-8 max-w-[280px] sm:max-w-md mx-auto lg:mx-0 leading-relaxed font-normal">
              Play today's draw, check live results, and win big securely.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full sm:w-auto px-4 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] rounded-full px-10 text-lg font-bold shadow-[0_8px_25px_-5px_rgba(251,191,36,0.5)] cursor-pointer border-none transition-all hover:scale-105 active:scale-95"
                onClick={() => document.getElementById('lottery-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 rounded-full px-8 text-lg border-2 border-[#8b5cf6]/60 text-[#e9d5ff] hover:bg-[#8b5cf6]/20 hover:text-white font-bold backdrop-blur-md cursor-pointer shadow-[0_8px_25px_-5px_rgba(139,92,246,0.25)] transition-all hover:scale-105 active:scale-95 bg-[#0a0118]/40 flex items-center justify-center gap-3"
                onClick={() => window.location.href = 'tel:9345478572'}
              >
                <Phone className="w-5 h-5 text-[#fbbf24]" />
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
