import { motion } from "framer-motion";
import { Search, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LatestResults = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Results</span>
          </h2>
          <p className="text-neutral-400 text-lg">Check if you are the next lucky jackpot winner</p>
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Ticket Number..."
            className="w-full md:w-80 bg-purple-900/30 border border-cyan-500/30 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all placeholder:text-neutral-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-2 bg-gradient-to-br from-purple-900/40 to-pink-900/20 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.1)] group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all z-0"></div>

          <div className="relative z-10 flex justify-between items-center mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(236,72,153,0.5)]">Today's Result</span>
            <span className="text-cyan-300 flex items-center gap-2 text-sm font-medium"><Calendar className="w-4 h-4" /> 29 Jun 2026</span>
          </div>
          <h3 className="relative z-10 text-3xl font-bold text-white mb-2">Win-Win W-765</h3>
          <p className="relative z-10 text-pink-400 mb-8 font-bold">1st Prize: ₹75 Lakhs</p>

          <div className="relative z-10 bg-black/60 rounded-2xl p-8 text-center border border-cyan-500/30 mb-8 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
            <p className="text-cyan-400 mb-3 text-sm uppercase tracking-widest font-bold">Winning Number</p>
            <div className="text-5xl md:text-6xl font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-cyan-300 font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">WF 123456</div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 rounded-full px-8 py-6 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border-none">
              Check Your Result
            </Button>
            <Button variant="outline" className="w-full sm:w-auto rounded-full border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:text-pink-300 font-bold px-8 py-6">
              <Download className="w-4 h-4 mr-2" /> Download PDF Result
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-purple-900/20 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-8 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Previous Results</h3>
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30 group">
                <div>
                  <h4 className="text-white font-bold group-hover:text-cyan-300 transition-colors">Sthree Sakthi SS-{760 - i}</h4>
                  <span className="text-pink-400 text-sm font-medium">{29 - i} Jun 2026</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
                  <Download className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6 rounded-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 font-bold">
            View All Results
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
