import busLogoImg from '../assets/bus-logo.png';

export default function BusLogo({ size = 'default', inverted = false }) {
  const isLarge = size === 'large';

  return (
    <div className="flex items-center gap-3 group select-none">
      {/* Standalone Flipped Red-Trim Bus Icon */}
      <img
        src={busLogoImg}
        alt="Bus.com logo"
        className={`${
          isLarge ? 'h-11 w-11' : 'h-9 w-9'
        } object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />

      {/* Brand Typography */}
      <div className="leading-tight">
        <div className="flex items-baseline">
          <span
            className={`${
              isLarge ? 'text-2xl' : 'text-xl'
            } font-black tracking-tight ${
              inverted ? 'text-white' : 'text-slate-900'
            }`}
          >
            Bus<span className="text-red-600">.com</span>
          </span>
          <span
            className={`ml-1.5 text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded ${
              inverted
                ? 'bg-white/10 text-slate-300 border border-white/10'
                : 'text-slate-500 bg-slate-100 border border-slate-200'
            }`}
          >
            India
          </span>
        </div>
        <p
          className={`text-[10px] font-semibold tracking-wide hidden sm:block ${
            inverted ? 'text-slate-400' : 'text-slate-400'
          }`}
        >
          Unified State RTC & Luxury Network
        </p>
      </div>
    </div>
  );
}
