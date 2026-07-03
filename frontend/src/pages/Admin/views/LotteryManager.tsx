import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X, Loader2, Edit, Trash2, FileText, IndianRupee, Calendar, Clock, Trophy, UploadCloud, Image as ImageIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LotteryManagerProps {
  showTemporaryMessage: (msg: string) => void;
}

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CustomTimePicker = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const parseTime = (val: string) => {
    if (!val) return { h: '03', m: '00', p: 'PM' };
    const parts = val.split(' ');
    const timeParts = (parts[0] || '').split(':');
    return {
      h: timeParts[0] || '03',
      m: timeParts[1] || '00',
      p: parts[1] || 'PM'
    };
  };

  const initialTime = parseTime(value);
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(initialTime.h);
  const [minute, setMinute] = useState(initialTime.m);
  const [ampm, setAmpm] = useState(initialTime.p);

  useEffect(() => {
    if (value) {
      const parsed = parseTime(value);
      setHour(parsed.h);
      setMinute(parsed.m);
      setAmpm(parsed.p);
    }
  }, [value]);

  useEffect(() => {
    onChange(`${hour}:${minute} ${ampm}`);
  }, [hour, minute, ampm]);

  const minutes = Array.from({ length: 12 }).map((_, i) => (i * 5).toString().padStart(2, '0'));
  const hours = Array.from({ length: 12 }).map((_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border ${isOpen ? 'border-[#fbbf24]' : 'border-white/10'} rounded-2xl px-4 py-4 text-white focus:outline-none transition-all shadow-inner flex justify-between items-center cursor-pointer hover:bg-white/10`}
      >
        <span className="font-medium tracking-wider">{hour}:{minute} {ampm}</span>
        <Clock size={16} className={isOpen ? 'text-[#fbbf24]' : 'text-gray-400'} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-2 left-0 w-full bg-[#12072b] border border-[#fbbf24]/50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex backdrop-blur-xl"
            >
              <div className="flex-1 h-56 overflow-y-auto border-r border-white/10 p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="text-xs text-center text-gray-500 mb-2 font-bold uppercase tracking-wider sticky top-0 bg-[#12072b]/90 backdrop-blur py-1 z-10">Hour</div>
                {hours.map((h) => (
                  <div
                    key={h}
                    onClick={() => setHour(h)}
                    className={`text-center py-2 my-1 rounded-xl cursor-pointer transition-all ${hour === h ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a0b2e] font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    {h}
                  </div>
                ))}
              </div>
              <div className="flex-1 h-56 overflow-y-auto border-r border-white/10 p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="text-xs text-center text-gray-500 mb-2 font-bold uppercase tracking-wider sticky top-0 bg-[#12072b]/90 backdrop-blur py-1 z-10">Min</div>
                {minutes.map((m) => (
                  <div
                    key={m}
                    onClick={() => setMinute(m)}
                    className={`text-center py-2 my-1 rounded-xl cursor-pointer transition-all ${minute === m ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a0b2e] font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    {m}
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-center p-2 gap-2 bg-black/20">
                {['AM', 'PM'].map((p) => (
                  <div
                    key={p}
                    onClick={() => { setAmpm(p); setIsOpen(false); }}
                    className={`text-center py-4 rounded-xl cursor-pointer transition-all font-bold tracking-wider ${ampm === p ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a0b2e] shadow-md' : 'text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export const LotteryManager: React.FC<LotteryManagerProps> = ({ showTemporaryMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [lotteries, setLotteries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Form State
  const [currentId, setCurrentId] = useState("");
  const [formData, setFormData] = useState({
    lotteryNo: "",
    lotteryName: "",
    price: "",
    date: getLocalDateString(),
    time: "03:00 PM",
    jackpotAmount: "",
    image: ""
  });

  const fetchLotteries = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/lotteries?page=${page}&limit=${limit}`);
      const data = response.data;
      setLotteries(data.lotteries);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching lotteries", error);
      showTemporaryMessage("Failed to fetch lotteries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotteries();
  }, [page]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Promotional image is required");
      return;
    }
    setActionLoading(true);

    try {
      const url = isEditMode
        ? `/admin/lottery/${currentId}`
        : `/admin/lottery`;

      const payload = {
        ...formData,
        price: Number(formData.price),
        jackpotAmount: formData.jackpotAmount
      };

      if (isEditMode) {
        await axiosInstance.put(url, payload);
      } else {
        await axiosInstance.post(url, payload);
      }

      toast.success(isEditMode ? "Lottery updated successfully!" : "Lottery added successfully!");
      setIsModalOpen(false);
      fetchLotteries();
    } catch (error: any) {
      console.error("Error saving lottery", error);
      toast.error(error.response?.data?.message || "Failed to connect to the server.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/admin/lottery/${id}`);
      showTemporaryMessage("Lottery deleted successfully!");
      fetchLotteries();
    } catch (error: any) {
      console.error("Error deleting lottery", error);
      showTemporaryMessage("Failed to connect to the server.");
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ lotteryNo: "", lotteryName: "", price: "", date: getLocalDateString(), time: "03:00 PM", jackpotAmount: "", image: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (lottery: any) => {
    setIsEditMode(true);
    setCurrentId(lottery._id);
    setFormData({
      lotteryNo: lottery.lotteryNo || "",
      lotteryName: lottery.lotteryName,
      price: lottery.price.toString(),
      date: lottery.date,
      time: lottery.time,
      jackpotAmount: lottery.jackpotAmount.toString(),
      image: lottery.image || ""
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#2d1b4e]/20 to-[#12072b]/80 border border-[#fbbf24]/20 rounded-3xl p-6 md:p-10 flex flex-col gap-8 backdrop-blur-xl shadow-2xl w-full flex-1 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 relative z-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] mb-2">
              Lotteries
            </h3>
            <p className="text-sm text-gray-400">View and manage all your active and past lottery draws</p>
          </div>
          <Button
            onClick={openAddModal}
            className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-[#fbbf24] text-[#1a0b2e] border-none rounded-xl font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          >
            <PlusCircle size={16} className="mr-2" /> Add New Lottery
          </Button>
        </div>

        <div className="relative z-10 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-[#fbbf24]" size={32} />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4 font-bold">Image</th>
                  <th className="py-4 px-4 font-bold">Lottery Name</th>
                  <th className="py-4 px-4 font-bold">Lottery No</th>
                  <th className="py-4 px-4 font-bold">Date</th>
                  <th className="py-4 px-4 font-bold">Time</th>
                  <th className="py-4 px-4 font-bold">Price</th>
                  <th className="py-4 px-4 font-bold">Winning Price</th>
                  <th className="py-4 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {lotteries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400">No lotteries found. Create one to get started.</td>
                  </tr>
                ) : (
                  lotteries.map((lottery) => (
                    <tr key={lottery._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        {lottery.image ? (
                          <img src={lottery.image} alt={lottery.lotteryName} className="w-12 h-12 rounded-lg object-cover border border-white/10 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 border border-white/10">No Img</div>
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold text-white whitespace-nowrap">{lottery.lotteryName}</td>
                      <td className="py-4 px-4 font-bold text-white whitespace-nowrap">{lottery.lotteryNo}</td>
                      <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{lottery.date}</td>
                      <td className="py-4 px-4 text-gray-300 whitespace-nowrap">{lottery.time}</td>
                      <td className="py-4 px-4 text-emerald-400 font-semibold">₹{lottery.price}</td>
                      <td className="py-4 px-4 text-[#fbbf24] font-semibold">₹{lottery.jackpotAmount}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEditModal(lottery)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="Edit">
                            <Edit size={16} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-[#1a0b2e] border-red-500/30 text-white sm:rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold flex items-center gap-2">
                                  <Trash2 className="text-red-400" size={20} />
                                  Delete Lottery
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400 mt-2">
                                  Are you absolutely sure you want to delete <span className="text-white font-semibold">"{lottery.lotteryName}"</span>? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="mt-6 border-t border-white/10 pt-4">
                                <AlertDialogCancel className="rounded-xl border border-white/10 bg-transparent text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(lottery._id)} className="rounded-xl bg-red-500/90 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all cursor-pointer">
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 mt-auto gap-4">
          <span className="text-xs text-gray-400 font-medium">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Lottery Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#070114]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-b from-[#1a0b2e] to-[#0f051e] border border-white/10 rounded-[2rem] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-3xl relative overflow-x-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* Decorative background glows */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#fbbf24]/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {isEditMode ? "Edit Lottery" : "Add New Lottery"}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Configure the details for your lottery ticket.</p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/10 transition-all p-3 rounded-full bg-white/5 border border-white/5 shadow-sm cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

                  {/* Title */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} className="text-[#fbbf24]" /> Lottery Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.lotteryName}
                        onChange={e => setFormData({ ...formData, lotteryName: e.target.value })}
                        placeholder="Enter a title"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] focus:bg-white/10 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Lottery No */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} className="text-[#fbbf24]" /> Lottery No
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.lotteryNo}
                        onChange={e => setFormData({ ...formData, lotteryNo: e.target.value })}
                        placeholder="e.g. L-12345"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] focus:bg-white/10 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <IndianRupee size={14} className="text-[#fbbf24]" /> Ticket Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        placeholder="40"
                        min="1"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] focus:bg-white/10 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-col gap-2.5 md:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={14} className="text-[#fbbf24]" /> Schedule
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative group">
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] focus:bg-white/10 transition-all shadow-inner [color-scheme:dark]"
                        />
                      </div>
                      <div className="relative group">
                        <CustomTimePicker
                          value={formData.time}
                          onChange={(val) => setFormData({ ...formData, time: val })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Winning Price */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <Trophy size={14} className="text-[#fbbf24]" /> Winning Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="text"
                        required
                        value={formData.jackpotAmount}
                        onChange={e => setFormData({ ...formData, jackpotAmount: e.target.value })}
                        placeholder="e.g. 1 Crore, 50 Lakhs"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] focus:bg-white/10 transition-all shadow-inner font-bold text-[#fbbf24]"
                      />
                    </div>
                  </div>

                  {/* Image Upload Custom */}
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={14} className="text-[#fbbf24]" /> Promotional Image
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        id="lottery-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`w-full border-2 border-dashed ${formData.image ? 'border-[#fbbf24]/50 bg-[#fbbf24]/5' : 'border-white/20 bg-white/5'} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all group-hover:border-[#fbbf24] group-hover:bg-white/10`}>
                        {formData.image ? (
                          <div className="flex flex-col items-center gap-3 relative">
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFormData(prev => ({ ...prev, image: "" })); }}
                              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 z-20 transition-all shadow-md cursor-pointer"
                              title="Remove image"
                            >
                              <X size={14} strokeWidth={3} />
                            </button>
                            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border border-white/20 relative group-hover:scale-105 transition-transform bg-black/50 flex justify-center items-center">
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                              <CheckCircle size={16} /> Image Ready
                            </span>
                            <span className="text-xs text-gray-400 group-hover:text-white transition-colors relative z-20">Click to change</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#fbbf24] group-hover:bg-[#fbbf24]/20 transition-all shadow-inner">
                              <UploadCloud size={24} />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold text-white mb-1">Click to upload or drag and drop</p>
                              <p className="text-xs text-gray-400">SVG, PNG, JPG or WEBP (MAX. 2MB)</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex justify-end gap-4">
                  <Button type="button" onClick={() => setIsModalOpen(false)} className="rounded-2xl px-6 py-6 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white bg-transparent font-bold transition-all cursor-pointer">
                    Cancel
                  </Button>
                  <Button disabled={actionLoading} type="submit" className="rounded-2xl px-8 py-6 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-[#fbbf24] border-none text-[#1a0b2e] font-extrabold shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all cursor-pointer">
                    {actionLoading ? <Loader2 size={20} className="mr-2 animate-spin" /> : (isEditMode ? <Edit size={20} className="mr-2" /> : <PlusCircle size={20} className="mr-2" />)}
                    {isEditMode ? "Save Changes" : "Create Lottery"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
