import { motion } from "framer-motion";

const winners = [
  { name: "Rahul K.", prize: "₹1 Crore", ticket: "Win-Win", date: "June 2026", color: "from-yellow-400 to-amber-600" },
  { name: "Lakshmi S.", prize: "₹75 Lakhs", ticket: "Sthree Sakthi", date: "May 2026", color: "from-amber-300 to-orange-500" },
  { name: "Mohan D.", prize: "₹80 Lakhs", ticket: "Karunya Plus", date: "April 2026", color: "from-yellow-500 to-yellow-700" },
];

export const LuckyWinners = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Lucky Winners Showcase</h2>
        <p className="text-neutral-400 text-lg">Real people, real life-changing moments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {winners.map((winner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2 }}
            className="relative p-[1px] rounded-3xl bg-gradient-to-br from-yellow-300/50 via-yellow-600/20 to-transparent overflow-hidden group cursor-pointer shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 h-full border border-yellow-500/10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${winner.color} flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(251,191,36,0.3)]`}>
                  {winner.name.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold tracking-wider text-xs uppercase mb-1">Prize Won</div>
                  <div className="text-3xl font-bold text-white drop-shadow-md">{winner.prize}</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-white">{winner.name}</h3>
                <p className="text-neutral-400 text-sm">Ticket: <span className="text-yellow-100">{winner.ticket}</span></p>
                <p className="text-neutral-500 text-xs mt-2">{winner.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
