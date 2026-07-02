import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { type AdminUser } from "./index";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminTopbar } from "./components/AdminTopbar";
import { LotteryManager } from "./views/LotteryManager";
import { ResultManager } from "./views/ResultManager";

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminUser, onLogout }) => {
  const [activeView, setActiveView] = useState<"add-lottery" | "update-result">("add-lottery");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const showTemporaryMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => {
      setActionMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070114] text-white flex relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none z-0" />

      {/* Sidebar Component */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        adminUser={adminUser}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-y-auto overflow-x-hidden">
        {/* Top Header Bar Component */}
        <AdminTopbar setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-4 md:p-8 flex-1 w-full h-full flex flex-col">
          {/* Action Feedback Area */}
          <div className="h-14 mb-2">
            <AnimatePresence>
              {actionMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-3 flex items-center gap-3 text-sm max-w-lg shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
                >
                  <CheckCircle size={18} className="shrink-0" />
                  <span className="font-medium">{actionMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Views */}
          {activeView === "add-lottery" && (
            <LotteryManager showTemporaryMessage={showTemporaryMessage} />
          )}

          {activeView === "update-result" && (
            <ResultManager showTemporaryMessage={showTemporaryMessage} />
          )}
        </div>
      </div>
    </div>
  );
};
