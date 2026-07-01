import { motion } from "framer-motion";
import { Search, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultImage from "@/assets/Result.jpg";

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

          <div className="relative z-10 flex justify-end items-center mb-6">
            <span className="text-[#94B8C8] flex items-center gap-2 text-sm font-medium"><Calendar className="w-4 h-4" /> 29 Jun 2026</span>
          </div>

          <div className="relative z-10 w-full mb-8 rounded-2xl overflow-hidden border border-[#6d28d9]/40 shadow-[0_0_20px_rgba(0,0,0,0.3)] bg-[#1a0b2e]/50">
            <img src={ResultImage} alt="Latest Kerala Lottery Result" className="w-full h-auto object-cover" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] rounded-full px-8 py-6 font-bold shadow-[0_0_15px_rgba(212,160,23,0.4)] border-none">
              Check Kerala Lottery Result
            </Button>
            <Button variant="outline" className="w-full sm:w-auto rounded-full border-[#6d28d9] text-[#94B8C8] hover:bg-[#6d28d9]/20 hover:text-white font-bold px-8 py-6">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#003344]/30 backdrop-blur-md border border-[#6d28d9]/30 rounded-3xl p-8 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          {/* Filter Section */}
          <div className="mb-8 pb-6 border-b border-[#6d28d9]/30">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#fbbf24]" />
              Filter Past Results
            </h4>
            <div className="space-y-3">
               <div className="relative">
                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94B8C8] w-4 h-4" />
                 <input 
                   type="date" 
                   className="w-full bg-[#003344]/50 border border-[#6d28d9]/50 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_10px_rgba(212,160,23,0.2)] transition-all text-sm [color-scheme:dark]" 
                 />
               </div>
               <select className="w-full bg-[#003344]/50 border border-[#6d28d9]/50 rounded-xl py-2.5 px-4 text-[#94B8C8] focus:text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_10px_rgba(212,160,23,0.2)] transition-all text-sm appearance-none">
                 <option value="" className="bg-[#1a0b2e]">All Lottery Types</option>
                 <option value="win-win" className="bg-[#1a0b2e]">Win-Win</option>
                 <option value="sthree-sakthi" className="bg-[#1a0b2e]">Sthree Sakthi</option>
                 <option value="fifty-fifty" className="bg-[#1a0b2e]">Fifty-Fifty</option>
                 <option value="karunya" className="bg-[#1a0b2e]">Karunya Plus</option>
                 <option value="nirmal" className="bg-[#1a0b2e]">Nirmal</option>
                 <option value="pournami" className="bg-[#1a0b2e]">Pournami</option>
                 <option value="bumper" className="bg-[#1a0b2e]">Bumper</option>
               </select>
               <Button className="w-full bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] border-none rounded-xl py-2.5 font-bold transition-all text-sm mt-2 shadow-[0_4px_15px_rgba(212,160,23,0.3)]">
                 Apply Filters
               </Button>
            </div>
          </div>

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

        </motion.div>
      </div>
    </section>
  );
};
