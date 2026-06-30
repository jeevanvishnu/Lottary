import { ChevronDown, Box } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 max-w-7xl w-full mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-gradient-to-br from-[#D4A017] to-[#B8860B] text-[#001F2D] p-1 rounded-sm shadow-[0_0_12px_rgba(212,160,23,0.5)]">
          <Box className="w-5 h-5" />
        </div>
        <span className="text-xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300">Apogee</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6 bg-[#005F73]/20 backdrop-blur-md px-6 py-2 rounded-full border border-[#005F73]/50 text-sm font-medium">
        <button className="flex items-center gap-1 hover:text-[#D4A017] transition-colors">
          Platform <ChevronDown className="w-4 h-4 opacity-70" />
        </button>
        <a href="#" className="hover:text-[#D4A017] transition-colors">Pricing</a>
        <a href="#" className="hover:text-[#D4A017] transition-colors">Resources</a>
        <a href="#" className="hover:text-[#D4A017] transition-colors">Blog</a>
      </nav>

      {/* Empty div to keep the nav centered and right side balanced if needed */}
      <div className="w-[100px] hidden md:block"></div>
    </header>
  );
};
