import { ArrowDown, Shield, Clock, Award, Compass } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-6 sm:pt-8 md:pt-10 pb-4">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Top/Middle Headline & Action Block */}
        <div className="max-w-3xl my-auto py-4 sm:py-6">
          {/* Government RTC & Transit Network Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 mb-3.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Official Network Partner • KSRTC, APSRTC, TSRTC & National Fleets</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-black tracking-tight text-white leading-[1.08]">
            India’s Interstate Bus Network.{' '}
            <span className="text-red-500">Unified & Live.</span>
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-400 font-normal leading-relaxed max-w-2xl">
            Book state government RTCs (KSRTC Airavat, APSRTC Amaravati, TSRTC Garuda Plus)
            and verified national private coaches across 60+ major corridors with instant e-tickets.
          </p>

          {/* Quick Action Button */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-red-600/25 transition-all cursor-pointer"
            >
              <span>Search All Bus Routes</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Zero Cancellation Fees On Select RTCs</span>
            </div>
          </div>
        </div>

        {/* Live Network Statistics - Anchored right at the bottom edge of the viewport on both desktop and laptop */}
        <div className="pt-4 pb-1 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white">36+</span>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <p className="text-xs font-bold text-slate-200 mt-1.5">State RTCs & Fleets</p>
            <p className="text-[10px] text-slate-400 mt-0.5">KSRTC, APSRTC, TSRTC, VRL, Orange</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white">12,400+</span>
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <p className="text-xs font-bold text-slate-200 mt-1.5">Daily Intercity Routes</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Connecting all 28 states & UTs</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white">4.8★</span>
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <p className="text-xs font-bold text-slate-200 mt-1.5">Verified Traveler Score</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Based on 8.4M+ passenger ratings</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-black text-white">99.4%</span>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <p className="text-xs font-bold text-slate-200 mt-1.5">On-Time SLA</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Live GPS tracking & captain assist</p>
          </div>
        </div>
      </div>
    </section>
  );
}
