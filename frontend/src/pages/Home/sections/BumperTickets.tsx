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
    color: "from-[#D4A017] to-amber-500",
  },
  {
    id: "summer",
    title: "Summer Bumper",
    drawDate: "March 2027",
    prize: "₹ 10 Crores",
    ticketPrice: "₹ 250",
    image: lottery02,
    color: "from-[#D4A017] to-[#B8860B]",
  },
  {
    id: "vishu",
    title: "Vishu Bumper",
    drawDate: "May 2027",
    prize: "₹ 12 Crores",
    ticketPrice: "₹ 300",
    image: lottery03,
    color: "from-[#007A94] to-[#005F73]",
  },
  {
    id: "monsoon",
    title: "Monsoon Bumper",
    drawDate: "July 2027",
    prize: "₹ 10 Crores",
    ticketPrice: "₹ 250",
    image: lottery01,
    color: "from-[#005F73] to-[#003344]",
  },
  {
    id: "thiruvonam",
    title: "Thiruvonam Bumper",
    drawDate: "September 2027",
    prize: "₹ 25 Crores",
    ticketPrice: "₹ 500",
    image: lottery02,
    color: "from-[#D4A017] to-amber-300",
  },
  {
    id: "pooja",
    title: "Pooja Bumper",
    drawDate: "November 2027",
    prize: "₹ 12 Crores",
    ticketPrice: "₹ 300",
    image: lottery03,
    color: "from-[#007A94] to-[#D4A017]",
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
          Kerala <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300">Bumper Tickets</span>
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
            className="group relative rounded-2xl overflow-hidden bg-[#003344] border border-[#005F73]/40 hover:border-[#D4A017]/50 transition-all duration-300 flex flex-col shadow-xl"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${ticket.color} z-20`} />

            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 z-20 bg-[#001F2D]/80 backdrop-blur-md rounded-lg px-3 py-1.5 border border-[#D4A017]/30 text-center shadow-lg">
                <p className="text-[10px] font-medium text-[#94B8C8] uppercase tracking-widest mb-0.5">Price</p>
                <p className="font-bold text-[#D4A017] leading-none">{ticket.ticketPrice}</p>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col relative">
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#94B8C8] mb-2 tracking-wide uppercase">{ticket.drawDate}</p>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#D4A017] transition-colors">{ticket.title}</h3>
              </div>

              <div className="mt-auto pt-5 border-t border-[#005F73]/30 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#94B8C8] uppercase tracking-wider mb-1">First Prize</p>
                  <p className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${ticket.color}`}>
                    {ticket.prize}
                  </p>
                </div>

                <Button className="rounded-full bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-[#001F2D] hover:from-amber-400 hover:to-[#D4A017] font-bold px-6 shadow-[0_0_15px_rgba(212,160,23,0.3)] hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] transition-all border-none">
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
