import {
  Star,
  Wifi,
  BatteryCharging,
  Navigation,
  Info,
  Armchair,
  ArrowRight
} from 'lucide-react';

export default function BusCard({
  bus,
  searchParams,
  onOpenDetails,
  onSelectSeats
}) {
  const isRTC = bus.serviceType === 'RTC';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-400 shadow-xs hover:shadow-xl transition-all duration-200 p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Operator Badge, Bus Name & Specs */}
        <div className="lg:w-1/3">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {/* 2-Color Minimalist Badge */}
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isRTC
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              {bus.operatorTag}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 text-white text-xs font-black">
              <Star className="w-3 h-3 fill-current text-yellow-400" /> {bus.rating}
            </span>

            <span className="text-xs text-slate-400 font-medium">
              ({bus.reviewsCount})
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
            {bus.name}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            {bus.type} • <span className="font-mono text-slate-700">{bus.busNumber}</span>
          </p>

          {/* Minimal 2-Color Amenities */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Wifi className="w-3 h-3 text-red-600" /> Wi-Fi
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              <BatteryCharging className="w-3 h-3 text-red-600" /> 65W USB-C
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Navigation className="w-3 h-3 text-red-600" /> Live GPS
            </span>
          </div>
        </div>

        {/* Center Column: Departure, Duration & Arrival Timeline */}
        <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8 lg:w-1/3 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-200/80">
          <div className="text-left">
            <p className="text-xl sm:text-2xl font-black text-slate-900">
              {bus.departureTime}
            </p>
            <p className="text-xs font-bold text-slate-600 truncate max-w-[100px]">
              {searchParams.from}
            </p>
          </div>

          <div className="flex flex-col items-center flex-1 max-w-[130px]">
            <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
              {bus.duration}
            </span>
            <div className="w-full h-0.5 bg-slate-300 my-1.5 relative flex items-center justify-between">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">
              {bus.distanceKm ? `${bus.distanceKm} km` : 'Non-Stop'}
            </span>
          </div>

          <div className="text-right">
            <p className="text-xl sm:text-2xl font-black text-slate-900">
              {bus.arrivalTime}
            </p>
            <p className="text-xs font-bold text-slate-600 truncate max-w-[100px]">
              {searchParams.to}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing & Seat Selection */}
        <div className="flex sm:flex-row lg:flex-col items-center sm:justify-between lg:items-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 lg:w-1/4">
          <div className="text-left lg:text-right">
            <div className="flex items-baseline lg:justify-end gap-2">
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{bus.originalPrice}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{bus.price}
              </span>
            </div>
            <div className="flex items-center lg:justify-end gap-1.5 mt-1">
              <Armchair className="w-3.5 h-3.5 text-red-600" />
              <span
                className={`text-xs font-extrabold ${
                  bus.availableSeats <= 8 ? 'text-red-600' : 'text-slate-700'
                }`}
              >
                {bus.availableSeats} Berths Available
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => onOpenDetails(bus)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectSeats(bus)}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Select Seats</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
