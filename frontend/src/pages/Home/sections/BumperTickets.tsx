import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import lottery01 from "@/assets/lottery01.jpg";
import lottery02 from "@/assets/lottery02.jpg";
import lottery03 from "@/assets/lottery03.jpg";

const bumperTickets = [
  {
    id: "christmas",
    title: "Christmas New Year Bumper",
    drawDate: "January 2027",
    prize: "₹ 20 Crores",
    ticketPrice: "₹ 400",
    image: lottery01,
    color: "from-[#fbbf24] to-amber-500",
  },
  {
    id: "summer",
    title: "Summer Bumper",
    drawDate: "March 2027",
    prize: "₹ 10 Crores",
    ticketPrice: "₹ 250",
    image: lottery02,
    color: "from-[#fbbf24] to-[#d97706]",
  },
  {
    id: "vishu",
    title: "Vishu Bumper",
    drawDate: "May 2027",
    prize: "₹ 12 Crores",
    ticketPrice: "₹ 300",
    image: lottery03,
    color: "from-[#fbbf24] to-[#FCEABB]",
  },
  {
    id: "monsoon",
    title: "Monsoon Bumper",
    drawDate: "July 2027",
    prize: "₹ 10 Crores",
    ticketPrice: "₹ 250",
    image: lottery01,
    color: "from-[#fbbf24] to-amber-400",
  },
  {
    id: "thiruvonam",
    title: "Thiruvonam Bumper",
    drawDate: "September 2027",
    prize: "₹ 25 Crores",
    ticketPrice: "₹ 500",
    image: lottery02,
    color: "from-[#fbbf24] to-amber-300",
  },
  {
    id: "pooja",
    title: "Pooja Bumper",
    drawDate: "November 2027",
    prize: "₹ 12 Crores",
    ticketPrice: "₹ 300",
    image: lottery03,
    color: "from-[#fbbf24] to-[#FFD700]",
  },
];

export const BumperTickets = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Kerala <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Bumper Tickets</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#94B8C8] max-w-2xl mx-auto text-lg"
        >
          Participate in the most awaited draws of the year. Massive jackpots await!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bumperTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#fbbf24]/50 transition-all duration-500 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(251,191,36,0.2)] hover:-translate-y-2"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-30 pointer-events-none" />
            
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${ticket.color} z-20`} />

            <div className="relative h-56 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#003344] via-black/20 to-transparent z-10 opacity-80" />
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110"
              />
              <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10 shadow-lg group-hover:border-[#fbbf24]/50 transition-colors duration-300">
                <p className="text-[10px] font-medium text-white/70 uppercase tracking-[0.2em] mb-1">Price</p>
                <p className="font-bold text-[#fbbf24] leading-none text-lg">{ticket.ticketPrice}</p>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col relative z-20 bg-gradient-to-b from-[#003344]/50 to-transparent">
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#fbbf24] mb-3 tracking-[0.15em] uppercase flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-[#fbbf24]"></span>
                  {ticket.drawDate}
                </p>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#fbbf24] transition-colors">{ticket.title}</h3>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between group-hover:border-white/20 transition-colors duration-300">
                <div>
                  <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.2em] mb-1.5">First Prize</p>
                  <p className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${ticket.color} drop-shadow-sm`}>
                    {ticket.prize}
                  </p>
                </div>

                <button className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold h-12 px-6 text-sm uppercase tracking-wider hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
