import { motion } from "framer-motion";
import { Search, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LatestResults = () => {
  return (
    <section id="result" className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Results</span>
          </h2>
          <p className="text-[#94B8C8] text-lg">Check if you are the next lucky jackpot winner</p>
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fbbf24] w-5 h-5" />
          <input
            type="text"
            placeholder="Search Ticket Number..."
            className="w-full md:w-80 bg-[#003344]/50 border border-[#6d28d9]/50 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_15px_rgba(212,160,23,0.3)] transition-all placeholder:text-[#94B8C8]/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-2 bg-gradient-to-br from-[#003344]/60 to-[#6d28d9]/20 backdrop-blur-md border border-[#fbbf24]/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(212,160,23,0.1)] group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/10 rounded-full blur-3xl group-hover:bg-[#fbbf24]/20 transition-all z-0"></div>

          <div className="relative z-10 flex justify-between items-center mb-6">
            <span className="bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] px-4 py-1.5 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(212,160,23,0.5)]">Today's Result</span>
            <span className="text-[#94B8C8] flex items-center gap-2 text-sm font-medium"><Calendar className="w-4 h-4" /> 29 Jun 2026</span>
          </div>
          <h3 className="relative z-10 text-3xl font-bold text-white mb-2">Win-Win W-765</h3>
          <p className="relative z-10 text-[#fbbf24] mb-8 font-bold">1st Prize: ₹75 Lakhs</p>

          <div className="relative z-10 bg-[#1a0b2e]/70 rounded-2xl p-8 text-center border border-[#6d28d9]/40 mb-8 shadow-[inset_0_0_20px_rgba(0,95,115,0.1)]">
            <p className="text-[#fbbf24] mb-3 text-sm uppercase tracking-widest font-bold">Winning Number</p>
            <div className="text-5xl md:text-6xl font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-white to-amber-300 font-black drop-shadow-[0_0_10px_rgba(212,160,23,0.4)]">WF 123456</div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] rounded-full px-8 py-6 font-bold shadow-[0_0_15px_rgba(212,160,23,0.4)] border-none">
              Check Your Result
            </Button>
            <Button variant="outline" className="w-full sm:w-auto rounded-full border-[#6d28d9] text-[#94B8C8] hover:bg-[#6d28d9]/20 hover:text-white font-bold px-8 py-6">
              <Download className="w-4 h-4 mr-2" /> Download PDF Result
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#003344]/30 backdrop-blur-md border border-[#6d28d9]/30 rounded-3xl p-8 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Previous Results</h3>
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-[#003344]/60 hover:bg-[#003344]/80 transition-all cursor-pointer border border-transparent hover:border-[#fbbf24]/30 group">
                <div>
                  <h4 className="text-white font-bold group-hover:text-[#fbbf24] transition-colors">Sthree Sakthi SS-{760 - i}</h4>
                  <span className="text-[#94B8C8] text-sm font-medium">{29 - i} Jun 2026</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#6d28d9]/30 flex items-center justify-center border border-[#6d28d9]/30 group-hover:bg-[#fbbf24]/20 group-hover:border-[#fbbf24]/50 transition-all">
                  <Download className="w-4 h-4 text-[#fbbf24]" />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6 rounded-full border-[#6d28d9]/50 text-[#94B8C8] hover:bg-[#6d28d9]/20 hover:text-white font-bold">
            View All Results
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
