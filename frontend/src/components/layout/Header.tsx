import { Box } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1a0b2e]/90 border-b border-[#6d28d9]/30">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl w-full mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-gradient-to-br from-[#fbbf24] to-[#d97706] text-[#1a0b2e] p-1 rounded-sm shadow-[0_0_12px_rgba(212,160,23,0.5)]">
          <Box className="w-5 h-5" />
        </div>
        <span className="text-xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Kerala</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6 bg-[#6d28d9]/20 backdrop-blur-md px-6 py-2 rounded-full border border-[#6d28d9]/50 text-sm font-medium">
        <a href="#" className="hover:text-[#fbbf24] transition-colors">Home</a>
        <a href="#about" className="hover:text-[#fbbf24] transition-colors">About</a>
        <a href="#" className="hover:text-[#fbbf24] transition-colors">Result</a>
      </nav>

      {/* Empty div to keep the nav centered and right side balanced if needed */}
      <div className="w-[100px] hidden md:block"></div>
      </div>
    </header>
  );
};
