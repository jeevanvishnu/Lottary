import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlusCircle, FileSpreadsheet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo.png";
import { type AdminUser } from "../index";

interface AdminSidebarProps {
  activeView: "add-lottery" | "update-result";
  setActiveView: (view: "add-lottery" | "update-result") => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  adminUser: AdminUser;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeView,
  setActiveView,
  isSidebarOpen,
  setIsSidebarOpen,
  adminUser,
  onLogout,
}) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#12072b]/95 border-r border-white/5 backdrop-blur-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => setActiveView("add-lottery")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
              <img src={Logo} alt="Logo" className="w-8 h-8 object-contain relative z-10" />
            </div>
            <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-[#fbbf24]">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          <button
            onClick={() => {
              setActiveView("add-lottery");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
              activeView === "add-lottery"
                ? "bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/20 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            <PlusCircle size={18} className={activeView === "add-lottery" ? "text-[#fbbf24]" : ""} />
            <span className="font-medium">Lottery</span>
          </button>
          <button
            onClick={() => {
              setActiveView("update-result");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
              activeView === "update-result"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            <FileSpreadsheet
              size={18}
              className={activeView === "update-result" ? "text-emerald-400" : ""}
            />
            <span className="font-medium">Update Result</span>
          </button>
        </div>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex flex-col mb-4 px-2">
            <span className="text-sm font-medium text-gray-200 truncate">{adminUser.email}</span>
            <span className="text-xs text-[#d8b4fe]/70 font-semibold uppercase tracking-wider mt-1">
              Administrator
            </span>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full rounded-xl border-red-500/40 text-red-400 hover:bg-red-500/20 hover:text-red-300 py-2.5 text-sm font-bold transition-all flex items-center justify-center gap-2 bg-transparent"
          >
            <LogOut size={16} />
            Secure Logout
          </Button>
        </div>
      </div>
    </>
  );
};
