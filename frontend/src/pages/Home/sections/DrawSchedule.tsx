import { motion } from "framer-motion";

const schedule = [
  { day: "Monday", name: "Win-Win", prize: "₹75 Lakhs", color: "from-purple-500 to-pink-500" },
  { day: "Tuesday", name: "Sthree Sakthi", prize: "₹75 Lakhs", color: "from-pink-500 to-orange-400" },
  { day: "Wednesday", name: "Fifty Fifty", prize: "₹1 Crore", color: "from-orange-400 to-amber-500" },
  { day: "Thursday", name: "Karunya Plus", prize: "₹80 Lakhs", color: "from-amber-500 to-emerald-500" },
  { day: "Friday", name: "Nirmal", prize: "₹70 Lakhs", color: "from-emerald-500 to-cyan-500" },
  { day: "Saturday", name: "Karunya", prize: "₹1 Crore", color: "from-cyan-500 to-blue-500" },
  { day: "Sunday", name: "Akshaya", prize: "₹70 Lakhs", color: "from-blue-500 to-purple-500" },
];

export const DrawSchedule = () => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-white">Upcoming Draw Schedule</h2>
        <p className="text-neutral-400 text-lg">Mark your calendars for a chance to win big</p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full" />
        
        {schedule.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center justify-between mb-8 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Center Dot */}
            <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg -translate-x-1/2 z-10 border-2 border-black`} />
            
            <div className={`ml-12 md:ml-0 w-full md:w-[45%] p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
              <h3 className="text-2xl font-bold text-white mb-1">{item.day}</h3>
              <p className="text-neutral-300 font-medium mb-3">{item.name}</p>
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white font-semibold text-sm`}>
                1st Prize: {item.prize}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
