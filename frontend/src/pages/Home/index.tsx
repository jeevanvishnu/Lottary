import { Button } from "@/components/ui/button";
import { LotteryList } from "./sections/LotteryList";
import { HowItWorks } from "./sections/HowItWorks";
import { LatestResults } from "./sections/LatestResults";
import { WhyChooseUs } from "./sections/WhyChooseUs";
import { OffersNotifications } from "./sections/OffersNotifications";
import { FaqSection } from "./sections/FaqSection";
import { Footer } from "./sections/Footer";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <main className="flex-1 flex items-center px-8 max-w-7xl w-full mx-auto min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mt-12 md:mt-0"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-white drop-shadow-lg">
            Hit the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">Jackpot</span> <br />
            with Kerala Lottery
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-lg leading-relaxed drop-shadow-md font-medium">
            Play today's draw, check live results, and win big securely.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 rounded-full px-8 font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-pointer border-none">
              Play Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 font-bold backdrop-blur-sm cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              Check Results
            </Button>
          </div>
        </motion.div>
      </main>

      <LotteryList />
      <LatestResults />
      <HowItWorks />
      <OffersNotifications />
      <WhyChooseUs />
      <FaqSection />
      <Footer />
    </div>
  );
};
