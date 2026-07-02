import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShieldAlert, Loader2 } from "lucide-react";
import Logo from "@/assets/Logo.png";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { type AdminUser } from "./index";

interface AdminLoginProps {
  setAdminUser: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ setAdminUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form validations
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/admin/login", { email, password });
      const data = response.data;

      // Successful login
      const loggedInUser = {
        id: data.admin.id || data.admin._id,
        email: data.admin.email
      };

      localStorage.setItem("adminUser", JSON.stringify(loggedInUser));
      setAdminUser(loggedInUser);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to connect to the backend server. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden bg-transparent">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#fbbf24]/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none z-0" />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-b from-[#2d1b4e]/30 to-[#12072b]/80 border border-purple-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
          {/* Card Border Glow */}
          <div className="absolute inset-0 border border-purple-500/10 pointer-events-none rounded-3xl" />

          {/* Logo & Heading */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 rounded-full" />
              <img
                src={Logo}
                alt="Sri Senthil Vel Lottery Logo"
                className="h-20 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Admin Gateway
            </h2>
            <p className="text-sm text-[#d8b4fe]/70 mt-1.5">
              Secure access for lottery operators
            </p>
          </div>

          {/* Validation Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3.5 flex items-center gap-3 text-sm"
              >
                <ShieldAlert size={18} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/80 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full bg-[#003344]/20 border border-[#6d28d9]/40 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all placeholder:text-[#94B8C8]/40 cursor-text"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/80 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#003344]/20 border border-[#6d28d9]/40 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all placeholder:text-[#94B8C8]/40 cursor-text"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/80 hover:text-white cursor-pointer transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-[#fbbf24] text-[#1a0b2e] rounded-xl text-base font-bold shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all active:scale-[0.98] cursor-pointer mt-2 border-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                <>
                  Authenticate Access
                  <ArrowRight size={18} className="transition-transform group-hover/button:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Security Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-[#d8b4fe]/50 border-t border-white/5 pt-4 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Encrypted connection securely monitored.</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

// Helper SVG component (required for arrow animation in button hover)
const ArrowRight = ({ className, size }: { className?: string; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
