import React from "react";
import { Menu, Lock } from "lucide-react";

interface AdminTopbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ setIsSidebarOpen }) => {
  return (
    <div className="sticky top-0 z-30 bg-[#070114]/80 backdrop-blur-xl border-b border-white/5 p-4 md:p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Secure Session
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center text-xs text-gray-500 font-medium">
        <Lock size={12} className="mr-1" /> End-to-end encrypted
      </div>
    </div>
  );
};
