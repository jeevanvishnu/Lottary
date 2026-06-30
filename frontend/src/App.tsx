import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div className="relative min-h-screen bg-[#1a0b2e] text-white font-sans overflow-clip">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e]/95 via-[#6d28d9]/30 to-[#1a0b2e]/95 z-10" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#fbbf24]/15 blur-[120px] z-0" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#6d28d9]/25 blur-[120px] z-0" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <Home />
      </div>
    </div>
  );
};