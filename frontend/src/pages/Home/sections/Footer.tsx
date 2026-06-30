import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "../../../assets/Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#001827]/80 border-t border-[#6d28d9]/30 pt-20 pb-10 px-8 relative z-10 mt-10 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent shadow-[0_0_15px_rgba(212,160,23,0.6)]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <img src={Logo} alt="Logo" className="h-16 object-contain" />
          </div>
          <p className="text-[#94B8C8] mb-6 leading-relaxed font-medium">
            Your most trusted partner for official Kerala State Lotteries. Play responsibly and win big securely.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#6d28d9]/20 border border-[#6d28d9]/40 flex items-center justify-center text-[#007A94] hover:bg-[#6d28d9] hover:text-white hover:shadow-[0_0_15px_rgba(0,95,115,0.6)] transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#6d28d9]/20 border border-[#6d28d9]/40 flex items-center justify-center text-[#007A94] hover:bg-[#6d28d9] hover:text-white hover:shadow-[0_0_15px_rgba(0,95,115,0.6)] transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] hover:bg-[#fbbf24] hover:text-[#1a0b2e] hover:shadow-[0_0_15px_rgba(212,160,23,0.6)] transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span> Quick Links
          </h4>
          <ul className="space-y-4 text-[#94B8C8] font-medium">
            <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Available Lotteries</a></li>
            <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Latest Results</a></li>
            <li><a href="#" className="hover:text-[#fbbf24] transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-[#fbbf24] transition-colors">Offers & Updates</a></li>
            <li><a href="#" className="hover:text-[#fbbf24] transition-colors">FAQ & Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span> Contact Us
          </h4>
          <ul className="space-y-5 text-[#94B8C8] font-medium">
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#fbbf24]/10 flex items-center justify-center text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-[#1a0b2e] transition-colors shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">+91 93454 78572 <br /><span className="text-sm text-[#94B8C8]/60">Support: 9AM - 6PM</span></span>
            </li>
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#6d28d9]/20 flex items-center justify-center text-[#007A94] group-hover:bg-[#6d28d9] group-hover:text-white transition-colors shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="mt-2 group-hover:text-white transition-colors">support@jackpotlottery.com</span>
            </li>
            <li className="flex items-start gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#fbbf24]/10 flex items-center justify-center text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-[#1a0b2e] transition-colors shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">123 MG Road, Ernakulam<br />Kerala, 682011</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6d28d9]"></span> Location
          </h4>
          <div className="w-full h-40 rounded-xl border border-[#6d28d9]/30 shadow-[0_0_15px_rgba(109,40,217,0.2)] overflow-hidden hover:border-[#fbbf24]/40 transition-colors">
            <iframe 
              src="https://maps.google.com/maps?q=MG%20Road,%20Ernakulam,%20Kerala&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#6d28d9]/25 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#94B8C8] font-medium">
        <p>&copy; {new Date().getFullYear()} Jackpot Lottery Agency. All rights reserved. Authorized Seller.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#fbbf24] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#fbbf24] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#fbbf24] transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};
