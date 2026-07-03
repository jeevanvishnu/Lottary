import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Calendar, Trophy, Star, ChevronDown, ChevronUp,
  Ticket, MapPin, User, Hash, Sparkles, RefreshCw, AlertCircle,
  CheckCircle2, XCircle, Clock, ArrowRight, Wifi
} from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = "http://localhost:5000/api/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ResultFirst {
  ticket: string;
  location: string;
  agent: string;
  agency_no: string;
}

interface PrizeAmounts {
  "1st": string;
  consolation: string;
  "2nd": string;
  "3rd": string;
  "4th": string;
  "5th": string;
  "6th": string;
  "7th": string;
  "8th": string;
  "9th": string;
}

interface Prizes {
  consolation: string[];
  "2nd": string[];
  "3rd": string[];
  "4th": string[];
  "5th": string[];
  "6th": string[];
  "7th": string[];
  "8th": string[];
  "9th": string[];
  amounts: PrizeAmounts;
  guess: string[];
  mc: string[];
}

interface LotteryResult {
  draw_date: string;
  draw_name: string;
  draw_code: string;
  first: ResultFirst;
  // External API history uses first_ticket at root level
  first_ticket?: string;
  prizes: Prizes;
  mc: string[];
}

interface HistoryItem {
  draw_date: string;
  draw_name: string;
  draw_code: string;
  first_ticket: string;
}

// ─── Normalise result (handle first_ticket → first.ticket) ───────────────────
function normalise(raw: any): LotteryResult {
  if (!raw) return raw;
  if (!raw.first || !raw.first.ticket) {
    return {
      ...raw,
      first: {
        ticket: raw.first_ticket || "",
        location: raw.first?.location || "",
        agent: raw.first?.agent || "",
        agency_no: raw.first?.agency_no || "",
      },
    };
  }
  return raw;
}

