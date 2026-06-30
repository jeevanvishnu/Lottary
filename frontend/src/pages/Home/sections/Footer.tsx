import { Box, Phone, Mail, MapPin, Globe, Share2, Camera } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-purple-950/50 border-t border-cyan-500/20 pt-20 pb-10 px-8 relative z-10 mt-10 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent shadow-[0_0_15px_rgba(236,72,153,0.8)]"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-2 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">Jackpot Lottery</span>
          </div>
          <p className="text-neutral-400 mb-6 leading-relaxed font-medium">
            Your most trusted partner for official Kerala State Lotteries. Play responsibly and win big securely.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-pink-900/40 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all">
              <Camera className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Quick Links
          </h4>
          <ul className="space-y-4 text-neutral-400 font-medium">
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Available Lotteries</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Latest Results</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Offers & Updates</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">FAQ & Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-pink-500"></span> Contact Us
          </h4>
          <ul className="space-y-5 text-neutral-300 font-medium">
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                 <Phone className="w-4 h-4" />
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">+91 98765 43210 <br/><span className="text-sm text-neutral-500">Support: 9AM - 6PM</span></span>
            </li>
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
                 <Mail className="w-4 h-4" />
              </div>
              <span className="mt-2 group-hover:text-white transition-colors">support@jackpotlottery.com</span>
            </li>
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                 <MapPin className="w-4 h-4" />
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">123 MG Road, Ernakulam<br/>Kerala, 682011</span>
            </li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-purple-500"></span> Location
          </h4>
          <div className="w-full h-40 bg-purple-900/40 rounded-xl border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] hover:border-purple-500/60 transition-colors cursor-pointer">
            [ Google Map Verified Location ]
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400 font-medium">
        <p>&copy; {new Date().getFullYear()} Jackpot Lottery Agency. All rights reserved. Authorized Seller.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-300 transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};
