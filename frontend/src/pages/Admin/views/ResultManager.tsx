import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle, X, CheckCircle, Trash2, Trophy, RefreshCw,
  ChevronLeft, ChevronRight, Wifi, Calendar, AlertCircle, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:5000/api/admin";

interface ResultSummary {
  _id: string;
  draw_date: string;
  draw_name: string;
  draw_code: string;
  first: { ticket: string };
  createdAt: string;
}

interface PreviewResult {
  draw_date: string;
  draw_name: string;
  draw_code: string;
  first?: { 
    ticket: string;
    location?: string;
    agent?: string;
    agency_no?: string;
  };
  first_ticket?: string;
  prizes?: { amounts?: { "1st"?: string } };
}

interface ResultManagerProps {
  showTemporaryMessage: (msg: string) => void;
}

export const ResultManager: React.FC<ResultManagerProps> = ({ showTemporaryMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Preview / fetch state
  const [fetchDate, setFetchDate] = useState("");
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Table state
  const [results, setResults] = useState<ResultSummary[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("admin_token");

  // ── Fetch stored results (for table)
  const fetchResults = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/results?page=${page}&limit=8`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResults(data.results || []);
      setPagination(data.pagination || { total: 0, page: 1, totalPages: 1 });
    } catch {
      toast.error("Failed to load results");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchResults(1); }, [fetchResults]);

  // ── Auto-fetch latest from external API
  const fetchLatest = async () => {
    setIsFetching(true);
    setFetchError("");
    setPreview(null);
    try {
      const res = await fetch(`${API_BASE}/proxy/latest`);
      if (!res.ok) throw new Error("External API error");
      const data = await res.json();
      setPreview(data);
      setFetchDate(data.draw_date || "");
    } catch (e: any) {
      setFetchError(e.message || "Failed to fetch from Kerala Lottery API");
    } finally {
      setIsFetching(false);
    }
  };

  // ── Fetch by specific date from external API
  const fetchByDate = async () => {
    if (!fetchDate) return;
    setIsFetching(true);
    setFetchError("");
    setPreview(null);
    try {
      const res = await fetch(`${API_BASE}/proxy/by-date?date=${fetchDate}`);
      if (!res.ok) throw new Error("No result found for this date");
      const data = await res.json();
      setPreview(data);
    } catch (e: any) {
      setFetchError(e.message || "Failed to fetch result");
    } finally {
      setIsFetching(false);
    }
  };

  // ── Publish the previewed result to our DB
  const handlePublish = async () => {
    if (!preview) return;
    setIsSubmitting(true);

    // Normalise first_ticket → first.ticket if needed
    const payload = {
      ...preview,
      first: {
        ticket: preview.first?.ticket || preview.first_ticket || "",
        location: preview.first?.location || "",
        agent: preview.first?.agent || "",
        agency_no: preview.first?.agency_no || "",
      },
    };

    try {
      const res = await fetch(`${API_BASE}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to publish");
      }
      setIsModalOpen(false);
      setPreview(null);
      setFetchDate("");
      setFetchError("");
      fetchResults(1);
      showTemporaryMessage("Success: Draw result has been officially published.");
    } catch (err: any) {
      toast.error(err.message || "Failed to publish result");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/result/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteConfirm(null);
      fetchResults(pagination.page);
      toast.success("Result deleted");
    } catch {
      toast.error("Failed to delete result");
    }
  };

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return dateStr; }
  };

  const previewTicket = preview?.first?.ticket || preview?.first_ticket || "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#121c21]/80 to-[#0d161a]/90 border border-emerald-500/30 rounded-3xl p-6 md:p-10 flex flex-col gap-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(16,185,129,0.1)] w-full flex-1 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 relative z-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-1">
              Results Manager
            </h3>
            <p className="text-sm text-gray-400">Auto-fetch & publish Kerala Lottery draw results</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchResults(pagination.page)}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all border border-white/10"
              title="Refresh table"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#071310] border-none rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <PlusCircle size={16} className="mr-2" /> Publish Result
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="relative z-10 overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Loading results...</p>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Trophy size={40} className="text-emerald-500/30" />
              <p className="text-gray-400 font-medium">No results published yet</p>
              <p className="text-gray-500 text-sm">Click "Publish Result" to auto-fetch from the Kerala Lottery API</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4 font-bold">Draw Name</th>
                  <th className="py-4 px-4 font-bold">Code</th>
                  <th className="py-4 px-4 font-bold">Draw Date</th>
                  <th className="py-4 px-4 font-bold">1st Prize Ticket</th>
                  <th className="py-4 px-4 font-bold">Published</th>
                  <th className="py-4 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {results.map((result, idx) => (
                  <motion.tr
                    key={result._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">{result.draw_name}</td>
                    <td className="py-4 px-4 text-emerald-400 font-mono whitespace-nowrap">{result.draw_code}</td>
                    <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{result.draw_date}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/25 font-mono text-xs font-bold">
                        <Trophy size={10} /> {result.first?.ticket || "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-xs whitespace-nowrap">{formatDate(result.createdAt)}</td>
                    <td className="py-4 px-4 text-right">
                      {deleteConfirm === result._id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-red-400">Confirm?</span>
                          <button onClick={() => handleDelete(result._id)} className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-bold border border-red-500/30 transition-all">Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-xs font-bold border border-white/10 transition-all">No</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(result._id)} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 mt-auto gap-4 relative z-10">
            <span className="text-xs text-gray-400 font-medium">Showing {results.length} of {pagination.total} entries</span>
            <div className="flex gap-2 items-center">
              <button onClick={() => fetchResults(pagination.page - 1)} disabled={pagination.page <= 1} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft size={14} /></button>
              <span className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">{pagination.page} / {pagination.totalPages}</span>
              <button onClick={() => fetchResults(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Publish Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) { setIsModalOpen(false); setPreview(null); setFetchError(""); } }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-[#121c21] to-[#0d161a] border border-emerald-500/30 rounded-3xl p-6 md:p-8 flex flex-col gap-5 shadow-2xl w-full max-w-xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
                <div>
                  <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                    Publish Draw Result
                  </h3>
                  <p className="text-gray-400 text-sm mt-0.5">Auto-fetch from Kerala Lottery API</p>
                </div>
                <button onClick={() => { setIsModalOpen(false); setPreview(null); setFetchError(""); }} className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                {/* Step 1 — Fetch */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Wifi size={12} /> Step 1 — Fetch Result
                  </p>

                  {/* Fetch Latest */}
                  <Button
                    type="button"
                    onClick={fetchLatest}
                    disabled={isFetching}
                    className="w-full mb-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold shadow-none"
                  >
                    {isFetching ? (
                      <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /> Fetching...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Download size={15} /> Fetch Today's Latest Result</span>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mb-3">— or pick a specific date —</p>

                  {/* Fetch by date */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94B8C8] w-4 h-4" />
                      <input
                        type="date"
                        value={fetchDate}
                        onChange={(e) => setFetchDate(e.target.value)}
                        className="w-full bg-[#0a1114]/80 border border-white/10 rounded-xl px-3 py-2.5 pl-10 text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all text-sm [color-scheme:dark]"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={fetchByDate}
                      disabled={!fetchDate || isFetching}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-none text-[#071310] font-bold rounded-xl px-4 disabled:opacity-40"
                    >
                      {isFetching ? <RefreshCw size={14} className="animate-spin" /> : "Fetch"}
                    </Button>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {fetchError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-start gap-2 p-3 mt-3 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs"
                      >
                        <AlertCircle size={13} className="mt-0.5 shrink-0" /> {fetchError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Step 2 — Preview & Publish */}
                <AnimatePresence>
                  {preview && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/30"
                    >
                      <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <CheckCircle size={12} /> Step 2 — Preview & Publish
                      </p>

                      {/* Preview card */}
                      <div className="flex flex-col gap-2 mb-4 p-3 rounded-xl bg-[#0a1114]/60 border border-white/5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white font-bold">{preview.draw_name}</p>
                            <p className="text-emerald-400 text-xs font-mono">{preview.draw_code}</p>
                          </div>
                          <span className="text-[#94B8C8] text-xs bg-white/5 px-2 py-0.5 rounded-full border border-white/10 shrink-0">{preview.draw_date}</span>
                        </div>
                        {previewTicket ? (
                          <div className="flex items-center gap-2 mt-1">
                            <Trophy size={12} className="text-[#fbbf24]" />
                            <span className="text-[#fbbf24] font-mono font-bold text-sm">{previewTicket}</span>
                            <span className="text-gray-500 text-xs">1st Prize</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-400 text-xs italic">Results pending (draw not yet completed)</span>
                          </div>
                        )}
                        <p className="text-xs text-gray-500">
                          Prize tiers: {Object.entries(preview.prizes || {}).filter(([k]) => Array.isArray((preview.prizes as any)[k]) && (preview.prizes as any)[k].length > 0).length} populated
                        </p>
                      </div>

                      <Button
                        onClick={handlePublish}
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-none text-[#071310] font-bold shadow-[0_4px_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#071310] border-t-transparent rounded-full animate-spin" /> Publishing...</span>
                        ) : (
                          <span className="flex items-center gap-2"><CheckCircle size={16} /> Publish This Result</span>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