// ─── Prize tier config ────────────────────────────────────────────────────────
const PRIZE_TIERS = [
  { key: "consolation", label: "Consolation Prize", amountKey: "consolation", color: "from-blue-500/20 to-blue-600/10",     border: "border-blue-500/30",    text: "text-blue-300",    badge: "bg-blue-500/20 text-blue-300",    cols: 4 },
  { key: "2nd",         label: "2nd Prize",         amountKey: "2nd",         color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30",  text: "text-purple-300",  badge: "bg-purple-500/20 text-purple-300",  cols: 2 },
  { key: "3rd",         label: "3rd Prize",         amountKey: "3rd",         color: "from-pink-500/20 to-pink-600/10",     border: "border-pink-500/30",    text: "text-pink-300",    badge: "bg-pink-500/20 text-pink-300",    cols: 2 },
  { key: "4th",         label: "4th Prize",         amountKey: "4th",         color: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/30",  text: "text-orange-300",  badge: "bg-orange-500/20 text-orange-300",  cols: 4 },
  { key: "5th",         label: "5th Prize",         amountKey: "5th",         color: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-500/30",  text: "text-yellow-300",  badge: "bg-yellow-500/20 text-yellow-300",  cols: 3 },
  { key: "6th",         label: "6th Prize",         amountKey: "6th",         color: "from-teal-500/20 to-teal-600/10",     border: "border-teal-500/30",    text: "text-teal-300",    badge: "bg-teal-500/20 text-teal-300",    cols: 4 },
  { key: "7th",         label: "7th Prize",         amountKey: "7th",         color: "from-cyan-500/20 to-cyan-600/10",     border: "border-cyan-500/30",    text: "text-cyan-300",    badge: "bg-cyan-500/20 text-cyan-300",    cols: 4 },
  { key: "8th",         label: "8th Prize",         amountKey: "8th",         color: "from-sky-500/20 to-sky-600/10",       border: "border-sky-500/30",     text: "text-sky-300",     badge: "bg-sky-500/20 text-sky-300",     cols: 4 },
  { key: "9th",         label: "9th Prize",         amountKey: "9th",         color: "from-indigo-500/20 to-indigo-600/10", border: "border-indigo-500/30",  text: "text-indigo-300",  badge: "bg-indigo-500/20 text-indigo-300",  cols: 5 },
] as const;

// ─── Ticket Checker ───────────────────────────────────────────────────────────
function TicketChecker({ result }: { result: LotteryResult }) {
  const [ticketInput, setTicketInput] = useState("");
  const [checkResult, setCheckResult] = useState<{ found: boolean; prize?: string; amount?: string } | null>(null);

  const checkTicket = () => {
    const query = ticketInput.trim().toUpperCase();
    if (!query) return;
    setCheckResult(null);

    if (result.first?.ticket && result.first.ticket.toUpperCase() === query) {
      setCheckResult({ found: true, prize: "🏆 1st Prize", amount: result.prizes?.amounts?.["1st"] });
      return;
    }
    if (result.prizes?.consolation?.some(t => t.toUpperCase() === query)) {
      setCheckResult({ found: true, prize: "Consolation Prize", amount: result.prizes.amounts?.consolation });
      return;
    }
    for (const tier of ["2nd", "3rd"] as const) {
      if (result.prizes?.[tier]?.some(t => t.toUpperCase() === query)) {
        setCheckResult({ found: true, prize: `${tier} Prize`, amount: result.prizes.amounts?.[tier] });
        return;
      }
    }
    const last4 = query.replace(/\s/g, "").slice(-4);
    for (const tier of ["4th", "5th", "6th", "7th", "8th", "9th"] as const) {
      if (result.prizes?.[tier]?.some(t => t === last4 || t.toUpperCase() === query)) {
        setCheckResult({ found: true, prize: `${tier} Prize`, amount: result.prizes.amounts?.[tier] });
        return;
      }
    }
    setCheckResult({ found: false });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fbbf24] w-4 h-4" />
          <input
            type="text"
            value={ticketInput}
            onChange={(e) => { setTicketInput(e.target.value); setCheckResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && checkTicket()}
            placeholder="e.g. DL 777487 or last 4 digits"
            className="w-full bg-[#003344]/50 border border-[#6d28d9]/50 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_10px_rgba(212,160,23,0.2)] transition-all placeholder:text-[#94B8C8]/50 text-sm font-mono"
          />
        </div>
        <Button
          onClick={checkTicket}
          className="bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] hover:from-amber-400 hover:to-[#fbbf24] border-none rounded-xl font-bold px-4 text-sm shrink-0 shadow-[0_4px_15px_rgba(212,160,23,0.3)]"
        >
          Check
        </Button>
      </div>
      <AnimatePresence>
        {checkResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-4 rounded-2xl border flex items-start gap-3 ${checkResult.found ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}
          >
            {checkResult.found ? (
              <>
                <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-bold text-sm">🎉 Congratulations! You Won!</p>
                  <p className="text-white font-bold mt-0.5">{checkResult.prize}</p>
                  <p className="text-[#fbbf24] font-mono font-bold text-lg">₹{checkResult.amount}</p>
                  <p className="text-gray-400 text-xs mt-1">Visit our agency to claim your prize</p>
                </div>
              </>
            ) : (
              <>
                <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-bold text-sm">No Prize Found</p>
                  <p className="text-gray-400 text-xs mt-0.5">This ticket number is not a winner in this draw.</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Prize Tier Card ──────────────────────────────────────────────────────────
function PrizeTierCard({ label, amount, tickets, colorClass, borderClass, textClass, badgeClass, cols, defaultOpen }: {
  label: string; amount: string; tickets: string[];
  colorClass: string; borderClass: string; textClass: string; badgeClass: string; cols: number; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  if (!tickets || tickets.length === 0) return null;

  return (
    <div className={`rounded-2xl border ${borderClass} overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between p-3 bg-gradient-to-r ${colorClass} hover:brightness-110 transition-all`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${textClass}`}>{label}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${badgeClass}`}>{tickets.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#fbbf24] font-bold text-sm font-mono">₹{amount}</span>
          {open ? <ChevronUp size={14} className={textClass} /> : <ChevronDown size={14} className={textClass} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(cols, 5)}, minmax(0, 1fr))` }}>
              {tickets.map((ticket, i) => (
                <span key={i} className={`text-center text-xs font-mono font-bold px-2 py-1.5 rounded-lg bg-[#003344]/60 ${textClass} border border-white/5`}>
                  {ticket}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const LatestResults = () => {
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [searchTicket, setSearchTicket] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDateLoading, setIsDateLoading] = useState(false);

  // Fetch latest result from external API via our proxy
  const fetchLatest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/proxy/latest`);
      if (!res.ok) throw new Error("Failed to fetch latest result");
      const data = await res.json();
      setResult(normalise(data));
      setActiveId(data.draw_date);
    } catch (e: any) {
      setError(e.message || "Could not load result");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch history sidebar from external API via our proxy
  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/proxy/history?limit=8`);
      if (!res.ok) return;
      const data = await res.json();
      setHistory(data.items || []);
    } catch { /* silent */ }
  }, []);

  // Fetch result by date
  const fetchByDate = async (date: string) => {
    setIsDateLoading(true);
    try {
      const res = await fetch(`${API_BASE}/proxy/by-date?date=${date}`);
      if (!res.ok) throw new Error("No result for this date");
      const data = await res.json();
      setResult(normalise(data));
      setActiveId(data.draw_date);
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsDateLoading(false);
    }
  };

  // Load a history item by date
  const loadHistoryItem = (date: string) => {
    fetchByDate(date);
  };

  useEffect(() => { fetchLatest(); fetchHistory(); }, [fetchLatest, fetchHistory]);

  // ── Loading state
  if (isLoading) {
    return (
      <section id="result" className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Results</span>
          </h2>
          <p className="text-[#94B8C8] text-lg">Check if you are the next lucky jackpot winner</p>
        </div>
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-2 border-[#fbbf24]/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-[#fbbf24] border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-3 flex items-center justify-center">
                <Wifi size={16} className="text-[#fbbf24] animate-pulse" />
              </div>
            </div>
            <p className="text-[#94B8C8] text-sm">Fetching latest results from Kerala Lottery...</p>
          </div>
        </div>
      </section>
    );
  }

  // ── Error / No result
  if (error || !result) {
    return (
      <section id="result" className="py-20 px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Results</span>
          </h2>
          <p className="text-[#94B8C8] text-lg">Check if you are the next lucky jackpot winner</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          <div className="w-20 h-20 rounded-full bg-[#6d28d9]/20 flex items-center justify-center border border-[#6d28d9]/30">
            <AlertCircle size={36} className="text-[#fbbf24]/60" />
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-2">Could Not Load Results</h3>
            <p className="text-[#94B8C8]">{error || "Please try again in a moment."}</p>
          </div>
          <button
            onClick={fetchLatest}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6d28d9]/20 border border-[#6d28d9]/40 text-[#94B8C8] hover:text-white hover:bg-[#6d28d9]/30 transition-all text-sm font-medium"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      </section>
    );
  }

  const hasResult = result.first?.ticket || (result.prizes?.consolation?.length ?? 0) > 0;
  const filteredHistory = history.filter(r => {
    if (searchTicket) return r.draw_name.toLowerCase().includes(searchTicket.toLowerCase()) || r.draw_code.toLowerCase().includes(searchTicket.toLowerCase());
    return true;
  });

  return (
    <section id="result" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-amber-300">Results</span>
          </h2>
          <p className="text-[#94B8C8] text-lg">Live Kerala Lottery results — auto-updated daily</p>
        </motion.div>
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fbbf24] w-5 h-5" />
            <input
              type="text"
              value={searchTicket}
              onChange={(e) => setSearchTicket(e.target.value)}
              placeholder="Search draw name..."
              className="w-full md:w-64 bg-[#003344]/50 border border-[#6d28d9]/50 rounded-full py-2.5 pl-12 pr-4 text-white focus:outline-none focus:border-[#fbbf24] transition-all placeholder:text-[#94B8C8]/60 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* ── LEFT: Main Result Panel ──────────────────────────────────── */}
        <motion.div
          key={result.draw_date}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 bg-gradient-to-br from-[#003344]/60 to-[#6d28d9]/20 backdrop-blur-md border border-[#fbbf24]/30 rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(212,160,23,0.1)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6d28d9]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Draw header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/20 flex items-center justify-center border border-[#fbbf24]/30">
                <Trophy size={18} className="text-[#fbbf24]" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-wide">{result.draw_name}</h3>
                <span className="text-[#94B8C8] text-xs font-mono">{result.draw_code}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#94B8C8] flex items-center gap-1.5 text-sm font-medium bg-[#003344]/50 px-3 py-1.5 rounded-full border border-[#6d28d9]/30">
                <Calendar className="w-3.5 h-3.5" /> {result.draw_date}
              </span>
              <button
                onClick={fetchLatest}
                title="Refresh"
                className="w-8 h-8 rounded-full bg-[#003344]/50 border border-[#6d28d9]/30 flex items-center justify-center text-[#94B8C8] hover:text-[#fbbf24] transition-colors"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>

          {/* 1st Prize or "Results Pending" */}
          {hasResult ? (
            <div className="relative z-10 mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#fbbf24]/15 to-[#d97706]/5 border border-[#fbbf24]/40 overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#fbbf24]/10 rounded-full blur-xl" />
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#fbbf24] bg-[#fbbf24]/15 px-2.5 py-1 rounded-full border border-[#fbbf24]/30">🏆 1st Prize</span>
                <span className="text-[#fbbf24] font-mono font-bold text-sm">₹{result.prizes?.amounts?.["1st"]}</span>
              </div>
              {result.first?.ticket ? (
                <>
                  <div className="text-[#fbbf24] font-mono font-extrabold text-2xl sm:text-3xl tracking-[0.15em] mb-3 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                    {result.first.ticket}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-[#94B8C8]">
                    {result.first.location && <span className="flex items-center gap-1.5"><MapPin size={11} className="text-[#fbbf24]" /> {result.first.location}</span>}
                    {result.first.agent    && <span className="flex items-center gap-1.5"><User size={11} className="text-[#fbbf24]" /> {result.first.agent}</span>}
                    {result.first.agency_no && <span className="flex items-center gap-1.5"><Hash size={11} className="text-[#fbbf24]" /> {result.first.agency_no}</span>}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-[#94B8C8]">
                  <Clock size={14} className="text-[#fbbf24] animate-pulse" />
                  <span className="text-sm">Results will be announced shortly...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="relative z-10 mb-6 p-5 rounded-2xl bg-[#6d28d9]/10 border border-[#6d28d9]/30 flex items-center gap-3">
              <Clock size={20} className="text-[#fbbf24] animate-pulse shrink-0" />
              <div>
                <p className="text-white font-bold">Results Pending</p>
                <p className="text-[#94B8C8] text-sm">Draw results will be published here as soon as they are announced.</p>
              </div>
            </div>
          )}

          {/* MC Lucky Number */}
          {result.mc && result.mc.length > 0 && (
            <div className="relative z-10 mb-5 flex items-center gap-3 p-3 rounded-xl bg-[#6d28d9]/15 border border-[#6d28d9]/30">
              <Sparkles size={15} className="text-[#a78bfa] shrink-0" />
              <span className="text-[#94B8C8] text-xs font-medium">Lucky Number (MC):</span>
              <div className="flex gap-2 flex-wrap">
                {result.mc.map((mc, i) => (
                  <span key={i} className="text-[#a78bfa] font-mono font-bold text-sm px-2.5 py-0.5 rounded-lg bg-[#6d28d9]/20 border border-[#6d28d9]/30">{mc}</span>
                ))}
              </div>
            </div>
          )}

          {/* Prize Tiers */}
          {hasResult && (
            <div className="relative z-10 flex flex-col gap-2">
              {PRIZE_TIERS.map((tier) => (
                <PrizeTierCard
                  key={tier.key}
                  label={tier.label}
                  amount={(result.prizes?.amounts as any)?.[tier.amountKey] || ""}
                  tickets={(result.prizes as any)?.[tier.key] || []}
                  colorClass={tier.color}
                  borderClass={tier.border}
                  textClass={tier.text}
                  badgeClass={tier.badge}
                  cols={tier.cols}
                  defaultOpen={tier.key === "consolation" || tier.key === "2nd" || tier.key === "3rd"}
                />
              ))}
            </div>
          )}

          {/* Guess numbers */}
          {result.prizes?.guess && result.prizes.guess.length > 0 && (
            <div className="relative z-10 mt-4 p-3 rounded-xl bg-[#003344]/40 border border-[#6d28d9]/20">
              <p className="text-[#94B8C8] text-xs font-medium mb-2 flex items-center gap-1.5">
                <Star size={11} className="text-[#fbbf24]" /> Guess Numbers
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.prizes.guess.map((g, i) => (
                  <span key={i} className="text-xs font-mono font-bold text-[#94B8C8] px-2 py-0.5 rounded-lg bg-[#003344]/60 border border-white/5">{g}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── RIGHT: Checker + History ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#003344]/30 backdrop-blur-md border border-[#6d28d9]/30 rounded-3xl p-5 sm:p-8 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          {/* Ticket Checker */}
          <div className="pb-5 border-b border-[#6d28d9]/30">
            <h4 className="text-white font-bold mb-1 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#fbbf24]" /> Check Your Ticket
            </h4>
            <p className="text-[#94B8C8] text-xs mb-3">Enter full ticket no. or last 4 digits</p>
            <TicketChecker result={result} />
          </div>

          {/* Date Filter */}
          <div className="pb-5 border-b border-[#6d28d9]/30">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[#fbbf24]" /> Check by Date
            </h4>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94B8C8] w-4 h-4" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full bg-[#003344]/50 border border-[#6d28d9]/50 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#fbbf24] transition-all text-sm [color-scheme:dark]"
                />
              </div>
              <Button
                onClick={() => filterDate && fetchByDate(filterDate)}
                disabled={!filterDate || isDateLoading}
                className="bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#1a0b2e] border-none rounded-xl font-bold px-3 text-sm shrink-0 shadow-[0_4px_15px_rgba(212,160,23,0.3)] disabled:opacity-40"
              >
                {isDateLoading ? <RefreshCw size={14} className="animate-spin" /> : <ArrowRight size={14} />}
              </Button>
            </div>
          </div>

          {/* History */}
          <div className="flex-1 min-h-0">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={16} className="text-[#fbbf24]" /> Recent Draws
            </h3>
            <div className="space-y-2.5 overflow-y-auto max-h-[340px] pr-1 scrollbar-thin scrollbar-thumb-[#6d28d9]/30 scrollbar-track-transparent">
              {filteredHistory.length === 0 ? (
                <p className="text-[#94B8C8]/60 text-sm text-center py-4">No draws found</p>
              ) : (
                filteredHistory.map((r) => (
                  <button
                    key={r.draw_date}
                    onClick={() => loadHistoryItem(r.draw_date)}
                    className={`w-full flex justify-between items-center p-3.5 rounded-xl transition-all cursor-pointer border group ${
                      activeId === r.draw_date
                        ? "bg-[#fbbf24]/10 border-[#fbbf24]/40"
                        : "bg-[#003344]/60 hover:bg-[#003344]/80 border-transparent hover:border-[#fbbf24]/30"
                    }`}
                  >
                    <div className="text-left">
                      <h4 className={`font-bold text-sm transition-colors ${activeId === r.draw_date ? "text-[#fbbf24]" : "text-white group-hover:text-[#fbbf24]"}`}>
                        {r.draw_name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[#94B8C8] text-xs">{r.draw_date}</span>
                        <span className="text-[#6d28d9] text-[10px] font-mono">{r.draw_code}</span>
                      </div>
                    </div>
                    {activeId === r.draw_date ? (
                      <span className="text-[8px] font-bold tracking-widest uppercase text-[#fbbf24] bg-[#fbbf24]/15 px-2 py-0.5 rounded-full border border-[#fbbf24]/30 shrink-0">Now</span>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#6d28d9]/30 flex items-center justify-center border border-[#6d28d9]/30 group-hover:bg-[#fbbf24]/20 group-hover:border-[#fbbf24]/50 transition-all shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-[#fbbf24]" />
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
