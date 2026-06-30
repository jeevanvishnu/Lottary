import { Box, Phone, Mail, MapPin, Globe, Share2, Camera } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#001827]/80 border-t border-[#005F73]/30 pt-20 pb-10 px-8 relative z-10 mt-10 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A017]/50 to-transparent shadow-[0_0_15px_rgba(212,160,23,0.6)]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-[#D4A017] to-[#B8860B] text-[#001F2D] p-2 rounded-xl shadow-[0_0_15px_rgba(212,160,23,0.5)]">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-amber-300">Jackpot Lottery</span>
          </div>
          <p className="text-[#94B8C8] mb-6 leading-relaxed font-medium">
            Your most trusted partner for official Kerala State Lotteries. Play responsibly and win big securely.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#005F73]/20 border border-[#005F73]/40 flex items-center justify-center text-[#007A94] hover:bg-[#005F73] hover:text-white hover:shadow-[0_0_15px_rgba(0,95,115,0.6)] transition-all">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#005F73]/20 border border-[#005F73]/40 flex items-center justify-center text-[#007A94] hover:bg-[#005F73] hover:text-white hover:shadow-[0_0_15px_rgba(0,95,115,0.6)] transition-all">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 flex items-center justify-center text-[#D4A017] hover:bg-[#D4A017] hover:text-[#001F2D] hover:shadow-[0_0_15px_rgba(212,160,23,0.6)] transition-all">
              <Camera className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]"></span> Quick Links
          </h4>
          <ul className="space-y-4 text-[#94B8C8] font-medium">
            <li><a href="#" className="hover:text-[#D4A017] transition-colors">Available Lotteries</a></li>
            <li><a href="#" className="hover:text-[#D4A017] transition-colors">Latest Results</a></li>
            <li><a href="#" className="hover:text-[#D4A017] transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-[#D4A017] transition-colors">Offers & Updates</a></li>
            <li><a href="#" className="hover:text-[#D4A017] transition-colors">FAQ & Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]"></span> Contact Us
          </h4>
          <ul className="space-y-5 text-[#94B8C8] font-medium">
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-[#001F2D] transition-colors shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">+91 93454 78572 <br /><span className="text-sm text-[#94B8C8]/60">Support: 9AM - 6PM</span></span>
            </li>
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#005F73]/20 flex items-center justify-center text-[#007A94] group-hover:bg-[#005F73] group-hover:text-white transition-colors shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="mt-2 group-hover:text-white transition-colors">support@jackpotlottery.com</span>
            </li>
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-[#001F2D] transition-colors shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">123 MG Road, Ernakulam<br />Kerala, 682011</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#005F73]"></span> Location
          </h4>
          <div className="w-full h-40 bg-[#003344]/40 rounded-xl border border-[#005F73]/30 flex items-center justify-center text-[#007A94] shadow-[inset_0_0_20px_rgba(0,95,115,0.1)] hover:border-[#D4A017]/40 hover:text-[#D4A017] transition-colors cursor-pointer">
            [ Google Map Verified Location ]
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#005F73]/25 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#94B8C8] font-medium">
        <p>&copy; {new Date().getFullYear()} Jackpot Lottery Agency. All rights reserved. Authorized Seller.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#D4A017] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#D4A017] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#D4A017] transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};
