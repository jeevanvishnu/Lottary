import { useState } from "react";
import Logo from "../../assets/Logo.png";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About', 'Result'];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0118]/80 border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-3 lg:px-12 max-w-7xl w-full mx-auto relative">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
            <img src={Logo} alt="Lottary Logo" className="h-14 md:h-16 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-inner">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveItem(item)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeItem === item
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden z-50 p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Spacer */}
        <div className="hidden md:flex items-center w-24"></div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0118]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    setActiveItem(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeItem === item
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
