import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function BusDetailsModal({
  bus,
  searchParams,
  onClose,
  onProceedToSeats
}) {
  if (!bus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-red-600">
              {bus.operatorTag} • {bus.busNumber}
            </span>
            <h2 className="text-xl font-black text-slate-900">{bus.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Coach Highlights Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Coach Specification
              </span>
              <p className="text-sm font-bold mt-2">{bus.type}</p>
              <span className="text-xs text-red-400 mt-1">
                2+1 Berths • 180° Sleeper
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Operator Service
              </span>
              <p className="text-sm font-bold text-slate-900 mt-2">
                {bus.operator}
              </p>
              <span className="text-xs text-slate-600 mt-1 block">
                Live GPS & Verified Crew
              </span>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
              <span className="text-[11px] uppercase tracking-wider text-red-700 font-bold">
                Verified Passenger Score
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <Star className="w-5 h-5 text-red-600 fill-current" />
                <span className="text-xl font-black text-slate-900">
                  {bus.rating} / 5.0
                </span>
              </div>
              <span className="text-xs text-slate-600 mt-1 block">
                {bus.reviewsCount} verified traveler reviews
              </span>
            </div>
          </div>

          {/* Boarding & Dropping Points Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-600" /> Boarding Points ({searchParams.from})
              </h3>
              <div className="space-y-3 border-l-2 border-red-200 pl-4 ml-2">
                {bus.boardingPoints.map((bp) => (
                  <div key={bp.id} className="relative">
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600" />
                    <p className="text-xs font-black text-red-600">{bp.time}</p>
                    <p className="text-sm font-bold text-slate-900">{bp.name}</p>
                    <p className="text-xs text-slate-500">{bp.landmark}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-900" /> Dropping Points ({searchParams.to})
              </h3>
              <div className="space-y-3 border-l-2 border-slate-300 pl-4 ml-2">
                {bus.droppingPoints.map((dp) => (
                  <div key={dp.id} className="relative">
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900" />
                    <p className="text-xs font-black text-slate-900">{dp.time}</p>
                    <p className="text-sm font-bold text-slate-900">{dp.name}</p>
                    <p className="text-xs text-slate-500">{dp.landmark}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              Included In This Journey
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {bus.amenities.map((am) => (
                <div
                  key={am}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation & Policies */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-600" /> Travel & Cancellation Guidelines
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              {(bus.policies || []).map((pol, idx) => (
                <li key={idx}>• {pol}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Starting from</span>
            <span className="text-2xl font-black text-slate-900">₹{bus.price}</span>
            <span className="text-xs text-red-600 font-bold ml-2">
              • {bus.availableSeats} berths left
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              onProceedToSeats(bus);
            }}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm inline-flex items-center gap-2 shadow-md shadow-red-600/20 cursor-pointer"
          >
            <span>Proceed to Seat Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
